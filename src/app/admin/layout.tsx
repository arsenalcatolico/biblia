import { FooterNav } from "@/components/FooterNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow flex items-center justify-center bg-secondary/50 p-4 pb-24">
          <div className="w-full max-w-md">{children}</div>
      </main>
      <FooterNav />
    </div>
  );
}
