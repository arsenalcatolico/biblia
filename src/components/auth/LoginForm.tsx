
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().optional(),
});

const defaultPassword = 'biblia@catolica365';
const adminEmail = 'allannakaya@gmail.com';
const whatsappNumber = '5512992045561';

interface LoginFormProps {
  defaultEmail?: string;
}

export function LoginForm({ defaultEmail = '' }: LoginFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail,
      password: '',
    },
  });

  const emailValue = form.watch('email');

  useEffect(() => {
    setIsAdmin(emailValue.toLowerCase() === adminEmail);
  }, [emailValue]);

  const generateWhatsAppLink = () => {
    const baseMessage = `Olá, Ana! Estou com dificuldades para acessar o aplicativo 'Bíblia Católica em 1 Ano'.`;
    const emailMessage = emailValue ? ` Meu e-mail de compra é ${emailValue}.` : ``;
    const fullMessage = `${baseMessage}${emailMessage} Pode me ajudar?`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const password = isAdmin ? values.password : defaultPassword;

    if (isAdmin && (!password || password.length < 6)) {
        toast({
            variant: 'destructive',
            title: 'Senha Inválida',
            description: 'Por favor, insira sua senha de administrador.',
        });
        setIsLoading(false);
        return;
    }

    try {
      await signInWithEmailAndPassword(auth, values.email, password!);
      router.push('/');
      router.refresh();
    } catch (error: any) {
      let errorMessage = 'E-mail não encontrado. Verifique se é o mesmo e-mail usado na compra.';
      if (error.code === 'auth/wrong-password') {
          errorMessage = isAdmin ? 'A senha está incorreta. Tente novamente.' : 'E-mail não encontrado ou erro de acesso.';
      }

      toast({
        variant: 'destructive',
        title: 'Erro de acesso',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu e-mail de compra</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {isAdmin && (
           <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha de Administrador</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Digite sua senha"
                        className="pr-10" 
                        {...field}
                      />
                    </FormControl>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>

        {!isAdmin && (
            <p className="w-full text-center text-sm text-muted-foreground pt-2">
                Problemas com o acesso?{' '}
                <a 
                  href={generateWhatsAppLink()} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                    Falar com a Ana
                </a>
            </p>
        )}
      </form>
    </Form>
  );
}
