
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";

const adminEmail = 'allannakaya@gmail.com';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState('');

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (user.email !== adminEmail) {
        router.replace("/");
      } else {
        // User is admin, now check local storage for key auth
        const storedKey = process.env.NEXT_PUBLIC_ADMIN_REGISTER_KEY;
        try {
            const adminAuth = sessionStorage.getItem('adminAuthenticated');
            if (adminAuth === 'true' && storedKey) {
                setIsAuthenticated(true);
            }
        } catch (e) {
            console.error("Could not access sessionStorage");
        }
        setIsLoading(false);
      }
    }
  }, [user, loading, router]);
  
  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedKey = process.env.NEXT_PUBLIC_ADMIN_REGISTER_KEY;
    if (storedKey && key === storedKey) {
        try {
            sessionStorage.setItem('adminAuthenticated', 'true');
        } catch(e) {
            console.error("Could not access sessionStorage");
        }
      setIsAuthenticated(true);
    } else {
      alert('Chave incorreta.');
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
     return (
       <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
                <LockKeyhole className="mx-auto h-12 w-12 text-primary"/>
                <CardTitle className="text-2xl font-headline">Acesso Restrito</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleKeySubmit} className="space-y-4">
                    <p className="text-muted-foreground text-center">
                        Por favor, insira a chave de acesso de administrador para continuar.
                    </p>
                    <Input 
                        type="password"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Chave de Administrador"
                    />
                    <Button type="submit" className="w-full">
                        Verificar
                    </Button>
                </form>
            </CardContent>
        </Card>
       </div>
    );
  }


  return <>{children}</>;
}
