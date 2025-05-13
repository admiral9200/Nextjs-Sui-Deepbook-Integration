import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WalletConnect from "@/components/WalletConnect";
import MobileNav from "@/components/MobileNav";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SUI Prediction Markets",
  description: "Prediction markets on the SUI blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <header className="border-b">
            <div className="container mx-auto p-4 flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <a href="/" className="text-xl font-bold">SUI Markets</a>
                <nav className="hidden md:flex space-x-6">
                  <a href="/markets" className="hover:text-blue-600">Markets</a>
                  <a href="/portfolio" className="hover:text-blue-600">Portfolio</a>
                  <a href="/create-market" className="hover:text-blue-600">Create Market</a>
                </nav>
              </div>
              <div className="flex items-center">
                <WalletConnect />
                <div className="ml-4">
                  <MobileNav />
                </div>
              </div>
            </div>
          </header>
          <main>
            {children}
          </main>
          <footer className="border-t mt-12">
            <div className="container mx-auto p-6 text-center text-sm text-gray-500">
              <p>© 2024 SUI Prediction Markets. This is a demo application.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}








