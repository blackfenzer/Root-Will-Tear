import Image from 'next/image';
import {
  BrainCircuit,
  Wand
} from 'lucide-react';

export default async function ProductsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">How to Use</h1>

      <div className="text-2xl font-semibold mb-6 flex items-center gap-4">
        <BrainCircuit className="h-8 w-8" />
        Manage Model
      </div>
      <div className="space-y-6">
        <div className="flex justify-center">
          <Image
            src="/tutorial-model-training.png"
            width={1780}
            height={500}
            alt="Model Training Tutorial"
            className="rounded-lg"
          />
        </div>
  
        <div className="text-2xl font-semibold mb-6 flex items-center gap-4">
          <Wand className="h-8 w-8" />
          Prediction Score
        </div>
        <div className="flex justify-center">
          <Image
            src="/tutorial-score-prediction.png"
            width={1780}
            height={500}
            alt="Score Prediction Tutorial"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );  
}
