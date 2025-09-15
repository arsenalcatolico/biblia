"use client";

import { useState } from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, ShieldAlert } from 'lucide-react';

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_REGISTER_KEY || "change-this-secret-key";

export default function AdminRegisterPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  const handleAuthorization = () => {
    if (inputKey === ADMIN_KEY) {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Chave de administrador incorreta.');
    }
  };
  
  if (ADMIN_KEY === "change-this-secret-key") {
      return (
        <div className="container mx-auto max-w-lg p-4">
            <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Configuração de Segurança Necessária</AlertTitle>
                <AlertDescription>
                    A chave de administrador padrão está em uso. Por favor, configure a variável de ambiente NEXT_PUBLIC_ADMIN_REGISTER_KEY para proteger esta página.
                </AlertDescription>
            </Alert>
        </div>
      )
  }

  if (!isAuthorized) {
    return (
       <Card className="shadow-lg">
        <CardHeader className="text-center p-6">
          <CardTitle className="text-2xl font-headline text-primary">Acesso Restrito</CardTitle>
          <CardDescription>
            Insira a chave de administrador para criar uma nova conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-4">
            <Input 
                type="password"
                placeholder="Chave de Administrador"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuthorization()}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleAuthorization} className="w-full">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Autorizar
            </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-2xl font-headline text-primary">Criar Novo Usuário</CardTitle>
        <CardDescription>
          Preencha os dados para a nova conta.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <RegisterForm />
      </CardContent>
    </Card>
  );
}