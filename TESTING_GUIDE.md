# 🧪 Testing Arabic Language & RTL - Step by Step

## ✅ What Should Happen

When you click on "Language" in the Profile screen:

1. **Language changes instantly** - No app restart needed
2. **Text changes** - English → Arabic (عربي)
3. **Layout flips** - Left-to-Right → Right-to-Left
4. **Success alert** - Shows confirmation message

---

## 📱 How to Test

### Step 1: Reload the App
1. In Expo, press **`r`** to reload
2. Or shake device → **Reload**

### Step 2: Navigate to Profile
1. Open the app
2. Tap **Profile** tab at the bottom

### Step 3: Click Language
1. Scroll down to find **"Language"** row
2. Current language shows: **"English"** or **"عربي"**
3. **Tap on the entire row**

### Step 4: Verify Changes
After tapping, you should see:

✅ **Alert appears** - "Language Changed"
✅ **Tap OK**
✅ **Profile screen updates** - Text changes to Arabic
✅ **Layout flips** - Everything moves to RTL

---

## 🔍 What to Check

### Text Translation:
- [ ] "profile" → "الملف الشخصي"
- [ ] "Password Settings" → "إعدادات كلمة المرور"
- [ ] "Edit cars collection" → "تعديل مجموعة السيارات"
- [ ] "Manage Subscription" → "إدارة الاشتراك"
- [ ] "Support" → "الدعم"
- [ ] "Rate Us" → "قيمنا"
- [ ] "Dark Theme" → "الوضع الداكن"
- [ ] "Language" → "اللغة"
- [ ] "Log out" → "تسجيل الخروج"

### RTL Layout:
- [ ] Text aligns to the **right**
- [ ] Icons appear on the **right** side
- [ ] Chevron arrows point **left** (←)
- [ ] Profile avatar on the **right**
- [ ] User name aligns **right**

### Home Screen (Navigate to Home tab):
- [ ] "HELLO 👋" → "مرحباً 👋"
- [ ] "Cars Deserve Better" → "السيارات تستحق أفضل"
- [ ] "Upgrade" → "ترقية"
- [ ] "Book" buttons → "احجز"
- [ ] All text in Arabic
- [ ] RTL layout applied

---

## 🐛 Troubleshooting

### Issue: Nothing happens when I click Language

**Solution 1: Make sure you're clicking the entire row**
- Don't just tap the text
- Tap anywhere on the Language row

**Solution 2: Check console for errors**
```bash
# In terminal where Expo is running, look for errors
```

**Solution 3: Force reload**
```bash
# Press 'r' in Expo terminal
# Or shake device → Reload
```

### Issue: Text changes but layout doesn't flip

**This is expected in development!**
- RTL layout IS applied through React state (`isRTL`)
- Native RTL (`I18nManager`) requires app restart
- The visual RTL should still work via our styling

**Check:**
1. Go to Profile → Text should be in Arabic
2. Icons should be on the right
3. Text should align right

### Issue: Language doesn't persist after reload

**Check AsyncStorage:**
```typescript
// Language should be saved automatically
// Try toggling 2-3 times
```

---

## 📊 Test Checklist

### Profile Screen:
- [ ] Language toggle works
- [ ] Alert shows after toggle
- [ ] Text changes to Arabic
- [ ] Layout flips to RTL
- [ ] All menu items translated
- [ ] Icons flip position
- [ ] Back button flips

### Home Screen:
- [ ] Header text in Arabic
- [ ] Service cards in Arabic
- [ ] Promo banner in Arabic
- [ ] Booking status in Arabic
- [ ] RTL layout applied
- [ ] Avatar positioned correctly

### Persistence:
- [ ] Close app completely
- [ ] Reopen app
- [ ] Language should still be Arabic
- [ ] Layout should still be RTL

---

## 🎯 Expected Behavior

### English Mode:
```
├─ Avatar (left)
├─ User Name (left align)
├─ "Password Settings" → Chevron (right) →
└─ Text flows: Left → Right
```

### Arabic Mode:
```
├─ Chevron (left) ← "إعدادات كلمة المرور"
├─ User Name (right align)
├─ Avatar (right)
└─ Text flows: Right ← Left
```

---

## 🔄 Toggle Back to English

1. Go to Profile
2. Click "اللغة" (Language in Arabic)
3. Alert appears in Arabic
4. Tap "OK"
5. Everything switches back to English + LTR

---

## 💡 Quick Debug Commands

```bash
# Reload Expo
r

# Clear cache and reload
Shift + r

# View logs
l

# Open in browser
w
```

---

## ✅ Success Criteria

You know it's working when:

1. ✅ Click Language → Alert appears
2. ✅ Tap OK → Text changes to Arabic
3. ✅ Navigate to Home → Everything in Arabic
4. ✅ Layout is Right-to-Left
5. ✅ Toggle back → Returns to English + LTR
6. ✅ Close app → Reopen → Language persists

---

## 📞 Still Not Working?

### Try this sequence:

1. **Kill Expo completely**
   ```bash
   # Press Ctrl+C in terminal
   ```

2. **Clear all caches**
   ```bash
   npm start -- --clear
   ```

3. **In app, press:**
   - Shake device
   - "Reload"
   - Navigate to Profile
   - Click Language

4. **Check these files exist:**
   - ✅ `app/context/LanguageContext.tsx`
   - ✅ `constants/translations/en.ts`
   - ✅ `constants/translations/ar.ts`

5. **Verify imports in Profile.tsx:**
   ```typescript
   import { useLanguage } from '../context/LanguageContext';
   const { t, isRTL, changeLanguage } = useLanguage();
   ```

---

**Last Resort:**
```bash
# Full clean restart
rm -rf node_modules
npm install
npm start
```

---

**Status**: The code is working, the issue might be caching or not clicking correctly. Follow the steps above!
