
"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, KeyRound } from 'lucide-react';

function InstructionsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email');

    const handleGoToLogin = () => {
        const params = new URLSearchParams();
        if (email) {
            params.set('email', email);
        }
        router.push(`/login?${params.toString()}`);
    }

    return (
        <Card className="shadow-lg">
            <CardHeader className="text-center p-6">
                <CardTitle className="text-2xl font-headline text-primary">Instruções de Acesso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 pt-0">
                <div className="space-y-2">
                    <p className="flex items-center gap-2 text-left font-medium"><Mail className="h-5 w-5 text-primary"/> E-mail de Acesso:</p>
                    <p className="text-muted-foreground text-left text-sm">
                        Seu acesso é feito com o e-mail que você usou na compra:
                    </p>
                    <div className="font-mono text-base font-semibold p-3 bg-secondary rounded-md text-center break-all">{email || 'seu@email.com'}</div>
                </div>

                 <div className="space-y-2">
                    <p className="flex items-center gap-2 text-left font-medium"><KeyRound className="h-5 w-5 text-primary"/> Senha Padrão:</p>
                     <p className="text-muted-foreground text-left text-sm">
                        A sua senha já vem configurada. Na tela de login, basta inserir seu e-mail, e nós cuidamos do resto.
                    </p>
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button onClick={handleGoToLogin} className="w-full">
                    Entendi, ir para o Login
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function InstructionsPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <InstructionsContent />
        </Suspense>
    )
}
