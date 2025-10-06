import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProblemHistory } from "@/lib/types";

interface HistoryTabProps {
  problemHistory: ProblemHistory[];
}

export default function HistoryTab({ problemHistory }: HistoryTabProps) {
  return (
    <Card className="border-4 border-indigo-300 bg-white shadow-xl mb-6">
      <CardHeader className="bg-indigo-100 rounded-t-lg pb-2">
        <CardTitle className="text-2xl text-center text-indigo-700">Problem History</CardTitle>
        <CardDescription className="text-center text-indigo-600">
          Your recent math problems
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-4 px-6">
        {problemHistory.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No problem history yet. Start solving problems!</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {problemHistory.map((item) => (
              <div 
                key={item.id} 
                className={`p-3 rounded-lg border-2 ${item.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
              >
                <p className="text-gray-700 mb-2">{item.problem}</p>
                <div className="flex justify-between text-sm">
                  <span className={item.isCorrect ? 'text-green-600' : 'text-red-600'}>
                    {item.isCorrect ? 'Correct' : 'Incorrect'} • {item.attempts} {item.attempts === 1 ? 'attempt' : 'attempts'}
                  </span>
                  <span className="text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
