import { PasswordRecoveryForm } from '@/components/auth/PasswordRecoveryForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PasswordRecoveryPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline text-primary">Bíblia Católica em 1 Ano</CardTitle>
        <CardDescription>Recupere sua senha para continuar.</CardDescription>
      </CardHeader>
      <CardContent>
        <PasswordRecoveryForm />
      </CardContent>
       <CardFooter>
         <p className="w-full text-center text-sm text-muted-foreground">
          Lembrou a senha?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Faça login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
