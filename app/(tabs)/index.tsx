import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const ORANGE = '#FF8A00';
const BLACK = '#1E1E1E';
const GREYSCALE = '#8D8E90';
const BACKGROUND = '#F5F5F5';
const YELLOW = '#FBBC04';

const getServices = (t: any) => [
  { id: '1', title: t('home.oneTimeWash'), price: 50 },
  { id: '2', title: t('home.monthlyWashes'), price: 50 },
];

// State configuration - these would come from your backend/state management
const hasServices = true; // Show service cards (One Time Wash, Monthly Washes)
const hasPromo = true; // Show promotional banner
const hasBooking = true; // Show booking status
const bookingStatus = 'inProgress'; // 'accepted', 'inProgress', 'completed'
const isUpgraded = false; // If true, hide upgrade button (showing upgrade button)
const recommended = [
  { id: '1', title: 'Home Cleaning', desc: 'Lorem ipsum dolor sit amet', image: require('../../assets/images/car.png') },
  { id: '2', title: 'Home Cleaning', desc: 'Lorem ipsum dolor sit amet', image: require('../../assets/images/car.png') },
  { id: '3', title: 'Home Cleaning', desc: 'Lorem ipsum dolor sit amet', image: require('../../assets/images/car.png') },
  { id: '4', title: 'Home Cleaning', desc: 'Lorem ipsum dolor sit amet', image: require('../../assets/images/car.png') },
];

const categories = ['Category 1', 'Category 2', 'Category 3'];

