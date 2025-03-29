import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/sections/Cart";

export const metadata: Metadata = {
  title: "Ecommerse shop with 3D preview",
  description: "Ecommerse shop with 3D preview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-stone-950">
      <CartProvider>
        <body>{children}</body>
      </CartProvider>
    </html>
  );
}
