import { Codes } from '@/services/Codes'

const en = {
  alert: {
    delete: 'Confirm Deletion',
    deleteReminder: 'Are you sure you want to delete {{itemName}}?',
  },
  collection: {
    classicChaos: 'Classic Chaos',
    create: 'Create Collection',
    disorderly: 'Drunk & Disorderly',
    noContent: 'The collection has no content.',
    own: 'Own Collections',
    served: 'Served Collections',
    survival: 'Survival Mode',
  },
  common: {
    cancel: 'Cancel',
    category: 'Category',
    collect: 'Collect',
    create: 'Create',
    elements: 'Elements',
    games: 'Spiele',
    guess: 'Guess',
    join: 'Join',
    left: 'left',
    me: 'Me',
    points: 'Points',
    start: 'Start lobby',
    submit: 'Submit',
  },
  error: {
    invalid_characters: 'Invalid characters',
    less: 'Too few characters',
    openLink: 'Error while opening the link',
    unableConnect: 'Unable to join lobby',
    unexpected: 'Unexpected error',
    [Codes.USER_NOT_FOUND]: 'User could not be found',
    [Codes.LOBBY_NOT_FOUND]: 'Lobby could not be found',
    [Codes.UNEXPECTED_ERROR]: 'Unexpected error',
    [Codes.IMAGE_NOT_FOUND]: 'Image could not be found',
    [Codes.TOO_MANY_USERS]: 'Too many users in the lobby (16/16)',
    [Codes.ROUTE_NOT_FOUND]: 'Unknown Route',
    [Codes.GAME_ALREADY_STARTED]: 'The already started',
  },
  explain: {
    winRate: 'This value refers to the current session.',
    winRateOverall: 'This value refers to all sessions.',
  },
  game: {
    achievements: 'My achievements',
    goRanking: 'Continue to ranking',
    noEnemy: 'No Enemy',
    submissions: 'Submissions',
    yourRank: 'Your Rank',
  },
  info: {
    symbol: {
      album: 'Normal Questions',
      analytic: 'Guess questions',
      chatbubble: 'Vote for the best answer',
      clipboard: 'Tasks',
    },
    symbols: 'What do the symbols mean?',
  },
  lobby: {
    join: 'Join Lobby',
  },
  onboarding: {
    data: {
      description: "Let's get started add a username and a profile picture!",
      title: 'Personalize Your Profile',
    },
    features: {
      description:
        'Discover amazing features crafted to make your parties unforgettable. Create lobbies, play minigames, and enjoy competitive fun!',
      title: 'Exciting Features',
    },
    getStarted: {
      description:
        "Ready to dive in? Create or join lobbies, play games, and make unforgettable memories with friends. Let's get started!",
      title: "Let's Start the Party!",
    },
    welcome: {
      description:
        'Welcome to Whiz, the ultimate party experience where fun, challenges, and excitement come together! Let the games begin.',
      title: 'Welcome to Whiz!',
    },
  },
  permissions: {
    chosePhoto: 'Permission to access the gallery is required!',
  },
  placeholder: {
    answer: 'Answer option',
    bestAnswer: 'Type in your best idea',
    collectionName: 'Name of collection',
    guess: 'Give your guess',
    lobbyId: 'Type in Lobby-ID',
    search: 'Search for elements',
    solution: 'Type in solution',
    taskName: 'Name of the element',
    username: 'Username',
  },
  profile: {
    availableRewards: 'Available Rewards',
    imageOptions: 'Profile Image Options',
    inventory: 'Inventory',
    newImage: 'Take New Photo',
    removeImage: 'Remove Photo',
    stats: {
      gamesPlayed: 'Games Played',
      loses: 'Loses',
      partiesHosted: 'Parties Hosted',
      playTime: 'Play Time',
      title: 'Party Stats',
      winRate: 'Win rate',
      winRateOverall: 'Overall win rate',
      wins: 'Wins',
    },
  },
  pushNotifications: {
    message: [
      'Enjoy the Friday night to the fullest!',
      "Let's kick off the weekend with a party!",
      'Time to celebrate and relax for the weekend.',
      'Ready for an unforgettable weekend?',
    ],
    title: ['Friday Night!', "Let's Party!", 'Weekend Vibes', "It's Party Time!"],
  },
  rewards: {
    hosted5Parties: 'Hosted 5 parties',
    hosted20Parties: 'Hosted 20 parties',
    joined10Parties: 'Joined 10 parties',
    joined50Parties: 'Joined 50 parties',
    played1Game: 'Played 1 game',
    played10Games: 'Played 10 games',
    played50Games: 'Played 50 games',
    reachedLevel5: 'Reached level 5',
    reachedLevel10: 'Reached level 10',
    reachedLevel20: 'Reached level 20',
    reachedLevel30: 'Reached level 30',
    totalPlaytime10Hours: 'Total playtime: 10 hours',
    totalPlaytime24Hours: 'Total playtime: 24 hours',
    won5Games: 'Won 5 games',
    won20Games: 'Won 20 games',
  },
  settings: {
    audio: 'Audio settings',
    audioPlayback: 'Audio Playback',
    authorization: 'Check authorizations',
    color: 'Change color scheme',
    graphical: 'Graphical settings',
    language: 'Change language',
    music: 'Music volume',
    notifications: 'Notifications',
    shareApp: 'Share App',
    sound: 'Effects volume',
  },
  success: {
    delete: 'Successfully deleted {{itemName}}',
  },
  tabs: {
    collections: 'Collections',
    home: 'Start',
    lobby: 'Lobby',
    profile: 'Profile',
    ranking: 'Placement',
    result: 'Result',
    settings: 'Settings',
  },
  task: {
    creator: 'Create new element',
  },
  whiz: {
    sentences: [
      "Welcome, party people – it's going to be a legendary night!",
      'Get ready for a night full of fun and surprises!',
      "Grab your drink and let's make this night unforgettable!",
      'The night is young and the possibilities are endless – enjoy every minute!',
    ],
    share: 'Check out this awesome app! - WHIZ - We have always time for partying!',
    slogan: 'We always have time to celebrate',
  },
}

export default en
export type Translations = typeof en
