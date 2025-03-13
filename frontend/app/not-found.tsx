// app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFoundPage() {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
      <Card className="max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="text-gray-700 dark:text-gray-300">
            Oops! The page you’re looking for doesn’t exist.
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            It might have been moved or removed.
          </p>
          <div className="mt-6">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
