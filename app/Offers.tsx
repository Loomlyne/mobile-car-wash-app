import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

const { width } = Dimensions.get('window');

interface RewardOffer {
  id: string;
  title: string;
  points: number;
  icon: string;
}

export default function OffersScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const [rewardsOffers, setRewardsOffers] = useState<RewardOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {


  };

  const handleOfferPress = (item: RewardOffer) => {

  };

  const renderRewardOffer = ({ item }: { item: RewardOffer }) => (
    <TouchableOpacity
      style={[styles.rewardCard, { backgroundColor: theme.cardBackground }]}
      onPress={() => handleOfferPress(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.primaryOrange }]}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      <View style={styles.rewardInfo}>
        <Text style={[styles.rewardTitle, { color: theme.textPrimary }]}>{item.title}</Text>
        <Text style={[styles.rewardPoints, { color: theme.textSecondary }]}>{item.points} Points</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.textPrimary }}>Loading offers...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header */}
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={[styles.headerRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image
                resizeMode='contain'
                source={require('../assets/images/back.png')}
                style={[styles.backIcon, { transform: [{ scaleX: isRTL ? -1 : 1 }] }]}
                tintColor="#000"
              />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Rewards Points Offers</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Content */}
      <View style={[styles.content, { backgroundColor: theme.background }]}>
        <FlatList
          data={rewardsOffers}
          renderItem={renderRewardOffer}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 100, paddingHorizontal: 18 }}
          showsVerticalScrollIndicator={false}
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
  content: {
    flex: 1,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  rewardPoints: {
    fontSize: 14,
    color: '#888',
  },
});
