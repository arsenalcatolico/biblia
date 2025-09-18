
"use client";

import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookMarked } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const password = searchParams.get('password');

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center p-6">
        <BookMarked className="mx-auto h-16 w-16 text-primary mb-4" />
        <CardTitle className="text-3xl font-headline text-primary">Bíblia Católica em 1 Ano</CardTitle>
        <CardDescription className="text-3xl font-semibold">Explicada</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <LoginForm defaultEmail={email || ''} defaultPassword={password || ''} />
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <LoginPageContent />
        </Suspense>
    )
}
