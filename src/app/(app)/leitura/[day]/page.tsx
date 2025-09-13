"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ReadingDay } from '@/types';
import { useSettings } from '@/contexts/SettingsContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, ArrowLeft, ArrowRight, Sun, Moon, Minus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ReadingPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const day = parseInt(params.day as string, 10);

  const [reading, setReading] = useState<ReadingDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { theme, setTheme, fontSize, increaseFontSize, decreaseFontSize } = useSettings();
  const { completedDays, markDayAsComplete } = useProgress();

  const isCompleted = completedDays.includes(day);

  useEffect(() => {
    if (isNaN(day) || day < 1 || day > 365) {
      setError("Dia inválido.");
      setLoading(false);
      return;
    }

    const fetchReading = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/leituras/dia_${day}.json`);
        if (!response.ok) {
          throw new Error('Não foi possível carregar a leitura.');
        }
        const data: ReadingDay = await response.json();
        setReading(data);
      } catch (e: any) {
        setError(e.message);
        setReading(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReading();
  }, [day]);

  const handleMarkAsComplete = async () => {
    try {
      await markDayAsComplete(day);
      if (day < 365) {
        router.push(`/leitura/${day + 1}`);
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: "Não foi possível salvar seu progresso.",
      });
    }
  };

  const navigateDay = (offset: number) => {
    const newDay = day + offset;
    if (newDay >= 1 && newDay <= 365) {
      router.push(`/leitura/${newDay}`);
    }
  };

  const ReadingHeader = () => (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b mb-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold font-headline text-primary">
          Dia {day}
        </h1>
        <div className="flex items-center gap-1 sm:gap-2">
           <div className="flex h-10 items-center justify-center rounded-md border bg-secondary">
              <Button variant="ghost" size="icon" onClick={decreaseFontSize} aria-label="Diminuir fonte">
                <Minus className="h-5 w-5" />
              </Button>
              <span className="w-24 text-center text-sm font-medium text-muted-foreground">Tamanho da Letra</span>
              <Button variant="ghost" size="icon" onClick={increaseFontSize} aria-label="Aumentar fonte">
                <Plus className="h-5 w-5" />
              </Button>
           </div>

           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Alternar tema</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>Claro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Noturno</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );

  if (loading) {
    return (
      <>
        <ReadingHeader />
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (error || !reading) {
    return (
      <>
        <ReadingHeader />
        <div className="container mx-auto text-center">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => router.push('/')} className="mt-4">Voltar ao Início</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ReadingHeader />
      <div className={cn("container mx-auto max-w-3xl space-y-6 px-2", fontSize)}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">{reading.leitura_dia}</CardTitle>
            {reading.intro && <CardDescription>{reading.intro}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-4 prose prose-lg max-w-none dark:prose-invert">
            
            <section>
              <h2 className="font-headline text-xl font-semibold">Texto Bíblico</h2>
              {reading.texto_biblico.split('\n').filter(p => p.trim()).map((paragraph, i) => <p key={`tb-${i}`}>{paragraph}</p>)}
            </section>
            
            <section>
              <h2 className="font-headline text-xl font-semibold">Explicação Católica</h2>
              {reading.explicacao_catolica.split('\n').filter(p => p.trim()).map((paragraph, i) => <p key={`ec-${i}`}>{paragraph}</p>)}
            </section>

            {reading.conclusao && (
              <section>
                <h2 className="font-headline text-xl font-semibold">Conclusão e Meditação</h2>
                {reading.conclusao.split('\n').filter(p => p.trim()).map((paragraph, i) => <p key={`c-${i}`}>{paragraph}</p>)}
              </section>
            )}

          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button onClick={handleMarkAsComplete} size="lg" disabled={isCompleted} className="shadow-lg">
            {isCompleted ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Leitura Concluída
              </>
            ) : (
              'Concluir Leitura e Avançar'
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Button onClick={() => navigateDay(-1)} disabled={day <= 1} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dia Anterior
          </Button>
          <Button onClick={() => navigateDay(1)} disabled={day >= 365} variant="outline">
            Próximo Dia <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
