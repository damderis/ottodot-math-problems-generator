'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMathGame } from "@/lib/hooks/useMathGame"
import GenerateStep from "@/components/game/GenerateStep"
import AnswerStep from "@/components/game/AnswerStep"
import FeedbackStep from "@/components/game/FeedbackStep"
import HistoryTab from "@/components/tabs/HistoryTab"
import StatsTab from "@/components/tabs/StatsTab"
import ErrorDisplay from "@/components/ui/ErrorDisplay"

export default function Home() {
  
  const {
    // State
    problem,
    userAnswer,
    setUserAnswer,
    feedback,
    isLoading,
    isCorrect,
    attempts,
    step,
    error,
    setError,
    correctAnswer,
    difficulty,
    setDifficulty,
    problemType,
    setProblemType,
    scoreData,
    problemHistory,
    
    // Actions
    generateProblem,
    submitAnswer,
    resetGame,
  } = useMathGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-50 py-8">
      <main className="container mx-auto px-4 max-w-md">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-2">
            Math Adventure
          </h1>
          <p className="text-center text-gray-600">Solve fun math problems!</p>
        </div>
        
        <Tabs defaultValue="game" className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="game">Play</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="game">
            {/* Error message display */}
            {error && (
              <ErrorDisplay error={error} onDismiss={() => setError(null)} />
            )}
            
            {step === 'generate' && (
              <GenerateStep
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                problemType={problemType}
                setProblemType={setProblemType}
                generateProblem={generateProblem}
                isLoading={isLoading}
              />
            )}

            {step === 'answer' && problem && (
              <AnswerStep
                problem={problem}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
                submitAnswer={submitAnswer}
                attempts={attempts}
                feedback={feedback}
                isCorrect={isCorrect}
                isLoading={isLoading}
              />
            )}

            {step === 'feedback' && (
              <FeedbackStep
                problem={problem}
                isCorrect={isCorrect}
                correctAnswer={correctAnswer}
                feedback={feedback}
                resetGame={resetGame}
                isLoading={isLoading}
              />
            )}
          </TabsContent>
          
          <TabsContent value="history">
            <HistoryTab problemHistory={problemHistory} />
          </TabsContent>
          
          <TabsContent value="stats">
            <StatsTab scoreData={scoreData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}