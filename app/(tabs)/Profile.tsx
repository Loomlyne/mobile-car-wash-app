import LogoutModal from '@/components/LogoutModal';
import OrderCancelledModal from '@/components/OrderCancelledModal';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import RatingModal from '@/components/RatingModal';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const ORANGE = '#FF9800';

// Use PNG icons instead of vector icons
const icons: Record<string, any> = {
  back: require("../../assets/images/back.png"),
  lock: require("../../assets/images/password.png"),
  car: require("../../assets/images/truck.png"),
  credit: require("../../assets/images/settings.png"),
  support: require("../../assets/images/phone.png"),
  star: require("../../assets/images/rate.png"),
  moon: require("../../assets/images/dark.png"),
  globe: require("../../assets/images/language.png"),
  logout: require("../../assets/images/logout.png"),
  edit: require("../../assets/images/edit.png"),
};

const getActions = (t: any) => [
  { icon: "lock", label: t('profile.passwordSettings'), key: "Password Settings" },
  { icon: "car", label: t('profile.editCarsCollection'), key: "Edit cars collection" },
  { icon: "credit", label: t('profile.manageSubscription'), key: "Manage Subscription" },
  { icon: "support", label: t('profile.support'), key: "Support" },
  { icon: "star", label: t('profile.rateUs'), key: "Rate Us" },
];

const actionRoutes: Record<string, string> = {
  Orders: "/OrderPlaced",
  "Change Building": "/ChangeBuilding",
  "My Wallet": "/MyWallet",
  "Password Settings": "/PasswordSettings",
  "Manage Subscription": "/ManageSubscription",
  Offers: "/Offers",
 "Edit cars collection":"/EditCarsCollection",
  Notification: "/NotificationSettings",
  "Refer a Friend": "/ReferAFriend",
  Support: "/Support",
  "Rate Us": "/RateUs",
};

