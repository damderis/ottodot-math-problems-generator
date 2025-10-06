import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MathProblem } from "@/lib/types";

interface AnswerStepProps {
  problem: MathProblem;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  submitAnswer: (e: React.FormEvent) => void;
  attempts: number;
  feedback: string;
  isCorrect: boolean | null;
  isLoading: boolean;
}

export default function AnswerStep({
  problem,
  userAnswer,
  setUserAnswer,
  submitAnswer,
  attempts,
  feedback,
  isCorrect,
  isLoading
}: AnswerStepProps) {
  return (
    <Card className="border-4 border-green-300 bg-white shadow-xl mb-6">
      <CardHeader className="bg-green-100 rounded-t-lg pb-2">
        <CardTitle className="text-2xl text-center text-green-700">Solve the Problem</CardTitle>
        <CardDescription className="text-center text-green-600">
          You have {3 - attempts} {3 - attempts === 1 ? 'try' : 'tries'} left
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-4 px-6">
        <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200 mb-6">
          <p className="text-lg text-gray-800 leading-relaxed font-medium">
            {problem.problem_text}
          </p>
        </div>
        
        <form onSubmit={submitAnswer} className="space-y-4">
          <div>
            <label htmlFor="answer" className="block text-lg font-medium text-gray-700 mb-2">
              Your Answer:
            </label>
            <Input
              type="number"
              id="answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="text-lg py-6 text-center"
              placeholder="Type your answer here"
              required
              disabled={isLoading}
            />
          </div>
          
          {feedback && !isCorrect && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 text-center">
              <p className="text-orange-700">{feedback}</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button
          onClick={submitAnswer}
          disabled={!userAnswer || isLoading}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all hover:shadow-xl relative"
        >
          {isLoading ? (
            <>
              <span className="opacity-0">Check Answer</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </>
          ) : 'Check Answer'}
        </Button>
      </CardFooter>
    </Card>
  );
}
