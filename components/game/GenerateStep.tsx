"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Difficulty, ProblemType } from "@/lib/types";
import Image from "next/image";

interface GenerateStepProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  problemType: ProblemType[];
  setProblemType: (types: ProblemType[]) => void;
  generateProblem: () => void;
  isLoading: boolean;
}

export default function GenerateStep({
  difficulty,
  setDifficulty,
  problemType,
  setProblemType,
  generateProblem,
  isLoading
}: GenerateStepProps) {
  return (
    <Card className="border-4 border-blue-300 bg-white shadow-xl mb-6 transform transition-all">
      <CardHeader className="bg-blue-100 rounded-t-lg pb-2">
        <CardTitle className="text-2xl text-center text-blue-700">Ready for a Challenge?</CardTitle>
        <CardDescription className="text-center text-blue-600">Click the button to start your math adventure!</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-4 px-6">
        <div className="flex justify-center">
          <Image 
            src="/book-brain.png" 
            alt="Math Adventure" 
            width={128}
            height={128}
            className="mb-4"
            priority={false}
          />
        </div>
        <p className="text-center text-gray-700 mb-4">
          Get ready to solve exciting math problems and become a math champion!
        </p>
        
        {/* Difficulty Selection */}
        <div className="mb-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Choose Difficulty:</h3>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
              <Button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 rounded-full capitalize ${
                  difficulty === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Problem Type Selection */}
        <div className="mb-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Problem Types:</h3>
          <div className="grid grid-cols-2 gap-2 justify-center">
            {(['addition', 'subtraction', 'multiplication', 'division'] as ProblemType[]).map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={type}
                  checked={problemType.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setProblemType([...problemType, type]);
                    } else {
                      // Ensure at least one type is selected
                      if (problemType.length > 1) {
                        setProblemType(problemType.filter((t) => t !== type));
                      }
                    }
                  }}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor={type} className="capitalize text-gray-700">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button 
          onClick={generateProblem}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all hover:shadow-xl relative"
        >
          {isLoading ? (
            <>
              <span className="opacity-0">Start Adventure!</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </>
          ) : 'Start Adventure!'}
        </Button>
      </CardFooter>
    </Card>
  );
}
