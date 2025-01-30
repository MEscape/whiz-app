import { useEffect } from 'react'
import { Platform } from 'react-native'

import { Asset } from 'expo-asset'
import * as Notifications from 'expo-notifications'

import { translate } from '@/i18n'
import * as storage from '@/storage'
import { StorageKeys } from '@/storage'

import { Audios, AudioUris } from 'assets/audios'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  }),
})

// Notification Data
const pushNotifications = {
  message: translate('pushNotifications.message'),
  title: translate('pushNotifications.title'),
}

// Pick a Random Notification Message
const getRandomNotification = () => {
  const title = pushNotifications.title[Math.floor(Math.random() * pushNotifications.title.length)]
  const message =
    pushNotifications.message[Math.floor(Math.random() * pushNotifications.message.length)]
  return { message, title }
}

// Request Notification Permissions
const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== 'granted') {
    console.warn('Benachrichtigungen sind deaktiviert! Bitte aktiviere sie.')
    return false
  }
  return true
}

// Check if the last schedule was completed
const checkLastSchedule = () => {
  let lastSchedule = storage.load(StorageKeys.LAST_SCHEDULE) as unknown as string

  if (!lastSchedule) {
    return true
  }

  if (new Date(lastSchedule) < new Date()) {
    lastSchedule = new Date().toISOString()
    storage.save(StorageKeys.LAST_SCHEDULE, lastSchedule)
    return true
  }

  return false
}

// Schedule the Weekly Notification
const scheduleWeeklyNotification = async () => {
  const hasPermission = await requestPermissions()
  if (!hasPermission) return

  const shouldSchedule = await checkLastSchedule()
  if (!shouldSchedule) return

  const { message, title } = getRandomNotification()

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      importance: Notifications.AndroidImportance.MAX,
      lightColor: '#FF231F7C',
      name: 'default',
      vibrationPattern: [0, 250, 250, 250],
    })
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      android: {
        priority: 'high',
        sound: true,
        vibrate: [0, 500, 250, 500],
      },
      body: message,
      ios: {
        sound: true,
      },
      sound: Asset.fromModule(AudioUris[Audios.NOTIFICATION_SOUND]).localUri,
      title,
    },
    trigger: {
      channelId: 'default',
      hour: 16,
      minute: 0,
      repeats: true,
      weekday: 5,
    },
  })

  console.log('Notification scheduled for every Friday at 4 PM')
}

export const useWeeklyNotification = () => {
  useEffect(() => {
    scheduleWeeklyNotification()
  }, [])
}
