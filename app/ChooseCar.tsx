import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '@/firebase/firebase';

const ORANGE = '#FF9800';
const CARD_RADIUS = 32;
const { width } = Dimensions.get('window');

const mockCars = [
  {
    id: '1',
    plate: 'Dub 4759575',
    name: 'Ford Endeavour',
    icon: require('../assets/images/caricon.png'),
  },
  {
    id: '2',
    plate: 'Dub 4759575',
    name: 'Ford Endeavour',
    icon: require('../assets/images/caricon.png'),
  },
  {
    id: '3',
    plate: 'Dub 4759575',
    name: 'Ford Endeavour',
    icon: require('../assets/images/caricon.png'),
  },
];

export default function ChooseCarScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('1');
  const [cars, setCars] = useState(mockCars);
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const currentUser = auth.currentUser;
  const handleDone = async () => {
    setLoading(true);
    setError('');
    const selectedCar = cars.find(car => car.id === selected);
    if (!selectedCar) {
      setError('No car selected');
      const orderData = {
        userId: currentUser?.uid || 'anonymous',
      
        
        // Car details
        carId: selectedCar.id || selectedCar.plate,
       
        
        // Booking details
        selectedDate: params.selectedDate,
        selectedPeriod: params.selectedPeriod,
        specialInstructions: params.special,
        
        // Order metadata
        status: 'pending',
        totalPrice: 50, // You can make this dynamic based on service type
        serviceType: 'standard_wash' // You can add service type selection
      };
    
    }
    try {
      
      
      // Get the numeric user ID from profiles table using auth UUID
      
      
  
  
      // Create a real notification in the database

      
      // Show notification popup
    
      
      setLoading(false);
      router.replace('/Bookings');
    } catch (err: any) {
      console.log('Full error:', err);
      setError(err.message || 'Failed to add to cart');
      setLoading(false);
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
          <Text style={styles.title}>Choose your car</Text>

          </View>
        </SafeAreaView>
      </LinearGradient>
      {/* White Card with Curve */}
   
        <View style={{ padding: 24, flex: 1 }}>
          {/* Cars Collections Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#222', flex: 1 }}>Cars Collections</Text>
            <TouchableOpacity style={styles.addBtn} onPress={()=>router.push("/AddCar")}>
              <Text style={styles.addBtnText}>Add New Car </Text>
              <FontAwesome name="plus" size={14} color={ORANGE} />
            </TouchableOpacity>
          </View>
          {/* Cars List */}
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
            {cars.map(car => (
              <View key={car.id} style={styles.carRow}>
                <View style={styles.carInfo}>
                  <View style={styles.carIconWrap}>
                    <Image source={car.icon} style={styles.carIcon} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.plate}>{car.plate}</Text>
                    <Text style={styles.carName}>{car.name}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.radioBtn} onPress={() => setSelected(car.id)}>
                  <View style={[styles.radioOuter, selected === car.id && styles.radioOuterActive]}>
                    {selected === car.id && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Done Button */}
        <View style={{ padding: 24, backgroundColor: 'transparent' }}>
          <TouchableOpacity style={styles.doneBtn} onPress={handleDone} disabled={loading}>
            <Text style={styles.doneBtnText}>{loading ? 'Adding...' : 'Done'}</Text>
          </TouchableOpacity>
          {!!error && <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text>}
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  addBtnText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 13,
    marginRight: 4,
  },
  carRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  carIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerGradient: {
    height: 150,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 35,
    fontWeight: 'bold',
    color: '#000',
  },
  back:{
    height:25,
    width:30 
   },
  plate: {
    color: '#B0B0B0',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  carName: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
  },
  radioBtn: {
    marginLeft: 8,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  radioOuterActive: {
    borderColor: ORANGE,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ORANGE,
  },
  carIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  doneBtn: {
    backgroundColor: ORANGE,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    width: '100%',
  },
  doneBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
}); 