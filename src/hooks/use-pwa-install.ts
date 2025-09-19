
"use client";

import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePwaInstall() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Detect iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isInStandaloneMode = 'standalone' in window.navigator && (window.navigator as any).standalone;
    
    // Only show iOS instructions if it's an iOS device and not already installed
    if (isIosDevice && !isInStandaloneMode) {
      setIsIos(true);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const pwaEvent = event as BeforeInstallPromptEvent;
      setInstallPrompt(pwaEvent);
      // Only show install button if not already installed (via display-mode)
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setCanInstall(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setCanInstall(false);
      setInstallPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installPwa = useCallback(async () => {
    if (!installPrompt) {
      return;
    }
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the PWA installation');
      setCanInstall(false);
    } else {
      console.log('User dismissed the PWA installation');
    }
    setInstallPrompt(null);
  }, [installPrompt]);

  return { canInstall, installPwa, isIos };
}
