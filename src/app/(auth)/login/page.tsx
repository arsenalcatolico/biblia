import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-3xl font-headline text-primary">Bíblia Católica em 1 Ano</CardTitle>
        <CardDescription className="text-3xl font-semibold">Explicada</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <LoginForm />
      </CardContent>
    </Card>
  );
}
