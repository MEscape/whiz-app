import { NetworkInfo } from 'react-native-network-info'

export const getIpV4 = async () => {
  return await NetworkInfo.getIPAddress()
}

/**
 * Encodes an IPv4 address to a hexadecimal string.
 * e.g. "192.168.1.5" -> "c0a80105"
 */
export const encodeIp = (ip: string) => {
  const parts = ip.split('.').map(Number)
  return (((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0)
    .toString(16)
    .toUpperCase()
}

/**
 * Decodes a hexadecimal string back to an IPv4 address.
 * e.g. "c0a80105" -> "192.168.1.5"
 */
export const decodeIp = (hex: string) => {
  const num = parseInt(hex.toLowerCase(), 16)
  return [(num >> 24) & 0xff, (num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff].join('.')
}
