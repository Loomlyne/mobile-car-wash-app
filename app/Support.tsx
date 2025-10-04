import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

const ORANGE = '#FF9800';

export default function SupportScreen() {
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }
    try {
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
    }
  };

  const handlePhone = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/1234567890');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header with Gradient */}
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
            <Text style={[styles.title, { color: theme.textPrimary, textTransform: 'capitalize' }]}>Support</Text>
          </View>

          {/* Contact Buttons */}
          <View style={[styles.contactRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity style={[styles.contactBtn, { backgroundColor: theme.cardBackground }]} onPress={handlePhone}>
              <Image resizeMode='contain' source={require('../assets/images/phone.png')} style={styles.phone} />
              <Text style={[styles.contactBtnText, { color: theme.textPrimary }]}>Phone Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.contactBtn, { backgroundColor: theme.cardBackground }]} onPress={handleWhatsApp}>
              <Image resizeMode='contain' source={require('../assets/images/whatsapp.png')} style={styles.whatsapp} />
              <Text style={[styles.contactBtnText, { color: theme.textPrimary }]}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Form Section */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.dashedDivider} />

        <Text style={[styles.quickContactTitle, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>Quick Contact</Text>

        <View style={styles.formSection}>
          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
            placeholder="Enter your Name"
            placeholderTextColor={theme.textTertiary}
            value={name}
            onChangeText={setName}
          />

          <Text style={[styles.inputLabel, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
            placeholder="Enter your Email"
            placeholderTextColor={theme.textTertiary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.inputLabel, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
            placeholder="Enter message"
            placeholderTextColor={theme.textTertiary}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={6}
          />
        </View>

        <TouchableOpacity style={[styles.sendBtn, { backgroundColor: theme.primaryOrange }]} onPress={handleSend}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    marginBottom: 24,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 0,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    justifyContent: 'center',
    gap: 8,
  },
  contactBtnText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 15,
  },
  phone: {
    height: 30,
    width: 30,
  },
  whatsapp: {
    height: 30,
    width: 30,
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderStyle: 'dashed',
    marginHorizontal: 18,
    marginVertical: 20,
  },
  quickContactTitle: {
    color: '#222',
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 18,
    marginBottom: 16,
  },
  formSection: {
    marginHorizontal: 18,
  },
  inputLabel: {
    color: '#222',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    padding: 14,
    color: '#222',
    fontSize: 15,
    marginBottom: 12,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  sendBtn: {
    backgroundColor: ORANGE,
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 18,
    marginTop: 24,
  },
  sendBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
