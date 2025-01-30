import { vars } from 'nativewind'

export const blackGradient: readonly [string, string, ...string[]] = [
  'rgba(0,0,0,0)',
  'rgba(0,0,0,0.5)',
  'rgba(0,0,0,0.8)',
  'rgba(0,0,0,0.9)',
  'rgba(0,0,0,0.9)',
  'rgba(0,0,0,1)',
]

export const progressGradient: readonly [string, string, ...string[]] = [
  '#62a399',
  '#7ab5ac',
  '#8ec7be',
  '#a1d9d0',
]

export const progressGradientDark: readonly [string, string, ...string[]] = [
  '#4a8177',
  '#62a399',
  '#7ab5ac',
  '#8ec7be',
]

export type ThemeData = {
  '--primary': string
  '--secondary': string
  '--text': string
}

export const themes = {
  dark: vars<ThemeData>({
    '--primary': '#FFFFFF',
    '--secondary': '#e7e3e3',
    '--text': '#2d2c2c',
  }),
  light: vars<ThemeData>({
    '--primary': '#121212',
    '--secondary': '#2d2c2c',
    '--text': '#FFFFFF',
  }),
}
