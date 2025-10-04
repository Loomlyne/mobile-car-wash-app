import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import OrderCancelledModal from '../components/OrderCancelledModal';
import OrderSuccessModal from '../components/OrderSuccessModal';
import { useTheme } from './context/ThemeContext';

const ORANGE = '#FF9800';
const CARD_RADIUS = 32;
const { width } = Dimensions.get('window');

const mockProducts = [
  {
    id: '1',
    name: 'Home Cleaning',
    desc: 'Lorem ipsum dolor sit amet',
    price: 'AED80',
    image: require('../assets/images/cleaning.png'),
  },
  {
    id: '2',
    name: 'Gardening Services',
    desc: 'Consectetur adipiscing elit',
    price: 'AED80',
    image: require('../assets/images/cleaning.png'),
  },
  {
    id: '3',
    name: 'Laundry Service',
    desc: 'Sed do eiusmod tempor',
    price: 'AED80',
    image: require('../assets/images/cleaning.png'),
  },
  {
    id: '4',
    name: 'Pet Sitting',
    desc: 'Incididunt ut labore et',
    price: 'AED80',
    image: require('../assets/images/cleaning.png'),
  },
];

export default function OrderPlacedScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);
  const [toggle, setToggle] = useState(true); // for demo: alternate between success/cancelled

  const filteredProducts = mockProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleProductPress = () => {
    if (toggle) setShowSuccess(true);
    else setShowCancelled(true);
    setToggle(!toggle);
  };

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
        alignItems: 'center',
      }}>
        <View style={styles.card}>
          {/* Search Bar */}
          <View style={styles.searchRow}>
            <FontAwesome name="search" size={18} color="#B0B0B0" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Product..."
              placeholderTextColor="#B0B0B0"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          {/* Product List */}
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productRow} onPress={handleProductPress}>
                <Image source={item.image} style={styles.productImg} />
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDesc}>{item.desc}</Text>
                </View>
                <View style={styles.priceBadge}>
                  <Text style={styles.priceBadgeText}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <OrderSuccessModal
          visible={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            router.push('/');
          }}
        />
        <OrderCancelledModal
          visible={showCancelled}
          onClose={() => setShowCancelled(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  headerWrap: {
    backgroundColor: '#111',
    borderTopLeftRadius: CARD_RADIUS,
    borderTopRightRadius: CARD_RADIUS,
    overflow: 'hidden',
    zIndex: 2,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 22,
    borderTopLeftRadius: CARD_RADIUS,
    borderTopRightRadius: CARD_RADIUS,
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
    minHeight: 320,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 0,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  productImg: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#eee',
  },
  productName: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  productDesc: {
    color: '#888',
    fontSize: 13,
  },
  priceBadge: {
    backgroundColor: ORANGE,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
}); 