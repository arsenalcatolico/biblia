"use client";

import { useProgress } from '@/contexts/ProgressContext';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CalendarPage() {
  const { completedDays, loading } = useProgress();
  const days = Array.from({ length: 365 }, (_, i) => i + 1);

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-headline text-primary">Calendário de Leitura</h1>
        <p className="text-muted-foreground">Acompanhe seu progresso e acesse qualquer dia.</p>
      </header>
      
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2">
          {days.map((day) => {
            const isCompleted = completedDays.includes(day);
            return (
              <Link
                key={day}
                href={`/leitura/${day}`}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-lg border text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-md",
                  isCompleted 
                    ? "bg-primary/90 text-primary-foreground shadow-inner" 
                    : "bg-card hover:bg-accent/20"
                )}
              >
                {isCompleted && (
                  <span className="absolute top-1 right-1 text-base" role="img" aria-label="Completed">
                    ✅
                  </span>
                )}
                {day}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
