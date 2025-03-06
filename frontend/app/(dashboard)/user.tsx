'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { User as UserIcon} from 'lucide-react';
import { useUser } from 'context/UserContext';

export function User() {
  const { user, logout } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <UserIcon/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user ? `Hello, ${user?.username}` : 'My Account'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <button
              onClick={logout} // Handle the sign-out process
            >
              Sign Out
            </button>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem>
              <Link href="/login">Sign In</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/register">Sign Up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
