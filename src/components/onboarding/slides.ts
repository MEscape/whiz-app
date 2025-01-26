import { Images, ImageUris } from 'assets/images'

export default [
  {
    description: 'onboarding.welcome.description',
    id: '1',
    image: { dark: ImageUris[Images.LOGO_DARK], light: ImageUris[Images.LOGO_LIGHT] },
    title: 'onboarding.welcome.title',
  },
  {
    description: 'onboarding.features.description',
    id: '2',
    image: ImageUris[Images.PARTY],
    title: 'onboarding.features.title',
  },
  {
    description: 'onboarding.getStarted.description',
    id: '3',
    image: ImageUris[Images.START],
    title: 'onboarding.getStarted.title',
  },
]
