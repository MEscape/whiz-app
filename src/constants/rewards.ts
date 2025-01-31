import { TxKeyPath } from '@/i18n'

export interface RewardItem {
  id: string
  requirement: number
  txKeyPath: TxKeyPath
  xp: number
}

export const rewards: RewardItem[] = [
  { id: '1', requirement: 1, txKeyPath: 'rewards.played1Game', xp: 100 },
  { id: '2', requirement: 5, txKeyPath: 'rewards.reachedLevel5', xp: 500 },
  { id: '3', requirement: 10, txKeyPath: 'rewards.played10Games', xp: 750 },
  { id: '4', requirement: 15, txKeyPath: 'rewards.won5Games', xp: 1000 },
  { id: '5', requirement: 20, txKeyPath: 'rewards.reachedLevel10', xp: 1500 },
  { id: '6', requirement: 25, txKeyPath: 'rewards.hosted5Parties', xp: 2000 },
  { id: '7', requirement: 30, txKeyPath: 'rewards.joined10Parties', xp: 2500 },
  { id: '8', requirement: 35, txKeyPath: 'rewards.totalPlaytime10Hours', xp: 3000 },
  { id: '9', requirement: 40, txKeyPath: 'rewards.reachedLevel20', xp: 4000 },
  { id: '10', requirement: 50, txKeyPath: 'rewards.played50Games', xp: 5000 },
  { id: '11', requirement: 60, txKeyPath: 'rewards.won20Games', xp: 6000 },
  { id: '12', requirement: 75, txKeyPath: 'rewards.reachedLevel30', xp: 7500 },
  { id: '13', requirement: 100, txKeyPath: 'rewards.totalPlaytime24Hours', xp: 10000 },
  { id: '14', requirement: 120, txKeyPath: 'rewards.hosted20Parties', xp: 12000 },
  { id: '15', requirement: 150, txKeyPath: 'rewards.joined50Parties', xp: 15000 },
]
