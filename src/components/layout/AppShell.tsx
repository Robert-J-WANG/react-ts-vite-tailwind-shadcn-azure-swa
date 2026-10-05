import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

import { ThemeToggle } from '@/components/ThemeToggle';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Secondary', to: '/secondary' },
];

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-(--content-max-width) items-center justify-between gap-6 px-(--page-gutter)">
          <NavLink className="font-semibold tracking-tight" to="/">
            <span className="sm:hidden">App Template</span>
            <span className="hidden sm:inline">Application Template</span>
          </NavLink>

          <div className="flex items-center gap-1">
            <nav>
              <ul className="flex items-center gap-1">
                {navigation.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      className={({ isActive }) =>
                        [
                          'inline-flex min-h-9 items-center rounded-md px-2 text-sm font-medium transition-colors sm:px-3',
                          isActive
                            ? 'bg-secondary text-secondary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                        ].join(' ')
                      }
                      end={item.to === '/'}
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-(--content-max-width) flex-1 flex-col px-(--page-gutter) py-(--section-space)">
        {children}
      </main>

      <footer className="border-t">
        <div className="mx-auto flex min-h-16 w-full max-w-(--content-max-width) items-center px-(--page-gutter) text-sm text-muted-foreground">
          React, TypeScript, Tailwind CSS, shadcn/ui, and Azure Static Web Apps.
        </div>
      </footer>
    </div>
  );
}
