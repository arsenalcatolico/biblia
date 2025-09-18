
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Bíblia Católica em 1 Ano',
  description: 'Explicada',
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1E3A8A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
            <SettingsProvider>
                <ProgressProvider>
                    <div vaul-drawer-wrapper="">{children}</div>
                    <Toaster />
                </ProgressProvider>
            </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
