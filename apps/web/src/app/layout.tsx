import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { ModeToggle } from "@/shared/presentation/components/mode-toggle";
import { ThemeCustomizer } from "@/shared/presentation/components/theme-customizer";
import "@package/ui/globals.css";
import "@package/ui/theme.css";
const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Pular para o conteúdo principal
        </a>
        <header className="fixed top-4 right-4 z-10 flex gap-2">
          <ModeToggle />
          <ThemeCustomizer />
        </header>
        <Providers>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Acme Inc. Dashboard",
  description: "Dashboard moderno e acessível da Acme Inc. com Next.js.",
  openGraph: {
    title: "Acme Inc. Dashboard",
    description: "Dashboard moderno e acessível da Acme Inc. com Next.js.",
    url: "https://acme.inc",
    images: [
      {
        url: "https://acme.inc/logo.png",
        width: 600,
        height: 600,
        alt: "Acme Inc. Dashboard",
      },
    ],
    type: "website",
  },
};
