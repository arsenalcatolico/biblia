
"use client";

import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePwaInstall } from "@/hooks/use-pwa-install";
import { useSearchParams } from 'next/navigation';
import { AppLogo } from '@/components/AppLogo';
import { PwaInstallBanner } from '@/components/PwaInstallBanner';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { canInstall, installPwa, isIos } = usePwaInstall();

  return (
    <div className="space-y-6">
      <PwaInstallBanner
          canInstall={canInstall}
          isIos={isIos}
          onInstall={installPwa}
      />

      <Card className="shadow-lg">
        <CardHeader className="text-center p-6">
          <AppLogo className="mx-auto h-28 w-28 mb-4" />
          <CardTitle className="text-3xl font-headline text-primary">Bíblia Católica em 1 Ano</CardTitle>
          <CardDescription className="text-3xl font-semibold">Explicada</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <LoginForm defaultEmail={email || ''} />
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <LoginPageContent />
        </Suspense>
    )
}
