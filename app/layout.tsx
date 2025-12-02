import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. Import the ChatBot
import ChatBot from "./ChatBot"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sai Ruchit Kumar | Data Analyst",
  description: "Portfolio of Sai Ruchit Kumar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Add the ChatBot Component here */}
        <ChatBot /> 
        {children}
      </body>
    </html>
  );
}