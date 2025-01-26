export enum Images {
  LOGO_DARK = 'LOGO_DARK',
  LOGO_LIGHT = 'LOGO_LIGHT',
  PARTY_LIGHT = 'PARTY_LIGHT',
  PARTY_DARK = 'PARTY_DARK',
  POWER_LIGHT = 'POWER_LIGHT',
  POWER_DARK = 'POWER_DARK',
  PARTY = 'PARTY',
  DATA = 'DATA',
  START = 'START',
}

export const ImageUris = {
  [Images.LOGO_DARK]: require('./logoDark.png'),
  [Images.LOGO_LIGHT]: require('./logoLight.png'),
  [Images.PARTY_LIGHT]: require('./partyLight.png'),
  [Images.PARTY_DARK]: require('./partyDark.png'),
  [Images.POWER_LIGHT]: require('./powerLight.png'),
  [Images.POWER_DARK]: require('./powerDark.png'),
  [Images.PARTY]: require('./party.svg'),
  [Images.DATA]: require('./data.svg'),
  [Images.START]: require('./start.svg'),
}
