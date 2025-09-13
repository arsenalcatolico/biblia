"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, CalendarDays, User, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProgress } from '@/contexts/ProgressContext';

const navItems = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/leitura', icon: BookOpen, label: 'Leitura' },
  { href: '/calendario', icon: CalendarDays, label: 'Calendário' },
  { href: '/como-funciona', icon: Info, label: 'Como Funciona' },
  { href: '/perfil', icon: User, label: 'Perfil' },
];

export function FooterNav() {
  const pathname = usePathname();
  const { lastCompletedDay } = useProgress();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-md items-center justify-around">
        {navItems.map((item) => {
          const href = item.href === '/leitura' ? `/leitura/${Math.min(365, lastCompletedDay + 1)}` : item.href;
          const isActive = (pathname === '/' && item.href === '/') || 
                           (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-md p-2 text-muted-foreground transition-colors hover:text-primary',
                isActive && 'text-primary'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
