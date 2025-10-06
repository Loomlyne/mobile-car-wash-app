# Supabase Local Integration Guide
## Mobile Car Wash App - Complete Implementation Strategy

---

## Table of Contents
1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [Environment Configuration](#environment-configuration)
4. [Database Schema](#database-schema)
5. [Authentication Flow](#authentication-flow)
6. [Page-by-Page Implementation](#page-by-page-implementation)
7. [Real-time Features](#real-time-features)
8. [Storage Integration](#storage-integration)
9. [Testing Strategy](#testing-strategy)

---

## Overview

This guide provides a complete strategy for integrating your local Supabase instance with the mobile car wash app. All Firebase dependencies have been replaced with Supabase, including authentication, database operations, and real-time features.

### What's Been Set Up

✅ **Core Infrastructure**
- Supabase client configuration (`lib/supabase/client.ts`)
- TypeScript type definitions (`lib/supabase/types.ts`)
- Authentication helpers (`lib/supabase/auth.ts`)
- Database query helpers (`lib/supabase/queries.ts`)
- Environment configuration (`.env`)

✅ **Database Schema**
- All required tables created (see `lib/supabase/schema.sql`)
- Row Level Security (RLS) policies configured
- Indexes for performance optimization
- Triggers for automatic profile creation and timestamp updates

✅ **Authentication**
- AuthContext migrated to Supabase (`app/context/AuthContext.tsx`)
- Phone OTP authentication setup
- Session management

---

## Setup Instructions

### 1. Configure Your Local Supabase

First, ensure you have Supabase running locally:

```bash
# Check Supabase status
supabase status

# Note your local credentials:
# - API URL (usually http://localhost:54321)
# - anon key
# - service_role key
```

### 2. Update Environment Variables

Edit the `.env` file in your project root:

```bash
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key-here
```

Replace `your-local-anon-key-here` with the actual anon key from `supabase status`.

### 3. Enable Phone Authentication

In your local Supabase dashboard (http://localhost:54323), navigate to:
- **Authentication** → **Providers**
- Enable **Phone** provider
- For local testing, you can use the test phone number feature

### 4. Create Storage Buckets

In your Supabase dashboard, create the following storage buckets:

```sql
-- Create avatars bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Create car-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('car-images', 'car-images', true);

-- Set up storage policies for avatars
CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Set up storage policies for car images
CREATE POLICY "Users can upload own car images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'car-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own car images" ON storage.objects
  FOR SELECT USING (bucket_id = 'car-images');
```

---

## Environment Configuration

### Required Environment Variables

```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For production
EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

---

## Database Schema

All tables have been created with proper relationships and RLS policies. Here's the structure:

### Tables Overview

1. **profiles** - User profile information
2. **cars** - User vehicles
3. **buildings** - User addresses
4. **services** - Available wash services
5. **bookings** - Service bookings/orders
6. **cart_items** - Shopping cart
7. **reviews** - User ratings and feedback
8. **wallet_transactions** - Payment history
9. **notifications** - User notifications

### Sample Data

The schema includes sample services. You can add more:

```sql
INSERT INTO services (title, description, price, category, is_active) VALUES
('Premium Detail', 'Luxury car detailing with wax', 250.00, 'premium', true);
```

---

## Authentication Flow

### Sign In Process

1. User enters phone number
2. App calls `supabase.auth.signInWithOtp({ phone })`
3. User receives SMS with code
4. User enters code
5. App calls `supabase.auth.verifyOtp({ phone, token, type: 'sms' })`
6. Profile is automatically created via trigger

### Sign Up Process

1. User enters personal info + phone number
2. Data is stored in AuthContext as `pendingUserData`
3. OTP is sent to phone
4. After OTP verification, profile is updated with full details
5. User is redirected to app

### Using AuthContext

```typescript
import { useAuth } from '@/app/context/AuthContext';

function MyComponent() {
  const { user, session, loading, signOut, sendOTP, verifyOTP } = useAuth();

  // Check if user is authenticated
  if (!user) {
    return <SignInScreen />;
  }

  // Access user data
  console.log(user.id, user.phone);
}
```

---

## Page-by-Page Implementation

### 1. Sign In Page (`app/SignIn.tsx`)

**Current Status**: Uses Firebase (commented out)

**Implementation**:

```typescript
import { useAuth } from './context/AuthContext';

export default function SignIn() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { sendOTP } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!phone.trim()) {
      setError('Please enter phone number');
      return;
    }

    setLoading(true);
    setError('');

    const fullPhone = `+${callingCode}${phone.trim()}`;
    const { error } = await sendOTP(fullPhone);

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router.push({
        pathname: '/VerificationCode',
        params: { phone: fullPhone },
      });
    }
  };

  // Rest of UI remains the same
}
```

**Key Changes**:
- Remove Firebase imports
- Use `sendOTP` from `useAuth()`
- Handle errors from Supabase
- Remove recaptcha verifier

---

### 2. Sign Up Page (`app/SignUp.tsx`)

**Current Status**: Uses Firebase (commented out)

**Implementation**:

```typescript
import { useAuth } from './context/AuthContext';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!isValid) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError('');

    const fullPhone = `+${getDialCode()}${phone.trim()}`;

    const { error } = await signUp({
      firstName,
      lastName,
      email,
      phone: fullPhone,
      cars, // From CarContext
    });

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      router.push({
        pathname: '/VerificationCode',
        params: { phone: fullPhone, isSignUp: 'true' },
      });
    }
  };

  // Rest of UI remains the same
}
```

**Key Changes**:
- Use `signUp` from `useAuth()`
- Remove Firebase imports
- Pass user data to signUp function

---

### 3. Verification Code Page (`app/VerificationCode.tsx`)

**Create New Implementation**:

```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from './context/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function VerificationCode() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { verifyOTP } = useAuth();
  const router = useRouter();
  const { phone, isSignUp } = useLocalSearchParams();

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError('Please enter 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    const { error } = await verifyOTP(phone as string, code);

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      // Redirect to home after successful verification
      router.replace('/(tabs)');
    }
  };

  return (
    <View>
      {/* Your UI */}
      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
        placeholder="Enter 6-digit code"
      />

      <TouchableOpacity onPress={handleVerify} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text>Verify</Text>}
      </TouchableOpacity>

      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
}
```

---

### 4. Home Screen (`app/(tabs)/index.tsx`)

**Current Status**: Empty fetch functions, hardcoded data

**Implementation**:

```typescript
import { useAuth } from '../context/AuthContext';
import { getProfile } from '@/lib/supabase/queries';
import { getBookings } from '@/lib/supabase/queries';
import { getServices } from '@/lib/supabase/queries';

