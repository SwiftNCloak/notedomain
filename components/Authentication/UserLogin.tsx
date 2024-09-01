import React, { useEffect, useState } from 'react';
import { LogIn } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs';
import supabase from '@/utils/supabase';

interface SupabaseUser {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  clerk_user_id: string;
}

const UserLogin: React.FC = () => {
  const { user } = useUser();
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    async function syncUserWithSupabase() {
      if (user) {
        const userEmail = user.primaryEmailAddress?.emailAddress;
        if (!userEmail) return;

        // Check if user exists in Supabase
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('clerk_user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user from Supabase:', error);
          return;
        }

        const userData = {
          clerk_user_id: user.id,
          first_name: user.firstName ?? '',
          last_name: user.lastName ?? '',
          username: user.username ?? '',
          email: userEmail,
          password_hash: 'clerk_managed',
        };

        if (!data) {
          // User doesn't exist in Supabase, so create them
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert(userData)
            .select()
            .single();

          if (createError) {
            console.error('Error creating user in Supabase:', createError);
            return;
          }
          setSupabaseUser(newUser as SupabaseUser);
        } else {
          // User exists, update their information
          const { data: updatedUser, error: updateError } = await supabase
            .from('users')
            .update(userData)
            .eq('clerk_user_id', user.id)
            .select()
            .single();

          if (updateError) {
            console.error('Error updating user in Supabase:', updateError);
            return;
          }
          setSupabaseUser(updatedUser as SupabaseUser);
        }
      }
    }

    syncUserWithSupabase();
  }, [user]);

  return (
    <div className="w-full box-border h-11 max-h-11 hover:bg-[#2b2b2bd9] rounded-lg overflow-y-auto px-3 items-center justify-start flex space-x-2">
      <SignedOut>
        <SignInButton mode="modal">
          <div className="w-full h-full flex items-center cursor-pointer space-x-2 ">
            <LogIn size={17} className="text-[#9f9f9fd9]"/>
            <button className="font-semibold text-sm text-[#9f9f9fd9]">Login</button>
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="w-full h-full flex space-x-3 text-sm items-center justify-start cursor-pointer">
          <UserButton />
          <p className="font-semibold">{supabaseUser?.username}</p>
        </div>
      </SignedIn>
    </div>
  );
};

export default UserLogin;