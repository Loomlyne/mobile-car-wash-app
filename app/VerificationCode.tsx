import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from './context/AuthContext';

export default function VerificationCode() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useLocalSearchParams();
  const phone = params.phone as string;
  const isSignUp = params.isSignUp === 'true';
  const [timer, setTimer] = useState(20);
  const [resending, setResending] = useState(false);
  const otpValue = otp.join('');
  const activeIndex = otp.findIndex((d) => d === '');
  const { verifyOTP, sendOTP } = useAuth();
  const handleChange = (text: string) => {
    let clean = text.replace(/[^0-9]/g, '').slice(0, 6);
    let arr = clean.split('');
    while (arr.length < 6) arr.push('');
    setOtp(arr);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: verifyError } = await verifyOTP(phone, code);

      if (verifyError) {
        setError(verifyError);
        setLoading(false);
        return;
      }

      // Success - navigate to home
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Verification failed');
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setTimer(20);
  }, []);

  React.useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      const { error: resendError } = await sendOTP(phone);
      if (resendError) {
        setError(resendError);
      } else {
        setTimer(20);
        setOtp(['', '', '', '', '', '']);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Gradient Header */}
      <LinearGradient colors={['#FFCC00', '#FFFFFF']} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <ThemedText type="title" style={styles.title}>
            Verification code
          </ThemedText>
          <TextWithBoldInbox style={styles.subtitle} />
        </SafeAreaView>
      </LinearGradient>

      {/* OTP Input Row */}
      <TouchableOpacity activeOpacity={1} onPress={focusInput} style={styles.otpRow}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const isActive = i === (activeIndex === -1 ? 5 : activeIndex);
          const filled = otp[i] && otp[i] !== '';
          return (
            <View
              key={i}
              style={[
                styles.otpCircle,
                isActive && styles.otpCircleActive,
                filled && !isActive && styles.otpCircleFilled,
              ]}
            >
              <ThemedText
                style={[
                  styles.otpText,
                  isActive && styles.otpTextActive,
                  filled && !isActive && styles.otpTextFilled,
                ]}
              >
                {otp[i]}
              </ThemedText>
            </View>
          );
        })}
        <TextInput
          ref={inputRef}
          value={otpValue}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={6}
          style={styles.hiddenInput}
          autoFocus
        />
      </TouchableOpacity>

      {/* Timer */}
      <ThemedText style={styles.timerText}>
        {timer > 0 ? (
          <>
            Re-Send Code In{' '}
            <ThemedText style={styles.timerOrange}>
              00:{timer.toString().padStart(2, '0')}
            </ThemedText>
          </>
        ) : (
          <TouchableOpacity
            onPress={handleResend}
            disabled={resending}
            style={{ padding: 4 }}
          >
            <ThemedText
              style={[styles.timerOrange, { opacity: resending ? 0.5 : 1 }]}
            >
              {resending ? 'Resending...' : 'Resend Code'}
            </ThemedText>
          </TouchableOpacity>
        )}
      </ThemedText>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          otp.join('').length < 6 && { opacity: 0.5 },
        ]}
        onPress={handleVerify}
        disabled={loading || otp.join('').length < 6}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.continueButtonText}>Continue</ThemedText>
        )}
      </TouchableOpacity>

      {!!error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

function TextWithBoldInbox({ style }: { style?: any }) {
  return (
    <ThemedText style={style}>
      We just sent you a verify code. Check{' '}
      <ThemedText style={{ fontWeight: 'bold' }}>your inbox</ThemedText> to get
      them.
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  headerGradient: {
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    width: '90%',
   
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  otpCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpCircleActive: {
    backgroundColor: '#222',
    borderColor: '#222',
  },
  otpCircleFilled: {
    backgroundColor: '#E0E0E0',
    borderColor: '#E0E0E0',
  },
  otpText: {
    fontSize: 20,
    color: '#222',
    fontWeight: 'bold',
  },
  otpTextActive: {
    color: '#fff',
  },
  otpTextFilled: {
    color: '#222',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: 48,
  },
  timerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
    marginBottom: 24,
    fontSize: 14,
  },
  timerOrange: {
    color: '#FF9800',
    fontWeight: 'bold',
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: '#FF9800',
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 13,
  },
});
