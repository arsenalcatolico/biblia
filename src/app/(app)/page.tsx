"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { user } = useAuth();
  const { completedDays, lastCompletedDay, loading } = useProgress();

  const progressPercentage = (completedDays.length / 365) * 100;
  const startDay = lastCompletedDay > 0 ? lastCompletedDay + 1 : 0;
  const nextDay = Math.min(365, startDay);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-3xl px-4">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-headline text-primary dark:text-primary-foreground">
            Olá, Católico(a)!
          </h1>
          <p className="text-muted-foreground">Pronto para a jornada de hoje?</p>
        </header>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Seu Progresso</CardTitle>
            <CardDescription>
              Você completou {completedDays.length} de 365 dias.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="w-full" />
            <p className="mt-2 text-right text-sm font-medium text-primary">
              {Math.round(progressPercentage)}%
            </p>
          </CardContent>
          <CardFooter className="pt-4">
             <Button asChild size="lg" className="shadow-lg w-full">
              <Link href={`/leitura/${nextDay}`}>
                {lastCompletedDay > 0 ? `Continuar: Dia ${nextDay}` : 'Começar a Jornada'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
             <div className="rounded-full bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary"/>
             </div>
             <div>
                <CardTitle className="text-xl">Leitura do Dia</CardTitle>
                 <CardDescription>Sua jornada diária com a Palavra.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
                Cada dia é uma nova oportunidade de se aproximar de Deus através da leitura da Bíblia e da meditação. O plano de 1 ano foi criado para guiá-lo por toda a Sagrada Escritura de forma estruturada e enriquecedora.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
