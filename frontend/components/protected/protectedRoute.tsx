'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from 'context/UserContext';
import Loading from 'app/loading';

const PUBLIC_PATHS = ['/', '/login', '/register'];
const ADMIN_PROTECTED_PATH = '/users';
const AUTH_PROTECTED_PATHS = ['/machine', '/prediction'];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, fetchUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchUser(); // Always try to get the latest user info
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const handleNavigation = (path: string) => {
      if (pathname !== path) {
        router.push(path);
      }
    };

    // Allow public paths
    if (PUBLIC_PATHS.includes(pathname)) {
      // If user is logged in, redirect them away from login/register
      if (user && (pathname === '/login' || pathname === '/register')) {
        handleNavigation('/');
      }
      return;
    }

    // Redirect unauthenticated users from protected paths
    if (!user && AUTH_PROTECTED_PATHS.includes(pathname)) {
      handleNavigation('/login');
      return;
    }

    // Redirect non-admins from admin-only paths
    if (pathname.startsWith(ADMIN_PROTECTED_PATH) && user?.role !== 'admin') {
      handleNavigation('/');
    }
  }, [pathname, user, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