export default function HomeScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [upcomingBooking, setUpcomingBooking] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);

    // Fetch profile
    const { data: profileData } = await getProfile(user!.id);
    if (profileData) {
      setProfile(profileData);
    }

    // Fetch upcoming bookings
    const { data: bookings } = await getBookings(user!.id, 'accepted');
    if (bookings && bookings.length > 0) {
      setUpcomingBooking(bookings[0]);
    }

    // Fetch services
    const { data: servicesData } = await getServices();
    if (servicesData) {
      setServices(servicesData);
    }

    setLoading(false);
  };

  // Use the data in your UI
  const displayName = profile
    ? `${profile.first_name} ${profile.last_name}`
    : 'Guest';

  return (
    <View>
      <Text>Hello, {displayName}</Text>

      {/* Display services */}
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}

      {/* Display booking status */}
      {upcomingBooking && (
        <BookingStatusCard booking={upcomingBooking} />
      )}
    </View>
  );
}
```

**What to Display**:
- User profile (name, avatar from `profiles` table)
- List of services from `services` table
- Current booking status from `bookings` table
- Promotional offers

---

### 5. Profile Screen (`app/(tabs)/Profile.tsx`)

**Current Status**: Commented out Supabase code

**Implementation**:

```typescript
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile } from '@/lib/supabase/queries';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    const { data } = await getProfile(user!.id);
    if (data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      router.replace('/SignIn');
    }
  };

  const displayName = profile
    ? `${profile.first_name} ${profile.last_name}`
    : 'User';

  const displayEmail = profile?.email || 'No email provided';
  const displayAvatar = profile?.image || 'https://randomuser.me/api/portraits/women/44.jpg';

  return (
    <View>
      <Image source={{ uri: displayAvatar }} />
      <Text>{displayName}</Text>
      <Text>{displayEmail}</Text>

      {/* Action buttons remain the same */}
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
```

**Key Changes**:
- Fetch real profile data from `profiles` table
- Display actual user information
- Implement logout with Supabase signOut

---

### 6. Bookings Screen (`app/(tabs)/Bookings.tsx`)

**Current Status**: Mock data

**Implementation**:

```typescript
import { useAuth } from '../context/AuthContext';
import { getBookings } from '@/lib/supabase/queries';

export default function BookingsScreen() {
  const { user } = useAuth();
  const [tab, setTab] = useState<'upcoming' | 'history'>('upcoming');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user, tab]);

  const fetchBookings = async () => {
    setLoading(true);

    const status = tab === 'upcoming'
      ? ['pending', 'accepted', 'in_progress']
      : ['completed', 'cancelled'];

    // Fetch all bookings and filter by status
    const { data } = await getBookings(user!.id);

    if (data) {
      const filtered = data.filter(b =>
        tab === 'upcoming'
          ? ['pending', 'accepted', 'in_progress'].includes(b.status)
          : ['completed', 'cancelled'].includes(b.status)
      );
      setBookings(filtered);
    }

    setLoading(false);
  };

  const formatBooking = (booking: any) => ({
    id: booking.id,
    status: booking.status,
    carName: booking.cars?.name || 'Unknown',
    license: booking.cars?.license_plate || 'N/A',
    ref: booking.reference_number,
    schedule: `${booking.schedule_date}, ${booking.schedule_time}`,
  });

  return (
    <View>
      {/* Tab switcher */}
      <View>
        <TouchableOpacity onPress={() => setTab('upcoming')}>
          <Text>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('history')}>
          <Text>History</Text>
        </TouchableOpacity>
      </View>

      {/* Bookings list */}
      {loading ? (
        <ActivityIndicator />
      ) : bookings.length === 0 ? (
        <Text>No bookings found</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={({ item }) => (
            <BookingCard booking={formatBooking(item)} tab={tab} />
          )}
        />
      )}
    </View>
  );
}
```

**Key Changes**:
- Fetch real bookings with JOIN to cars, services, buildings tables
- Filter by status based on tab
- Display actual booking data

---

### 7. Cart Screen (`app/Cart.tsx`)

**Current Status**: Empty cart

**Implementation**:

```typescript
import { useAuth } from './context/AuthContext';
import {
  getCartItems,
  updateCartItem,
  removeFromCart,
  clearCart
} from '@/lib/supabase/queries';

