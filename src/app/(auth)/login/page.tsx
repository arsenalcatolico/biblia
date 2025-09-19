
"use client";

import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { usePwaInstall } from "@/hooks/use-pwa-install";
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { AppLogo } from '@/components/AppLogo';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const password = searchParams.get('password');
  const { canInstall, installPwa } = usePwaInstall();

  return (
    <>
      {canInstall && (
        <Card className="border-accent bg-accent/10 mb-6">
            <CardHeader className="p-4 pb-4">
              <CardTitle className="text-xl font-headline text-accent-foreground/90 text-center">Acesso Rápido</CardTitle>
               <CardDescription className="text-accent-foreground/80 text-base text-justify px-2 pt-2">
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

      <Card className="shadow-lg">
        <CardHeader className="text-center p-6">
          <AppLogo className="mx-auto h-24 w-24 mb-4" />
          <CardTitle className="text-3xl font-headline text-primary">Bíblia Católica em 1 Ano</CardTitle>
          <CardDescription className="text-3xl font-semibold">Explicada</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <LoginForm defaultEmail={email || ''} defaultPassword={password || ''} />
        </CardContent>
      </Card>
    </>
  );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <LoginPageContent />
        </Suspense>
    )
}
