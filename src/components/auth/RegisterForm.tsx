
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: 'biblia@catolica365',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Usuário Criado com Sucesso!',
        description: `O usuário ${values.email} foi registrado e já pode fazer login.`,
        className: "border-green-500 bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-200",
      });
      // Limpa o formulário para o próximo registro
      form.reset({ email: '', password: 'biblia@catolica365' });
    } catch (error: any) {
       let description = 'Ocorreu um erro. Tente novamente.';
       if (error.code) {
         switch (error.code) {
           case 'auth/email-already-in-use':
             description = 'Este e-mail já está em uso.';
             break;
           case 'auth/weak-password':
             description = 'A senha é muito fraca. Tente uma mais forte.';
             break;
           case 'auth/invalid-email':
             description = 'O e-mail fornecido não é válido.';
             break;
           default:
             description = `Erro: ${error.message}`;
         }
       }
       toast({
        variant: 'destructive',
        title: 'Erro no registro',
        description: description,
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
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Crie uma senha forte"
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Criar conta
        </Button>
      </form>
    </Form>
  );
}
