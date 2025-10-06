// Types for localStorage data
export interface ProblemHistory {
  id: string;
  date: string;
  problem: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  difficulty: string;
  problemType: string[];
  attempts: number;
}

export interface ScoreData {
  totalProblems: number;
  correctAnswers: number;
  streak: number;
  lastPlayed: string;
}

export interface MathProblem {
  problem_text: string;
  final_answer: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameStep = 'generate' | 'answer' | 'feedback';
export type ProblemType = 'addition' | 'subtraction' | 'multiplication' | 'division';
