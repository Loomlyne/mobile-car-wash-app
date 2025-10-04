# 🔥 QUICK FIX: Build APK for Samsung S24 Ultra

## The Problem
Metro bundler is having issues. The fastest solution is to **build an APK directly**.

## ✅ Solution: Build APK with EAS

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login
```bash
eas login
```
(Create account at https://expo.dev if you don't have one)

### Step 3: Configure
```bash
eas build:configure
```

### Step 4: Build APK
```bash
eas build -p android --profile preview
```

This will:
- Build your app in the cloud (takes 10-15 minutes)
- Give you a download link
- You can install the APK directly on your S24 Ultra

---

## 🚀 Alternative: Use Expo Go (If Metro Works)

1. **Make sure Expo Go is installed** on your S24 Ultra
2. **Both devices on same WiFi**
3. **In terminal, run:**
   ```bash
   npx expo start --lan
   ```
4. **Look for the IP address** in the output (like `exp://192.168.1.100:8081`)
5. **In Expo Go app**, manually enter this URL

---

## 🔧 Fix Metro Bundler Issues

If Metro is stuck, try this:

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Clear all caches
npm start -- --reset-cache

# Or use Expo
npx expo start -c
```

---

## 📱 Manual Connection in Expo Go

If QR code doesn't work:

1. Open Expo Go on S24 Ultra
2. Click "Enter URL manually"
3. Type: `exp://YOUR_MACBOOK_IP:8081`
4. Replace `YOUR_MACBOOK_IP` with your MacBook's IP address

To find your MacBook IP:
```bash
ipconfig getifaddr en0
```

---

## ⚡ Fastest Solution Right Now

Run this command:
```bash
eas build -p android --profile preview --non-interactive
```

Then download and install the APK on your phone!
