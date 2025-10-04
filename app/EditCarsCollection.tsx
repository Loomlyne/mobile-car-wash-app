import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

const ORANGE = '#FF9800';
const CARD_RADIUS = 32;
const { width } = Dimensions.get('window');

const mockCars = [
  { id: '1', plate: 'Dub 4759575', name: 'Ford Endeavour' },
  { id: '2', plate: 'Dub 4759575', name: 'Ford Endeavour' },
];

export default function EditCarsCollection() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const [selected, setSelected] = useState('1');
  const [cars, setCars] = useState(mockCars);

  const handleDelete = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
  };

  // Right swipe actions (delete button)
  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => handleDelete(id)}
    >
      <Image
        source={require('../assets/images/delete.png')}
        style={styles.deleteIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.root, { backgroundColor: theme.background }]}>
        {/* Header */}
        <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
          <SafeAreaView style={{ paddingBottom: 12 }}>
            <View style={[styles.headerRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Image
                  resizeMode='contain'
                  source={require('../assets/images/back.png')}
                  style={[styles.back, { transform: [{ scaleX: isRTL ? -1 : 1 }] }]}
                  tintColor={theme.textPrimary}
                />
              </TouchableOpacity>
              <Text style={[styles.title, { color: theme.textPrimary }]}>Edit Cars</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* Main Card */}
        <View style={styles.cardWrap}>
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.sectionRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Cars Collections</Text>
              <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.surface }]} onPress={()=>router.push("/AddCar")}>
                <Text style={[styles.addBtnText, { color: theme.primaryOrange }]}>Add New Car </Text>
                <FontAwesome name="plus" size={14} color={theme.primaryOrange} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
              {cars.map(car => (
                <Swipeable
                  key={car.id}
                  renderRightActions={() => renderRightActions(car.id)}
                  overshootRight={false}
                  rightThreshold={40}
                  friction={2}
                >
                  <View style={[styles.carRow, { backgroundColor: theme.inputBackground }]}>
                    <View style={[styles.carInfo, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                      <View style={[styles.carIconWrap, { backgroundColor: theme.surface }]}>
                        <Image source={require('../assets/images/caricon.png')} style={styles.carIcon} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.plate, { color: theme.textTertiary }]}>{car.plate}</Text>
                        <Text style={[styles.carName, { color: theme.textPrimary }]}>{car.name}</Text>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.radioBtn} onPress={() => setSelected(car.id)}>
                      <View style={[styles.radioOuter, { borderColor: theme.border }, selected === car.id && styles.radioOuterActive]}>
                        {selected === car.id && <View style={[styles.radioInner, { backgroundColor: theme.primaryOrange }]} />}
                      </View>
                    </TouchableOpacity>
                  </View>
                </Swipeable>
              ))}
            </ScrollView>
          </View>

          {/* Fixed Continue Button */}
          <View style={styles.buttonWrap}>
            <TouchableOpacity style={[styles.continueBtn, { backgroundColor: theme.primaryOrange }]} activeOpacity={0.85}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  headerGradient: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    height: 24,
    width: 24
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000'
  },
  cardWrap: { flex: 1, marginTop: 32, zIndex: 1, alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    width: width - 24,
    paddingHorizontal: 18,
    paddingTop: 25,

  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  sectionTitle: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 6 },
  addBtnText: { color: ORANGE, fontWeight: 'bold', fontSize: 13, marginRight: 4 },
  carRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  carInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  carIconWrap: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#FFF3E0', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  plate: { color: '#B0B0B0', fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  carName: { color: '#222', fontWeight: 'bold', fontSize: 15 },
  radioBtn: { marginLeft: 8 },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#E0E0E0', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  radioOuterActive: { borderColor: ORANGE },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: ORANGE },
  buttonWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingBottom: 18 },
  continueBtn: { backgroundColor: ORANGE, borderRadius: 24, width: width - 48, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  continueText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  carIcon: { width: 32, height: 32, resizeMode: 'contain' },

  // Delete swipe action
  deleteAction: {
    backgroundColor: '#FFE0E0',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 16,
    marginBottom: 14,
  },
  deleteIcon: { width: 28, height: 28 },
});