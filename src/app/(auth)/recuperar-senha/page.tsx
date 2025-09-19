
"use client"

import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

// PasswordRecoveryForm is no longer needed as we link directly to WhatsApp.
// We can simplify this page or even remove it if the login page links directly.
// For now, let's update it to be a support contact page.

import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';


const whatsappNumber = '5512992045561';
const message = `Olá, Ana! Estou com dificuldades para acessar o aplicativo 'Bíblia Católica em 1 Ano'. Pode me ajudar?`;
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


function PasswordRecoveryContent() {
    return (
        <Card className="shadow-lg">
          <CardHeader className="text-center p-6">
            <CardTitle className="text-2xl font-headline text-primary">Problemas com o Acesso?</CardTitle>
            <CardDescription className="pt-2">
              Se você não está conseguindo acessar com seu e-mail de compra, fale diretamente com a Ana pelo WhatsApp para resolvermos rapidamente.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Button asChild className="w-full">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-4 w-4"/>
                    Falar com a Ana no WhatsApp
                </a>
            </Button>
          </CardContent>
           <CardFooter className="p-6 pt-0">
             <p className="w-full text-center text-sm text-muted-foreground">
              Lembrou seu e-mail?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Voltar para o Login
              </Link>
            </p>
          </CardFooter>
        </Card>
    )
}


export default function PasswordRecoveryPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
        <PasswordRecoveryContent />
    </Suspense>
  );
}
