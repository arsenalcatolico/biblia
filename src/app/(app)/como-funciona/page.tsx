"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, Clock, Cross, BookLock, Smartphone, Sun, Moon, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";
import { cn } from "@/lib/utils";


export default function HowItWorksPage() {
  const { theme, setTheme, fontSize, increaseFontSize, decreaseFontSize } = useSettings();

  const ReadingControls = () => (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b mb-8 py-2">
      <div className="mx-auto flex items-center justify-center gap-4 max-w-3xl px-4">
        <h1 className="text-xl font-bold font-headline text-primary dark:text-primary-foreground">Como Funciona</h1>
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


  return (
    <>
      <ReadingControls />
      <div className={cn("container mx-auto max-w-3xl space-y-8 px-4", fontSize)}>
        <Card>
          <CardHeader className="p-6">
            <CardTitle className="flex items-center gap-4 font-headline text-2xl dark:text-primary-foreground">
              <BookMarked className="h-8 w-8 text-primary" />
              Um Plano de 365 Dias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground px-6 pb-6">
            <p className="text-justify leading-loose">
              Este aplicativo foi projetado para guiá-lo através de toda a Bíblia Católica em um ano. Cada dia, você receberá uma seleção de leituras do Antigo e do Novo Testamento, de forma a ter uma visão panorâmica e integrada da História da Salvação.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-6">
            <CardTitle className="flex items-center gap-4 font-headline text-2xl dark:text-primary-foreground">
              <Clock className="h-8 w-8 text-primary" />
              Aproximadamente 15 Minutos por Dia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground px-6 pb-6">
            <p className="text-justify leading-loose">
              Sabemos que a vida é corrida. Por isso, o plano é pensado para ser concluído em cerca de 15 a 20 minutos diários. Este pequeno investimento de tempo se transformará em um imenso crescimento espiritual, permitindo que a Palavra de Deus ilumine sua rotina.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-6">
            <CardTitle className="flex items-center gap-4 font-headline text-2xl dark:text-primary-foreground">
              <Cross className="h-8 w-8 text-primary" />
              Bíblia + Catecismo: A Fé da Igreja
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground px-6 pb-6">
            <p className="text-justify leading-loose">
              Como católicos, não lemos a Bíblia isoladamente. "A Escritura deve ser lida e interpretada à luz do mesmo Espírito pelo qual foi escrita" (Catecismo, 111).
            </p>
            <p className="text-justify leading-loose">
              Por isso, cada leitura é acompanhada de uma breve explicação, síntese e meditação baseada na Tradição e no Magistério da Igreja. Isso garante que sua leitura seja fiel ao coração da fé católica, unindo a Palavra de Deus à fé viva da Igreja.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-6">
            <CardTitle className="flex items-center gap-4 font-headline text-2xl dark:text-primary-foreground">
              <BookLock className="h-8 w-8 text-primary" />
              Fiel à Tradição
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground px-6 pb-6">
            <p className="text-justify leading-loose">
               As leituras foram feitas a partir da tradução direta da Vulgata Clementina, confirmada pelo Concílio de Trento e usada oficialmente pela Igreja por séculos. É a mesma Bíblia que sustentou papas, santos e mártires — não versões modernas que alteram o sentido original.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-6">
            <CardTitle className="flex items-center gap-4 font-headline text-2xl dark:text-primary-foreground">
              <Smartphone className="h-8 w-8 text-primary" />
              Experiência Simples e Acessível
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground px-6 pb-6">
            <p className="text-justify leading-loose">
              Nada de marcações ou cálculos. Cada dia já vem pronto: capítulos, explicação e Catecismo reunidos em um só lugar. Você pode ajustar o tamanho do texto, ler no celular em qualquer lugar e manter a constância com praticidade.
            </p>
          </CardContent>
        </Card>

      </div>
    </>
  );
}
