import { useCarContext } from '@/components/CarContext';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome5 } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, View, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {storage} from "../firebase/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';
type AddCarScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function AddCar({ navigation }: AddCarScreenProps) {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const userId = params.userId as string | undefined;
  const [selectedBrand, setSelectedBrand] = useState('');
  const [model, setModel] = useState('');
  const [selectedType, setSelectedType] = useState('Sedan');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [parkingNumber, setParkingNumber] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const carTypes = [
    { label: 'Van', value: 'Van', icon: 'shuttle-van' },
    { label: 'Sedan', value: 'Sedan', icon: 'car-side' },
    { label: 'SUV', value: 'SUV', icon: 'car' },
    { label: 'Motorcycle', value: 'Motorcycle', icon: 'motorcycle' },
  ];
  
  const { addCar } = useCarContext();

  const handleSave = () => {
    if (!selectedBrand || !model || !plate) {
      setError('Please fill all required fields.');
      return;
    }

    addCar({
      brand: selectedBrand,
      model,
      year,
      plate_number: plate,
      type: selectedType,
      parking_number: parkingNumber,
      flat_number: flatNumber,
    });
    
    // Reset form
    setSelectedBrand('');
    setModel('');
    setYear('');
    setPlate('');
    setParkingNumber('');
    setFlatNumber('');
    setError('');
  };

  // Car type icons (you can replace with actual car icons)
  const getCarIcon = (type: string) => {
    switch (type) {
      case 'Sedan': return '🚗';
      case 'SUV': return '🚙';
      case 'Van': return '🚐';
      case 'Motorcycle': return '🏍️';
      default: return '🚗';
    }
  };

  return (
    <View style={[styles.fullContainer, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.statusBar as any} />
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
            <Text style={[styles.title, { color: theme.textPrimary }]}>Add Car</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Brand Selection */}
        <Text style={[styles.label, { color: theme.textPrimary }]}>Select Brand*</Text>
        <View style={[styles.dropdown, { backgroundColor: theme.inputBackground }]}>
          <TextInput
            style={[styles.dropdownInput, { color: theme.textPrimary }]}
            placeholder="Ex BMW"
            placeholderTextColor={theme.textTertiary}
            value={selectedBrand}
            onChangeText={setSelectedBrand}
          />

        </View>

        {/* Model Input */}
        <Text style={[styles.label, { color: theme.textPrimary }]}>Model</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
          placeholder="Enter model name"
          placeholderTextColor={theme.textTertiary}
          value={model}
          onChangeText={setModel}
        />
        
        {/* Type Selection */}
        <Text style={[styles.label, { color: theme.textPrimary }]}>Type*</Text>
        <View style={styles.typeRow}>
        {carTypes.map((type) => (
          <TouchableOpacity
            key={type.value}
            style={[styles.typeButton, { backgroundColor: theme.surface }, selectedType === type.value && [styles.typeButtonSelected, { backgroundColor: theme.primaryOrange }]]}
            onPress={() => setSelectedType(type.value)}
          >
            <Image source={require('../assets/images/cartype.png')} style={styles.carIcon} />
            <ThemedText style={[styles.typeButtonText, { color: theme.textPrimary }, selectedType === type.value && styles.typeButtonTextSelected]}>{type.label}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

        {/* Year Input */}
        <Text style={[styles.label, { color: theme.textPrimary }]}>Year (optional)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
          placeholder="2022"
          placeholderTextColor={theme.textTertiary}
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />

        {/* License Plate Input */}
        <Text style={[styles.label, { color: theme.textPrimary }]}>License Plate Number*</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
          placeholder="DXB - 35555"
          placeholderTextColor={theme.textTertiary}
          value={plate}
          onChangeText={setPlate}
        />

        {/* Parking Number Input */}
        <Text style={[styles.label, { color: theme.textPrimary }]}>Parking Number (optional)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
          placeholder="233"
          placeholderTextColor={theme.textTertiary}
          keyboardType="numeric"
          value={parkingNumber}
          onChangeText={setParkingNumber}
        />

        {/* Flat Number Input */}
        <Text style={[styles.label, { color: theme.textPrimary }]}>Flat Number (optional)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
          placeholder="458"
          placeholderTextColor={theme.textTertiary}
          keyboardType="numeric"
          value={flatNumber}
          onChangeText={setFlatNumber}
        />

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.addAnotherButton, { borderColor: theme.primaryOrange }]}>
            <Text style={[styles.addAnotherButtonText, { color: theme.primaryOrange }]}>Add Another</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.doneButton, { backgroundColor: theme.primaryOrange }]} onPress={handleSave} disabled={loading}>
            <Text style={styles.doneButtonText}>{loading ? 'Saving...' : 'Done'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  container: {
    padding: 24,
    paddingTop: 16,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    height: 50,
  },
  dropdownInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: '#222',
    height: 50,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: { flex: 1, padding: 12, marginHorizontal: 4, backgroundColor: '#fff', alignItems: 'center' },
  typeButtonSelected: { backgroundColor: '#FF9800', borderColor: '#FF9800' },
  carIconContainer: {
    marginBottom: 4,
  },
  carIcon: {
    fontSize: 24,
  },
  typeButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 12,
  },
  typeButtonTextSelected: {
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 20,
  },
  addAnotherButton: {
    flex: 1,
    padding: 1,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF9800',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginRight: 8,
    height: 50,
    justifyContent: 'center',
  },
  addAnotherButtonText: {
    color: '#FF9800',
    fontWeight: 'bold',
    fontSize: 16,
  },
  typeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  doneButton: {
    flex: 1,
    backgroundColor: '#FF9800',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginLeft: 8,
    height: 50,
    justifyContent: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});