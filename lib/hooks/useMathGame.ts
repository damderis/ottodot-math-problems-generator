import { useState, useEffect } from 'react';
import { MathProblem, Difficulty, GameStep, ProblemType, ScoreData, ProblemHistory } from '../types';
import { getScoreData, updateScoreData, getProblemHistory, addToProblemHistory } from '../storage';

export const useMathGame = () => {
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [step, setStep] = useState<GameStep>('generate');
  const [error, setError] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [problemType, setProblemType] = useState<ProblemType[]>(['addition', 'subtraction', 'multiplication', 'division']);
  const [scoreData, setScoreData] = useState<ScoreData>({ totalProblems: 0, correctAnswers: 0, streak: 0, lastPlayed: '' });
  const [problemHistory, setProblemHistory] = useState<ProblemHistory[]>([]);

  // Load score and history data on component mount
  useEffect(() => {
    setScoreData(getScoreData());
    setProblemHistory(getProblemHistory());
  }, []);

  const generateProblem = async () => {
    console.log('Generating new math problem...');
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/math-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'generate',
          difficulty,
          problemType
        }),
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Problem generated successfully:', data);
      
      setProblem(data.problem);
      setSessionId(data.sessionId);
      setStep('answer');
      setAttempts(0);
      setUserAnswer('');
      setFeedback('');
      setIsCorrect(null);
      setCorrectAnswer(null);
    } catch (error) {
      console.error('Error generating problem:', error);
      setError('Failed to generate a math problem. Please try again.');
      setProblem(null);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionId) {
      console.error('No session ID available');
      setError('Something went wrong. Please generate a new problem.');
      return;
    }
    
    console.log(`Submitting answer: ${userAnswer} for session: ${sessionId}`);
    setIsLoading(true);
    setError(null);
    
    const numericAnswer = Number(userAnswer);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    try {
      const response = await fetch('/api/math-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'submit',
          sessionId, 
          userAnswer: numericAnswer
        }),
      });
      
      console.log('Submit answer response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Answer submission result:', data);
      
      setIsCorrect(data.isCorrect);
      setFeedback(data.feedback);
      
      if (data.correctAnswer !== undefined) {
        setCorrectAnswer(data.correctAnswer);
      }
      
      if (data.isCorrect || newAttempts >= 3) {
        // Update score and history
        const newScore = updateScoreData(data.isCorrect);
        setScoreData(newScore);
        
        // Add to history
        if (problem) {
          addToProblemHistory({
            id: sessionId || new Date().getTime().toString(),
            date: new Date().toISOString(),
            problem: problem.problem_text,
            userAnswer: numericAnswer,
            correctAnswer: data.correctAnswer || problem.final_answer,
            isCorrect: data.isCorrect,
            difficulty,
            problemType,
            attempts: newAttempts
          });
          setProblemHistory(getProblemHistory());
        }
        
        setStep('feedback');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setError('Failed to submit your answer. Please try again.');
      
      // Fallback to client-side validation if API fails
      if (numericAnswer === problem?.final_answer) {
        setIsCorrect(true);
        setFeedback("Great job! You got it right! Let's see how you solved this problem.");
        setStep('feedback');
      } else {
        if (newAttempts >= 3) {
          setIsCorrect(false);
          setFeedback(`You've used all your attempts. Let's learn how to solve this problem!`);
          setStep('feedback');
        } else {
          setIsCorrect(false);
          setFeedback(`That's not quite right. You have ${3 - newAttempts} more ${3 - newAttempts === 1 ? 'try' : 'tries'} left.`);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetGame = () => {
    setStep('generate');
    setProblem(null);
    setUserAnswer('');
    setFeedback('');
    setAttempts(0);
    setIsCorrect(null);
    setSessionId(null);
    setError(null);
    setCorrectAnswer(null);
  };

  return {
    // State
    problem,
    userAnswer,
    setUserAnswer,
    feedback,
    isLoading,
    sessionId,
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
  };
};
