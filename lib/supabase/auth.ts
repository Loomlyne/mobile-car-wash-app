import { supabase } from './client';

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/**
 * Send OTP to phone number
 */
export async function sendOTP(phone: string) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error sending OTP:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Verify OTP and sign in
 */
export async function verifyOTP(phone: string, token: string) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Sign up with phone and create profile
 */
export async function signUp(signUpData: SignUpData) {
  try {
    // First send OTP
    const { data: otpData, error: otpError } = await supabase.auth.signInWithOtp({
      phone: signUpData.phone,
    });

    if (otpError) throw otpError;

    // Store pending user data in AsyncStorage to complete after OTP verification
    return { data: otpData, error: null, pendingData: signUpData };
  } catch (error: any) {
    console.error('Error signing up:', error);
    return { data: null, error: error.message, pendingData: null };
  }
}

/**
 * Complete profile after OTP verification
 */
export async function completeProfile(userId: string, profileData: Omit<SignUpData, 'phone'>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        email: profileData.email,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error completing profile:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Sign out
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error signing out:', error);
    return { error: error.message };
  }
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (error: any) {
    console.error('Error getting current user:', error);
    return { user: null, error: error.message };
  }
}

/**
 * Get current session
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session, error: null };
  } catch (error: any) {
    console.error('Error getting session:', error);
    return { session: null, error: error.message };
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}
