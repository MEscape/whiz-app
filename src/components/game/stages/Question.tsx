import React from 'react'
import { ScrollView, View } from 'react-native'

import { playTypesIcon, playTypesName } from '@/constants'
import { useAppContext } from '@/context'
import { translate } from '@/i18n'

import { Icon } from 'blueprints/Icon'
import { Text } from 'blueprints/Text'

import { Selector } from '../../Selector'

export interface QuestionProps {
  type: string
  name: string
  answers: string[]
  solution: number
  id: string
}

export const Question = ({ stage }: { stage: QuestionProps }) => {
  const { gameStore, router } = useAppContext()

  const handleSubmit = (success: boolean, selection: string) => {
    router.push('/(result)/question')
    gameStore.myUser?.setAnswer({ selection, success })
  }

  return (
    <ScrollView
      className="flex-1 p-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Text variant="h1" text={stage.name} />
      <View className="flex-row items-center gap-x-2 py-2">
        <Text
          variant="h3"
          textColor="text-accent"
          text={`${translate('common.category')} - ${translate(playTypesName[stage.type])}`}
        />
        <Icon name={playTypesIcon[stage.type]} library="Ionicons" color="text-accent" />
      </View>
      <View className="h-36 my-8">
        <Selector answers={stage.answers} solution={stage.solution} onSubmit={handleSubmit} />
      </View>
    </ScrollView>
  )
}
