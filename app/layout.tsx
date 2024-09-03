"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider, SignIn, SignInButton, useUser } from '@clerk/nextjs';

import DomainContainer from "@/components/Middle/DomainContainer";
import NotesContainer from "@/components/Middle/NotesContainer";
import ChatContainer from "@/components/Middle/ChatContainer";

const inter = Inter({ subsets: ["latin"] });

function AuthAwareContent({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="bg-[#e8e8e8] dark:bg-[#1f1f1f]"></div>;
  }

  // Shows up assuming user isn't logged in
  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e8e8e8] dark:bg-[#1f1f1f]">
        <SignInButton mode="modal" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden square-background">
        <DomainContainer />
        <NotesContainer />
        <main className="flex-1 overflow-auto">
          <NextTopLoader color="#00D166" showSpinner={false} />
          {children}
        </main>
        <ChatContainer />
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <head>
          <title>NoteDomain</title>
        </head>
        <body className={`${inter.className} bg-[#f0f0f0] dark:bg-[#191919] text-[#191919] dark:text-[#f0f0f0] h-full`}>
          <AuthAwareContent>{children}</AuthAwareContent>
        </body>
      </html>
    </ClerkProvider>
  );
}