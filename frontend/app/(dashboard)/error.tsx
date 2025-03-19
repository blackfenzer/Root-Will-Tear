'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto p-6 flex flex-col items-center justify-start min-h-screen pt-32 text-center">
      <h1 className="text-3xl font-bold">Oops.. something went wrong</h1>
      <p className="text-gray-700 dark:text-gray-300 mt-4">
        An unexpected error occurred with the app. We apologize for the
        inconvenience.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Please try refreshing the page or click the button below to attempt
        a recovery.
      </p>
      <Button
        onClick={reset}
        className="mt-6 w-full max-w-xs bg-[#141414] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:border-[#141414] hover:text-[#141414]
                dark:bg-[#FFFBFB] dark:border-[#141414] dark:text-[#141414] dark:hover:bg-[#212121] dark:hover:text-[#FFFBFB]"
        variant="outline"
      >
        Refresh Page
      </Button>
    </main>
  );
}
