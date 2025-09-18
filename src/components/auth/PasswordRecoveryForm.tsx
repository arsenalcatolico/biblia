"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
});

export function PasswordRecoveryForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, values.email);
      
      if (signInMethods && signInMethods.length > 0) {
        // Email exists, redirect to instructions page
        router.push(`/recuperar-senha/instrucoes?email=${encodeURIComponent(values.email)}`);
      } else {
        // Email does not exist
        toast({
          variant: 'destructive',
          title: 'E-mail não encontrado',
          description: 'Nenhum usuário foi encontrado com este endereço de e-mail.',
        });
      }
    } catch (error: any) {
      // The most common error is auth/network-request-failed if the rules are blocking,
      // but if the email doesn't exist, it can also throw an auth/invalid-email error on some configurations,
      // although it is less common. Let's treat any error as "user not found" for security.
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
         toast({
          variant: 'destructive',
          title: 'E-mail não encontrado',
          description: 'Nenhum usuário foi encontrado com este endereço de e-mail.',
        });
      } else {
        // For other potential errors (like network issues), give a more generic message.
        console.error("Password recovery check error:", error);
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Ocorreu um erro ao verificar seu e-mail. Verifique sua conexão ou tente novamente mais tarde.',
        });
      }
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Recuperar Acesso
        </Button>
      </form>
    </Form>
  );
}
