# Arabic Language Support Implementation Guide

## ✅ Completed Implementation

### 1. **Installed Packages**
- `i18n-js` - Internationalization library
- `expo-localization` - Device locale detection

### 2. **Core Files Created**

#### Language Context
- **File**: `app/context/LanguageContext.tsx`
- **Features**:
  - Language switching (English ↔ Arabic)
  - RTL/LTR layout direction management
  - Persistent language preference (AsyncStorage)
  - Translation function `t()`
  - Automatic RTL enforcement for Arabic

#### Translation Files
- **English**: `constants/translations/en.ts`
- **Arabic**: `constants/translations/ar.ts`
- **Coverage**:
  - Common UI elements
  - Authentication screens
  - Home screen
  - Profile screen
  - Services, Cart, Checkout
  - Orders, Cars, Buildings
  - Wallet, Settings, Support
  - Modals and notifications

### 3. **Updated Screens**

#### App Layout (`app/_layout.tsx`)
- Wrapped entire app with `LanguageProvider`
- Language context now available throughout the app

#### Profile Screen (`app/(tabs)/Profile.tsx`)
- ✅ Language toggle button functional
- ✅ Shows current language (English/عربي)
- ✅ All text translated
- ✅ Alert shown when language changes
- Clicking on the Language row toggles between English and Arabic

#### Home Screen (`app/(tabs)/index.tsx`)
- ✅ All static text translated
- ✅ Service cards use translations
- ✅ Promotional banner translated
- ✅ Booking status translated

## 🎯 How to Use

### For Users
1. Open the app
2. Navigate to Profile screen
3. Click on the "Language" row
4. Language will toggle between English ↔ Arabic
5. An alert will prompt you to restart the app for RTL to take full effect

### For Developers

#### Using Translations in Components
```tsx
import { useLanguage } from '@/app/context/LanguageContext';

function MyComponent() {
  const { t, language, isRTL, changeLanguage } = useLanguage();

  return (
    <Text>{t('common.hello')}</Text>
  );
}
```

#### Adding New Translations
1. Add key to `constants/translations/en.ts`
2. Add Arabic translation to `constants/translations/ar.ts`
3. Use in component: `t('category.key')`

#### Example:
```typescript
// en.ts
export default {
  mySection: {
    greeting: 'Hello World',
  }
}

// ar.ts
export default {
  mySection: {
    greeting: 'مرحبا بالعالم',
  }
}

// Component
<Text>{t('mySection.greeting')}</Text>
```

## 📋 Next Steps (For Remaining Screens)

The following screens still need translation implementation:

### Authentication
- [ ] `SignIn.tsx` - Login screen
- [ ] `SignUp.tsx` - Registration screen
- [ ] `VerificationCode.tsx` - OTP verification

### Bookings
- [ ] `Bookings.tsx` - Bookings tab
- [ ] `ServicesScreen.tsx` - Services listing
- [ ] `ScheduleOrder.tsx` - Order scheduling

### Orders
- [ ] `OrderPlaced.tsx` - Order confirmation
- [ ] `OrderInProgress.tsx` - Active order
- [ ] `OrderHistory.tsx` - Order history
- [ ] `HistoryDetails.tsx` - Order details
- [ ] `CancelReason.tsx` - Cancellation reasons

### Cart & Checkout
- [ ] `Cart.tsx` - Shopping cart
- [ ] `CheckoutDetails.tsx` - Checkout page

### Car Management
- [ ] `AddCar.tsx` - Add new car
- [ ] `EditCar.tsx` - Edit car details
- [ ] `ChooseCar.tsx` - Car selection
- [ ] `EditCarsCollection.tsx` - Car collection management

### Location
- [ ] `AddBuilding.tsx` - Add building
- [ ] `PickBuilding.tsx` - Building selection
- [ ] `ChangeBuilding.tsx` - Change building

### Settings & Profile
- [ ] `EditProfile.tsx` - Edit user profile
- [ ] `PasswordSettings.tsx` - Change password
- [ ] `NotificationSettings.tsx` - Notification preferences
- [ ] `MyWallet.tsx` - Wallet management
- [ ] `ManageSubscription.tsx` - Subscription management

### Other
- [ ] `Support.tsx` - Support screen
- [ ] `ReferAFriend.tsx` - Referral program
- [ ] `Offers.tsx` - Special offers
- [ ] `Onboarding.tsx` - App onboarding

### Components (Optional)
- [ ] Modal components
- [ ] Notification components
- [ ] Shared UI components

## 🔄 RTL Support

### How RTL Works
- When Arabic is selected, `I18nManager.forceRTL(true)` is called
- The app requires a restart for RTL to fully take effect
- Text alignment, flex direction, and layouts automatically flip

### Testing RTL
1. Toggle to Arabic in Profile
2. Restart the app
3. Verify:
   - Text flows from right to left
   - UI elements are mirrored
   - Navigation feels natural for RTL users

## 🐛 Troubleshooting

### RTL Not Working?
- Make sure you restart the app after changing language
- Clear app cache if needed
- Check that `I18nManager.isRTL` returns `true` when Arabic is selected

### Missing Translations?
- Check that the translation key exists in both `en.ts` and `ar.ts`
- Verify the key path is correct (e.g., `home.title` not `home/title`)
- Use the console to debug: `console.log(t('your.key'))`

### App Crashes?
- Verify all translation files are properly formatted
- Check for syntax errors in translation JSON
- Ensure `LanguageProvider` wraps all components that use translations

## 📱 App Restart Requirement

For RTL to fully take effect, the app needs to be restarted. You can implement auto-restart using:

```bash
npm install react-native-restart
```

Then update the language toggle to automatically restart:
```tsx
import RNRestart from 'react-native-restart';

const handleLanguageToggle = async () => {
  await changeLanguage(newLang);
  RNRestart.Restart();
};
```

## 🎨 Styling for RTL

For components that need RTL-specific styling:

```tsx
import { I18nManager } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  }
});
```

Or use the `isRTL` flag from context:
```tsx
const { isRTL } = useLanguage();

<View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }} />
```

---

## Summary

✅ **What's Working:**
- Language switching between English and Arabic
- Profile screen fully translated and functional
- Home screen fully translated
- RTL support infrastructure in place
- Persistent language preferences

⏳ **What's Pending:**
- Translating remaining 30+ screens
- Optional: Auto-restart on language change
- Optional: RTL-specific styling adjustments for complex layouts

The foundation is complete! You can now incrementally add translations to the remaining screens using the same pattern demonstrated in the Profile and Home screens.
