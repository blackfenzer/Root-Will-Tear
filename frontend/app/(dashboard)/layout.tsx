import Link from 'next/link';
import {
  Home,
  LineChart,
  PanelLeft,
  Settings,
  Users2,
  BrainCircuit,
  Wand
} from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import { User } from './user';
import Providers from './providers';
import { NavItem } from './nav-item';
import { SearchInput } from './search';
import Image from 'next/image';
import { ModeToggle } from '@/components/theme/mode';
import { DialogTitle } from '@radix-ui/react-dialog'; 
import DesktopNav from '@/components/nav/DesktopNav';
// import { useUser } from 'context/UserContext';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-gradient-to-r from-purple-50 to-indigo-50">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <DashboardBreadcrumb />
            <SearchInput />
            <User />
            <ModeToggle />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-gradient-to-r from-purple-50 to-indigo-50">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

// function DesktopNav() {
//   // const { user } = useUser();
//   return (
//     <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
//       <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
//         <Link
//           href="/"
//           className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
//         >
//           <Image
//             src={'/meniscus-tear.jpg'}
//             width={36}
//             height={36}
//             alt="Logo"
//             className="overflow-hidden rounded-full"
//           />
//         </Link>

//         <NavItem href="/" label="Home">
//           <Home className="h-5 w-5" />
//         </NavItem>

//         <NavItem href="/machine" label="Manage Model">
//           <BrainCircuit className="h-5 w-5" />
//         </NavItem>

//         <NavItem href="/prediction" label="Prediction Score">
//           <Wand className="h-5 w-5" />
//         </NavItem>

//         {/* {user?.role === 'admin' && ( */}
//         <NavItem href="/customers" label="Customers">
//           <Users2 className="h-5 w-5" />
//         </NavItem>
//         {/* )} */}

//         <NavItem href="#" label="Analytics">
//           <LineChart className="h-5 w-5" />
//         </NavItem>
//       </nav>
//       <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Link
//               href="#"
//               className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//             >
//               <Settings className="h-5 w-5" />
//               <span className="sr-only">Settings</span>
//             </Link>
//           </TooltipTrigger>
//           <TooltipContent side="right">Settings</TooltipContent>
//         </Tooltip>
//       </nav>
//     </aside>
//   );
// }

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="sm:hidden"
          aria-label="Toggle Navigation Menu"
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>{' '}
          {/* Accessible label for button */}
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="sm:max-w-xs">
        <DialogTitle
          className="hidden"
        >Navigation
        </DialogTitle>

        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label="Go to Dashboard"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/machine"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label="Manage Model"
          >
            <BrainCircuit className="h-5 w-5" />
            Manage Model
          </Link>

          <Link
            href="/prediction"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label="Go to Prediction"
          >
            <Wand className="h-5 w-5" />
            Prediction
          </Link>

          <Link
            href="/customers"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label="View Customers"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>

          {/* Optionally, if you decide to add other menu items later */}
          {/* <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            aria-label="Go to Settings"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Products</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
