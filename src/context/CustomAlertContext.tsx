import React, { createContext, useCallback, useEffect, useState } from 'react'
import { Modal, View } from 'react-native'

import { Button, Text } from 'blueprints'
import i18n from 'i18n-js'

import { translate, TxKeyPath } from '@/i18n'

export type AlertOptions = {
  title?: string
  message?: string
  titleTx?: TxKeyPath
  titleTxOptions?: i18n.TranslateOptions
  messageTx?: TxKeyPath
  messageTxOptions?: i18n.TranslateOptions
  background?: string
  onConfirm?: () => void
  onCancel?: () => void
}

type AlertContextType = {
  showAlert: (options: AlertOptions) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

// Global function reference
let globalShowAlert: (options: AlertOptions) => void = () => {}

export const showGlobalAlert = (options: AlertOptions) => {
  globalShowAlert(options)
}

export const CustomAlertProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null)

  const i18nTitleText =
    alertOptions?.titleTx && translate(alertOptions.titleTx, alertOptions.titleTxOptions)
  const titleContent = i18nTitleText || alertOptions?.title

  const i18nMessageText =
    alertOptions?.messageTx && translate(alertOptions.messageTx, alertOptions.messageTxOptions)
  const messageContent = i18nMessageText || alertOptions?.message

  const showAlert = useCallback((options: AlertOptions) => {
    console.log('🚀 showAlert triggered:', options)
    setAlertOptions({ ...options }) // Ensure object reference changes
    setAlertVisible(true)
  }, [])

  useEffect(() => {
    console.log('🔄 Setting globalShowAlert function')
    globalShowAlert = showAlert
  }, [showAlert])

  const hideAlert = () => {
    console.log('🛑 Hiding alert')
    setAlertVisible(false)
    setAlertOptions(null)
  }

  const handleConfirm = () => {
    alertOptions?.onConfirm()
    hideAlert()
  }

  const handleCancel = () => {
    alertOptions?.onCancel?.()
    hideAlert()
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <View className="absolute w-full h-full">
        <Modal visible={alertVisible} transparent animationType="fade" onRequestClose={hideAlert}>
          {/* Overlay */}
          <View className="absolute w-full h-full bg-black opacity-50" />

          {/* Modal Centering Container */}
          <View className="absolute inset-0 flex justify-center items-center">
            <View className={`p-6 shadow-2xl py-4 rounded-md ${alertOptions?.background}`}>
              {/* Modal Title */}
              {titleContent && (
                <Text variant="h3" fontWeight="bold" className="ml-4">
                  {titleContent}
                </Text>
              )}

              {/* Modal Message */}
              {messageContent && <Text className="ml-4 mr-3">{messageContent}</Text>}

              {/* Action Buttons */}
              <View className="flex-row justify-center gap-4 mt-4">
                <Button
                  variant="tertiary"
                  tx="common.cancel"
                  onPress={handleCancel}
                  outerClassName="flex-1"
                />
                <Button
                  variant="tertiary"
                  text="OK"
                  onPress={handleConfirm}
                  outerClassName="flex-1"
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </AlertContext.Provider>
  )
}
