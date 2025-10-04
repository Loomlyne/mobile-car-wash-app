import { decode as atob } from 'base-64';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './context/ThemeContext';
import { useLanguage } from './context/LanguageContext';

const ORANGE = '#FF9800';

const genders = ['Male', 'Female'];

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const { language, isRTL } = useLanguage();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [countryCode, setCountryCode] = useState<CountryCode>('AE');
  const [country, setCountry] = useState<Country | null>(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/women/44.jpg');
  const [newAvatarUri, setNewAvatarUri] = useState<string | null>(null);

  const requestImagePickerPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photo library');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    try {
      const hasPermission = await requestImagePickerPermissions();
      if (!hasPermission) return;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        setNewAvatarUri(result.assets[0].uri);
        setAvatar(result.assets[0].uri); // Update avatar immediately for preview
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const icons: Record<string, any> = {
    back: require("../assets/images/back.png"),
    lock: require("../assets/images/password.png"),
    credit: require("../assets/images/settings.png"),
    support: require("../assets/images/phone.png"),
    star: require("../assets/images/rate.png"),
    moon: require("../assets/images/dark.png"),
    globe: require("../assets/images/language.png"),
    logout: require("../assets/images/logout.png"),
    edit: require("../assets/images/edit.png"),

  };

  const actions = [
    { icon: "lock", label: "Password Settings" },
    { icon: "credit", label: "Manage Subscription" },
    { icon: "support", label: "Support" },
    { icon: "star", label: "Rate Us" },
  ];

  // useEffect(() => {
  //   fetchUserProfile();
  // }, []);

  // const fetchUserProfile = async () => {
  //   try {
  //     setLoading(true);

  //     // Get current user
  //     const { data: { user } } = await supabase.auth.getUser();
  //     if (!user) {
  //       Alert.alert('Error', 'User not found');
  //       router.back();
  //       return;
  //     }

  //     // Get user profile from database
  //     const { data: profileData, error } = await supabase
  //       .from('profiles')
  //       .select('*')
  //       .eq('phone', `+${user.phone}`)
  //       .single();

  //     if (error) {
  //       console.error('Error fetching profile:', error);
  //       Alert.alert('Error', 'Failed to load profile data');
  //       return;
  //     }

  //     if (profileData) {
  //       setFirstName(profileData.firstname || '');
  //       setLastName(profileData.lastname || '');
  //       setEmail(profileData.email || '');
  //       setPhone(profileData.phone ? profileData.phone.replace('+', '') : '');
  //       setGender(profileData.gender || 'Male');
  //       setCountryCode(profileData.country_code || 'AE');
  //       setAvatar(profileData.avatar_url || 'https://randomuser.me/api/portraits/women/44.jpg');

  //       // Set country data if available
  //       if (profileData.country_code) {
  //         setCountry({
  //           cca2: profileData.country_code,
  //           callingCode: [profileData.calling_code || '971'],
  //           name: profileData.country_name || 'United Arab Emirates',
  //         } as Country);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error in fetchUserProfile:', error);
  //     Alert.alert('Error', 'Failed to load profile data');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // const handleSave = async () => {
  //   if (!firstname.trim()) {
  //     Alert.alert('Error', 'Name is required');
  //     return;
  //   }
  //   if (!email.trim()) {
  //     Alert.alert('Error', 'Email is required');
  //     return;
  //   }
  //   if (!phone.trim()) {
  //     Alert.alert('Error', 'Phone number is required');
  //     return;
  //   }
  //   try {
  //     setSaving(true);
  //     // Get current user
  //     const { data: { user } } = await supabase.auth.getUser();
  //     if (!user) {
  //       Alert.alert('Error', 'User not found');
  //       return;
  //     }
  //     // Get user's numeric ID
  //     const { data: profileData } = await supabase
  //       .from('profiles')
  //       .select('id')
  //       .eq('phone', `+${user.phone}`)
  //       .single();
  //     if (!profileData) {
  //       Alert.alert('Error', 'Profile not found');
  //       return;
  //     }
  //     let avatarUrl = avatar;
  //     if (newAvatarUri) {
  //       setUploadingImage(true);
  //       const uploadedUrl = await uploadImage(newAvatarUri, user.id);
  //       if (uploadedUrl) {
  //         avatarUrl = uploadedUrl;
  //         setAvatar(avatarUrl);
  //         setNewAvatarUri(null);
  //       }
  //       setUploadingImage(false);
  //     }
  //     // Update profile in database
  //     const { error: updateError } = await supabase
  //       .from('profiles')
  //       .update({
  //         first_name: firstname.trim(),
  //         last_name: lastname.trim(),
  //         email: email.trim(),
  //         phone: `+${phone.trim()}`,
  //         gender,
  //         image: avatarUrl,

  //       })
  //       .eq('id', profileData.id);
  //     if (updateError) {
  //       console.error('Error updating profile:', updateError);
  //       Alert.alert('Error', 'Failed to update profile');
  //       return;
  //     }
  //     Alert.alert('Success', 'Profile updated successfully', [
  //       { text: 'OK', onPress: () => router.back() }
  //     ]);
  //   } catch (error) {
  //     console.error('Error in handleSave:', error);
  //     Alert.alert('Error', 'Failed to update profile');
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  // if (loading) {
  //   return (
  //     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color={ORANGE} />
  //       <Text style={{ marginTop: 16, color: '#666' }}>Loading profile...</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <LinearGradient colors={[theme.gradientStart, theme.gradientEnd]} style={styles.headerGradient}>
        <SafeAreaView style={{ paddingBottom: 12 }}>
          <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Image
                resizeMode='contain'
                source={require('../assets/images/back.png')}
                style={[styles.backIcon, { transform: [{ scaleX: isRTL ? -1 : 1 }] }]}
                tintColor="#000"
              />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.textPrimary, textTransform: 'capitalize' }]}>Edit profile</Text>
          </View>

          {/* Profile Section */}
          <View style={[styles.profileSection, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <TouchableOpacity
                onPress={pickImage}
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

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.formSection, { backgroundColor: theme.background }]}>
          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
              placeholder="Enter your Name"
              placeholderTextColor={theme.textTertiary}
              value={firstname}
                  onChangeText={setFirstName}
            />
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.textPrimary }]}
              placeholder="Enter your Email"
              placeholderTextColor={theme.textTertiary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Phone</Text>
            <View style={[styles.inputRow, { backgroundColor: theme.inputBackground }]}>
              <TouchableOpacity style={styles.flagContainer} onPress={() => setShowCountryPicker(true)}>
                <CountryPicker
                  countryCode={countryCode}
                  withFlag
                  withCallingCode
                  withFilter
                  withEmoji
                  visible={showCountryPicker}
                  onSelect={(c: Country) => {
                    setCountryCode(c.cca2);
                    setCountry(c);
                    setShowCountryPicker(false);
                  }}
                  onClose={() => setShowCountryPicker(false)}
                  theme={{ backgroundColor: theme.modalBackground }}
                />
                <Text style={[styles.countryCodeText, { color: theme.textPrimary }]}>+{country?.callingCode?.[0] || '971'}</Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0, paddingVertical: 0, borderRadius: 0, backgroundColor: 'transparent', color: theme.textPrimary }]}
                placeholder="Phone number"
                placeholderTextColor={theme.textTertiary}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>


        </View>
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: theme.primaryOrange }, saving && styles.saveBtnDisabled]}

          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 15,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FBBC04',
  },
  smallIcon: {
    width: 18,
    height: 18,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  userInfo: {
    flex: 1,
    gap: 4,
    paddingBottom: 8,
  },
  name: {
    fontWeight: '600',
    fontSize: 18,
    color: '#1E1E1E',
  },
  email: {
    color: '#8D8E90',
    fontSize: 14,
    textTransform: 'lowercase',
  },
  formSection: {
    marginHorizontal: 18,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    padding: 14,
    color: '#222',
    fontSize: 15,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
  },
  countryCodeText: {
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 4,
    fontSize: 16,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  saveBtn: {
    backgroundColor: ORANGE,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 18,
    marginTop: 250,
  },
  saveBtnDisabled: {
    backgroundColor: '#ccc',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputLabel: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
  },
});
