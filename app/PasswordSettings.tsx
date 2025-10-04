import { FontAwesome } from '@expo/vector-icons';
import bcrypt from 'bcryptjs';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

bcrypt.setRandomFallback((len) => {
  const buf = new Array(len);
  for (let i = 0; i < len; ++i) {
    buf[i] = Math.floor(Math.random() * 256);
  }
  return buf;
});

const ORANGE = '#FF9800';
const { width } = Dimensions.get('window');

export default function PasswordSettingsScreen() {
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');
    if (!current || !newPass || !confirm) {
      setError('Please fill all fields.');
      return;
    }
    if (newPass !== confirm) {
      setError('New passwords do not match.');
      return;
    }
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('User not found.');
        return;
      }
      // Fetch user profile by phone
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('id, password')
        .eq('phone', `+${user.phone}`)
        .single();
      if (fetchError || !profile) {
        setError('Profile not found.');
        return;
      }
      // Compare current password
      const isMatch = await bcrypt.compare(current, profile.password);
      if (!isMatch) {
        setError('Current password is incorrect.');
        return;
      }
      // Hash new password
      const hashedNew = await bcrypt.hash(newPass, 10);
      // Update password in DB
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ password: hashedNew })
        .eq('id', profile.id);
      if (updateError) {
        setError('Failed to update password.');
        return;
      }
      setSuccess('Password updated successfully!');
      setCurrent(''); setNewPass(''); setConfirm('');
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header */}
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image
                resizeMode='contain'
                source={require('../assets/images/back.png')}
                style={[styles.backIcon, { transform: [{ scaleX: isRTL ? -1 : 1 }] }]}
                tintColor={theme.textPrimary}
              />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary, textTransform: 'capitalize' }]}>Password settings</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

        <View style={styles.formSection}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Change Password</Text>
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: theme.textPrimary }]}>Current Password</Text>
            <View style={[styles.inputRow, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.textTertiary}
                value={current}
                onChangeText={setCurrent}
                secureTextEntry={!showCurrent}
              />
              <TouchableOpacity onPress={() => setShowCurrent(v => !v)}>
                <FontAwesome name={showCurrent ? 'eye' : 'eye-slash'} size={18} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: theme.textPrimary }]}>New Password</Text>
            <View style={[styles.inputRow, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.textTertiary}
                value={newPass}
                onChangeText={setNewPass}
                secureTextEntry={!showNew}
              />
              <TouchableOpacity onPress={() => setShowNew(v => !v)}>
                <FontAwesome name={showNew ? 'eye' : 'eye-slash'} size={18} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: theme.textPrimary }]}>Confirm New Password</Text>
            <View style={[styles.inputRow, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.textTertiary}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity onPress={() => setShowConfirm(v => !v)}>
                <FontAwesome name={showConfirm ? 'eye' : 'eye-slash'} size={18} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={[styles.forgotBtnText, { color: theme.textPrimary }]}>Forget Password</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
        {!!error && <Text style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>{error}</Text>}
        {!!success && <Text style={{ color: 'green', textAlign: 'center', marginBottom: 8 }}>{success}</Text>}
        <TouchableOpacity style={[styles.sendBtn, { backgroundColor: theme.primaryOrange }]} onPress={handleChangePassword}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  formSection: { marginHorizontal: 18, marginTop: 24 },
  sectionTitle: { color: '#222', fontWeight: 'bold', fontSize: 18, marginBottom: 18 },
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { color: '#222', fontWeight: 'bold', fontSize: 15, marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: 12, paddingHorizontal: 14 },
  input: { flex: 1, color: '#222', fontSize: 15, paddingVertical: 14 },
  forgotBtn: {  marginTop: 8, marginBottom: 0,alignSelf:"center" },
  forgotBtnText: { color: "black", fontWeight: 'bold', fontSize: 14 },
  sendBtn: { backgroundColor: ORANGE, borderRadius: 24, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', margin: 18, marginTop: 0 },
  sendBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
}); 