export default function ProfileScreen() {
  const { theme, themeMode, toggleTheme } = useTheme();
  const { language, t, changeLanguage, isRTL } = useLanguage();
  const [showCancel, setShowCancel] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [profile, setProfile] = useState<{ name: string; email: string; avatar: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // const fetchProfile = async () => {
  //   setLoading(true);
  //   const { data: { user } } = await supabase.auth.getUser();
  //   if (!user) {
  //     setLoading(false);
  //     return;
  //   }
  //   const { data: profileData } = await supabase
  //     .from("profiles")
  //     .select("*")
  //     .eq("phone", `+${user.phone}`)
  //     .single();

  //   if (profileData) {
  //     setProfile({
  //       name: (profileData.first_name || "") + " " + (profileData.last_name || ""),
  //       email: profileData.email || "",
  //       avatar: profileData.image || "https://randomuser.me/api/portraits/women/44.jpg",
  //     });
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchProfile();
  //   }, [])
  // );

  const handleRate = async (rating: number) => {
    try {





    } catch (error) {

    }
  };

  const handleLanguageToggle = async () => {
    const newLang = language === 'en' ? 'ar' : 'en';

    // Simply toggle the language - RTL is handled by isRTL state
    await changeLanguage(newLang);

    // Show success message
    Alert.alert(
      newLang === 'ar' ? 'تم تغيير اللغة' : 'Language Changed',
      newLang === 'ar'
        ? 'تم تغيير اللغة إلى العربية'
        : 'Language changed to English',
      [{ text: 'OK' }]
    );
  };

  // if (loading) {
  //   return (
  //     <SafeAreaView style={styles.centered}>
  //       <Text>Loading...</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header */}
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image
                resizeMode='contain'
                source={require('../../assets/images/back.png')}
                style={[styles.back, { transform: [{ scaleX: isRTL ? -1 : 1 }] }]}
                tintColor="#000"
              />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary, textTransform: 'capitalize' }]}>{t('profile.profile')}</Text>
          </View>

          {/* Avatar and Name Section */}
          <View style={[styles.profileSection, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri:"https://randomuser.me/api/portraits/women/44.jpg" }} style={styles.avatar} />
              <TouchableOpacity
                onPress={() => {
                  router.push("/EditProfile");
                }}
                style={[styles.editAvatarBtn, isRTL ? { left: 0, right: 'auto' } : { right: 0, left: 'auto' }]}
              >
                <Image source={icons.edit} style={styles.smallIcon} />
              </TouchableOpacity>
            </View>
            <View style={[styles.userInfo, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
              <Text style={[styles.name, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>Vesta T. Hunter</Text>
              <Text style={[styles.email, { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left' }]}>vestahunter@gmail.com</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Main content */}
      <View style={[styles.content, { backgroundColor: theme.background }]}>
        {getActions(t).map((a) => (
          <TouchableOpacity
            key={a.key}
            style={[styles.actionRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            onPress={() => {
              if (a.key === "Rate Us") setShowRating(true);
              else if (a.key === "Log out") setShowLogout(true);
              else router.push(actionRoutes[a.key] as any);
            }}
          >
            <View style={styles.iconCircle}>
              <Image source={icons[a.icon]} style={styles.icon} />
            </View>
            <Text style={[styles.actionLabel, { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left' }]}>{a.label}</Text>
            <Image
              source={require('../../assets/images/back.png')}
              style={[
                styles.chevron,
                isRTL ? { marginRight: "auto" } : { marginLeft: "auto" },
                { transform: [{ rotate: isRTL ? '0deg' : '180deg' }, { scaleX: isRTL ? -1 : 1 }], tintColor: theme.textSecondary }
              ]}
            />
          </TouchableOpacity>
        ))}

        <View style={[styles.actionRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={styles.iconCircle}>
            <Image source={icons.moon} style={styles.icon} />
          </View>
          <Text style={[styles.actionLabel, { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left' }]}>{t('profile.darkTheme')}</Text>
          <Switch
            value={themeMode === 'dark'}
            onValueChange={toggleTheme}
            thumbColor="#fff"
            trackColor={{ true: theme.primaryOrange, false: "#D1D2D3" }}
            style={isRTL ? { marginRight: "auto" } : { marginLeft: "auto" }}
          />
        </View>

        <TouchableOpacity style={[styles.actionRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]} onPress={handleLanguageToggle}>
          <View style={styles.iconCircle}>
            <Image source={icons.globe} style={styles.icon} />
          </View>
          <Text style={[styles.actionLabel, { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left' }]}>{t('profile.language')}</Text>
          <Text style={[styles.langText, { color: theme.textPrimary, textAlign: isRTL ? 'right' : 'left' }]}>
            {language === 'ar' ? t('profile.arabic') : t('profile.english')}
          </Text>
          <Image
            source={require('../../assets/images/back.png')}
            style={[
              styles.chevron,
              isRTL ? { marginRight: 8 } : { marginLeft: 8 },
              { transform: [{ rotate: isRTL ? '0deg' : '180deg' }, { scaleX: isRTL ? -1 : 1 }] }
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
          onPress={() => setShowLogout(true)}
        >
          <View style={styles.iconCircle}>
            <Image source={icons.logout} style={styles.icon} />
          </View>
          <Text style={[styles.actionLabel, { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left' }]}>{t('profile.logOut')}</Text>
          <Image
            source={require('../../assets/images/back.png')}
            style={[
              styles.chevron,
              isRTL ? { marginRight: "auto" } : { marginLeft: "auto" },
              { transform: [{ rotate: isRTL ? '0deg' : '180deg' }, { scaleX: isRTL ? -1 : 1 }] }
            ]}
          />
        </TouchableOpacity>
      </View>

        {/* Modals */}
        <OrderCancelledModal visible={showCancel} onClose={() => setShowCancel(false)} />
        <OrderSuccessModal visible={showSuccess} onClose={() => setShowSuccess(false)} />
        <RatingModal visible={showRating} onClose={() => setShowRating(false)} onRate={handleRate} />
        <LogoutModal visible={showLogout} onClose={() => setShowLogout(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  headerGradient: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    marginBottom: 24,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    height: 24,
    width: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FBBC04",
  },
  smallIcon: {
    width: 18,
    height: 18,
    tintColor: "#fff",
    resizeMode: "contain"
  },
  userInfo: {
    flex: 1,
    gap: 4,
    paddingBottom: 8,
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
    color: "#1E1E1E",
  },
  email: {
    color: "#8D8E90",
    fontSize: 14,
    textTransform: 'lowercase',
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  actionLabel: {
    flex: 1,
    color: "#8D8E90",
    fontSize: 16,
    fontWeight: "500",
  },
  langText: {
    color: "#1E1E1E",
    fontWeight: "500",
    fontSize: 16,
  },
  chevron: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
