"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";
import { ArrowRight, Moon, Sun, Plus, Minus, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function IntroductionPage() {
  const { theme, setTheme, fontSize, increaseFontSize, decreaseFontSize } = useSettings();

  const ReadingControls = () => (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b mb-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold font-headline text-primary">Introdução</h1>
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
      <div className={cn("container mx-auto max-w-3xl space-y-6 px-2", fontSize)}>
        <Card>
          <CardHeader className="p-0">
            <CardTitle className="text-left font-headline text-3xl text-primary px-2 pt-6">
              Seja bem-vindo à sua Jornada de Fé!
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none space-y-4 dark:prose-invert p-0 pt-6 px-2">
            <p className="text-justify leading-loose">
              Quantas vezes você começou a ler a Bíblia cheio de entusiasmo… mas
              parou em Levítico? Ou ficou perdido entre genealogias e leis
              antigas, sem entender o que tudo aquilo tinha a ver com sua vida?
            </p>
            <p className="text-justify leading-loose">
              Se isso já aconteceu com você, não está sozinho. A maioria dos
              planos trata a Bíblia como um livro comum: página por página, sem
              contexto, até que o leitor desanima.
            </p>
            <p className="text-justify leading-loose">
              Mas a Bíblia não é um romance. É uma biblioteca de 73 livros,
              escrita ao longo de séculos, e só ganha sentido quando lida como a
              grande história de salvação que culmina em Jesus Cristo.
            </p>
            <p className="text-justify leading-loose">
              Este método é diferente. Ele não segue a Bíblia página por página.
              Os livros e capítulos foram reorganizados para contar a história da
              salvação de forma cristocêntrica, mostrando como tudo se conecta em
              Cristo e como a Igreja interpreta a Palavra de Deus.
            </p>
            <p className="text-justify leading-loose">
              E não é apenas uma escolha prática: é o modo como a Igreja recomenda
              que a Escritura seja lida. O Concílio Vaticano II, na Constituição
              Dogmática Dei Verbum, ensina que a Bíblia deve ser lida “com o mesmo
              Espírito com que foi escrita” (DV 12) e exorta todos os fiéis a terem
              contato frequente com a Palavra de Deus, pois “a ignorância das
              Escrituras é ignorância de Cristo” (DV 25).
            </p>

            <Separator className="my-6" />

            <h2 className="text-left font-headline text-2xl font-semibold text-primary">
              Por que este método é único
            </h2>

            <section>
              <h3 className="text-left font-headline text-xl font-semibold">
                Começando pela certeza do amor de Deus
              </h3>
              <p className="text-justify leading-loose">
                A primeira leitura é a 1ª Carta de São João, porque a primeira
                necessidade da alma é sentir o amor de Deus. Antes de aprender
                regras, histórias ou teologia, você precisa experimentar a certeza
                de que Deus te ama incondicionalmente. Esse "prólogo afetivo"
                aquece seu coração e cria a motivação certa para a jornada: não é
                obrigação, é encontro.
              </p>
            </section>

            <section>
              <h3 className="text-left font-headline text-xl font-semibold">
                Cristocêntrico
              </h3>
              <p className="text-justify leading-loose">
                Depois, você conhece os Evangelhos, o ápice da história da
                salvação: Jesus Cristo. Assim, ao ler o Antigo Testamento, você vê
                promessas sendo cumpridas e a grande história de amor de Deus se
                desenhando diante de seus olhos.
              </p>
            </section>

            <section>
              <h3 className="text-left font-headline text-xl font-semibold">
                Com a Igreja
              </h3>
              <p className="text-justify leading-loose">
                Cada leitura vem acompanhada de explicações do Catecismo. Você
                nunca fica sozinho diante do texto, porque a própria Igreja
                fundada por Cristo guia sua compreensão. Existe apenas uma ÚNICA
                VERDADE, uma única interpretação correta das Sagradas Escrituras.
              </p>
            </section>

            <section>
              <h3 className="text-left font-headline text-xl font-semibold">
                Fiel à Tradição
              </h3>
              <p className="text-justify leading-loose">
                As leituras foram preparadas a partir da tradução direta da
                Vulgata Clementina, confirmada pelo Concílio de Trento e utilizada
                oficialmente pela Igreja por mais de 400 anos. Esta foi a resposta
                firme da Igreja diante das adulterações protestantes, garantindo
                um texto sólido, fiel e livre de interpretações particulares.
                Assim, você lê a mesma Bíblia que sustentou santos, papas e
                mártires ao longo dos séculos — não versões modernas que muitas
                vezes suavizam ou distorcem o sentido original.
              </p>
            </section>

            <section>
              <h3 className="text-left font-headline text-xl font-semibold">
                Prático e acessível
              </h3>
              <p className="text-justify leading-loose">
                Tudo está pronto: leituras diárias de 15 minutos, com 3 a 4
                capítulos e Catecismo. Tamanho de letras ajustável, interface
                limpa, sem confusão. É só abrir o app e começar — sem perder
                tempo, sem se perder no caminho.
              </p>
            </section>

            <Separator className="my-6" />

            <section>
              <h2 className="text-left font-headline text-2xl font-semibold text-primary">
                Antes de começar
              </h2>
              <p className="text-justify leading-loose">
                Respire fundo, faça silêncio e peça ao Espírito Santo que ilumine
                sua mente e seu coração.
              </p>
              <p className="text-justify leading-loose">
                Agora, prepare-se: em 365 dias você não apenas vai ler a Bíblia
                inteira — você vai encontrá-la viva, guiado pela Igreja,
                transformado pelo amor de Deus.
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center gap-4">
          <Button asChild size="lg" className="shadow-lg text-base md:text-lg">
            <Link href="/leitura/1">
              INICIAR MINHA JORNADA: DIA 1
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
               Voltar ao Início
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
