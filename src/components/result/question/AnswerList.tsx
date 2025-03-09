import React from 'react'

import AnswerBar from './AnswerBar'

interface AnswerListProps {
  answers: { [key: string]: { total: number; users: string[] } }
  totalAnswers: number
  mySelection: string
  showSolution: boolean
  answerOptions: string[]
  solution: number
}

export const AnswerList: React.FC<AnswerListProps> = ({
  answerOptions,
  answers,
  mySelection,
  showSolution,
  solution,
  totalAnswers,
}) => {
  return (
    <>
      {answerOptions.map((answer, index) => {
        const totalUsers = answers?.[answer]?.total || 0
        const percentage = totalUsers > 0 ? (totalUsers / totalAnswers) * 100 : 0

        return (
          <AnswerBar
            key={index}
            answer={answer}
            percentage={percentage}
            totalUsers={totalUsers}
            mySelection={mySelection}
            success={solution === index}
            showSolution={showSolution}
          />
        )
      })}
    </>
  )
}
