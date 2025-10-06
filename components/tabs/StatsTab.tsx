import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreData } from "@/lib/types";

interface StatsTabProps {
  scoreData: ScoreData;
}

export default function StatsTab({ scoreData }: StatsTabProps) {
  return (
    <Card className="border-4 border-pink-300 bg-white shadow-xl mb-6">
      <CardHeader className="bg-pink-100 rounded-t-lg pb-2">
        <CardTitle className="text-2xl text-center text-pink-700">Your Stats</CardTitle>
        <CardDescription className="text-center text-pink-600">
          Track your math progress
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-4 px-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 text-center">
            <p className="text-blue-700 text-sm font-medium">Problems Solved</p>
            <p className="text-3xl font-bold text-blue-800">{scoreData.totalProblems}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200 text-center">
            <p className="text-green-700 text-sm font-medium">Correct Answers</p>
            <p className="text-3xl font-bold text-green-800">{scoreData.correctAnswers}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200 text-center">
            <p className="text-purple-700 text-sm font-medium">Current Streak</p>
            <p className="text-3xl font-bold text-purple-800">{scoreData.streak}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200 text-center">
            <p className="text-yellow-700 text-sm font-medium">Accuracy</p>
            <p className="text-3xl font-bold text-yellow-800">
              {scoreData.totalProblems > 0 
                ? Math.round((scoreData.correctAnswers / scoreData.totalProblems) * 100) 
                : 0}%
            </p>
          </div>
        </div>
        
        {scoreData.lastPlayed && (
          <p className="text-center text-gray-500 text-sm">
            Last played: {new Date(scoreData.lastPlayed).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
