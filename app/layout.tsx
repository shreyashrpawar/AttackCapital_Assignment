import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";

import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scheme-only-dark">
      <body className={`${fontSans.variable} font-sans antialiased`}>
<AuthProvider> {children}</AuthProvider>     
      </body>
    </html>
  );
}
