
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  );

  const AndroidInstallButton = () => (
    <Button onClick={onInstall} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
      <Download className="mr-2 h-5 w-5" />
      Instalar Aplicativo
    </Button>
  );

  return (
    <div className={cn("my-6", className)}>
        {isIos ? <IosInstructionsDialog /> : <AndroidInstallButton />}
    </div>
  );
};
