export enum Animations {
  LEVEL_UP = 'LEVEL_UP',
  CREATED = 'CREATED',
  CONTINUE = 'CONTINUE',
}

export const AnimationUris = {
  [Animations.LEVEL_UP]: require('./confetti.json'),
  [Animations.CREATED]: require('./created.json'),
  [Animations.CONTINUE]: require('./continue.json'),
}
