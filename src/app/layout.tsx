import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gasflow — Gasless NFT Certificates",
  description:
    "Mint NFT certificates on Base Sepolia without ETH gas fees. Powered by UGF (Universal Gas Framework).",
  keywords: ["NFT", "gasless", "Base Sepolia", "UGF", "certificate", "Web3"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-surface text-primary-100 antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
