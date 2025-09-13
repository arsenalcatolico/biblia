"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut, Mail, BarChart3, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { completedDays, loading: progressLoading } = useProgress();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
    router.refresh();
  };

  if (!user) {
    return null; // Layout guard will redirect
  }

  const progressPercentage = ((completedDays.length / 365) * 100).toFixed(1);

  return (
    <div className="container mx-auto max-w-3xl px-4 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold font-headline text-primary dark:text-primary-foreground">Seu Perfil</h1>
        <p className="text-muted-foreground">Gerencie sua conta e veja seu progresso.</p>
      </header>

      <Card>
        <CardHeader className="p-6">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Informações da Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-muted-foreground">
            Você está logado como: <span className="font-semibold text-foreground">{user.email}</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-6">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {progressLoading ? (
             <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div>
                        <p className="text-sm text-muted-foreground">Dias Concluídos</p>
                        <p className="text-2xl font-bold">{completedDays.length}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                    <BarChart3 className="h-8 w-8 text-blue-500" />
                    <div>
                        <p className="text-sm text-muted-foreground">Progresso Total</p>
                        <p className="text-2xl font-bold">{progressPercentage}%</p>
                    </div>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-center">
        <Button variant="destructive" onClick={handleLogout} className="shadow-lg">
          <LogOut className="mr-2 h-4 w-4" />
          Sair da Conta
        </Button>
      </div>
    </div>
  );
}
