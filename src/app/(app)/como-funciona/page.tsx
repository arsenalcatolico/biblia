import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, Clock, Cross } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold font-headline text-primary dark:text-primary-foreground">Como Funciona o Plano</h1>
        <p className="text-muted-foreground">Sua jornada de um ano com a Palavra de Deus.</p>
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
            O aplicativo "Bíblia Católica em 1 Ano Explicada" foi projetado para guiá-lo através de toda a Sagrada Escritura em um ano. Cada dia, você terá uma seleção de textos bíblicos para ler.
          </p>
          <p>
            O objetivo é fornecer uma visão panorâmica e coesa da história da salvação, conectando o Antigo e o Novo Testamento de uma maneira que faça sentido.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Clock className="h-6 w-6 text-primary" />
            Apenas 15 Minutos por Dia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Sabemos que a vida é corrida. Por isso, cada leitura diária foi pensada para durar aproximadamente 15 a 20 minutos.
          </p>
          <p>
            É um pequeno investimento de tempo que trará enormes frutos espirituais, permitindo que a Palavra de Deus ilumine sua rotina diária sem sobrecarregá-la.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Cross className="h-6 w-6 text-primary" />
            Bíblia + Catecismo: A Fé Explicada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Ler a Bíblia é essencial, mas compreendê-la à luz da Tradição da Igreja é o que nos enraíza na fé católica. Após cada leitura bíblica, você encontrará uma breve explicação católica.
          </p>
          <p>
            Essa explicação conecta o texto do dia com os ensinamentos do Catecismo da Igreja Católica, a vida dos santos e a Tradição apostólica. Isso garante que sua leitura seja sempre fiel ao Magistério da Igreja e espiritualmente frutuosa.
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
