import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

const ORANGE = '#FF9800';
const CARD_RADIUS = 32;
const { width } = Dimensions.get('window');

export default function EditCarScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const [brand, setBrand] = useState('BMW');
  const [model, setModel] = useState('M6');
  const [carType, setCarType] = useState('Sedan');
  const [year, setYear] = useState('2018');
  const [plateNumber, setPlateNumber] = useState('256852');
  const [parkingNumber, setParkingNumber] = useState('22');
  const [flatNumber, setFlatNumber] = useState('22');
  const carTypes = [
    { key: 'Sedan', icon: 'car', label: 'Sedan' },
    { key: 'SUV', icon: 'truck', label: 'SUV' },
    { key: 'Van', icon: 'bus', label: 'Van' },
    { key: 'Motorcycle', icon: 'motorcycle', label: 'Motorcycle' },
  ];

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
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
            <Text style={[styles.title, { color: theme.textPrimary }]}>Edit Car Details</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>
      {/* Main Card */}
      <View style={styles.cardWrap}>
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Section Title */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Cars Information</Text>
            {/* Brand */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Select Brand*</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
                value={brand}
                onChangeText={setBrand}
                placeholder="Enter brand"
                placeholderTextColor={theme.textTertiary}
              />
            </View>
            {/* Model */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Model</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
                value={model}
                onChangeText={setModel}
                placeholder="Enter model"
                placeholderTextColor={theme.textTertiary}
              />
            </View>
            {/* Type */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Type*</Text>
              <View style={styles.carTypeRow}>
                {carTypes.map(type => (
                  <TouchableOpacity
                    key={type.key}
                    style={[styles.typeBtn, { backgroundColor: theme.surface }, carType === type.key && [styles.typeBtnActive, { backgroundColor: theme.primaryOrange }]]}
                    onPress={() => setCarType(type.key)}
                  >
                    <Image source={require('../assets/images/cartype.png')} style={styles.carIcon} />
                    <Text style={[styles.typeLabel, { color: theme.textSecondary }, carType === type.key && styles.typeLabelActive]}>{type.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Year */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Year (optional)</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
                value={year}
                onChangeText={setYear}
                placeholder="Enter year"
                placeholderTextColor={theme.textTertiary}
                keyboardType="numeric"
              />
            </View>
            {/* License Plate Number */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>License Plate Number*</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
                value={plateNumber}
                onChangeText={setPlateNumber}
                placeholder="Enter license plate number"
                placeholderTextColor={theme.textTertiary}
              />
            </View>
            {/* Parking Number */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Parking Number (optional)</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
                value={parkingNumber}
                onChangeText={setParkingNumber}
                placeholder="Enter parking number"
                placeholderTextColor={theme.textTertiary}
              />
            </View>
            {/* Flat Number */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Flat Number (optional)</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
                value={flatNumber}
                onChangeText={setFlatNumber}
                placeholder="Enter flat number"
                placeholderTextColor={theme.textTertiary}
              />
            </View>
          </ScrollView>
        </View>
        {/* Fixed Button Row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.cancelBtn, { borderColor: theme.primaryOrange }]} onPress={() => router.back()}>
            <Text style={[styles.cancelText, { color: theme.primaryOrange }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.primaryOrange }]} onPress={() => router.back()}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerGradient: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
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
    marginRight: 24,
  },
  backBtn: {
    padding: 2,
    marginRight: 2,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    flex: 1,
    textAlign: 'center',
    marginLeft: -32,
    letterSpacing: 0.1,
  },
  cardWrap: {
    flex: 1,
    marginTop: -CARD_RADIUS + 6,
    zIndex: 1,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    width: width - 24,
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  carIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  changeIconBtn: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  changeIconText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 14,
  },
  formSection: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#222',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  carTypeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  carTypeBtn: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  carTypeBtnActive: {
    backgroundColor: '#FFF3E0',
    borderColor: ORANGE,
  },
  carTypeText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 15,
  },
  carTypeTextActive: {
    color: ORANGE,
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
  saveBtn: {
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
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 18,
    marginTop: 2,
  },
  carTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },
  typeBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 30,

    marginHorizontal: 4,
    borderWidth: 0,
    borderColor: '#E0E0E0',
  },
  typeBtnActive: {
    backgroundColor: '#FFF3E0',
    borderColor: ORANGE,
  },
  typeLabel: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 4,
  },
  typeLabelActive: {
    color: ORANGE,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: 'transparent',
  },
  cancelBtn: {
    backgroundColor: '#F2F2F2',
    borderRadius: 24,
    flex: 1,
    marginRight: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  saveBtn: {
    backgroundColor: ORANGE,
    borderRadius: 24,
    flex: 1,
    marginLeft: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
}); 