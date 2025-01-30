export interface EmojiItem {
  id: string
  emoji: string
  requiredLevel: number
  description: string
}

export const EMOJI_INVENTORY: EmojiItem[] = [
  { id: '1', emoji: '🎮', requiredLevel: 1, description: 'Gamer' },
  { id: '2', emoji: '🎲', requiredLevel: 2, description: 'Dice Master' },
  { id: '3', emoji: '🎯', requiredLevel: 3, description: 'Sharpshooter' },
  { id: '4', emoji: '🎪', requiredLevel: 4, description: 'Party Host' },
  { id: '5', emoji: '🎨', requiredLevel: 5, description: 'Artist' },
  { id: '6', emoji: '🎭', requiredLevel: 7, description: 'Performer' },
  { id: '7', emoji: '🏆', requiredLevel: 10, description: 'Champion' },
  { id: '8', emoji: '👑', requiredLevel: 15, description: 'Party King' },
] 