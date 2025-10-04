import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryPicker from 'react-native-country-picker-modal';

const ORANGE = '#FF9800';

const mockBill = {
  service: 'AC Regular Service',
  subTotal: 200,
  delivery: 45,
  discount: 50,
  total: 195,
};

export default function CheckoutDetailsScreen() {
  const [building, setBuilding] = useState('Home\n4880 Holden Street San Diego, CA 92103');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('AE');
  const [callingCode, setCallingCode] = useState('971');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 12 }}>
      {/* Black Header with curve */}
      <View style={{
        backgroundColor: '#222',
        paddingTop: 40,
        paddingBottom: 32,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="angle-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, flex: 1, textAlign: 'center', marginRight: 36 }}>Check Out</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* White Card with Curve */}
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -24,
        paddingHorizontal: 0,
      }}>
        <View style={styles.section}>
          <Text style={styles.label}>Building</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputText}>{building}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputRow}>
            <TouchableOpacity
              onPress={() => setCountryPickerVisible(true)}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}
            >
              <CountryPicker
                countryCode={countryCode as any}
                withFlag
                withCallingCode
                withFilter
                withAlphaFilter
                withEmoji
                visible={countryPickerVisible}
                onClose={() => setCountryPickerVisible(false)}
                onSelect={country => {
                  setCountryCode(country.cca2);
                  setCallingCode(country.callingCode[0]);
                  setCountryPickerVisible(false);
                }}
              />
              <Text style={{ fontSize: 15, color: '#222', marginLeft: 4 }}>+{callingCode}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone number"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
              />
              {phone.length > 0 && (
                <TouchableOpacity onPress={() => setPhone('')} style={{ marginLeft: 8 }}>
                  <FontAwesome name="trash" size={18} color="#888" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add</Text>
              <FontAwesome name="plus" size={14} color={ORANGE} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.billCard}>
          <Text style={styles.billTitle}>{mockBill.service}</Text>
          <View style={styles.billRow}><Text style={styles.billLabel}>Sub Total</Text><Text style={styles.billValue}>AED{mockBill.subTotal}.00</Text></View>
          <View style={styles.billRow}><Text style={styles.billLabel}>Delivery Charge</Text><Text style={styles.billValue}>AED{mockBill.delivery}.00</Text></View>
          <View style={styles.billRow}><Text style={styles.billLabel}>Discount</Text><Text style={[styles.billValue, { color: 'red' }]}>-AED{mockBill.discount}.00</Text></View>
          <View style={styles.billRow}><Text style={styles.billLabelBold}>Total Amount</Text><Text style={[styles.billValueBold, { color: ORANGE }]}>AED{mockBill.total}.00</Text></View>
        </View>
      </View>
      <View style={styles.checkoutBar}>
        <Text style={styles.totalText}>Total: <Text style={styles.totalAmount}>AED{mockBill.total}.00</Text></Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/OrderInProgress')}>
          <Text style={styles.checkoutBtnText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, backgroundColor: '#222', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  section: { marginHorizontal: 18, marginTop: 24 },
  label: { color: '#222', fontWeight: 'bold', fontSize: 15, marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: 12, padding: 14, justifyContent: 'space-between', marginBottom: 8 },
  inputText: { color: '#222', fontSize: 15 },
  flag: { fontSize: 18, marginRight: 8 },
  input: { flex: 1, color: '#222', fontSize: 15 },
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6, marginLeft: 8 },
  addBtnText: { color: ORANGE, fontWeight: 'bold', fontSize: 13, marginRight: 4 },
  billCard: { backgroundColor: '#F2F2F2', borderRadius: 18, padding: 18, margin: 18, marginTop: 24 },
  billTitle: { color: '#222', fontWeight: 'bold', fontSize: 15, marginBottom: 12 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  billLabel: { color: '#888', fontSize: 14 },
  billLabelBold: { color: '#222', fontWeight: 'bold', fontSize: 15 },
  billValue: { color: '#222', fontSize: 14 },
  billValueBold: { color: '#222', fontWeight: 'bold', fontSize: 16 },
  checkoutBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, borderTopWidth: 1, borderColor: '#F2F2F2', backgroundColor: '#fff' },
  totalText: { color: '#888', fontWeight: 'bold', fontSize: 16 },
  totalAmount: { color: '#222', fontWeight: 'bold', fontSize: 18 },
  checkoutBtn: { backgroundColor: ORANGE, borderRadius: 24, paddingVertical: 14, paddingHorizontal: 40 },
  checkoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
}); 