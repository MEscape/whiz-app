import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree'
import TcpSocket from 'react-native-tcp-socket'

import { PeerService } from '@/services'
import { getIpV4 } from '@/util'

export const TcpStoreModel = types
  .model('TcpStore')
  .props({
    client: types.maybeNull(types.frozen<TcpSocket.Socket>()),
    error: types.maybeNull(types.string),
    isConnected: types.optional(types.boolean, false),
    receivedData: types.maybeNull(types.string),
  })
  .actions(self => ({
    connect: flow(function* (ip?: string, port: number = 3000) {
      try {
        if (!ip) ip = yield getIpV4()

        if (self.client) {
          console.log('Closing previous TCP connection...')
          self.client.destroy()
          self.setClient(null)
        }

        const client = TcpSocket.createConnection({ host: ip, port }, () => {
          console.log(`Connected to TCP server at ${ip}:${port}`)
          self.setConnected(true)
        })

        client.on('data', data => {
          console.log('Received:', data.toString())
          self.setReceivedData(data.toString())
        })

        client.on('error', error => {
          console.error('TCP error:', error)
          self.setError(error.toString())
        })

        client.on('close', () => {
          console.log('TCP connection closed')
          self.resetState()
        })

        self.setClient(client)
      } catch (error) {
        console.error('Connection error:', error)
        self.setError(error.toString())
      }
    }),
    create: flow(function* () {
      const peerService = PeerService.getInstance()

      if (!peerService.isServerRunning) {
        peerService.startServer()
        console.log('Server started on this device')
      }

      yield self.connect()
      self.sendData({ method: 'POST', path: '/lobby' })
    }),
    disconnect() {
      if (self.client) {
        console.log('Disconnecting TCP client...')
        self.client.destroy()
        self.setClient(null)
      }

      self.resetState()

      const peerService = PeerService.getInstance()
      if (peerService.isServerRunning) {
        console.log('Stopping TCP server...')
        peerService.stopServer()
      }
    },
    resetState() {
      self.isConnected = false
      self.receivedData = null
      self.error = null
      self.client = null
    },
    sendData(message: object) {
      if (self.client && self.isConnected) {
        try {
          const payload = JSON.stringify(message)
          self.client.write(payload)
          console.log('Sent:', payload)
        } catch (error) {
          console.error('Send error:', error)
        }
      } else {
        console.warn('Client is not connected. Cannot send data.')
      }
    },

    setClient(client: TcpSocket.Socket | null) {
      self.client = client
    },

    setConnected(status: boolean) {
      self.isConnected = status
    },

    setError(error: string | null) {
      self.error = error
    },

    setReceivedData(data: string | null) {
      self.receivedData = data
    },
  }))

export interface TcpStore extends Instance<typeof TcpStoreModel> {}
export interface TcpStoreSnapshot extends SnapshotOut<typeof TcpStoreModel> {}
