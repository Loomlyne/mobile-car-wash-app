# Quick Start Guide
## Get Your App Running with Supabase in 30 Minutes

---

## ✅ Pre-Setup Checklist

Before you begin, make sure you have:

- [ ] Supabase running locally (confirmed via `supabase status`)
- [ ] Node.js and npm installed
- [ ] React Native development environment set up
- [ ] All tables created in your local Supabase (you mentioned this is done)

---

## 🚀 Step 1: Configure Environment (5 minutes)

### 1.1 Get Your Supabase Credentials

```bash
# In your terminal, run:
supabase status

# You'll see output like:
# API URL: http://localhost:54321
# anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 1.2 Update .env File

Open `.env` in your project root and add:

```bash
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<paste-your-anon-key-here>
```

**Important**: Replace `<paste-your-anon-key-here>` with the actual anon key from `supabase status`

---

## 🔐 Step 2: Enable Phone Authentication (5 minutes)

### 2.1 Access Supabase Dashboard

Open your browser and go to: **http://localhost:54323**

### 2.2 Enable Phone Provider

1. Click **Authentication** in sidebar
2. Click **Providers**
3. Find **Phone** and click to expand
4. Toggle **Enable Phone provider** to ON
5. For local testing, you can use test phone numbers
6. Click **Save**

### 2.3 Configure Phone Settings (Optional for Local)

For local development, Supabase provides a test mode where you can use any phone number and the OTP will be shown in the logs or can be set to a fixed value.

```sql
-- Optional: Set a fixed OTP for testing (in SQL Editor)
-- This allows you to use "123456" as the OTP for any phone number
UPDATE auth.config
SET value = '{"otp_length": 6, "test_otp": "123456"}'::jsonb
WHERE parameter = 'external_phone_enabled';
```

---

## 💾 Step 3: Verify Database Tables (2 minutes)

### 3.1 Check Tables Exist

In Supabase Dashboard:
1. Go to **Table Editor**
2. Verify these tables exist:
   - ✅ profiles
   - ✅ cars
   - ✅ buildings
   - ✅ services
   - ✅ bookings
   - ✅ cart_items
   - ✅ reviews
   - ✅ wallet_transactions
   - ✅ notifications

### 3.2 Check Sample Data

Click on `services` table and verify you have at least a few sample services. If not, run:

```sql
INSERT INTO services (title, description, price, category, is_active) VALUES
('One Time Wash', 'Professional car wash service', 50.00, 'basic', true),
('Monthly Washes', 'Unlimited washes for one month', 180.00, 'subscription', true),
('Interior Cleaning', 'Deep cleaning of car interior', 80.00, 'basic', true);
```

---

## 📦 Step 4: Install Dependencies (3 minutes)

The required package has already been installed, but verify:

```bash
# Check if react-native-url-polyfill is in package.json
grep "react-native-url-polyfill" package.json

# If not found, install it:
npm install react-native-url-polyfill

# Also verify @supabase/supabase-js is installed:
grep "@supabase/supabase-js" package.json
```

---

## 🎨 Step 5: First Test - Sign Up Flow (10 minutes)

### 5.1 Start the App

```bash
# Start Metro bundler
npm start

# Or for specific platform:
npm run ios
# or
npm run android
```

### 5.2 Test Sign Up

1. Open the app
2. Navigate to Sign Up screen
3. Fill in the form:
   - First Name: `John`
   - Last Name: `Doe`
   - Phone: `+971501234567` (use your country code)
   - Email: `john@example.com`
4. Click **Sign up**

### 5.3 Check OTP

**Option A: If using test OTP (from Step 2.3)**
- Enter `123456` as the OTP

**Option B: If using real SMS**
- Check the phone number for SMS
- Enter the 6-digit code

**Option C: Check Supabase Logs**
```bash
# In terminal:
supabase logs --level info

