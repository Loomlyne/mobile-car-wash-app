import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import * as authHelpers from '@/lib/supabase/auth';

type PendingUserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cars?: any[];
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  sendOTP: (phone: string) => Promise<{ error: string | null }>;
  verifyOTP: (phone: string, token: string) => Promise<{ error: string | null }>;
  signUp: (data: PendingUserData) => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  pendingUserData: PendingUserData | null;
  setPendingUserData: (data: PendingUserData | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingUserData, setPendingUserData] = useState<PendingUserData | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendOTP = async (phone: string) => {
    try {
      const { error } = await authHelpers.sendOTP(phone);
      if (error) {
        return { error };
      }
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Failed to send OTP' };
    }
  };

  const verifyOTP = async (phone: string, token: string) => {
    try {
      const { data, error } = await authHelpers.verifyOTP(phone, token);
      if (error) {
        return { error };
      }

      // If there's pending user data, complete the profile
      if (pendingUserData && data?.user) {
        const { error: profileError } = await authHelpers.completeProfile(data.user.id, {
          firstName: pendingUserData.firstName,
          lastName: pendingUserData.lastName,
          email: pendingUserData.email,
        });

        if (profileError) {
          console.error('Error completing profile:', profileError);
        }

        // Clear pending data
        setPendingUserData(null);
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Failed to verify OTP' };
    }
  };

  const signUp = async (data: PendingUserData) => {
    try {
      // Store pending data for after OTP verification
      setPendingUserData(data);

      // Send OTP
      const { error } = await authHelpers.sendOTP(data.phone);
      if (error) {
        setPendingUserData(null);
        return { error };
      }

      return { error: null };
    } catch (err: any) {
      setPendingUserData(null);
      return { error: err.message || 'Failed to sign up' };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await authHelpers.signOut();
      if (error) {
        return { error: error };
      }
      setUser(null);
      setSession(null);
      setPendingUserData(null);
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Failed to sign out' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        sendOTP,
        verifyOTP,
        signUp,
        signOut,
        pendingUserData,
        setPendingUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
