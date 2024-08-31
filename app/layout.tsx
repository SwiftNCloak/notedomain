"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';

import NavBar from "@/components/Top/NavBar";
import DomainContainer from "@/components/Middle/DomainContainer";
import NotesContainer from "@/components/Middle/NotesContainer";
import ChatContainer from "@/components/Middle/ChatContainer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-[#f0f0f0] dark:bg-[#191919] text-[#191919] dark:text-[#f0f0f0] h-full`}>
        <div className="flex flex-col h-screen">
          <div className="flex flex-1 overflow-hidden square-background">
            <DomainContainer />
            <NotesContainer />
            <main className="flex-1 overflow-auto">
              <NavBar />
              <NextTopLoader color="#00D166" showSpinner={false} />
              {children}
            </main>
            <ChatContainer />
          </div>
        </div>
      </body>
    </html>
  );
}