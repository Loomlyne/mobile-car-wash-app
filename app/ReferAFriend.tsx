import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, Alert, Platform, View, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

const ORANGE = '#FF9800';
const { width } = Dimensions.get('window');

export default function ReferAFriend() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();

  const handleInvite = async () => {
    try {


    } catch (err) {

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
                tintColor="#000"
              />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Refer a Friend</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Content */}
      <View style={[styles.content, { backgroundColor: theme.background }]}>
        <View style={styles.illustrationWrap}>
          <Image
            source={require('../assets/images/referfriend.png')}
            style={styles.illustration}
            resizeMode="contain"
            onError={() => {}}
          />
        </View>
        <Text style={[styles.mainTitle, { color: theme.textPrimary }]}>Invite your Friends and Earn 10AED</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>For every friend who joins us we will give you 10AED</Text>
      </View>

      {/* Fixed Refer Button */}
      <View style={styles.buttonWrap}>
        <TouchableOpacity style={[styles.inviteBtn, { backgroundColor: theme.primaryOrange }]} onPress={handleInvite} activeOpacity={0.85}>
          <Text style={styles.inviteText}>Refer a Friend</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  illustrationWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  illustration: {
    width: width * 0.7,
    height: width * 0.5,
    marginBottom: 0,
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#888',
    fontSize: 15,
    marginBottom: 0,
    textAlign: 'center',
  },
  buttonWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingBottom: 18,
    backgroundColor: 'transparent',
  },
  inviteBtn: {
    backgroundColor: ORANGE,
    borderRadius: 24,
    width: width - 48,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  inviteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
});
