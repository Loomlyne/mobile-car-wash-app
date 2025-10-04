import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ORANGE = '#FF9800';

const mockBooking = {
  status: 'Complete',
  carName: 'BMW',
  license: 'BXD-255636',
  ref: '#D-652563',
  schedule: '4 Nov, 10:00-11:00 AM',
  phone: '+971 1',
  promo: '',
};

export default function HistoryDetailsScreen() {
  const [phone, setPhone] = useState(mockBooking.phone);
  const [promo, setPromo] = useState(mockBooking.promo);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <LinearGradient colors={['#FFCC00', '#FFFFFF']} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={{flexDirection:"row",marginBottom:15}}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12, marginTop: 5 }}>
              <Image resizeMode='contain' source={require('../assets/images/back.png')} style={styles.back} tintColor="#000" />
            </TouchableOpacity>
            <Text style={[styles.title, { textTransform: 'capitalize' }]}>History details</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={styles.card}>
        <View style={styles.statusRow}>
          <Text style={styles.label}>Status</Text>
          <TouchableOpacity onPress={() => router.push('/OrderInProgress')} style={styles.timelineBtn}>
            <Text style={styles.timelineBtnText}>Timeline</Text>
            <FontAwesome name="angle-right" size={16} color={ORANGE} />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Car Name <Text style={styles.value}>{mockBooking.carName}</Text></Text>
        <Text style={styles.label}>Car License Plate <Text style={styles.value}>{mockBooking.license}</Text></Text>
        <Text style={styles.label}>Reference Number <Text style={styles.value}>{mockBooking.ref}</Text></Text>
        <Text style={styles.label}>Schedule <Text style={styles.value}>{mockBooking.schedule}</Text></Text>
      </View>
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <View style={styles.inputRow}>
          <FontAwesome name="phone" size={18} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />
        </View>
        <Text style={styles.inputLabel}>Promo Code</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={promo}
            onChangeText={setPromo}
            placeholder="Code"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.promoBtn}>
            <FontAwesome name="gear" size={18} color={ORANGE} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.reorderBtn} onPress={()=>router.push("/(tabs)/Bookings")}>
        <Text style={styles.reorderBtnText}>Re-Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, backgroundColor: '#222', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  card: { backgroundColor: '#F2F2F2', borderRadius: 18, padding: 18, margin: 18, marginBottom: 0 },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: '#888', fontSize: 13, marginBottom: 2 },
  value: { color: '#222', fontWeight: 'bold' },
  timelineBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 4 },
  timelineBtnText: { color: ORANGE, fontWeight: 'bold', fontSize: 13, marginRight: 4 },
  inputSection: { marginHorizontal: 18, marginTop: 24 },
  inputLabel: { color: '#222', fontWeight: 'bold', fontSize: 15, marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: 12, padding: 14, marginBottom: 16 },
  input: { flex: 1, color: '#222', fontSize: 15 },
  promoBtn: { marginLeft: 8, backgroundColor: '#FFF3E0', borderRadius: 12, padding: 8 },
  reorderBtn: { backgroundColor: ORANGE, borderRadius: 24, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', margin: 18, marginTop: 32 },
  reorderBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
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
 headerGradient: {
    height: 150,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
}); 