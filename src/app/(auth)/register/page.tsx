import { RegisterForm } from '@/components/auth/RegisterForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline text-primary">Crie sua Conta</CardTitle>
        <CardDescription>Comece sua jornada de leitura bíblica diária.</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
       <CardFooter>
         <p className="w-full text-center text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Faça login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
