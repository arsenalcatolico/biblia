
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function IntroductionPage() {
  return (
    <div className="container mx-auto max-w-3xl space-y-6 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-headline text-3xl text-primary">
            Seja bem-vindo à sua Jornada de Fé!
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none space-y-4 dark:prose-invert">
          <p className="text-justify">
            Quantas vezes você começou a ler a Bíblia cheio de entusiasmo… mas
            parou em Levítico? Ou ficou perdido entre genealogias e leis
            antigas, sem entender o que tudo aquilo tinha a ver com sua vida?
          </p>
          <p className="text-justify">
            Se isso já aconteceu com você, não está sozinho. A maioria dos
            planos trata a Bíblia como um livro comum: página por página, sem
            contexto, até que o leitor desanima.
          </p>
          <p className="text-justify">
            Mas a Bíblia não é um romance. É uma biblioteca de 73 livros,
            escrita ao longo de séculos, e só ganha sentido quando lida como a
            grande história de salvação que culmina em Jesus Cristo.
          </p>
          <p className="text-justify">
            Este método é diferente. Ele não segue a Bíblia página por página.
            Os livros e capítulos foram reorganizados para contar a história da
            salvação de forma cristocêntrica, mostrando como tudo se conecta em
            Cristo e como a Igreja interpreta a Palavra de Deus.
          </p>
          <p className="text-justify">
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
            <p className="text-justify">
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
            <p className="text-justify">
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
            <p className="text-justify">
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
            <p className="text-justify">
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
            <p className="text-justify">
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
            <p className="text-justify">
              Respire fundo, faça silêncio e peça ao Espírito Santo que ilumine
              sua mente e seu coração.
            </p>
            <p className="text-justify">
              Agora, prepare-se: em 365 dias você não apenas vai ler a Bíblia
              inteira — você vai encontrá-la viva, guiado pela Igreja,
              transformado pelo amor de Deus.
            </p>
          </section>

        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button asChild size="lg" className="shadow-lg text-base md:text-lg">
          <Link href="/leitura/1">
            INICIAR MINHA JORNADA: DIA 1
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