export default function HomeScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(2);
  const [profile, setProfile] = useState<{ name: string; avatar: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState<any[]>([]);

  useEffect(() => {
    fetchUserProfile();
    fetchRecommended();
  }, []);

  const fetchUserProfile = async () => {
    try {
    
   

     
    } catch (error) {
  
    } finally {
    }
  };

  const fetchRecommended = async () => {
    try {
      // You can add filters or limits here if you want
    
    } catch (error) {
    }
  };

  const handleShowNotification = () => {
   
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Yellow Gradient Header */}
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.header}>
        <SafeAreaView style={[styles.safeArea, { paddingBottom: 12 }]}>
          <View style={[styles.headerRowBox, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Image
              source={{ uri: profile?.avatar || 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.avatar}
            />
            <View style={[styles.headerTextWrap, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
              <Text style={[styles.helloText, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>{t('home.hello')}</Text>
              <Text style={[styles.userName, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>{profile?.name || 'Vesta T. Hunter'}</Text>
            </View>
            {!isUpgraded && (
              <TouchableOpacity onPress={()=>router.push('/ManageSubscription')} style={[styles.upgradeBtn, { backgroundColor: theme.primaryOrange, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Ionicons name="flash" size={18} color={theme.buttonText} style={isRTL ? { marginLeft: 6 } : { marginRight: 6 }} />
                <Text style={[styles.upgradeBtnText, { color: theme.buttonText }]}>{t('home.upgrade')}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Title */}
          <View style={styles.titleWrap}>
            <Text style={[styles.carsDeserveTitle, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>
              {t('home.carsDeserve')} <Text style={[styles.carsDeserveBetter, { color: theme.primaryOrange }]}>{t('home.better')} </Text>
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[styles.mainContent, { backgroundColor: theme.background }]}>
        {/* Service Cards */}
        {hasServices && (
          <View style={styles.serviceContainer}>
            {getServices(t).map(s => (
              <View key={s.id} style={[styles.serviceCard, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.serviceTitle, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>{s.title}</Text>
                <Text style={[styles.serviceDesc, { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left' }]}>{t('home.loremIpsum')}</Text>
                <View style={[styles.serviceFooter, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <View style={[styles.priceTag, { backgroundColor: theme.surface }]}>
                    <Text style={[styles.servicePrice, { color: theme.primaryOrange }]}>${s.price}</Text>
                  </View>
                  <TouchableOpacity onPress={()=>router.push("/(tabs)/Bookings")} style={[styles.bookBtn, { backgroundColor: theme.buttonBackground }]}>
                    <Text style={[styles.bookBtnText, { color: theme.buttonText }]}>{t('home.book')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
        {hasPromo && (
          <View style={[styles.promoBanner, { backgroundColor: theme.cardBackground, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View style={[styles.promoContent, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
              <Text style={[styles.promoTitle, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>{t('home.getOff')}</Text>
              <Text style={[styles.promoDesc, { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left' }]}>{t('home.onFirstService')}</Text>
              <TouchableOpacity onPress={()=>router.push('/Offers')} style={[styles.promoBtn, { backgroundColor: theme.surface }]}>
                <Text style={[styles.promoBtnText, { color: theme.textPrimary }]}>{t('home.bookNow')}</Text>
              </TouchableOpacity>
              <View style={styles.carouselDots}>
                <View style={styles.carouselDot} />
                <View style={styles.carouselDot} />
                <View style={styles.carouselDotActive} />
              </View>
            </View>
            <Image source={require('../../assets/images/hk1.png')} style={styles.promoImg} />
          </View>
        )}
      
        {/* Booking Status */}
        {hasBooking && (
          <View style={{ marginHorizontal: 18, marginBottom: 200, marginTop: hasPromo ? -70 : 20 }}>
            <Text style={[styles.bookingTitleOutside, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>{t('home.bookingConfirmed')}</Text>
            <TouchableOpacity onPress={()=>router.push("/OrderInProgress")}>
              <View style={[styles.bookingStatusContainer, { backgroundColor: theme.cardBackground }]}>
                <View style={[styles.bookingRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <View style={[styles.bookingIcon, { backgroundColor: theme.surface }]}>
                    <Ionicons name="calendar" size={30} color={theme.textPrimary} />
                  </View>
                  <View style={{ flex: 1, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                    <Text style={[styles.bookingCar, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>{t('vehicles.toyotaFortuner')}</Text>
                    <Text style={[styles.bookingTime, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>Today, 10:00-11:00 Am</Text>
                  </View>
                  <TouchableOpacity style={[styles.closeBtn, { backgroundColor: theme.surface }]}>
                    <Ionicons name="close" size={16} color={theme.textSecondary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.statusTabsNew}>
                  <View style={styles.statusTabItem}>
                    <Text style={bookingStatus === 'accepted' || bookingStatus === 'inProgress' || bookingStatus === 'completed' ? [styles.statusTabTextActive, { color: theme.textPrimary }] : [styles.statusTabTextInactive, { color: theme.textSecondary }]}>
                      {t('home.accepted')}
                    </Text>
                    {(bookingStatus === 'accepted' || bookingStatus === 'inProgress' || bookingStatus === 'completed') && (
                      <View style={[styles.orangeUnderline, { backgroundColor: theme.primaryOrange }]} />
                    )}
                  </View>
                  <View style={styles.statusTabItem}>
                    <Text style={bookingStatus === 'inProgress' || bookingStatus === 'completed' ? [styles.statusTabTextActive, { color: theme.textPrimary }] : [styles.statusTabTextInactive, { color: theme.textSecondary }]}>
                      {t('home.inProgress')}
                    </Text>
                    {(bookingStatus === 'inProgress' || bookingStatus === 'completed') && (
                      <View style={[styles.orangeUnderline, { backgroundColor: theme.primaryOrange }]} />
                    )}
                  </View>
                  <View style={styles.statusTabItem}>
                    <Text style={bookingStatus === 'completed' ? [styles.statusTabTextActive, { color: theme.textPrimary }] : [styles.statusTabTextInactive, { color: theme.textSecondary }]}>
                      {t('home.completed')}
                    </Text>
                    {bookingStatus === 'completed' && (
                      <View style={[styles.orangeUnderline, { backgroundColor: theme.primaryOrange }]} />
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}


        {/* Royal Logo - Empty State */}
        {!hasServices && !hasPromo && !hasBooking && (
          <View style={styles.logoContainer}>
            <Image resizeMode='contain' source={require('../../assets/images/royal-logo2.png')} style={styles.logo} />
          </View>
        )}
       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  safeArea: {
    paddingTop: 40,
  },
  headerRowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
  },
  headerTextWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  helloText: {
    color: BLACK,
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  userName: {
    color: BLACK,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  bookingTitleOutside: {
    fontWeight: '600',
    fontSize: 18,
    color: BLACK,
    marginBottom: 15,
    paddingLeft: 4,
  },

  bookingStatusContainer: {
    backgroundColor: BACKGROUND,
    borderRadius: 20,
    padding: 16,
  },
  
  promoBanner: {
    flexDirection: 'row',
    backgroundColor: BACKGROUND,
    borderRadius: 25,
    padding: 0,
    alignItems: 'center',
    marginBottom: 100,
    marginHorizontal: 18,
    height: 180,
    overflow: 'hidden',
  },
  promoTitle: {
    fontWeight: '700',
    fontSize: 30,
    color: BLACK,
    marginBottom: 2,
    lineHeight: 40,
  },
  promoDesc: {
    color: GREYSCALE,
    marginBottom: 10,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  promoBtn: {
    backgroundColor: '#fff',
    borderRadius: 45,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  promoBtnText: {
    color: BLACK,
    fontWeight: '500',
    fontSize: 14,
  },
  promoContent: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: 42,
  },
  promoImg: {
    width: 132,
    height: 192,
    position: 'absolute',
    right: 0,
    top: 0,
    resizeMode: 'cover',
  },
  carouselDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  carouselDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    marginRight: 5,
  },
  carouselDotActive: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: BLACK,
    marginRight: 5,
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  bookingIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingCar: {
    fontWeight: '600',
    fontSize: 18,
    color: BLACK,
    marginBottom: 4,
  },
  bookingTime: {
    color: BLACK,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  closeBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ORANGE,
    borderRadius: 45,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  upgradeBtnText: {
    color: '#2B2200',
    fontWeight: '500',
    fontSize: 16,
  },
  titleWrap: {
    paddingHorizontal: 4,
  },
  carsDeserveTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: BLACK,
    lineHeight: 40,
  },
  carsDeserveBetter: {
    color: ORANGE,
    fontWeight: '700',
    fontSize: 30,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 18,
    gap: 12,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: BACKGROUND,
    borderRadius: 20,
    padding: 12,
  },
  serviceTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
    color: BLACK,
    textTransform: 'capitalize',
  },
  serviceDesc: {
    color: GREYSCALE,
    fontSize: 12,
    marginBottom: 8,
  },
  serviceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceTag: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  servicePrice: {
    fontWeight: '600',
    color: ORANGE,
    fontSize: 14,
  },
  bookBtn: {
    backgroundColor: BLACK,
    borderRadius: 23,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  bookBtnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  statusTabsNew: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },

  statusTabItem: {
    alignItems: 'center',
    flex: 1,
  },

  statusTabTextActive: {
    fontWeight: '500',
    fontSize: 14,
    color: BLACK,
    marginBottom: 5,
  },

  statusTabTextInactive: {
    fontWeight: '400',
    fontSize: 14,
    color: GREYSCALE,
    marginBottom: 5,
    textTransform: 'capitalize',
  },

  orangeUnderline: {
    height: 1,
    width: 9,
    borderRadius: 2,
    backgroundColor: ORANGE,
  },
  logo: {
    width: 200,
    height: 200,
    opacity: 0.8,
    marginBottom:"200"
  },
});