# Look for a line like:
# OTP: 123456
```

### 5.4 Verify Profile Created

1. Go to Supabase Dashboard → **Table Editor** → `profiles`
2. You should see a new row with your phone number and name
3. Note the `id` column - this is your user ID

---

## ✨ Step 6: Add Test Data (5 minutes)

### 6.1 Add a Test Car

In Supabase Dashboard → **SQL Editor**, run:

```sql
-- Replace 'YOUR-USER-ID' with the actual user ID from profiles table
INSERT INTO cars (user_id, name, license_plate, model, color)
VALUES (
  'YOUR-USER-ID',
  'BMW X5',
  'DXB-12345',
  'X5 2023',
  'Black'
);
```

### 6.2 Add a Test Building

```sql
INSERT INTO buildings (user_id, name, address, city, country, is_default)
VALUES (
  'YOUR-USER-ID',
  'Marina Towers',
  'Dubai Marina, Tower 1',
  'Dubai',
  'UAE',
  true
);
```

### 6.3 Add to Cart

```sql
-- Get service_id and car_id from their tables first
INSERT INTO cart_items (user_id, service_id, car_id, quantity)
VALUES (
  'YOUR-USER-ID',
  1, -- Service ID (One Time Wash)
  1, -- Car ID (your BMW)
  1
);
```

---

## 🧪 Step 7: Test Key Features (5 minutes)

### 7.1 Test Home Screen

1. Restart the app
2. Sign in with the same phone number
3. Enter OTP
4. You should see:
   - ✅ Your name displayed
   - ✅ Services from database
   - ✅ No booking status (since no bookings yet)

### 7.2 Test Profile Screen

1. Go to Profile tab
2. You should see:
   - ✅ Your full name
   - ✅ Your email
   - ✅ Default avatar

### 7.3 Test Cart Screen

1. Go to Cart (from menu or tab)
2. You should see:
   - ✅ One item (One Time Wash)
   - ✅ BMW X5 as the car
   - ✅ Price: AED 50.00
   - ✅ Total: AED 50.00

### 7.4 Test Bookings Screen

1. Go to Bookings tab
2. It should be empty for now (expected)

---

## 🎓 Next Steps

Now that basic setup is working, you can:

### Implement Remaining Pages

Refer to `PAGE_BY_PAGE_CHECKLIST.md` for detailed implementation guide for each page.

**Priority order**:
1. **AddCar** - Let users add their own cars
2. **ServicesScreen** - Browse all services
3. **ScheduleOrder** - Create bookings
4. **MyWallet** - Add wallet feature

### Add Storage

Follow `SUPABASE_INTEGRATION_GUIDE.md` section on "Storage Integration" to:
- Upload profile pictures
- Upload car images

### Add Real-time

Follow the guide to add real-time subscriptions for:
- Booking status updates
- Cart sync across devices

---

## 🐛 Troubleshooting

### Problem: "Invalid API key"

**Solution**:
1. Run `supabase status` again
2. Copy the exact anon key
3. Paste it in `.env` (no extra spaces)
4. Restart Metro bundler: `npm start --reset-cache`

---

### Problem: "Failed to send OTP"

**Solution**:
1. Check Supabase Dashboard → Authentication → Providers
2. Ensure Phone provider is enabled
3. For testing, use the test OTP setup from Step 2.3
4. Check logs: `supabase logs`

---

### Problem: "Row Level Security policy violation"

**Solution**:
1. Your RLS policies might not be set up correctly
2. Go to Supabase Dashboard → Authentication → Policies
3. Verify policies exist for the table you're accessing
4. For testing, you can temporarily disable RLS:
   ```sql
   ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
   ```
   (But re-enable it later for security!)

---

### Problem: "Cannot read property 'id' of null"

**Solution**:
1. User is not logged in
2. Check AuthContext:
   ```typescript
   const { user } = useAuth();
   if (!user) {
     return <SignInScreen />;
   }
   ```

---

### Problem: Tables are empty / no data

**Solution**:
1. Add sample services (see Step 3.2)
2. Check if user is authenticated
3. Verify user ID matches in test data SQL

---

## 📚 Documentation Links

- **Full Integration Guide**: `SUPABASE_INTEGRATION_GUIDE.md`
- **Page-by-Page Checklist**: `PAGE_BY_PAGE_CHECKLIST.md`
- **Database Schema**: `lib/supabase/schema.sql`
- **Supabase Docs**: https://supabase.com/docs

---

## ✅ Success Checklist

After completing this guide, you should have:

- [x] Environment configured with Supabase credentials
- [x] Phone authentication enabled and working
- [x] All database tables created
- [x] AuthContext migrated to Supabase
- [x] Test user account created
- [x] Sample data in database
- [x] Home, Profile, and Cart screens showing real data
- [x] Ready to implement remaining features

---

## 🎉 You're Ready!

Congratulations! Your app is now connected to Supabase.

**Next**: Pick a page from `PAGE_BY_PAGE_CHECKLIST.md` and start implementing the full features!

**Need Help?**
- Check `SUPABASE_INTEGRATION_GUIDE.md` for detailed explanations
- Review `lib/supabase/queries.ts` for available database functions
- Consult Supabase docs for specific features

---

**Last Updated**: January 2025
**Estimated Total Time**: 30-40 minutes
