export enum Animations {
  LEVEL_UP = 'LEVEL_UP',
  CREATED = 'CREATED',
}

export const AnimationUris = {
  [Animations.LEVEL_UP]: require('./confetti.json'),
  [Animations.CREATED]: require('./created.json'),
}
