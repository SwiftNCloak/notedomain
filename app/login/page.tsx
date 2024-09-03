"use client"

import { SignInButton } from "@clerk/nextjs";
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="px-8 py-6 text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-md w-full">
        <Image
          src="/logo.png"  // Replace with your actual logo path
          alt="NoteDomain Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Welcome to NoteDomain</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Sign in to access your notes and domains</p>
        <SignInButton mode="modal">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 w-full">
            Sign In
          </button>
        </SignInButton>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  );
}