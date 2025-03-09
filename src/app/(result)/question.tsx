import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'
import { translate } from '@/i18n'
import { sendData } from '@/services'

import { Animations, AnimationUris } from 'assets/animations'

import { Animation } from 'blueprints/Animation'
import { Button } from 'blueprints/Button'

import { AnswerList, ResultHeader } from '@/components/result'
import { Codes } from '@/services/Codes'
import { ResponseObject } from '@/services/controllers/LobbyController'
import TcpEventManager from '@/services/TcpEventManager'

type AnswerType = { success: boolean; selection: string }

interface QuestionAnswerType {
  answer: AnswerType
  userId: string
}

const QuestionResultScreen = observer(() => {
  const { gameStore } = useAppContext()
  const [answers, setAnswers] = useState<QuestionAnswerType[]>([])

  const [showSolution, setShowSolution] = useState(false)
  const [isShowingSolution, setIsShowingSolution] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const mySelection = gameStore.myUser.answer.selection

  useEffect(() => {
    sendData({ body: gameStore.myUser.answer, method: 'POST', path: '/question' })

    const handleData = (response: ResponseObject) => {
      if (response.code === Codes.QUESTION_ANSWER) {
        console.log('Setting Question Answers', response.data)
        setAnswers(response.data)
      }

      if (response.code === Codes.SHOW_SOLUTION_QUESTION) {
        console.log('Showing Answer Solutions')
        setShowSolution(true)
        setIsShowingSolution(true)
        setIsLoading(false)
      }
    }

    TcpEventManager.on('data', handleData)

    return () => {
      TcpEventManager.off('data', handleData)
    }
  }, [gameStore.myUser.answer])

  const groupedAnswers = useMemo(() => {
    return answers?.reduce(
      (
        acc: { [key: string]: { total: number; users: string[] } },
        { answer, userId }: QuestionAnswerType,
      ) => {
        const { selection } = answer
        if (!acc[selection]) {
          acc[selection] = { total: 0, users: [] }
        }
        acc[selection].users.push(userId)
        acc[selection].total++
        return acc
      },
      {},
    )
  }, [answers])

  useHeader(
    {
      className: 'h-48 w-full',
      FullActionComponent: <ResultHeader />,
    },
    [],
  )

  const handlePress = () => {
    setIsLoading(true)

    if (showSolution) {
      sendData({ body: { route: '/(result)/ranking' }, method: 'POST', path: '/force' })
    } else {
      sendData({ method: 'PUT', path: '/question' })
    }
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-primary">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 10,
          }}
          showsVerticalScrollIndicator={false}>
          <AnswerList
            answers={groupedAnswers}
            totalAnswers={answers.length}
            mySelection={mySelection}
            showSolution={showSolution}
            answerOptions={gameStore.collection.currentStage.answers}
            solution={gameStore.collection.currentStage.solution}
          />
        </ScrollView>
        <Button
          outerClassName="flex-1 p-4"
          className="h-12"
          isLoading={isLoading}
          onPress={handlePress}
          disabled={!gameStore.isHost}>
          {showSolution
            ? translate('game.goRanking')
            : `${answers.length} / ${gameStore.users.size} ${translate('game.submissions')}`}
        </Button>
      </SafeAreaView>
      {isShowingSolution && (
        <Animation
          source={AnimationUris[Animations.CONTINUE]}
          className="h-56 w-56"
          stopFrame={76}
          onAnimationFinish={() => setIsShowingSolution(false)}
        />
      )}
    </>
  )
})

export default QuestionResultScreen
