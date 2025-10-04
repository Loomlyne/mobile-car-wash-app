import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, LayoutAnimation, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './context/ThemeContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const inAppOptions = [
  { key: 'appointment', label: 'Appointment Reminder' },
  { key: 'service', label: 'Service Updates' },
  { key: 'payment', label: 'Payment Reminder' },
  { key: 'offers', label: 'Special Offers' },
];

const ORANGE = '#FF9800';
const { width } = Dimensions.get('window');

export default function NotificationSettings() {
  const router = useRouter();
  const { theme } = useTheme();
  const [inApp, setInApp] = useState({
    appointment: false,
    service: false,
    payment: false,
    offers: false,
  });
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inAppOpen, setInAppOpen] = useState(true);

  // Load notification settings from database
  useEffect(() => {
    loadNotificationSettings();
    testDatabaseColumn();
  }, []);

  const loadNotificationSettings = async () => {
    try {
     

      

   
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const saveNotificationSettings = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('User not found');
        return;
      }

      console.log('Current user phone:', user.phone);
      console.log('Settings to save:', inApp);

      const { data: profileData, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', `+${user.phone}`)
        .single();

      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        return;
      }

      if (!profileData) {
        console.error('Profile not found');
        return;
      }

      console.log('Profile ID:', profileData.id);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          notification_settings: {
            inApp,
            whatsApp: false,
            email: false,
          }
        })
        .eq('id', profileData.id);

      if (updateError) {
        console.error('Error updating notification settings:', updateError);
        return;
      }

      console.log('Settings saved successfully');
      router.back();
    } catch (error) {
      console.error('Error in saveNotificationSettings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key: keyof typeof inApp) => {
    setInApp({ ...inApp, [key]: !inApp[key] });
  };

  const handleCollapse = (section: 'inApp' | 'whatsApp' | 'email') => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (section === 'inApp') setInAppOpen(!inAppOpen);
    else if (section === 'whatsApp') setWhatsAppOpen(!whatsAppOpen);
    else setEmailOpen(!emailOpen);
  };

  const handleDisconnectAll = () => {
    setInApp({
      appointment: false,
      service: false,
      payment: false,
      offers: false,
    });
  };

  const testDatabaseColumn = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', `+${user.phone}`)
        .single();

      if (error) {
        console.error('Error testing database:', error);
        return;
      }

      console.log('Profile data:', profileData);
      console.log('Notification settings column exists:', 'notification_settings' in profileData);
    } catch (error) {
      console.error('Error in testDatabaseColumn:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* LinearGradient Header */}
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image resizeMode='contain' source={require('../assets/images/back.png')} style={styles.backIcon} tintColor="#000" />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Notification</Text>
            <TouchableOpacity style={styles.disconnectBtn} onPress={handleDisconnectAll}>
              <Text style={styles.disconnectText}>Disconnect All</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Main Content */}
      <View style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: 18,
      }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* In App Notifications Section */}
          <TouchableOpacity style={styles.collapsibleSection} onPress={() => handleCollapse('inApp')}>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>In App Notifications</Text>
                <FontAwesome name={inAppOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#222" />
              </View>
              {inAppOpen && (
                <View style={styles.collapseContent}>
                  {inAppOptions.map(opt => (
                    <View key={opt.key} style={styles.toggleRow}>
                      <Text style={styles.toggleLabel}>{opt.label}</Text>
                      <Switch
                        value={inApp[opt.key as keyof typeof inApp]}
                        onValueChange={() => handleToggle(opt.key as keyof typeof inApp)}
                        trackColor={{ true: ORANGE, false: '#E0E0E0' }}
                        thumbColor={inApp[opt.key as keyof typeof inApp] ? '#fff' : '#fff'}
                        ios_backgroundColor="#E0E0E0"
                      />
                    </View>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* WhatsApp Notifications Section */}
          <TouchableOpacity style={styles.collapsibleSection} onPress={() => handleCollapse('whatsApp')}>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>WhatsApp Notifications</Text>
                <FontAwesome name={whatsAppOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#222" />
              </View>
              {whatsAppOpen && (
                <View style={styles.collapseContent}>
                  <Text style={styles.collapseText}>WhatsApp notification settings coming soon...</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Email Notifications Section */}
          <TouchableOpacity style={styles.collapsibleSection} onPress={() => handleCollapse('email')}>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Email Notifications</Text>
                <FontAwesome name={emailOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#222" />
              </View>
              {emailOpen && (
                <View style={styles.collapseContent}>
                  <Text style={styles.collapseText}>Email notification settings coming soon...</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueBtn} 
            onPress={saveNotificationSettings}
            disabled={loading}
          >
            <Text style={styles.continueText}>
              {loading ? 'Saving...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#222',
  },
  headerGradient: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    flex: 1,
    textAlign: 'center',
  },
  disconnectBtn: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  disconnectText: {
    color: '#B88A00',
    fontWeight: 'bold',
    fontSize: 13,
  },
  section: {
    marginBottom: 24,
  },
  collapsibleSection: {
    marginBottom: 16,
  },
  sectionContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 2,
  },
  toggleLabel: {
    color: '#222',
    fontSize: 15,
    fontWeight: '500',
  },
  collapseContent: {
    paddingVertical: 8,
    paddingLeft: 8,
  },
  collapseText: {
    color: '#888',
    fontSize: 14,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
  },
  continueBtn: {
    backgroundColor: ORANGE,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
}); 