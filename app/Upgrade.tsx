import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

const ORANGE = '#FF9800';
const CARD_RADIUS = 32;
const { width } = Dimensions.get('window');

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Up To 4 Washes A Month',
    features: [
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
    ],
    carOptions: [
      { id: 'small', label: 'Small Car', price: 'AED 40.00', selected: true },
      { id: 'big', label: 'Big Car', price: 'AED 80.00', selected: false },
    ],
  },
  {
    id: 'medium',
    name: 'Medium',
    subtitle: 'Up To 8 Washes A Month',
    features: [
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
    ],
    carOptions: [
      { id: 'small', label: 'Small Car', price: 'AED 60.00', selected: false },
      { id: 'big', label: 'Big Car', price: 'AED 120.00', selected: false },
    ],
  },
];

export default function UpgradeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [selectedCar, setSelectedCar] = useState('small');

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      {/* Header */}
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image
                resizeMode='contain'
                source={require('../assets/images/back.png')}
                style={[styles.backIcon, { transform: [{ scaleX: isRTL ? -1 : 1 }] }]}
                tintColor={theme.textPrimary}
              />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Upgrade</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>
      {/* Card */}
      <View style={styles.cardWrap}>
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plansRow}>
            {plans.map(plan => (
              <View
                key={plan.id}
                style={[styles.planCard, { backgroundColor: theme.surface, borderColor: theme.border }, selectedPlan === plan.id && [styles.planCardActive, { borderColor: theme.primaryOrange }]]}
              >
                <Text style={[styles.planName, { color: theme.textPrimary }]}>{plan.name}</Text>
                <Text style={[styles.planSubtitle, { color: theme.textSecondary }]}>{plan.subtitle}</Text>
                {plan.features.map((f, i) => (
                  <View key={i} style={styles.featureRow}>
                    <FontAwesome name="check" size={16} color={theme.primaryOrange} style={{ marginRight: 8 }} />
                    <Text style={[styles.featureText, { color: theme.textSecondary }]}>{f}</Text>
                  </View>
                ))}
                <View style={styles.carOptionsRow}>
                  {plan.carOptions.map(opt => (
                    <TouchableOpacity
                      key={opt.id}
                      style={[styles.carOption, { borderColor: theme.border, backgroundColor: theme.cardBackground }, selectedCar === opt.id && selectedPlan === plan.id && [styles.carOptionActive, { borderColor: theme.primaryOrange, backgroundColor: theme.surface }]]}
                      onPress={() => { setSelectedPlan(plan.id); setSelectedCar(opt.id); }}
                    >
                      <Text style={[styles.carOptionText, { color: theme.textSecondary }, selectedCar === opt.id && selectedPlan === plan.id && [styles.carOptionTextActive, { color: theme.primaryOrange }]]}>{opt.label}</Text>
                      <Text style={[styles.carOptionPrice, { color: theme.textSecondary }, selectedCar === opt.id && selectedPlan === plan.id && [styles.carOptionTextActive, { color: theme.primaryOrange }]]}>{opt.price} <Text style={[styles.carOptionPer, { color: theme.textSecondary }]}>/month</Text></Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
          <Text style={[styles.loremText, { color: theme.textSecondary }]}>Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet</Text>
          <TouchableOpacity style={[styles.startBtn, { backgroundColor: theme.primaryOrange }]} onPress={() => router.push('/ScheduleOrder')}>
            <FontAwesome name="bolt" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.startBtnText}>Start Tomorrow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F5F5' },
  headerGradient: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
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
  cardWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', borderRadius: CARD_RADIUS, width: width - 24, paddingBottom: 0, paddingTop: 24, paddingHorizontal: 0, marginTop: 32, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 16, elevation: 8 },
  plansRow: { flexDirection: 'row', paddingHorizontal: 18, paddingBottom: 12 },
  planCard: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 2, borderColor: '#F2F2F2', padding: 18, marginRight: 18, width: width * 0.7, minWidth: 260 },
  planCardActive: { borderColor: ORANGE },
  planName: { fontWeight: 'bold', fontSize: 18, color: '#222', marginBottom: 2 },
  planSubtitle: { color: '#888', fontSize: 14, marginBottom: 12 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  featureText: { color: '#888', fontSize: 14 },
  carOptionsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 },
  carOption: { flexDirection: 'row', marginTop: 12, width: "100%", alignItems: 'center', borderWidth: 2, borderColor: '#E0E0E0', borderRadius: 16, paddingVertical: 8, gap: 12, paddingHorizontal: 12, marginRight: 8, backgroundColor: '#fff', marginBottom: 0 },
  carOptionActive: { borderColor: ORANGE, backgroundColor: '#FFF3E0' },
  carOptionText: { color: '#888', fontWeight: 'bold', fontSize: 15, marginRight: 8 },
  carOptionTextActive: { color: ORANGE },
  carOptionPrice: { color: '#888', fontWeight: 'bold', fontSize: 14 },
  carOptionPer: { color: '#888', fontWeight: 'normal', fontSize: 13 },
  loremText: { color: '#888', fontSize: 13, marginHorizontal: 18, marginTop: 12, marginBottom: 18 },
  startBtn: { backgroundColor: ORANGE, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, marginHorizontal: 18, marginBottom: 18 },
  startBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
}); 