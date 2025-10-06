import { ProblemHistory, ScoreData } from './types';

// Utility functions for localStorage
export const getScoreData = (): ScoreData => {
  if (typeof window === 'undefined') return { totalProblems: 0, correctAnswers: 0, streak: 0, lastPlayed: '' };
  
  const data = localStorage.getItem('mathGameScore');
  return data ? JSON.parse(data) : { totalProblems: 0, correctAnswers: 0, streak: 0, lastPlayed: '' };
};

export const updateScoreData = (isCorrect: boolean) => {
  const currentScore = getScoreData();
  const newScore = {
    totalProblems: currentScore.totalProblems + 1,
    correctAnswers: isCorrect ? currentScore.correctAnswers + 1 : currentScore.correctAnswers,
    streak: isCorrect ? currentScore.streak + 1 : 0,
    lastPlayed: new Date().toISOString()
  };
  
  localStorage.setItem('mathGameScore', JSON.stringify(newScore));
  return newScore;
};

export const getProblemHistory = (): ProblemHistory[] => {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem('mathGameHistory');
  return data ? JSON.parse(data) : [];
};

export const addToProblemHistory = (problem: ProblemHistory) => {
  const history = getProblemHistory();
  const newHistory = [problem, ...history].slice(0, 20); // Keep only the last 20 problems
  localStorage.setItem('mathGameHistory', JSON.stringify(newHistory));
  return newHistory; // Return the updated history for state updates
};
