import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

const ORANGE = '#FF9800';

const uncheckedIcon = require("../assets/images/notchecked.png");  // your unchecked icon
const checkedIcon = require("../assets/images/Tick.png"); 
const reasons = [
  'Not happy with the punctuality',
  'I Am Not Available At That Time Anymore',
  'Got A Full Time Maid',
  'Not Happy With The Quality',
  'Not Getting The Crew Member I Asked For',
  'Prefer To Have One Time Bookings',
];

export default function CancelReasonScreen() {
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const [selected, setSelected] = useState<string | null>(reasons[0]);
  const [other, setOther] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image
                resizeMode='contain'
                source={require('../assets/images/back.png')}
                style={[styles.back, { transform: [{ scaleX: isRTL ? -1 : 1 }] }]}
                tintColor="#000"
              />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary, textTransform: 'capitalize' }]}>Cancel reason</Text>
          </View>
          <Text style={[styles.title2, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>Do You Want To Cancel Order?</Text>
        </SafeAreaView>
      </LinearGradient>
  
      <FlatList
        data={reasons}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.reasonRow, { backgroundColor: theme.inputBackground, flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            onPress={() => setSelected(item)}
          >
            <Text style={[styles.reasonText, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>{item}</Text>
            <Image
              source={selected === item ? checkedIcon : uncheckedIcon}
              style={styles.radioIcon}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 8 }}
        ListFooterComponent={
          <View>
            <Text style={[styles.otherLabel, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>Other</Text>
            <View style={[styles.reasonRow, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.otherInput, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}
                placeholder="Reason"
                placeholderTextColor={theme.textTertiary}
                value={other}
                onChangeText={setOther}
              />
            </View>
            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.primaryOrange }]} onPress={() => router.push("/Support")}>
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        }
      />
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
    marginBottom: 16,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    height: 24,
    width: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  title2: {
    color: '#222',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 8,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 15,
  },
  reasonText: {
    color: '#222',
    fontSize: 15,
    flex: 1,
    marginRight: 12,
  },
  radioIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  otherLabel: {
    fontWeight: '700',
    marginBottom: 12,
    fontSize: 18,
    color: '#222',
  },
  otherInput: {
    flex: 1,
    color: '#222',
    fontSize: 15,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  submitBtn: {
    backgroundColor: ORANGE,
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
}); 