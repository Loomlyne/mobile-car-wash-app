import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './context/ThemeContext';

const ORANGE = '#FF9800';

const mockOrders = [
  { id: '1', title: 'Home Cleaning', desc: 'Lorem ipsum dolor sit amet', price: 80, image: require('../assets/images/partial-react-logo.png') },
  { id: '2', title: 'Gardening Services', desc: 'Consectetur adipiscing elit', price: 80, image: require('../assets/images/partial-react-logo.png') },
  { id: '3', title: 'Laundry Service', desc: 'Sed do eiusmod tempor', price: 80, image: require('../assets/images/partial-react-logo.png') },
  { id: '4', title: 'Pet Sitting', desc: 'Incididunt ut labore et', price: 80, image: require('../assets/images/partial-react-logo.png') },
];

export default function OrderHistoryScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { theme } = useTheme();
  const filtered = mockOrders.filter(o => o.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* LinearGradient Header */}
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image resizeMode='contain' source={require('../assets/images/back.png')} style={styles.backIcon} tintColor="#000" />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Order Placed</Text>
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
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={18} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Product..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Image source={item.image} style={styles.orderImg} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.orderTitle}>{item.title}</Text>
                <Text style={styles.orderDesc}>{item.desc}</Text>
              </View>
              <View style={styles.priceBadge}><Text style={styles.priceBadgeText}>AED{item.price}</Text></View>
            </View>
          )}
          contentContainerStyle={{ padding: 18 }}
        />
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
  header: { padding: 18, backgroundColor: '#222', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, margin: 18, marginBottom: 0 },
  searchInput: { flex: 1, fontSize: 15, color: '#222' },
  orderCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: 18, padding: 18, marginBottom: 14 },
  orderImg: { width: 70, height: 70, borderRadius: 12 },
  orderTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 2, color: '#222' },
  orderDesc: { color: '#888', fontSize: 13 },
  priceBadge: { backgroundColor: ORANGE, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginLeft: 8 },
  priceBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
}); 