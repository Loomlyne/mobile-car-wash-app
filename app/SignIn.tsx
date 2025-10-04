import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import CountryPicker, { Country, getCallingCode } from 'react-native-country-picker-modal';
import { useAuth } from './context/AuthContext';

export default function SignIn() {
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('AE'); // default UAE
  const [callingCode, setCallingCode] = useState('971');

  const router = useRouter();
  const { setConfirmation } = useAuth();

  const isValidPhone = /^\d{6,}$/.test(phone.trim());

  const handleSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    getCallingCode(country.cca2).then(setCallingCode);
  };

  const handleSignIn = async () => {
    try {
      // if (!agree) {
      //   setError('Please agree to the terms first');
      //   return;
      // }
      // setLoading(true);
      // setError('');

      // const fullPhone = `+${callingCode}${phone.trim()}`;

      // // ✅ With Firebase SDK on mobile, no recaptchaVerifier is needed.
      // const confirmation = await signInWithPhoneNumber(auth, fullPhone);

      // setConfirmation(confirmation);
      // router.push({
      //   pathname: '/VerificationCode',
      //   params: { phone: fullPhone },
      // });
      console.log("logging in")
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send OTP');
    } finally {
      router.push("/")
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 🚨 Removed <FirebaseRecaptchaVerifierModal /> */}

      <LinearGradient colors={['#FFCC00', '#FFFFFF']} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <Text style={styles.title}>Sign in</Text>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.container}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneInputRow}>
          <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag
            withCallingCode
            withEmoji
            onSelect={handleSelectCountry}
          />
          <Text style={styles.callingCode}>+{callingCode}</Text>

          <TextInput
            style={styles.phoneInput}
            placeholder="Phone number"
            placeholderTextColor="#BDBDBD"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgree(!agree)}>
          <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
            {agree && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
          <Text style={styles.agreementText}>
            I agree to Royal Service Public Agreement, Terms, Privacy Policy.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signInButton, isValidPhone && agree && styles.signInButtonActive]}
          disabled={!isValidPhone || !agree || loading}
          onPress={handleSignIn}
        >
          {loading ? (
            <ActivityIndicator color={isValidPhone && agree ? '#fff' : '#222'} />
          ) : (
            <Text
              style={[
                styles.signInButtonText,
                isValidPhone && agree && styles.signInButtonTextActive,
              ]}
            >
              Sign in
            </Text>
          )}
        </TouchableOpacity>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.guestText}>Continue as a Guest</Text>
        </TouchableOpacity>

        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Create A New Account? </Text>
          <TouchableOpacity onPress={() => router.push('/SignUp')}>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  headerGradient: {
    height: 120,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#222',
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F2F2F2',
    borderRadius: 32,
    paddingHorizontal: 12,
  },
  countryCode: {
    marginRight: 8,
    fontWeight: 'bold',
    color: '#222',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
  },
  checkboxRow: {
    
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  agreementText: {
    fontSize: 12,
    color: '#888',
    flex: 1,
  },
  signInButton: {
    backgroundColor: '#F2F2F2',
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    marginTop:"50%",
  },
  signInButtonActive: {
    backgroundColor: '#FF9800',
  },
  signInButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signInButtonTextActive: {
    color: '#fff',
  },
  guestText: {
    textAlign: 'center',
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginBottom: 16,
  },
  orText: {
    color: '#888',
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
  signUpLink: {
    color: '#FF9800',
    fontWeight: 'bold',
    fontSize: 14,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 13,
  },
});