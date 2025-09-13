import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, Clock, Cross, BookLock, Smartphone } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold font-headline text-primary dark:text-primary-foreground">Como Funciona</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <BookMarked className="h-6 w-6 text-primary" />
            Um Plano de 365 Dias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Este aplicativo foi projetado para guiá-lo através de toda a Bíblia Católica em um ano. Cada dia, você receberá uma seleção de leituras do Antigo e do Novo Testamento, de forma a ter uma visão panorâmica e integrada da História da Salvação.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Clock className="h-6 w-6 text-primary" />
            Aproximadamente 15 Minutos por Dia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Sabemos que a vida é corrida. Por isso, o plano é pensado para ser concluído em cerca de 15 a 20 minutos diários. Este pequeno investimento de tempo se transformará em um imenso crescimento espiritual, permitindo que a Palavra de Deus ilumine sua rotina.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Cross className="h-6 w-6 text-primary" />
            Bíblia + Catecismo: A Fé da Igreja
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Como católicos, não lemos a Bíblia isoladamente. "A Escritura deve ser lida e interpretada à luz do mesmo Espírito pelo qual foi escrita" (Catecismo, 111).
          </p>
          <p>
            Por isso, cada leitura é acompanhada de uma breve explicação, síntese e meditação baseada na Tradição e no Magistério da Igreja. Isso garante que sua leitura seja fiel ao coração da fé católica, unindo a Palavra de Deus à fé viva da Igreja.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <BookLock className="h-6 w-6 text-primary" />
            Fiel à Tradição
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
             As leituras foram feitas a partir da tradução direta da Vulgata Clementina, confirmada pelo Concílio de Trento e usada oficialmente pela Igreja por séculos. É a mesma Bíblia que sustentou papas, santos e mártires — não versões modernas que alteram o sentido original.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Smartphone className="h-6 w-6 text-primary" />
            Experiência Simples e Acessível
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Nada de marcações ou cálculos. Cada dia já vem pronto: capítulos, explicação e Catecismo reunidos em um só lugar. Você pode ajustar o tamanho do texto, ler no celular em qualquer lugar e manter a constância com praticidade.
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
