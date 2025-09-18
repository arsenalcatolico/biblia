
"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import type { ReadingDay } from '@/types';
import { useSettings } from '@/contexts/SettingsContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, ArrowLeft, ArrowRight, Sun, Moon, Minus, Plus, Undo2, PartyPopper, Calendar, Home, X } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';

const SHOW_CONGRATS_TOAST = 'showCongratsToast';

function ReadingPageContents({ day: dayParam }: { day: string }) {
  const day = parseInt(dayParam || "0", 10);
  
  const router = useRouter();
  const { toast } = useToast();

  const [reading, setReading] = useState<ReadingDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNextDayAlertOpen, setIsNextDayAlertOpen] = useState(false);
  const [isFinalDayCongratsOpen, setIsFinalDayCongratsOpen] = useState(false);


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
    if (isNaN(day) || day < 0 || day > 365) {
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
      
      if (day === 365) {
        setIsFinalDayCongratsOpen(true);
      } else {
        try {
          localStorage.setItem(SHOW_CONGRATS_TOAST, 'true');
        } catch (error) {
          console.error("Could not access local storage", error);
        }
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
        <h1 className="text-xl font-bold font-headline text-primary dark:text-primary-foreground">{title}</h1>
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

  const isChapterTitle = (text: string) => {
    const trimmedText = text.trim();
  
    if (trimmedText.startsWith('Lamentações') || trimmedText.startsWith('Eclesiástico')) {
      return true;
    }
  
    const psalmsRegex = /^Salmos\s[\d, -]+(\s\(Salmos\s[\d, -]+ Vulgata\))?$/;
    if (psalmsRegex.test(trimmedText)) {
      return true;
    }
  
    // Regex for general book names followed by chapter numbers.
    const regex = /^(I{1,3}\s|II?\s|\d\s)?[A-ZÀ-Úa-zçãéúíóâêôÊ\s]+\s\d+([,:]\d*([-\s\d]+)?)?(\s\(.+\))?$/;
    return regex.test(trimmedText) && !/^\d+\./.test(trimmedText) && trimmedText.split(' ').length < 7;
  };
  
  const formatExplanationContent = (paragraph: string, index: number, total: number, keyPrefix: string) => {
    if (!paragraph) return null;
    const trimmedParagraph = paragraph.trim();

    if (/^\d+\.\s*$/.test(trimmedParagraph)) {
        return null;
    }

    const match = trimmedParagraph.match(/^(.+?:)(.*)$/);
    const pClassName = cn(
      "text-justify leading-loose",
      { "mb-4": index < total - 1 }
    );

    if (match) {
        const subtitle = match[1];
        const content = match[2];
        return (
            <p key={`${keyPrefix}-${index}`} className={pClassName}>
                <strong><em>{subtitle}</em></strong>{content}
            </p>
        );
    }
    return <p key={`${keyPrefix}-${index}`} className={pClassName}>{trimmedParagraph}</p>;
  }

 const getExplanationParts = (explanation: string = "") => {
      const cleanText = (text?: string) => text ? text.trim() : undefined;

      const findPart = (text: string, start: string, end: string | null) => {
          const startIndex = text.indexOf(start);
          if (startIndex === -1) return undefined;
          
          let endIndex: number | undefined = undefined;
          if (end) {
              endIndex = text.indexOf(end, startIndex);
              if (endIndex === -1) endIndex = undefined;
          }
          
          return text.substring(startIndex + start.length, endIndex).trim();
      };
      
      const cleanMeditationNumber = (text: string | undefined) => {
        if (!text) return undefined;
        return text.replace(/^\d+\.\s*/, '').trim();
      }

      const hasSpecialStructure = explanation.includes("Aprofundamento Catequético e Apologético");
      
      if (hasSpecialStructure) {
          const heart = findPart(explanation, "O Coração da Leitura", "Aprofundamento Catequético e Apologético");
          const keyPassage = findPart(explanation, "1. Passagens-Chave:", "2. Doutrina e Catecismo:");
          const doctrine = findPart(explanation, "2. Doutrina e Catecismo:", "3. Conexão Apologética (Defendendo a Fé):");
          const apologetics = findPart(explanation, "3. Conexão Apologética (Defendendo a Fé):", "Para Meditar");
          const meditation = findPart(explanation, "Para Meditar", "Conclusão do Módulo");

          return {
              synthesis: undefined,
              catechetical: undefined,
              meditation: cleanMeditationNumber(meditation),
              heart,
              keyPassage: cleanText(keyPassage),
              doctrine: cleanText(doctrine),
              apologetics: cleanText(apologetics),
          };
      }

      const synthesis = findPart(explanation, "1. Síntese da Leitura", "2. Explicação Catequética");
      const catechetical = findPart(explanation, "2. Explicação Catequética", "Para Meditar");
      const meditation = findPart(explanation, "Para Meditar", "Conclusão do Módulo");
      
      return {
          synthesis: cleanText(synthesis),
          catechetical: cleanText(catechetical),
          meditation: cleanMeditationNumber(meditation),
          heart: undefined,
          keyPassage: undefined,
          doctrine: undefined,
          apologetics: undefined,
      };
  };

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
        <ReadingHeader title={`Dia ${day}`} />
        <div className="container mx-auto text-center p-4">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => router.push('/')}>Voltar ao Início</Button>
        </div>
      </>
    );
  }
  
  let isFirstChapter = true;

  const { synthesis, catechetical, meditation, heart, keyPassage, doctrine, apologetics } = getExplanationParts(reading.explicacao_catolica);


  return (
    <>
      <ReadingHeader title={`Dia ${day}`} />
      <div className={cn("container mx-auto max-w-3xl space-y-6 px-2", fontSize)}>
        
        {reading.intro_titulo && reading.intro && (
          <Card className="bg-accent/10 border-accent">
            <CardHeader className="pb-2 pt-6 px-2">
              <CardTitle className="font-headline text-xl text-accent-foreground/90">{reading.intro_titulo}</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-6 text-accent-foreground/80">
              <p className="text-justify leading-loose">{reading.intro}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="p-0">
            <CardTitle className="font-headline text-2xl text-primary dark:text-primary-foreground text-left px-2 pt-6">{reading.leitura_dia}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 prose prose-lg max-w-none dark:prose-invert p-0 pt-6 px-2 pb-6">
            
            <section>
              <h2 className="font-headline text-xl font-semibold text-left">Texto Bíblico</h2>
              {reading.texto_biblico.split('\n').filter(p => p.trim()).map((paragraph, i) => {
                const trimmedParagraph = paragraph.trim();

                if (isChapterTitle(trimmedParagraph)) {
                   const isFirst = isFirstChapter;
                   isFirstChapter = false;
                   return <p key={`tb-h-${i}`} className={cn("text-justify leading-loose font-bold", !isFirst && "pt-4")}>{trimmedParagraph}</p>
                }
                return <p key={`tb-p-${i}`} className="text-justify leading-loose">{trimmedParagraph}</p>
              })}
            </section>
            
            {reading.explicacao_catolica && (
              <section className="space-y-4">
                <h2 className="font-headline text-xl font-semibold text-left">Explicação Católica</h2>

                {heart || keyPassage || doctrine || apologetics ? (
                  <div className="space-y-4">
                      {heart && (
                          <div>
                              <p className="text-justify leading-loose"><strong>O Coração da Leitura</strong></p>
                              {heart.split('\n').map((p, i) => p.trim() && <p key={`h-${i}`} className="text-justify leading-loose">{p}</p>)}
                          </div>
                      )}
                      
                      {(keyPassage || doctrine || apologetics) && <p className="text-justify leading-loose"><strong>Aprofundamento Catequético e Apologético</strong></p>}

                      {keyPassage && (
                          <div>
                              <p className="text-justify leading-loose"><strong>1. Passagens-Chave:</strong></p>
                              {keyPassage.split('\n').map((p, i) => p.trim() && <p key={`kp-${i}`} className="text-justify leading-loose">{p}</p>)}
                          </div>
                      )}
                      {doctrine && (
                          <div>
                              <p className="text-justify leading-loose"><strong>2. Doutrina e Catecismo:</strong></p>
                              {doctrine.split('\n').filter(p => p.trim()).map((p, i, arr) => formatExplanationContent(p, i, arr.length, `doc`))}
                          </div>
                      )}
                      {apologetics && (
                          <div>
                              <p className="text-justify leading-loose"><strong>3. Conexão Apologética (Defendendo a Fé):</strong></p>
                              {apologetics.split('\n').filter(p => p.trim()).map((p, i, arr) => formatExplanationContent(p, i, arr.length, `ap`))}
                          </div>
                      )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {synthesis && (
                      <div>
                        <p className="text-justify leading-loose"><strong>1. Síntese da Leitura</strong></p>
                        {synthesis.split('\n').map((p, i) => p.trim() && <p key={`s-${i}`} className="text-justify leading-loose">{p}</p>)}
                      </div>
                    )}
                    {catechetical && (
                      <div>
                        <p className="text-justify leading-loose"><strong>2. Explicação Catequética</strong></p>
                        {catechetical.split('\n').filter(p => p.trim()).map((p, i, arr) => formatExplanationContent(p, i, arr.length, `cat`))}
                      </div>
                    )}
                  </div>
                )}
                {meditation && (
                  <>
                    <Separator className="my-6" />
                    <div className="mt-4">
                      <p className="text-justify leading-loose"><strong>Para Meditar</strong></p>
                      {meditation.split('\n').map((p, i) => p.trim() && <p key={`m-${i}`} className="text-justify leading-loose">{p}</p>)}
                    </div>
                  </>
                )}
              </section>
            )}


          </CardContent>
        </Card>
        
        {reading.conclusao_titulo && reading.conclusao && (
          <Card className="bg-accent/10 border-accent">
            <CardHeader className="pb-2 pt-6 px-2">
              <CardTitle className="font-headline text-xl text-accent-foreground/90">{reading.conclusao_titulo}</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-6 text-accent-foreground/80">
              <p className="text-justify leading-loose">{reading.conclusao}</p>
            </CardContent>
          </Card>
        )}

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
                {day === 365 ? 'Concluir a Jornada!' : 'Concluir Leitura e Avançar'}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={() => navigateDay(-1)} disabled={day <= 0} variant="secondary" className="flex-1 border">
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            {day === 1 ? 'Introdução' : 'Dia Anterior'}
          </Button>
          <Button onClick={handleNextDayClick} disabled={day >= 365} variant="secondary" className="flex-1 border">
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
      
      <AlertDialog open={isFinalDayCongratsOpen} onOpenChange={setIsFinalDayCongratsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl font-bold text-accent">
                <PartyPopper className="mx-auto h-12 w-12 text-accent mb-4" />
                Laus Tibi, Christe!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
                Parabéns! Você completou a jornada de 365 dias através da Palavra de Deus, guiado pela fé da Igreja. Que as sementes plantadas em seu coração deem frutos abundantes para a glória de Deus e a salvação das almas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col-reverse sm:grid sm:grid-cols-2 gap-2 pt-4">
            <AlertDialogAction className="w-full" onClick={() => router.push('/calendario')}>
                <Calendar className="mr-2 h-4 w-4" /> Ver Calendário
            </AlertDialogAction>
            <AlertDialogAction className="w-full" onClick={() => router.push('/')}>
               <Home className="mr-2 h-4 w-4" /> Voltar ao Início
            </AlertDialogAction>
            <AlertDialogCancel variant="secondary" className="col-span-2 mt-2">
                <X className="mr-2 h-4 w-4"/> Fechar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function ReadingPage({ params }: { params: { day: string } }) {
  // ReadingPage is a Client Component, and we can't use `Object.keys(params)`
  // to check for the presence of the `day` parameter. Instead, we can
  // directly use the `day` parameter.
  //
  // The `use` hook is still required here to resolve the `params` object.
  const resolvedParams = use(params);

  // It's safe to use the resolved `day` param here.
  return <ReadingPageContents day={resolvedParams.day} />;
}
