import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '@/firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useCarContext } from '@/components/CarContext';

const ORANGE = '#FF9800';
const CARD_RADIUS = 32;
const { width } = Dimensions.get('window');

const periodOptions = ['Morning', 'Afternoon', 'Evening'];
const TIME_SLOTS = {
  Morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
  Afternoon: ['12:00 PM', '01:00 PM', '02:00 PM'],
  Evening: ['05:00 PM', '06:00 PM', '07:00 PM'],
};
export default function ScheduleOrder() {
  const { cars } = useCarContext();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Morning');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [special, setSpecial] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [periodDropdown, setPeriodDropdown] = useState(false);
  const currentUser = auth.currentUser
  const handleAddOrder = async () => {
    try {
      const phoneNumber = '+97127881424'; // Replace with actual user's phone
      const userId = currentUser?.uid || 'anonymous';
      
      if (!cars || cars.length === 0) {
        Alert.alert('No Cars', 'Please add a car first before scheduling a wash.', [
          { text: 'Add Car', onPress: () => router.push('/AddCar') },
          { text: 'Cancel', style: 'cancel' }
        ]);
        return;
      }
      const orderData = {
        userId: userId,
        selectedDate: selectedDate.toISOString(),
        selectedPeriod: selectedPeriod,
        specialInstructions: special,
         status: 'pending'
        // You can add more fields like:
        // - carDetails (if user selects a car)
        // - serviceType (if you have different services)
        // - price
        // - location
      };
      router.push({
        pathname: '/ChooseCar',
        params: {
          selectedDate: selectedDate.toISOString(),
          selectedPeriod,
        
          special,
          // Pass the cars array length to know how many cars user has
          carsCount: cars.length.toString()
        }
      });
    

    } catch (err) {
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Black Header with curve */}
      <LinearGradient colors={['#FFCC00', '#FFFFFF']} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={{flexDirection:"row",marginBottom:15}}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12, marginTop: 5 }}>
          <Image resizeMode='contain' source={require('../assets/images/back.png')} style={styles.back} tintColor="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Bookings</Text>

          </View>
        </SafeAreaView>
      </LinearGradient>
      {/* White Card with Curve */}
     
        <View style={{ padding: 24 }}>
          {/* Select Date */}
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dropdownText}>{selectedDate.toLocaleDateString('en-GB')}</Text>
            <FontAwesome name={showDatePicker ? 'angle-up' : 'angle-down'} size={20} color="#888" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setSelectedDate(date);
              }}
            />
          )}
          {/* Select Period */}
          <Text style={styles.label}>Select Period</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setPeriodDropdown(d => !d)}>
            <Text style={styles.dropdownText}>{selectedPeriod}</Text>
            <FontAwesome name={periodDropdown ? 'angle-up' : 'angle-down'} size={20} color="#888" />
          </TouchableOpacity>
          {periodDropdown && (
            <View style={styles.dropdownList}>
              {periodOptions.map(opt => (
                <TouchableOpacity
                  key={opt}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedPeriod(opt);
                    setSelectedSlot(opt === 'Morning' ? '11:00 AM' : TIME_SLOTS[opt as keyof typeof TIME_SLOTS][0]);
                    setPeriodDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* Time Slots */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.slotsRow}>
            {TIME_SLOTS[selectedPeriod as keyof typeof TIME_SLOTS].map((slot: string) => (
              <TouchableOpacity
                key={slot}
                style={[styles.slotBtn, selectedSlot === slot && styles.slotBtnActive]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text style={[styles.slotBtnText, selectedSlot === slot && styles.slotBtnTextActive]}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Special Instruction */}
          <Text style={styles.label}>Special Instruction</Text>
          <TextInput
            style={styles.specialInput}
            placeholder="Enter message"
            placeholderTextColor="#B0B0B0"
            value={special}
            onChangeText={setSpecial}
            multiline
            numberOfLines={3}
          />
        </View>
   
      {/* Wash It Button */}
      <View style={{ padding: 24, backgroundColor: 'transparent' }}>
        <TouchableOpacity 
          style={styles.startBtn} 
          onPress={() => router.push({
            pathname: '/ChooseCar',
            params: {
              selectedDate: selectedDate.toLocaleDateString('en-GB'),
              selectedPeriod,
              selectedSlot,
              special,
            }
          })}
        >
          <Text style={styles.startBtnText}>Wash It</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    height: 150,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  label: { fontWeight: 'bold', fontSize: 15, color: '#222', marginBottom: 8, marginTop: 8 },
  dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F7F7F7', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 18 },
  dropdownText: { color: '#222', fontSize: 15, fontWeight: 'bold' },
  dropdownList: { backgroundColor: '#fff', borderRadius: 14, marginBottom: 12, borderWidth: 1, borderColor: '#F2F2F2', overflow: 'hidden' },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 18 },
  dropdownItemText: { color: '#222', fontSize: 15 },
  slotsRow: { flexDirection: 'row', marginBottom: 18 },
  slotBtn: { backgroundColor: '#F2F2F2', borderRadius: 18, paddingHorizontal: 18, paddingVertical: 10, marginRight: 10 },
  slotBtnActive: { backgroundColor: '#111' },
  slotBtnText: { color: '#888', fontWeight: 'bold', fontSize: 15 },
  slotBtnTextActive: { color: '#fff' },
  specialInput: { backgroundColor: '#F7F7F7', borderRadius: 14, padding: 14, color: '#222', fontSize: 15, minHeight: 70, marginBottom: 18 },
  startBtn: { backgroundColor: ORANGE, borderRadius: 24, alignItems: 'center', justifyContent: 'center', paddingVertical: 16, width: '100%' },
  startBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  title: {
    fontSize: 28,
    marginBottom: 35,
    fontWeight: 'bold',
    color: '#000',
  },
  back:{
   height:25,
   width:30 
  }
}); 