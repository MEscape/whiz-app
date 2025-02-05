export enum Data {
    DE_CLASSIC_CHAOS = 'DE_CLASSIC_CHAOS',
    DE_DISORDERLY = 'DE_DISORDERLY',
    DE_SURVIVAL = 'DE_SURVIVAL',
    EN_CLASSIC_CHAOS = 'EN_CLASSIC_CHAOS',
    EN_DISORDERLY = 'EN_DISORDERLY',
    EN_SURVIVAL = 'EN_SURVIVAL'
  }
  
  export const DataUris = {
    //DE
    [Data.DE_CLASSIC_CHAOS]: require('./de-classic-chaos.json'),
    [Data.DE_DISORDERLY]: require('./de-disorderly.json'),
    [Data.DE_SURVIVAL]: require('./de-survival.json'),

    //EN
    [Data.EN_CLASSIC_CHAOS]: require('./en-classic-chaos.json'),
    [Data.EN_DISORDERLY]: require('./en-disorderly.json'),
    [Data.EN_SURVIVAL]: require('./en-survival.json'),
  }
  