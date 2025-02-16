export enum Audios {
  LOBBY_AUDIO = 'PARTY_VIDEO',
  BUTTON_SOUND = 'BUTTON_SOUND',
  NOTIFICATION_SOUND = 'NOTIFICATION_SOUND',
  EQUIP_SOUND = 'EQUIP_SOUND',
  DELETE_SOUND = 'DELETE_SOUND',
}

export const AudioUris = {
  [Audios.LOBBY_AUDIO]: require('./lobby.mp3'),
  [Audios.BUTTON_SOUND]: require('./button.mp3'),
  [Audios.NOTIFICATION_SOUND]: require('./notification.mp3'),
  [Audios.EQUIP_SOUND]: require('./equip.mp3'),
  [Audios.DELETE_SOUND]: require('./delete.mp3'),
}
