import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'

import { playTypesIcon, playTypesName } from '@/constants'
import { useAppContext } from '@/context'
import { EnemyState } from '@/hooks'
import { translate } from '@/i18n'

import { Button } from 'blueprints/Button'
import { Icon } from 'blueprints/Icon'
import { Text } from 'blueprints/Text'

interface QuestionProps {
  type: string
  name: string
  answers: string[]
  solution: number
  id: string
}

export const Challenge = ({ enemy, stage }: { stage: QuestionProps; enemy: EnemyState }) => {
  const { userStore } = useAppContext()

  useEffect(() => {
    console.log(enemy)
  }, [enemy])

  return (
    <ScrollView
      className="flex-1 p-4"
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
      <View className="h-36 my-8 flex-row gap-x-2">
        <Button
          variant="tertiary"
          text={userStore.username}
          className="flex-1"
          outerClassName="flex-1"
        />
        <Button
          variant="tertiary"
          text={enemy.username}
          className="flex-1"
          outerClassName="flex-1"
          isLoading={enemy.id === null}
          disabled={enemy.id === null || enemy.id.length === 0}
        />
      </View>
    </ScrollView>
  )
}
