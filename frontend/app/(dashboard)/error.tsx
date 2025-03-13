'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <main className="p-4 md:p-6 min-h-screen container flex justify-center items-center">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold text-red-600">
            Oops, Something Went Wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <p className="text-gray-700 dark:text-gray-300">
            An unexpected error occurred with the app. We apologize for the
            inconvenience.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Please try refreshing the page or click the button below to attempt
            a recovery.
          </p>
          <div className="flex justify-end">
            <Button
              onClick={reset}
              className="mt-4 w-full bg-[#493DB1] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:border-[#493DB1] hover:text-[#493DB1]
                      dark:bg-[#FFFBFB] dark:border-[#141414] dark:text-[#141414] dark:hover:bg-[#212121] dark:hover:text-[#FFFBFB]"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
