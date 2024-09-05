"use client"

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider, SignIn, SignInButton, useUser } from '@clerk/nextjs';

import DomainContainer from "@/components/Middle/DomainContainer";
import NotesContainer from "@/components/Middle/NotesContainer";
import ChatContainer from "@/components/Middle/ChatContainer";

import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

interface Domain {
  id: string;
  name: string;
  icon_url: string;
  created_by: string;
}

function AuthAwareContent({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      // Automatically select the NoteDomain when the user is signed in
      const noteDomain: Domain = {
        id: 'note-domain',
        name: 'NoteDomain',
        icon_url: '',
        created_by: 'Made by SwiftNCloak'
      };
      setSelectedDomain(noteDomain);
    }
  }, [isSignedIn]);

  const handleDomainSelect = (domain: Domain) => {
    setSelectedDomain(domain);
  };

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
        <DomainContainer onDomainSelect={handleDomainSelect} initialSelectedDomain={selectedDomain} />
        <NotesContainer selectedDomain={selectedDomain} />
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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
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