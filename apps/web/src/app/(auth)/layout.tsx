export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="grid min-h-svh lg:grid-cols-2">
          {children}
          <div className="relative hidden bg-muted lg:block">
            <img
              src="/images/login.png"
              alt="Pessoa usando computador para acessar o dashboard da Acme Inc."
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] "
            />
          </div>
        </div>
      </main>
    </div>
  );
}
