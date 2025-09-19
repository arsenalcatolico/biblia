
"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail } from 'lucide-react';

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
                <CardDescription>
                    Seu acesso é feito com o e-mail que você usou na compra.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Seu E-mail de compra é:</p>
                    <div className="flex items-center gap-2">
                        <p className="font-mono text-base font-semibold p-3 bg-secondary rounded-md flex-1 break-all">{email || 'seu@email.com'}</p>
                    </div>
                </div>
                 <p className="text-xs text-muted-foreground text-center pt-2">
                    A senha já está configurada. Basta usar o e-mail acima para entrar.
                </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button onClick={handleGoToLogin} className="w-full">
                    Ir para o Login
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
