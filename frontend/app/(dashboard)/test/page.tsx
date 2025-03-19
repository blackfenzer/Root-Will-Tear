'use client';

import { useState } from 'react';
import Error from '../error';
import { Button } from '@/components/ui/button';

export default function ErrorDemoPage() {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true);
  };

  const resetError = () => {
    setHasError(false);
  };

  if (hasError) {
    return <Error error={{ name: 'DemoError', message: 'Demo Error' }} reset={resetError} />;
  }

  return (
    <main className="p-4 md:p-6 min-h-screen container flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Error Demo Page</h1>
        <p className="text-lg mb-4">Click the button below to simulate an error.</p>
        <Button onClick={throwError} className="bg-blue-600 text-white hover:bg-blue-800">
          Trigger Error
        </Button>
      </div>
    </main>
  );
}