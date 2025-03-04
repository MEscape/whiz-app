export const playTypesIcon = {
  1: 'albums',
  2: 'analytics',
  3: 'chatbubbles',
  4: 'clipboard',
}

export const playTypesName = {
  1: 'info.symbol.album',
  2: 'info.symbol.analytic',
  3: 'info.symbol.chatbubble',
  4: 'info.symbol.clipboard',
}

export type PlayTypes = keyof typeof playTypesIcon
