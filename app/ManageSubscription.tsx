import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const ORANGE = '#FF8A00';
const BLACK = '#1E1E1E';
const GREYSCALE = '#8D8E90';
const { width } = Dimensions.get('window');

const plans = [
  {
    id: 'starter',
    title: 'Starter',
    subtitle: '4 Washes/Month',
    smallPrice: '40',
    bigPrice: '80',
  },
  {
    id: 'premium',
    title: 'Premium',
    subtitle: '8 Washes/Month',
    smallPrice: '70',
    bigPrice: '140',
    popular: true,
  },
  {
    id: 'ultra',
    title: 'Ultra',
    subtitle: '12 Washes/Month',
    smallPrice: '100',
    bigPrice: '200',
  },
];

export default function ManageSubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [carSize, setCarSize] = useState('small'); // 'small' or 'big'

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={['#FFFFFF', '#F8F8F8']} style={styles.headerGradient}>
        <SafeAreaView edges={['top']} style={{ paddingBottom: 12 }}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image resizeMode='contain' source={require('../assets/images/back.png')} style={styles.backIcon} tintColor="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Manage Subscription</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        {/* Car Size Toggle */}
        <View style={styles.toggleContainer}>
          <Text style={styles.sectionTitle}>Car Size</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, carSize === 'small' && styles.toggleBtnActive]}
              onPress={() => setCarSize('small')}
            >
              <Text style={[styles.toggleText, carSize === 'small' && styles.toggleTextActive]}>
                Small Car
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, carSize === 'big' && styles.toggleBtnActive]}
              onPress={() => setCarSize('big')}
            >
              <Text style={[styles.toggleText, carSize === 'big' && styles.toggleTextActive]}>
                Big Car
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Plans Grid */}
        <View style={styles.plansContainer}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          <View style={styles.plansGrid}>
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              const price = carSize === 'small' ? plan.smallPrice : plan.bigPrice;
              return (
                <TouchableOpacity
                  key={plan.id}
                  style={[
                    styles.planCard,
                    isSelected && styles.planCardSelected
                  ]}
                  onPress={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>Popular</Text>
                    </View>
                  )}
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.currency, isSelected && { color: ORANGE }]}>AED</Text>
                    <Text style={[styles.price, isSelected && { color: ORANGE }]}>{price}</Text>
                    <Text style={styles.period}>/mo</Text>
                  </View>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => {
            // Handle subscription update
            router.back();
          }}
        >
          <Ionicons name="flash" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.startBtnText}>Update Subscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 16,
    fontWeight: '600',
    color: BLACK,
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  toggleContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: BLACK,
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 4,
    gap: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 22,
  },
  toggleBtnActive: {
    backgroundColor: ORANGE,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: GREYSCALE,
  },
  toggleTextActive: {
    color: '#fff',
  },
  plansContainer: {
    flex: 1,
  },
  plansGrid: {
    gap: 16,
  },
  planCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: ORANGE,
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: ORANGE,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: BLACK,
    marginBottom: 4,
  },
  planSubtitle: {
    fontSize: 14,
    color: GREYSCALE,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  currency: {
    fontSize: 14,
    fontWeight: '600',
    color: BLACK,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: BLACK,
  },
  period: {
    fontSize: 14,
    color: GREYSCALE,
  },
  checkCircle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  startBtn: {
    flexDirection: 'row',
    backgroundColor: ORANGE,
    paddingVertical: 16,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
