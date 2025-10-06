import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  error: string;
  onDismiss: () => void;
}

export default function ErrorDisplay({ error, onDismiss }: ErrorDisplayProps) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6 text-center">
      <p className="text-red-700">{error}</p>
      <Button 
        onClick={onDismiss} 
        className="mt-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md text-sm"
      >
        Dismiss
      </Button>
    </div>
  );
}