export default function CartScreen() {
  const { user } = useAuth();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    const { data } = await getCartItems(user!.id);
    if (data) {
      setCart(data);
    }
    setLoading(false);
  };

  const updateQuantity = async (itemId: number, newQty: number) => {
    if (newQty < 1) return;

    const { error } = await updateCartItem(itemId, newQty);
    if (!error) {
      // Optimistic update
      setCart(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQty }
            : item
        )
      );
    }
  };

  const removeItem = async (itemId: number) => {
    const { error } = await removeFromCart(itemId);
    if (!error) {
      setCart(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const price = item.services?.price || 0;
      return sum + (price * item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    // Clear cart after checkout
    await clearCart(user!.id);
    setCart([]);
    router.push('/CheckoutDetails');
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : cart.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <CartItemCard
                item={item}
                onUpdateQty={(qty) => updateQuantity(item.id, qty)}
                onRemove={() => removeItem(item.id)}
              />
            )}
          />

          <View>
            <Text>Total: AED {calculateTotal().toFixed(2)}</Text>
            <TouchableOpacity onPress={handleCheckout}>
              <Text>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
```

**Key Changes**:
- Fetch cart items with JOIN to services table
- Real-time quantity updates
- Calculate total from actual service prices
- Clear cart on checkout

---

### 8. Add Car Screen (`app/AddCar.tsx`)

**Implementation**:

```typescript
import { useAuth } from './context/AuthContext';
import { addCar } from '@/lib/supabase/queries';

export default function AddCar() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddCar = async () => {
    if (!name || !licensePlate) {
      Alert.alert('Error', 'Please fill required fields');
      return;
    }

    setLoading(true);

    const { error } = await addCar({
      user_id: user!.id,
      name,
      license_plate: licensePlate,
      model,
      color,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error);
    } else {
      Alert.alert('Success', 'Car added successfully');
      router.back();
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Car Name (e.g., BMW X5)"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="License Plate"
        value={licensePlate}
        onChangeText={setLicensePlate}
      />
      <TextInput
        placeholder="Model (optional)"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        placeholder="Color (optional)"
        value={color}
        onChangeText={setColor}
      />

      <TouchableOpacity onPress={handleAddCar} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text>Add Car</Text>}
      </TouchableOpacity>
    </View>
  );
}
```

---

### 9. Edit Cars Collection (`app/EditCarsCollection.tsx`)

**Implementation**:

```typescript
import { useAuth } from './context/AuthContext';
import { getCars, deleteCar } from '@/lib/supabase/queries';

export default function EditCarsCollection() {
  const { user } = useAuth();
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchCars();
    }
  }, [user]);

  const fetchCars = async () => {
    setLoading(true);
    const { data } = await getCars(user!.id);
    if (data) {
      setCars(data);
    }
    setLoading(false);
  };

  const handleDelete = async (carId: number) => {
    Alert.alert(
      'Delete Car',
      'Are you sure you want to delete this car?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const { error } = await deleteCar(carId);
            if (!error) {
              setCars(prev => prev.filter(c => c.id !== carId));
            }
          },
        },
      ]
    );
  };

  const handleEdit = (carId: number) => {
    router.push({ pathname: '/EditCar', params: { id: carId } });
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : cars.length === 0 ? (
        <View>
          <Text>No cars added yet</Text>
          <TouchableOpacity onPress={() => router.push('/AddCar')}>
            <Text>Add Your First Car</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cars}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.license_plate}</Text>
              <TouchableOpacity onPress={() => handleEdit(item.id)}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity onPress={() => router.push('/AddCar')}>
        <Text>Add New Car</Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

