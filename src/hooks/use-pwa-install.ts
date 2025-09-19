
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
    // --- START DEBUGGING LOGIC ---
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forcePwaView = urlParams.get('force_pwa_view');
      
      if (forcePwaView === 'ios') {
        setIsIos(true);
        setCanInstall(false);
        return; // Skip real detection
      }
      if (forcePwaView === 'android') {
        setIsIos(false);
        setCanInstall(true);
        return; // Skip real detection
      }
    } catch (e) {
      // Silently ignore errors in case of non-browser environment
    }
    // --- END DEBUGGING LOGIC ---

    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isInStandaloneMode = 'standalone' in window.navigator && (window.navigator as any).standalone;
    
    if (isIosDevice && !isInStandaloneMode) {
      setIsIos(true);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const pwaEvent = event as BeforeInstallPromptEvent;
      setInstallPrompt(pwaEvent);
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
    // Debugging override
     try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('force_pwa_view') === 'android') {
            alert('Simulação: O prompt de instalação do Android apareceria agora.');
            return;
        }
    } catch(e) {}


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
