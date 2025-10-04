# Building for Android (Samsung S24 Ultra)

## Quick Test with Expo Go

1. Install **Expo Go** from Google Play Store on your S24 Ultra
2. Make sure both your MacBook and phone are on the **same WiFi network**
3. Run `npx expo start` in your project directory
4. Scan the QR code with Expo Go app on your phone

## Build APK for Production

### Using EAS Build (Recommended)

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Configure the project
eas build:configure

# Build APK for Android
eas build --platform android --profile preview

# Or build AAB for Google Play Store
eas build --platform android --profile production
```

### Using Local Build

```bash
# Build locally (requires Android Studio)
npx expo run:android

# Or prebuild and use Android Studio
npx expo prebuild --platform android
```

## Troubleshooting

### App won't open on S24 Ultra

1. **Check WiFi Connection**: Both devices must be on same network
2. **Firewall**: Disable firewall on MacBook temporarily
3. **Expo Go Version**: Make sure you have the latest version
4. **Clear Cache**: Run `npx expo start --clear`

### Port Issues

If port 8081 is in use:
```bash
npx expo start --port 8082
```

### Build for Physical Device Testing

```bash
# Create development build
eas build --profile development --platform android
```

Then install the APK on your S24 Ultra directly.

## Network Issues

If same WiFi doesn't work, use tunnel mode:
```bash
npx expo start --tunnel
```

This will require installing `@expo/ngrok` but works across different networks.
