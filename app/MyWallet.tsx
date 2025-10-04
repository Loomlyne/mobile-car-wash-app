import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AddMoneyModal from '../components/AddMoneyModal';
import { useTheme } from './context/ThemeContext';

const ORANGE = '#FF9800';

const mockTransactions = [
  { id: '1', date: '27 Oct 2023', title: 'AC Repair Service', amount: -100, icon: 'wrench' },
  { id: '2', date: '27 Oct 2023', title: 'Home Cleaning Service', amount: -100, icon: 'home' },
  { id: '3', date: '27 Oct 2023', title: 'Home Painting Service', amount: -100, icon: 'paint-brush' },
  { id: '4', date: '27 Oct 2023', title: 'Home Cleaning Service', amount: -100, icon: 'home' },
];

export default function MyWalletScreen() {
  const [balance, setBalance] = useState(2000);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* LinearGradient Header */}
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image resizeMode='contain' source={require('../assets/images/back.png')} style={styles.backIcon} tintColor="#000" />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary }]}>My Wallet</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Main Content */}
      <View style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: 18,
      }}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceValue}>AED{balance.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addMoneyBtn}>
            <FontAwesome name="plus" size={16} color={ORANGE} />
            <Text style={styles.addMoneyBtnText}>Add Money</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.transTitle}>Transaction History</Text>
        <FlatList
          data={mockTransactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.transRow}>
              <View style={styles.transIconWrap}>
                <FontAwesome name={item.icon as any} size={20} color={ORANGE} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.transDate}>{item.date}</Text>
                <Text style={styles.transTitleRow}>{item.title}</Text>
              </View>
              <Text style={styles.transAmount}>-AED{Math.abs(item.amount).toFixed(2)}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 8 }}
        />
        <TouchableOpacity style={styles.referBtn} onPress={() => setShowAddMoney(true)}>
          <Text style={styles.referBtnText}>Pay</Text>
        </TouchableOpacity>
        <AddMoneyModal visible={showAddMoney} onClose={() => setShowAddMoney(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginRight: 24,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: 18, backgroundColor: '#222', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  backBtn: { marginRight: 12 },
  headerTitle: { color: '#fff', marginLeft: 12, fontWeight: 'bold', fontSize: 20 },
  balanceCard: { backgroundColor: '#FFF3E0', borderRadius: 18, padding: 18, margin: 18, alignItems: 'center' },
  balanceLabel: { color: '#888', fontSize: 15, marginBottom: 4 },
  balanceValue: { color: ORANGE, fontWeight: 'bold', fontSize: 28, marginBottom: 8 },
  addMoneyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 6, marginTop: 8 },
  addMoneyBtnText: { color: ORANGE, fontWeight: 'bold', fontSize: 13, marginLeft: 4 },
  transTitle: { color: '#222', fontWeight: 'bold', fontSize: 15, marginHorizontal: 18, marginTop: 8, marginBottom: 8 },
  transRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: 16, padding: 14, marginBottom: 12 },
  transIconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF3E0', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  transDate: { color: '#888', fontSize: 12 },
  transTitleRow: { color: '#222', fontWeight: 'bold', fontSize: 15 },
  transAmount: { color: '#F44336', fontWeight: 'bold', fontSize: 15, marginLeft: 8 },
  referBtn: { backgroundColor: ORANGE, borderRadius: 24, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', margin: 18, marginTop: 8 },
  referBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
}); 