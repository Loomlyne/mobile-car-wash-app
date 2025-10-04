import { ThemedText } from '@/components/ThemedText';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const carViews = ['Interior', 'Exterior', 'Both'];
const categories = ['All', 'Car Scent', 'Seats', 'Norm'];
const carTypes = [
  { label: 'Sedan', icon: 'car-side' },
  { label: 'Motorcycle', icon: 'motorcycle' },
  { label: 'SUV', icon: 'car' },
  { label: 'Van', icon: 'shuttle-van' },
];

interface FilterProps {
  onClose?: () => void;
  onApply?: (filter: { category: string; carType: string; minPrice: string; maxPrice: string }) => void;
}

const Filter = ({ onClose, onApply }: FilterProps) => {
  const [selectedView, setSelectedView] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  function handleApply() {
    if (onApply) {
      onApply({
        category: categories[selectedCategory],
        carType: carTypes[selectedType].label,
        minPrice,
        maxPrice,
      });
    }
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ThemedText style={styles.header}>Filter</ThemedText>
        {/* Car View */}
        <ThemedText style={styles.label}>Car View</ThemedText>
        <View style={styles.pillRow}>
          {carViews.map((v, idx) => (
            <TouchableOpacity
              key={v}
              style={[styles.pill, selectedView === idx && styles.pillActive]}
              onPress={() => setSelectedView(idx)}
            >
              <ThemedText style={[styles.pillText, selectedView === idx && styles.pillTextActive]}>{v}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        {/* Categories */}
        <ThemedText style={styles.label}>Categories</ThemedText>
        <View style={styles.pillRow}>
          {categories.map((c, idx) => (
            <TouchableOpacity
              key={c}
              style={[styles.pill, selectedCategory === idx && styles.pillActive]}
              onPress={() => setSelectedCategory(idx)}
            >
              <ThemedText style={[styles.pillText, selectedCategory === idx && styles.pillTextActive]}>{c}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        {/* Car Type */}
        <ThemedText style={styles.label}>Car Type</ThemedText>
        <View style={styles.iconRow}>
          {carTypes.map((type, idx) => (
            <TouchableOpacity
              key={type.label}
              style={[styles.iconPill, selectedType === idx && styles.iconPillActive]}
              onPress={() => setSelectedType(idx)}
            >
              <FontAwesome5
                name={type.icon}
                size={24}
                color={selectedType === idx ? '#fff' : '#FF9800'}
                style={{ marginBottom: 4 }}
              />
              <ThemedText style={[styles.iconPillText, selectedType === idx && styles.iconPillTextActive]}>{type.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        {/* Price */}
        <ThemedText style={styles.label}>Price</ThemedText>
        <View style={styles.priceRow}>
          <TextInput
            style={styles.priceInput}
            placeholder="Min Price"
            keyboardType="numeric"
            value={minPrice}
            onChangeText={setMinPrice}
          />
          <TextInput
            style={styles.priceInput}
            placeholder="Max Price"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={setMaxPrice}
          />
        </View>
        {/* Continue Button */}
        <TouchableOpacity style={styles.continueBtn} onPress={handleApply}>
          <ThemedText style={styles.continueBtnText}>Continue</ThemedText>
        </TouchableOpacity>
        {onClose && (
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <FontAwesome5 name="times" size={24} color="#FF9800" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 100,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 24,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 16,
    minHeight: 600,
    alignSelf: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  header: { fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginBottom: 18 },
  label: { fontWeight: 'bold', fontSize: 15, marginTop: 12, marginBottom: 8 },
  pillRow: { flexDirection: 'row', marginBottom: 8 },
  pill: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 24,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: 'center',
  },
  pillActive: { backgroundColor: '#FF9800' },
  pillText: { color: '#888', fontWeight: 'bold', fontSize: 15 },
  pillTextActive: { color: '#fff' },
  iconRow: { flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between' },
  iconPill: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  iconPillActive: { backgroundColor: '#FF9800' },
  iconPillText: { color: '#888', fontWeight: 'bold', fontSize: 13 },
  iconPillTextActive: { color: '#fff' },
  priceRow: { flexDirection: 'row', marginBottom: 16, marginTop: 8 },
  priceInput: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#222',
    marginRight: 8,
  },
  continueBtn: {
    backgroundColor: '#FF9800',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  continueBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
}); 