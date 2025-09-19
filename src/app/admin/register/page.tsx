
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/50 p-4">
        <div className="w-full max-w-md space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="text-center p-6">
                <CardTitle className="text-2xl font-headline text-primary">Registrar Novo Usuário</CardTitle>
                <CardDescription className="pt-2">
                  Crie uma nova conta de usuário manualmente no Firebase.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <RegisterForm />
              </CardContent>
            </Card>
            <div className="text-center">
                <Button asChild variant="secondary" className="border">
                    <Link href="/perfil">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Voltar para o Perfil
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  );
}