### 10. My Wallet (`app/MyWallet.tsx`)

**Implementation**:

```typescript
import { useAuth } from './context/AuthContext';
import {
  getWalletBalance,
  getWalletTransactions,
  addWalletTransaction
} from '@/lib/supabase/queries';

export default function MyWallet() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWalletData();
    }
  }, [user]);

  const fetchWalletData = async () => {
    setLoading(true);

    // Get balance
    const { balance: walletBalance } = await getWalletBalance(user!.id);
    setBalance(walletBalance);

    // Get transactions
    const { data } = await getWalletTransactions(user!.id);
    if (data) {
      setTransactions(data);
    }

    setLoading(false);
  };

  const handleAddMoney = async (amount: number) => {
    const { error } = await addWalletTransaction({
      user_id: user!.id,
      amount,
      type: 'credit',
      description: 'Money added to wallet',
      reference: `TXN-${Date.now()}`,
    });

    if (!error) {
      fetchWalletData(); // Refresh
    }
  };

  return (
    <View>
      {/* Balance Card */}
      <View>
        <Text>Wallet Balance</Text>
        <Text>AED {balance.toFixed(2)}</Text>
        <TouchableOpacity onPress={() => handleAddMoney(100)}>
          <Text>Add Money</Text>
        </TouchableOpacity>
      </View>

      {/* Transactions List */}
      <Text>Recent Transactions</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <View>
              <Text>{item.description}</Text>
              <Text style={{ color: item.type === 'credit' ? 'green' : 'red' }}>
                {item.type === 'credit' ? '+' : '-'}AED {item.amount}
              </Text>
              <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
```

---

## Real-time Features

### Setting Up Real-time Subscriptions

**Example: Listen to booking status changes**

