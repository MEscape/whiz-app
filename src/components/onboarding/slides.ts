import { OnboardingItemProps } from '@/components'

import { Images, ImageUris } from 'assets/images'

const slides: OnboardingItemProps[] = [
  {
    description: 'onboarding.welcome.description',
    id: '1',
    image: { dark: ImageUris[Images.LOGO_DARK], light: ImageUris[Images.LOGO_LIGHT] },
    title: 'onboarding.welcome.title',
  },
  {
    description: 'onboarding.features.description',
    id: '2',
    image: { dark: ImageUris[Images.PARTY], light: ImageUris[Images.PARTY] }, // Add the dark and light properties
    title: 'onboarding.features.title',
  },
  {
    description: 'onboarding.getStarted.description',
    id: '3',
    image: { dark: ImageUris[Images.START], light: ImageUris[Images.START] }, // Add the dark and light properties
    title: 'onboarding.getStarted.title',
  },
]

export default slides
