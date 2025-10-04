import { ThemedText } from '@/components/ThemedText';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const productImages = [
  require('../assets/images/manac.png'),
  require('../assets/images/manac.png'),
  require('../assets/images/manac.png'),
  require('../assets/images/manac.png'),
];

const similarProducts = [
  { id: '1', title: 'Home Cleaning', price: 'AED80', image: require('../assets/images/car.png') },
  { id: '2', title: 'Home Cleaning', price: 'AED80', image: require('../assets/images/car.png') },
];

const COLORS = ['#FFD600', '#FFD600', '#FFD600', '#FFD600', '#FFD600'];

export default function ProductDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [units, setUnits] = useState(1);
  const price = 100;

  useEffect(() => {
    fetchService();
  }, [params.id]);

  async function fetchService() {
    
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#222' }}>
      {/* Black Header with curve */}
      <View style={{
        backgroundColor: '#222',
        paddingTop: 44,
        paddingBottom: 32,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, flex: 1, textAlign: 'center' }}>Product Details</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* White Content Area with curves */}
      <ScrollView style={{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -24,
        padding: 18,
      }} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF9800" style={{ marginTop: 40 }} />
        ) : (
          <>
            {/* Image Gallery */}
            <View style={styles.imageGallery}>
              <Image source={require('../assets/images/ac.png')} style={styles.mainImage} />
              <FlatList
                data={productImages}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => setSelectedImage(index)}>
                    <Image source={item} style={[styles.thumbImage, selectedImage === index && styles.thumbImageSelected]} />
                  </TouchableOpacity>
                )}
                style={{ marginTop: 12 }}
              />
            </View>
            {/* Title and Price */}
            <View style={styles.titleRow}>
              <ThemedText style={styles.productTitle}>{service?.title || 'Service'}</ThemedText>
              <View style={styles.priceBadge}><ThemedText style={styles.priceBadgeText}>AED100</ThemedText></View>
            </View>
            {/* Colors */}
            <View style={styles.colorsRow}>
              <ThemedText style={styles.colorsLabel}>Colors</ThemedText>
              <View style={styles.colorsList}>
                {COLORS.map((color, idx) => (
                  <View key={idx} style={[styles.colorCircle, { backgroundColor: color }]} />
                ))}
              </View>
            </View>
            {/* Description */}
            <ThemedText style={styles.sectionLabel}>Description</ThemedText>
            <ThemedText style={styles.descriptionText}>
              Our Professionals Will Visit Your Home And Diagnose The Issue. Final... <ThemedText style={styles.readMore}>Read More</ThemedText>
            </ThemedText>
            {/* Similar Products */}
            <ThemedText style={styles.sectionLabel}>Products Similar (4)</ThemedText>
            <FlatList
              data={similarProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.similarCard}>
                  <Image source={item.image} style={styles.similarImg} />
                  <View style={styles.similarPriceBadge}><ThemedText style={styles.similarPriceText}>{item.price}</ThemedText></View>
                  <ThemedText style={styles.similarTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.similarDesc}>Lorem ipsum dolor sit...</ThemedText>
                </View>
              )}
              style={{ marginBottom: 16 }}
            />
            {/* Units Selector */}
            <View style={styles.unitsRow}>
              <ThemedText style={styles.unitsLabel}>Number Of Units</ThemedText>
              <View style={styles.unitsSelector}>
                <TouchableOpacity onPress={() => setUnits(Math.max(1, units - 1))} style={styles.unitBtn}>
                  <FontAwesome name="minus" size={18} color="#FF9800" />
                </TouchableOpacity>
                <ThemedText style={styles.unitsValue}>{units}</ThemedText>
                <TouchableOpacity onPress={() => setUnits(units + 1)} style={styles.unitBtn}>
                  <FontAwesome name="plus" size={18} color="#FF9800" />
                </TouchableOpacity>
              </View>
            </View>
            {/* Total */}
            <View style={styles.totalRow}>
              <ThemedText style={styles.totalLabel}>Total:</ThemedText>
              <ThemedText style={styles.totalValue}>AED{(units * price).toFixed(2)}</ThemedText>
            </View>
            {/* Checkout Button */}
            <TouchableOpacity style={styles.checkoutBtn}>
              <ThemedText style={styles.checkoutBtnText}>Checkout</ThemedText>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 18 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
  imageGallery: { alignItems: 'center', marginBottom: 18 },
  mainImage: { width: '100%', height: 160, borderRadius: 18, resizeMode: 'cover' },
  thumbImage: { width: 48, height: 48, borderRadius: 12, marginRight: 8, borderWidth: 2, borderColor: 'transparent' },
  thumbImageSelected: { borderColor: '#FF9800' },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  productTitle: { fontWeight: 'bold', fontSize: 20 },
  priceBadge: { backgroundColor: '#FF9800', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 4 },
  priceBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  colorsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  colorsLabel: { fontWeight: 'bold', fontSize: 15, marginRight: 12 },
  colorsList: { flexDirection: 'row', gap: 8, backgroundColor: '#F2F2F2', borderRadius: 24, paddingHorizontal: 12, paddingVertical: 6 },
  colorCircle: { width: 24, height: 24, borderRadius: 12, marginRight: 8 },
  sectionLabel: { fontWeight: 'bold', fontSize: 15, marginTop: 12, marginBottom: 4 },
  descriptionText: { color: '#888', fontSize: 14, marginBottom: 8 },
  readMore: { color: '#FF9800', fontWeight: 'bold' },
  similarCard: { width: 140, backgroundColor: '#F2F2F2', borderRadius: 18, padding: 10, marginRight: 12, marginBottom: 4 },
  similarImg: { width: '100%', height: 70, borderRadius: 12, marginBottom: 8 },
  similarPriceBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#FF9800', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  similarPriceText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  similarTitle: { fontWeight: 'bold', fontSize: 15 },
  similarDesc: { color: '#888', fontSize: 12 },
  unitsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  unitsLabel: { fontWeight: 'bold', fontSize: 15 },
  unitsSelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: 24, paddingHorizontal: 12, paddingVertical: 6 },
  unitBtn: { padding: 6 },
  unitsValue: { fontWeight: 'bold', fontSize: 16, marginHorizontal: 12 },
  totalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { fontWeight: 'bold', fontSize: 15 },
  totalValue: { fontWeight: 'bold', fontSize: 16, color: '#FF9800' },
  checkoutBtn: { backgroundColor: '#FF9800', borderRadius: 24, paddingVertical: 16, alignItems: 'center', marginTop: 8, marginBottom: 24 },
  checkoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
}); 