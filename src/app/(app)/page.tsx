"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, Loader2, BookMarked, Download } from "lucide-react";
import Link from "next/link";
import { usePwaInstall } from "@/hooks/use-pwa-install";

export default function HomePage() {
  const { user } = useAuth();
  const { completedDays, lastCompletedDay, loading } = useProgress();
  const { canInstall, installPwa } = usePwaInstall();

  const progressPercentage = (completedDays.length / 365) * 100;
  const nextDay = lastCompletedDay > 0 ? Math.min(365, lastCompletedDay + 1) : 1;
  
  const buttonText = lastCompletedDay > 0 ? `Continuar Leitura: Dia ${nextDay}` : 'Iniciar Jornada';
  const buttonLink = lastCompletedDay > 0 ? `/leitura/${nextDay}` : '/leitura/0';
  const descriptionText = lastCompletedDay > 0 
    ? `Você já completou ${completedDays.length} de 365 dias. Continue firme em sua jornada!`
    : "Sua jornada de 365 dias pela Palavra de Deus começa aqui. Clique abaixo para começar.";

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-3xl px-4 pt-12 md:pt-20">
      <div className="w-full space-y-8">
        <header className="text-center">
          <BookMarked className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-3xl font-bold font-headline text-primary dark:text-primary-foreground">
            Olá, Católico(a)!
          </h1>
          <p className="text-muted-foreground mt-2">
            Pronto(a) para sua jornada bíblica de hoje?
          </p>
        </header>

        {canInstall && (
          <Card className="border-accent bg-accent/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-headline text-accent-foreground/90">Acesso Rápido</CardTitle>
               <CardDescription className="text-accent-foreground/80">
                Instale o aplicativo em seu celular para uma experiência melhor e acesso direto pela tela inicial.
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button onClick={installPwa} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
                <Download className="mr-2 h-5 w-5" />
                Instalar Aplicativo
              </Button>
            </CardFooter>
          </Card>
        )}

        <Card className="shadow-lg text-center">
          <CardHeader className="p-6">
            <CardTitle className="text-2xl font-headline">Seu Progresso</CardTitle>
             <CardDescription className="text-base pt-2">
              {descriptionText}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
             <div className="space-y-2">
                <Progress value={progressPercentage} className="w-full" />
                <p className="text-sm font-medium text-primary">
                  {completedDays.length} de 365 dias concluídos ({Math.round(progressPercentage)}%)
                </p>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
             <Button asChild size="lg" className="shadow-lg w-full text-lg h-14 animate-pulse-subtle">
              <Link href={buttonLink}>
                 <BookOpen className="mr-2 h-5 w-5" />
                 {buttonText}
              </Link>
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
