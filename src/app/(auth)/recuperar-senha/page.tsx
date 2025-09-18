import { PasswordRecoveryForm } from '@/components/auth/PasswordRecoveryForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PasswordRecoveryPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-2xl font-headline text-primary">Recuperar Acesso</CardTitle>
        <CardDescription className="pt-2">
          Insira o e-mail que você usou na compra para ver as instruções de acesso.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <PasswordRecoveryForm />
      </CardContent>
       <CardFooter className="p-6 pt-0">
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
