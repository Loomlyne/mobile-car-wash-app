import { useCarContext } from '@/components/CarContext';
import { Ionicons } from '@expo/vector-icons';
import bcrypt from 'bcryptjs';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
// ✅ Use react-native-firebase instead of expo-firebase-recaptcha
import auth from '@react-native-firebase/auth';
import { useAuth } from './context/AuthContext';

bcrypt.setRandomFallback((len) => {
  const buf = new Array(len);
  for (let i = 0; i < len; ++i) {
    buf[i] = Math.floor(Math.random() * 256);
  }
  return buf;
});

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('AE');
  const [country, setCountry] = useState<Country | null>(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const { cars } = useCarContext();
  const router = useRouter();
  const { setConfirmation, setPendingUserData } = useAuth();

  const isValidPhone = /^\d{8,}$/.test(phone.trim());
  const isValid = firstName && lastName && isValidPhone && password && agree;
  const getDialCode = () => country?.callingCode?.[0] || '971';

  const handleSignUp = async () => {
    // if (!isValid) {
    //   setError('Please fill all fields.');
    //   return;
    // }
    // setLoading(true);
    // setError('');
    try {
      // const dialCode = getDialCode();
      // const fullPhone = `+${dialCode}${phone.trim()}`;
      
      // // store pending user data in context
      // setPendingUserData({
      //   firstName,
      //   lastName,
      //   email,
      //   phone: fullPhone,
      //   cars,
      // });

      // // ✅ Send OTP (no recaptcha required with react-native-firebase)
      // const confirmation = await auth().signInWithPhoneNumber(fullPhone);
      // setConfirmation(confirmation);

      router.push('/VerificationCode');
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    } finally {
      // setLoading(false);
      console.log("logged in")
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <LinearGradient colors={['#FFCC00', '#FFFFFF']} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <Text style={styles.title}>Sign up</Text>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.skipText}>Skip ›</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.form}>

        {/* First & Last Name */}
        <Text style={styles.label}>First & Last Name</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Enter your First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter your Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Phone */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneInputRow}>
          <TouchableOpacity onPress={() => setShowCountryPicker(true)}>
            <CountryPicker
              countryCode={countryCode}
              withFlag
              withCallingCode
              withFilter
              withEmoji
              visible={showCountryPicker}
              onSelect={(c: Country) => {
                setCountryCode(c.cca2);
                setCountry(c);
                setShowCountryPicker(false);
              }}
              onClose={() => setShowCountryPicker(false)}
            />
          </TouchableOpacity>
          <Text style={styles.dialCode}>+{getDialCode()}</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Add Car */}
        <TouchableOpacity style={styles.addCarRow} onPress={() => router.push('/AddCar')}>
          <Image source={require('../assets/images/truck.png')} style={styles.addCarIcon} />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold', color: '#222', marginLeft: 10 }}>Cars</Text>
            <Text style={styles.addCarText}>Add Car</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.signUpButton, isValid && styles.signUpButtonActive]}
          disabled={!isValid || loading}
          onPress={handleSignUp}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signUpButtonText}>Sign up</Text>
          )}
        </TouchableOpacity>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        {/* Checkbox */}
        <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgree(!agree)}>
          <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
            {agree && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
          <Text style={styles.agreementText}>
            I agree to Royal Services <Text style={{ fontWeight: 'bold' }}>Public Agreement, Terms, Privacy Policy.</Text>
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already Have An Account? </Text>
          <TouchableOpacity onPress={() => router.push('/SignIn')}>
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// (keep your styles the same)

const styles = StyleSheet.create({
  headerGradient: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
   marginTop: 10,
    fontWeight: 'bold',
    color: '#000',
  },
    header: {   
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  skipText: { fontSize: 16, color: '#FF9800', fontWeight: '600', marginTop: 15,alignSelf: 'flex-end',marginLeft: 200},

  form: { padding: 24 },
  row: { flexDirection: 'row', marginBottom: 12 },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#222',
  },
  input: {
    borderWidth: 0,
    backgroundColor: '#F2F2F2',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 20,        
    marginBottom: 12,
    fontSize: 16,
    color: '#222',
  },

  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 50,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  dialCode: { marginLeft: 4, fontWeight: '500' },
  phoneInput: { flex: 1, paddingVertical: 12, paddingHorizontal: 12, fontSize: 16 },

  passwordRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  eyeIcon: { position: 'absolute', right: 20 },

  addCarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  addCarText: { flex: 1, marginLeft: 10, fontSize: 16, color: '#444' },
  addCarIcon: { width: 50, height: 50 },
  signUpButton: {
    backgroundColor: '#FF9800',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  signUpButtonActive: { backgroundColor: '#FF9800' },
  signUpButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  errorText: { color: 'red', textAlign: 'center', marginBottom: 8 },

  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#FF9800', borderColor: '#FF9800' },
  agreementText: { fontSize: 12, color: '#444', flex: 1 },

  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  footerText: { color: '#888' },
  signInLink: { color: '#FF9800', fontWeight: '600' },
});
