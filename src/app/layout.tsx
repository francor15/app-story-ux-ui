import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Background from "@/components/shared/Background";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Story Generator",
  description: "Create a story with artificial intelligence"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950`} suppressHydrationWarning={true}>
        <div className="relative  overflow-hidden ">
          <Background />
          <Navbar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