```typescript
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

function OrderInProgress({ bookingId }: { bookingId: number }) {
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    // Subscribe to booking changes
    const subscription = supabase
      .channel('booking-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: `id=eq.${bookingId}`,
        },
        (payload) => {
          console.log('Booking updated:', payload.new);
          setBooking(payload.new);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [bookingId]);

  return (
    <View>
      <Text>Status: {booking?.status}</Text>
    </View>
  );
}
```

### Real-time Cart Updates

```typescript
useEffect(() => {
  const subscription = supabase
    .channel('cart-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'cart_items',
        filter: `user_id=eq.${user.id}`,
      },
      (payload) => {
        console.log('Cart changed:', payload);
        fetchCart(); // Refresh cart
      }
    )
    .subscribe();

  return () => subscription.unsubscribe();
}, [user]);
```

---

## Storage Integration

### Upload Profile Picture

```typescript
import { supabase } from '@/lib/supabase/client';
import * as ImagePicker from 'expo-image-picker';

async function uploadAvatar(userId: string) {
  // Pick image
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (result.canceled) return;

  const file = result.assets[0];
  const fileExt = file.uri.split('.').pop();
  const fileName = `${userId}/avatar.${fileExt}`;
  const filePath = `${fileName}`;

  // Convert to blob
  const response = await fetch(file.uri);
  const blob = await response.blob();
  const arrayBuffer = await new Response(blob).arrayBuffer();

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, arrayBuffer, {
      contentType: `image/${fileExt}`,
      upsert: true, // Replace if exists
    });

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  // Update profile with new image URL
  await updateProfile(userId, { image: publicUrl });

  return publicUrl;
}
```

### Upload Car Image

```typescript
async function uploadCarImage(userId: string, carId: number, imageUri: string) {
  const fileExt = imageUri.split('.').pop();
  const fileName = `${userId}/car-${carId}.${fileExt}`;

  const response = await fetch(imageUri);
  const blob = await response.blob();
  const arrayBuffer = await new Response(blob).arrayBuffer();

  const { data, error } = await supabase.storage
    .from('car-images')
    .upload(fileName, arrayBuffer, {
      contentType: `image/${fileExt}`,
      upsert: true,
    });

  if (!error) {
    const { data: { publicUrl } } = supabase.storage
      .from('car-images')
      .getPublicUrl(fileName);

    await updateCar(carId, { image: publicUrl });
    return publicUrl;
  }

  return null;
}
```

---

## Testing Strategy

### 1. Authentication Testing

✅ Test phone OTP sign in
✅ Test phone OTP sign up with profile creation
✅ Test OTP verification
✅ Test session persistence
✅ Test sign out

### 2. Database Operations Testing

✅ Test profile CRUD
✅ Test car CRUD
✅ Test building CRUD
✅ Test cart operations
✅ Test booking creation
✅ Test wallet transactions

### 3. Real-time Testing

✅ Test booking status updates
✅ Test cart real-time sync
✅ Test notifications

### 4. Storage Testing

✅ Test avatar upload
✅ Test car image upload
✅ Test image deletion

---

## Next Steps

1. **Update Environment Variables**: Add your local Supabase credentials to `.env`
2. **Enable Phone Auth**: Configure phone provider in Supabase dashboard
3. **Create Storage Buckets**: Run the storage setup SQL
4. **Implement Pages**: Follow the page-by-page guide above
5. **Test Features**: Use the testing checklist
6. **Add Real-time**: Implement subscriptions for live updates

---

## Common Issues & Solutions

### Issue: "Invalid API key"
**Solution**: Double-check your `.env` file has the correct anon key from `supabase status`

### Issue: "Phone auth not working"
**Solution**: Ensure phone provider is enabled in Supabase dashboard

### Issue: "RLS policy error"
**Solution**: Check that RLS policies are created correctly. You may need to disable RLS temporarily during development.

### Issue: "Storage upload fails"
**Solution**: Verify storage buckets exist and have correct policies

---

## Support

For issues or questions:
1. Check Supabase local dashboard: http://localhost:54323
2. View logs: `supabase logs`
3. Check API reference: https://supabase.com/docs

---

**Last Updated**: January 2025
**Version**: 1.0.0
