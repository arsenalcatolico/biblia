
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ReadingDay } from '@/types';
import { useSettings } from '@/contexts/SettingsContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, ArrowLeft, ArrowRight, Sun, Moon, Minus, Plus, Undo2, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SHOW_CONGRATS_TOAST = 'showCongratsToast';

export default function ReadingPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const day = parseInt(params.day as string, 10);

  const [reading, setReading] = useState<ReadingDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNextDayAlertOpen, setIsNextDayAlertOpen] = useState(false);

  const { theme, setTheme, fontSize, increaseFontSize, decreaseFontSize } = useSettings();
  const { completedDays, markDayAsComplete, unmarkDayAsComplete } = useProgress();

  const [isCompleted, setIsCompleted] = useState(completedDays.includes(day));

  useEffect(() => {
    setIsCompleted(completedDays.includes(day));
  }, [completedDays, day]);

  useEffect(() => {
    try {
      if (localStorage.getItem(SHOW_CONGRATS_TOAST) === 'true') {
        toast({
          title: (
            <div className="flex items-center gap-2 font-bold text-lg">
              <PartyPopper className="h-6 w-6" />
              Parabéns!
            </div>
          ),
          description: (
              <p className="text-base">
                  Que a Palavra de Deus ilumine seu dia!
              </p>
          ),
          duration: 5000,
           className: "border-green-500 bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-200",
        });
        localStorage.removeItem(SHOW_CONGRATS_TOAST);
      }
    } catch (error) {
        console.error("Could not access local storage", error);
    }
  }, [toast]);


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
      setIsCompleted(true);
      
      try {
        localStorage.setItem(SHOW_CONGRATS_TOAST, 'true');
      } catch (error) {
        console.error("Could not access local storage", error);
      }


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

  const handleUnmarkAsComplete = async () => {
    try {
      setIsCompleted(false); // Instant UI update
      await unmarkDayAsComplete(day);
    } catch (error) {
      setIsCompleted(true); // Revert on error
      console.error("Falha ao desmarcar dia:", error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: "Não foi possível desmarcar a leitura.",
      });
    }
  };

  const navigateDay = (offset: number) => {
    const newDay = day + offset;
    if (newDay >= 0 && newDay <= 365) {
      router.push(`/leitura/${newDay}`);
    }
  };

  const handleNextDayClick = () => {
    if (isCompleted || day >= 365) {
      navigateDay(1);
    } else {
      setIsNextDayAlertOpen(true);
    }
  };

  const ReadingHeader = ({ title }: { title: string }) => (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b mb-4 py-2">
      <div className="mx-auto flex items-center justify-center gap-4 max-w-3xl px-2">
        <h1 className="text-xl font-bold font-headline text-primary">{title}</h1>
        <div className="flex items-center gap-2">
           <div className="flex h-10 items-center justify-center rounded-md border bg-secondary">
              <Button variant="ghost" size="icon" onClick={decreaseFontSize} aria-label="Diminuir fonte">
                <Minus className="h-5 w-5" />
              </Button>
              <span className="w-20 text-center text-sm font-medium text-muted-foreground">Tamanho da Letra</span>
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
        <ReadingHeader title={`Dia ${day}`} />
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (error || !reading) {
    return (
      <>
        <div className="container mx-auto text-center">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => router.push('/')} className="mt-4">Voltar ao Início</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <ReadingHeader title={`Dia ${day}`} />
      <div className={cn("container mx-auto max-w-3xl space-y-6 px-2", fontSize)}>
        <Card>
          <CardHeader className="p-0">
            <CardTitle className="font-headline text-2xl text-primary text-left px-2 pt-6">{reading.leitura_dia}</CardTitle>
            {reading.intro && <CardDescription className="text-left text-base px-2 pt-2">{reading.intro}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-4 prose prose-lg max-w-none dark:prose-invert p-0 pt-6 px-2">
            
            <section>
              <h2 className="font-headline text-xl font-semibold text-left">Texto Bíblico</h2>
              {reading.texto_biblico.split('\n').filter(p => p.trim()).map((paragraph, i) => <p key={`tb-${i}`} className="text-justify leading-loose">{paragraph}</p>)}
            </section>
            
            <section>
              <h2 className="font-headline text-xl font-semibold text-left">Explicação Católica</h2>
              {reading.explicacao_catolica.split('\n').filter(p => p.trim()).map((paragraph, i) => <p key={`ec-${i}`} className="text-justify leading-loose">{paragraph}</p>)}
            </section>

            {reading.conclusao && (
              <section>
                <h2 className="font-headline text-xl font-semibold text-left">Conclusão e Meditação</h2>
                {reading.conclusao.split('\n').filter(p => p.trim()).map((paragraph, i) => <p key={`c-${i}`} className="text-justify leading-loose">{paragraph}</p>)}
              </section>
            )}

          </CardContent>
        </Card>
        
        <div className="flex flex-col items-center gap-2">
          {isCompleted ? (
            <div className="w-full space-y-4">
              <Button size="lg" disabled className="w-full shadow-lg bg-green-600 hover:bg-green-600/90">
                <CheckCircle className="mr-2 h-5 w-5" />
                Concluído
              </Button>
              <Button onClick={handleUnmarkAsComplete} variant="destructive" size="sm" className="w-full">
                <Undo2 className="mr-2 h-4 w-4"/>
                Desmarcar leitura
              </Button>
            </div>
          ) : (
            <Button onClick={handleMarkAsComplete} size="lg" className="w-full shadow-lg">
              Concluir Leitura e Avançar
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={() => navigateDay(-1)} disabled={day <= 0} variant="secondary" className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            {day === 1 ? 'Introdução' : 'Dia Anterior'}
          </Button>
          <Button onClick={handleNextDayClick} disabled={day >= 365} variant="secondary" className="flex-1">
            Próximo Dia <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <AlertDialog open={isNextDayAlertOpen} onOpenChange={setIsNextDayAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Avançar sem concluir?</AlertDialogTitle>
            <AlertDialogDescription>
              Você não marcou esta leitura como concluída. Como deseja prosseguir?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="secondary" onClick={() => navigateDay(1)}>
              Avançar sem concluir
            </AlertDialogAction>
            <AlertDialogAction onClick={handleMarkAsComplete}>
              Concluir e avançar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );

    