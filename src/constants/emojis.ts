export interface EmojiItem {
  id: string
  emoji: string
  requiredLevel: number
  description: string
}

export const EMOJI_INVENTORY: EmojiItem[] = [
  { description: 'Gamer', emoji: '🎮', id: '1', requiredLevel: 1 },
  { description: 'Dice Master', emoji: '🎲', id: '2', requiredLevel: 2 },
  { description: 'Sharpshooter', emoji: '🎯', id: '3', requiredLevel: 3 },
  { description: 'Party Host', emoji: '🎪', id: '4', requiredLevel: 4 },
  { description: 'Artist', emoji: '🎨', id: '5', requiredLevel: 5 },
  { description: 'Performer', emoji: '🎭', id: '6', requiredLevel: 7 },
  { description: 'Champion', emoji: '🏆', id: '7', requiredLevel: 10 },
  { description: 'Party King', emoji: '👑', id: '8', requiredLevel: 15 },
]
