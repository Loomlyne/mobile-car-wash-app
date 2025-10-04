import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './context/ThemeContext';

const ORANGE = '#FF9800';

interface CartItem {
  id: number;
  user_id: number;
  car_id: number;
  time: string;
  date: string;
  description: string;
  slot?: string;
  special?: string;
  price?: number;
  qty: number;
}

export default function CartScreen() {
  const { theme } = useTheme();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const updateQuantity = (itemId: number, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };



  const total = cart.reduce((sum, item) => sum + (100 * item.qty), 0);
  const isEmpty = cart.length === 0;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* LinearGradient Header */}
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image resizeMode='contain' source={require('../assets/images/back.png')} style={styles.backIcon} tintColor="#000" />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Cart</Text>
            <TouchableOpacity style={styles.allOrdersBtn}>
              <Text style={styles.allOrdersBtnText}>Check All Orders</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Main Content */}
      <View style={[styles.content, { backgroundColor: theme.background }]}>
        {loading ? (
          <View style={styles.emptyState}><Text>Loading...</Text></View>
        ) : error ? (
          <View style={styles.emptyState}><Text style={{ color: 'red' }}>{error}</Text></View>
        ) : isEmpty ? (
          <View style={styles.emptyState}>
            <FontAwesome name="clipboard" size={64} color="#E0E0E0" style={{ marginBottom: 16 }} />
            <Text style={styles.emptyTitle}>Empty Cart</Text>
            <Text style={styles.emptyDesc}>Currently you don't have any order.</Text>
          </View>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={item => item.id?.toString()}
            contentContainerStyle={{ padding: 10 }}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <Image
                  source={require('../assets/images/homecln.png')}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <View style={styles.cardTextSection}>
                    <Text style={styles.cartTitle}>{item.description || 'Service'}</Text>
                    <Text style={styles.cartInfo}>{item.special || item.slot || item.time || ''}</Text>
                  </View>
                  <View style={styles.cardBottomRow}>
                    <View style={styles.priceBadge}>
                      <Text style={styles.priceBadgeText}>AED{item.price ? item.price : 100}</Text>
                    </View>
                    <View style={styles.qtyRow}>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>
                        <FontAwesome name="minus" size={14} color="#fff" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.qty}</Text>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>
                        <FontAwesome name="plus" size={14} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* Checkout */}
      <View style={styles.checkoutBar}>
        <Text style={styles.totalText}>
          Total: <Text style={styles.totalAmount}>AED{isEmpty ? '00.00' : total.toFixed(2)}</Text>
        </Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/CheckoutDetails')}>
          <Text style={styles.checkoutBtnText}>Checkout</Text>
        </TouchableOpacity>
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
  },
  header: {
    backgroundColor: '#222',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    marginRight: 36,
  },
  allOrdersBtn: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  allOrdersBtnText: {
    color: ORANGE,
    fontWeight: 'bold',
    fontSize: 13,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    paddingHorizontal: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#222',
  },
  emptyDesc: {
    color: '#888',
    textAlign: 'center',
    fontSize: 14,
  },

  cardContainer: {
    marginBottom: 20,
    borderRadius: 20,
    height: 160,
 
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginHorizontal: 4,
  },
  cardImage: {
    width: '100%',
    height: "100%",
    // height: 140,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  cardContent: {
    position: 'absolute',
    bottom: 4,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
  
  },
  cardTextSection: {
    marginBottom: 8,
  },
  cartTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  cartInfo: {
    fontSize: 12,
    color: '#999',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceBadge: {
    backgroundColor: ORANGE,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  priceBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
   
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontWeight: '600',
    fontSize: 15,
    marginHorizontal: 10,
  },
  checkoutBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderTopWidth: 1,
    borderColor: '#F2F2F2',
    backgroundColor: '#fff',
  },
  totalText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmount: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
  },
  checkoutBtn: {
    backgroundColor: ORANGE,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  checkoutBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
