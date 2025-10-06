import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MathProblem } from "@/lib/types";

interface FeedbackStepProps {
  problem: MathProblem | null;
  isCorrect: boolean | null;
  correctAnswer: number | null;
  feedback: string;
  resetGame: () => void;
  isLoading: boolean;
}

export default function FeedbackStep({
  problem,
  isCorrect,
  correctAnswer,
  feedback,
  resetGame,
  isLoading
}: FeedbackStepProps) {
  return (
    <Card className={`border-4 ${isCorrect ? 'border-purple-300' : 'border-orange-300'} bg-white shadow-xl mb-6`}>
      <CardHeader className={`${isCorrect ? 'bg-purple-100' : 'bg-orange-100'} rounded-t-lg pb-2`}>
        <CardTitle className={`text-2xl text-center ${isCorrect ? 'text-purple-700' : 'text-orange-700'}`}>
          {isCorrect ? '🎉 Awesome Job! 🎉' : 'Let\'s Learn Together'}
        </CardTitle>
        <CardDescription className={`text-center ${isCorrect ? 'text-purple-600' : 'text-orange-600'}`}>
          {isCorrect ? 'You solved the problem correctly!' : 'Here\'s how to solve this problem'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-4 px-6">
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 mb-6">
          <p className="text-lg text-gray-800 leading-relaxed">
            {problem?.problem_text}
          </p>
          <div className="mt-4 pt-4 border-t-2 border-blue-200">
            <p className="font-bold text-blue-800">Solution:</p>
            <p className="text-gray-800">
              {correctAnswer !== null 
                ? `The correct answer is ${correctAnswer}. ${feedback}`
                : feedback || "Let's practice more to improve your math skills!"}
            </p>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
          <h3 className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-yellow-700'} mb-2`}>
            {isCorrect ? 'Great work!' : 'Keep practicing!'}
          </h3>
          <p className="text-gray-700">
            {isCorrect 
              ? "You're becoming a math champion! Ready for another challenge?" 
              : "Math takes practice. Let's try another problem to help you learn!"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button
          onClick={resetGame}
          disabled={isLoading}
          className={`${isCorrect ? 'bg-purple-600 hover:bg-purple-700' : 'bg-orange-600 hover:bg-orange-700'} text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all hover:shadow-xl`}
        >
          Try Another Problem
        </Button>
      </CardFooter>
    </Card>
  );
}
