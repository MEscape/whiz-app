import { Platform } from 'react-native'

import {version} from '../../package.json'

const isAndroid = Platform.OS === 'android'
const isIOS = Platform.OS === 'ios'
const isWeb = Platform.OS === 'web'
const isMac = Platform.OS === 'macos'
const isWindows = Platform.OS === 'windows'

export { isAndroid, isIOS, isWeb, isMac, isWindows, Platform, version }