import { OnboardingItemProps } from '@/components'

import { Images, ImageUris } from 'assets/images'

const slides: OnboardingItemProps[] = [
  {
    description: 'onboarding.welcome.description',
    id: '1',
    image: { dark: ImageUris[Images.LOGO_LIGHT], light: ImageUris[Images.LOGO_DARK] },
    title: 'onboarding.welcome.title',
  },
  {
    description: 'onboarding.features.description',
    id: '2',
    image: ImageUris[Images.PARTY],
    title: 'onboarding.features.title',
  },
  {
    description: 'onboarding.data.description',
    id: '3',
    image: ImageUris[Images.DATA],
    title: 'onboarding.data.title',
  },
  {
    description: 'onboarding.getStarted.description',
    id: '4',
    image: ImageUris[Images.START],
    title: 'onboarding.getStarted.title',
  },
]

export default slides
