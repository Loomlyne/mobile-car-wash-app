// context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebase/firebase"; // your firebase config
type PendingUserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cars: any[];
};
type AuthContextType = {
  confirmation: any;
  setConfirmation: (c: any) => void;
  sendOtp: (phone: string, recaptchaVerifier: any) => Promise<void>;
  pendingUserData: PendingUserData | null;
  setPendingUserData: (data: PendingUserData | null) => void;
};



const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [confirmation, setConfirmation] = useState<any>(null);
  const [pendingUserData, setPendingUserData] = useState<PendingUserData | null>(null);
  const sendOtp = async (phone: string, recaptchaVerifier: any) => {
    const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    setConfirmation(confirmationResult);
  };

  return (
    <AuthContext.Provider value={{ confirmation, setConfirmation, sendOtp ,pendingUserData, setPendingUserData}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
