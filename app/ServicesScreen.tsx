import Filter from '@/components/Filter';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './context/ThemeContext';

const categories = ['All', 'Category 1', 'Category 2', 'Category 3'];
const carTypes = ['All', 'Sedan', 'Motorcycle', 'SUV', 'Van'];

export default function ServicesScreen() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ category: 'All', carType: 'All', minPrice: '', maxPrice: '' });
  const router = useRouter();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [services, filter, activeCategory]);

  async function fetchServices() {
   
  }

  function applyFilter() {
    let filteredList = [...services];
    // Category
    const cat = categories[activeCategory];
    if (cat !== 'All') filteredList = filteredList.filter(s => s.category === cat);
    // Car Type
    if (filter.carType && filter.carType !== 'All') filteredList = filteredList.filter(s => s.car_type === filter.carType);
    // Price
    if (filter.minPrice) filteredList = filteredList.filter(s => Number(s.price) >= Number(filter.minPrice));
    if (filter.maxPrice) filteredList = filteredList.filter(s => Number(s.price) <= Number(filter.maxPrice));
    setFiltered(filteredList);
  }

  function handleFilterApply(newFilter: any) {
    setFilter(newFilter);
    setShowFilter(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* LinearGradient Header */}
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image resizeMode='contain' source={require('../assets/images/back.png')} style={styles.backIcon} tintColor="#000" />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary }]}>All Cars Products</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Main Content Area */}
      <View style={[styles.contentArea, { backgroundColor: theme.background }]}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={18} color="#888" />
            <TextInput placeholder="Search Service..." style={styles.searchInput} placeholderTextColor="#888" />
          </View>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setShowFilter(true)}>
            <Ionicons name="filter" size={22} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <FontAwesome name="shopping-bag" size={20} color="#222" />
          </TouchableOpacity>
        </View>

        {/* Category Filters */}
        <View style={styles.categoryTabs}>
          {categories.map((cat, idx) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryTab, idx === activeCategory && styles.categoryTabActive]} 
              onPress={() => setActiveCategory(idx)}
            >
              <Text style={[styles.categoryTabText, idx === activeCategory && styles.categoryTabTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Item Count */}
        <Text style={styles.itemCount}>All ({filtered.length})</Text>

        {/* Service Grid */}
        {loading ? (
          <ActivityIndicator size="large" color="#FF9800" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.serviceGrid}>
            {filtered.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.serviceCard} 
                onPress={() => router.push({ pathname: '/ProductDetails', params: { id: item.id } })}
              >
                <View style={styles.serviceImageContainer}>
                  <Image source={require('@/assets/images/car.png')} style={styles.serviceImg} />
                  <View style={styles.priceBadge}>
                    <Text style={styles.priceBadgeText}>AED{item.price}</Text>
                  </View>
                </View>
                <Text style={styles.serviceTitle}>{item.title}</Text>
                <Text style={styles.serviceDesc}>Lorem ipsum dolor sit</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {showFilter && <Filter onApply={handleFilterApply} onClose={() => setShowFilter(false)} />}
    </View>
  );
}

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  android: {
    elevation: 4,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222'
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
  header: {
    backgroundColor: '#222',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    ...shadow,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#222',
  },
  iconBtn: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    padding: 10,
    marginLeft: 8,
    ...shadow,
  },
  categoryTabs: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
    marginRight: 8,
    alignItems: 'center',
  },
  categoryTabActive: {
    backgroundColor: '#222',
  },
  categoryTabText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 14,
  },
  categoryTabTextActive: {
    color: '#fff',
  },
  itemCount: {
    color: '#888',
    fontSize: 14,
    marginBottom: 16,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    ...shadow,
  },
  serviceImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  serviceImg: {
    width: '100%',
    height: 80,
    borderRadius: 12,
  },
  priceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF9800',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  priceBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  serviceTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
    marginBottom: 4,
  },
  serviceDesc: {
    color: '#888',
    fontSize: 11,
  },
}); 