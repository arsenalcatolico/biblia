
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowUpFromDot } from "lucide-react";
import { cn } from "@/lib/utils";

interface PwaInstallBannerProps {
  canInstall: boolean;
  isIos: boolean;
  onInstall: () => void;
  className?: string;
}

export const PwaInstallBanner = ({ canInstall, isIos, onInstall, className }: PwaInstallBannerProps) => {
  
  const IosInstructions = () => (
    <Card className={cn("border-accent bg-accent/10", className)}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-headline text-accent-foreground/90 text-center">Instalar no seu iPhone</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className="text-accent-foreground/80 text-sm text-center">
          Para uma melhor experiência, adicione à sua tela de início. Toque no ícone de <ArrowUpFromDot className="inline-block h-4 w-4 mx-1" /> e depois em "Adicionar à Tela de Início".
        </p>
      </CardContent>
    </Card>
  );

  const AndroidInstallButton = () => (
     <Card className={cn("border-accent bg-accent/10 my-6", className)}>
      <CardHeader className="p-4 pb-4">
        <CardTitle className="text-xl font-headline text-accent-foreground/90 text-center">Acesso Rápido</CardTitle>
          <CardDescription className="text-accent-foreground/80 text-base text-justify px-2 pt-2">
          Instale o aplicativo em seu celular para uma experiência melhor e acesso direto pela tela inicial.
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Button onClick={onInstall} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
          <Download className="mr-2 h-5 w-5" />
          Instalar Aplicativo
        </Button>
      </CardFooter>
    </Card>
  );

  if (isIos) {
    return <IosInstructions />;
  }

  if (canInstall) {
    return <AndroidInstallButton />;
  }

  return null;
};
