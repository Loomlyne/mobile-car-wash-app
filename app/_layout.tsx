import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CarProvider } from '@/components/CarContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import SplashScreen from '../components/SplashScreen';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });



  if (!loaded) {
    return <SplashScreen orange={false} />;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>
            <CarProvider>
              <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack initialRouteName="Onboarding">
              <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="SignIn" options={{ title: 'Sign In', headerShown: false }} />
              <Stack.Screen name="VerificationCode" options={{ title: 'Verification Code', headerShown: false }} />
              <Stack.Screen name="ProductDetails" options={{ title: 'Product Details', headerShown: false }} />
              <Stack.Screen name="AddBuilding" options={{ title: 'Add Building', headerShown: false }} />
              <Stack.Screen name="SignUp" options={{ title: 'Sign Up', headerShown: false }} />
              <Stack.Screen name="NotificationSettings" options={{ title: 'Notification Settings', headerShown: false }} />
              <Stack.Screen name="ReferAFriend" options={{ title: 'Refer a Friend', headerShown: false }} />
              <Stack.Screen name="PasswordSettings" options={{ title: 'Change Password', headerShown: false }} />
              <Stack.Screen name="Support" options={{ title: 'Support', headerShown: false }} />
              <Stack.Screen name="MyWallet" options={{ title: 'My Wallet', headerShown: false }} />
              <Stack.Screen name="ManageSubscription" options={{ title: 'Manage Subscription', headerShown: false }} />
              <Stack.Screen name="EditProfile" options={{ title: 'Edit Profile', headerShown: false }} />
              <Stack.Screen name="EditCarsCollection" options={{ title: 'Edit Cars Collection', headerShown: false }} />
              <Stack.Screen name="OrderPlaced" options={{ title: 'Order Placed', headerShown: false }} />
              <Stack.Screen name="OrderHistory" options={{ title: 'Order History', headerShown: false }} />
              <Stack.Screen name="AddCar" options={{ title: 'Add Car', headerShown: false }} />
              <Stack.Screen name="PickBuilding" options={{ title: 'Pick Your Building', headerShown: false }} />
              <Stack.Screen name="Upgrade" options={{ title: 'Upgrade', headerShown: false }} />
              <Stack.Screen name="HistoryDetails" options={{ title: 'History Details', headerShown: false }} />
              <Stack.Screen name='ScheduleOrder' options={{ title: 'Schedule Order', headerShown: false }} />
              <Stack.Screen name="EditCar" options={{ title: 'Edit Car', headerShown: false }} />
              <Stack.Screen name="OrderInProgress" options={{ title: 'Order Placed', headerShown: false }} />
              <Stack.Screen name='ServicesScreen' options={{ title: 'Services', headerShown: false }} />
              <Stack.Screen name="CancelReason" options={{ title: 'Cancel Reason', headerShown: false }} />
              <Stack.Screen name='ChangeBuilding' options={{ title: 'Change Building', headerShown: false }} />
              <Stack.Screen name='ChooseCar' options={{ title: 'Choose Car', headerShown: false }} />
              <Stack.Screen name='Cart' options={{ title: 'Cart', headerShown: false }} />
              <Stack.Screen name='CheckoutDetails' options={{ title: 'Checkout Details', headerShown: false }} />
              <Stack.Screen name="Offers" options={{ title: 'Offers', headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
                <StatusBar style="auto" />
              </NavigationThemeProvider>
            </CarProvider>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
