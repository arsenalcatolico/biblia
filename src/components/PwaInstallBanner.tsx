
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  
  if (!canInstall && !isIos) {
    return null;
  }

  const IosInstructionsDialog = () => (
     <Card className="bg-accent/10 border-accent/50 text-center">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-bold text-accent-foreground/90">ACESSO RÁPIDO</CardTitle>
        <CardDescription className="text-accent-foreground/80">
          Instale o aplicativo no seu iPhone para uma melhor experiência.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
              <Download className="mr-2 h-5 w-5" />
              Instalar Aplicativo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center font-headline text-2xl">Instalar no seu iPhone</DialogTitle>
              <DialogDescription className="text-center pt-4 text-base">
                Para uma melhor experiência, adicione este aplicativo à sua tela de início.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-center text-sm text-muted-foreground">
                <p>1. Toque no ícone de compartilhamento <ArrowUpFromDot className="inline-block h-4 w-4 mx-1" /> no menu do Safari.</p>
                <p>2. Role para baixo e selecione a opção "Adicionar à Tela de Início".</p>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );

  const AndroidInstallButton = () => (
    <Card className="bg-accent/10 border-accent/50 text-center">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-bold text-accent-foreground/90">ACESSO RÁPIDO</CardTitle>
        <CardDescription className="text-accent-foreground/80">
          Para uma melhor experiência, instale este aplicativo no seu celular.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Button onClick={onInstall} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
          <Download className="mr-2 h-5 w-5" />
          Instalar Aplicativo
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className={cn("my-6", className)}>
        {isIos ? <IosInstructionsDialog /> : (canInstall ? <AndroidInstallButton /> : null)}
    </div>
  );
};
