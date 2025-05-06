import { ModeToggle } from "@/shared/components/mode-toggle";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <ModeToggle />
      <main className="flex-1">{children}</main>
    </div>
  );
}
