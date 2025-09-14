import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-3xl font-headline text-primary">Bíblia 365</CardTitle>
        <CardDescription>Faça login para continuar sua jornada de leitura.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <LoginForm />
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 p-6 pt-0">
         <p className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Registre-se
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
