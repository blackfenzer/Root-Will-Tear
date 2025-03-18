'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import {
  Home,
  PanelLeft,
  Users2,
  BrainCircuit,
  Wand
} from 'lucide-react';
import { useUser } from 'context/UserContext';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false); // State to manage the open/close state of the sheet
  const { user } = useUser();

  const handleLinkClick = () => {
    setIsOpen(false); // Close the sheet when a link is clicked
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="sm:hidden"
          aria-label="Toggle Navigation Menu"
          onClick={() => setIsOpen(!isOpen)} // Toggle the menu on button click
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>{' '}
          {/* Accessible label for button */}
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="sm:max-w-xs">
        <DialogTitle className="hidden">Navigation</DialogTitle>
        <DialogTitle className="hidden">Navigation</DialogTitle>

        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label="Go to Dashboard"
            onClick={handleLinkClick} // Close the menu when clicked
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/machine"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label="Manage Model"
            onClick={handleLinkClick} // Close the menu when clicked
          >
            <BrainCircuit className="h-5 w-5" />
            Manage Model
          </Link>

          <Link
            href="/prediction"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label="Go to Prediction"
            onClick={handleLinkClick} // Close the menu when clicked
          >
            <Wand className="h-5 w-5" />
            Prediction
          </Link>
          
          {user?.role === 'admin' && (
            <Link
              href="/users"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              aria-label="View Users"
              onClick={handleLinkClick} // Close the menu when clicked
            >
              <Users2 className="h-5 w-5" />
              Users
            </Link>
          )}
          {/* Optionally, if you decide to add other menu items later */}
          {/* <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label="Go to Settings"
            onClick={handleLinkClick} // Close the menu when clicked
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}