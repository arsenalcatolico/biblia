"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function InstructionsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email');
    const defaultPassword = 'biblia@catolica365';
    const { toast } = useToast();

    if (!email) {
        return (
             <Card className="shadow-lg">
                <CardHeader className="text-center p-6">
                    <CardTitle className="text-2xl font-headline text-destructive">Erro</CardTitle>
                    <CardDescription>
                        Nenhum e-mail foi fornecido. Por favor, volte e tente novamente.
                    </CardDescription>
                </CardHeader>
                 <CardFooter className="p-6 pt-0">
                     <Button onClick={() => router.push('/recuperar-senha')} className="w-full">
                        Voltar
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: (
                <div className="flex items-center gap-2 font-bold">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Copiado!
                </div>
            ),
            description: `O campo ${field} foi copiado para a área de transferência.`,
            duration: 3000,
        });
    }

    return (
        <Card className="shadow-lg">
            <CardHeader className="text-center p-6">
                <CardTitle className="text-2xl font-headline text-primary">Instruções de Acesso</CardTitle>
                <CardDescription>
                    Use os dados abaixo para fazer login no aplicativo.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Seu E-mail:</p>
                    <div className="flex items-center gap-2">
                        <p className="font-mono text-base font-semibold p-2 bg-secondary rounded-md flex-1">{email}</p>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(email, 'E-mail')} aria-label="Copiar e-mail">
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                 <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Sua Senha Padrão:</p>
                     <div className="flex items-center gap-2">
                        <p className="font-mono text-base font-semibold p-2 bg-secondary rounded-md flex-1">{defaultPassword}</p>
                         <Button variant="ghost" size="icon" onClick={() => copyToClipboard(defaultPassword, 'Senha')} aria-label="Copiar senha">
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                 <p className="text-xs text-muted-foreground text-center pt-2">
                    Por segurança, recomendamos que você altere sua senha no seu perfil após o primeiro login.
                </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button onClick={() => router.push('/login')} className="w-full">
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
