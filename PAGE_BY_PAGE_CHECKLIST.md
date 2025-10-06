# Page-by-Page Implementation Checklist
## Quick Reference Guide for Supabase Integration

---

## 📱 Authentication Pages

### ✅ SignIn.tsx
**Location**: `app/SignIn.tsx`

**What to Change**:
```typescript
// REMOVE:
import { signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

// ADD:
import { useAuth } from './context/AuthContext';

// REPLACE handleSignIn function with:
const { sendOTP } = useAuth();
const fullPhone = `+${callingCode}${phone.trim()}`;
const { error } = await sendOTP(fullPhone);
```

**Database Tables Used**: None (just auth)

**What User Sees**: Phone OTP login

---

### ✅ SignUp.tsx
**Location**: `app/SignUp.tsx`

**What to Change**:
```typescript
// REMOVE:
import auth from '@react-native-firebase/auth';

// ADD:
import { useAuth } from './context/AuthContext';

// REPLACE handleSignUp with:
const { signUp } = useAuth();
const { error } = await signUp({
  firstName,
  lastName,
  email,
  phone: fullPhone,
  cars
});
```

**Database Tables Used**: `profiles` (auto-created after OTP)

**What User Sees**: Registration form + OTP verification

---

### ✅ VerificationCode.tsx
**Location**: `app/VerificationCode.tsx` (needs to be created or updated)

**What to Add**:
```typescript
import { useAuth } from './context/AuthContext';

const { verifyOTP } = useAuth();
const { phone } = useLocalSearchParams();

const handleVerify = async () => {
  const { error } = await verifyOTP(phone, code);
  if (!error) router.replace('/(tabs)');
};
```

**Database Tables Used**: `profiles` (updated after verification)

**What User Sees**: 6-digit OTP input

---

## 🏠 Main App Pages

### 📍 Home Screen (index.tsx)
**Location**: `app/(tabs)/index.tsx`

**What to Fetch**:
```typescript
import { getProfile, getBookings, getServices } from '@/lib/supabase/queries';
import { useAuth } from '../context/AuthContext';

// 1. User profile
const { data: profileData } = await getProfile(user.id);

// 2. Upcoming booking
const { data: bookings } = await getBookings(user.id, 'accepted');

// 3. Available services
const { data: services } = await getServices();
```

**Database Tables**:
- `profiles` - Get user name, avatar
- `bookings` - Get current booking status
- `services` - Get wash services to display

**What User Sees**:
- Welcome message with their name
- One Time Wash / Monthly Washes cards with prices from DB
- Current booking status (if any)
- Promotional banner

**Key Features**:
- Display personalized greeting
- Show service prices from database
- Real-time booking status updates

---

### 👤 Profile Screen (Profile.tsx)
**Location**: `app/(tabs)/Profile.tsx`

**What to Fetch**:
```typescript
import { getProfile, updateProfile } from '@/lib/supabase/queries';
import { useAuth } from '../context/AuthContext';

const { user, signOut } = useAuth();
const { data: profile } = await getProfile(user.id);

// Display:
const name = `${profile.first_name} ${profile.last_name}`;
const email = profile.email;
const avatar = profile.image;
```

**Database Tables**:
- `profiles` - Get and update user info

**What User Sees**:
- Profile picture (from `profiles.image`)
- Full name (from `profiles.first_name` + `last_name`)
- Email address (from `profiles.email`)
- Settings menu
- Logout button

**Actions**:
- ✅ Edit profile → Update `profiles` table
- ✅ Upload avatar → Supabase Storage + update `profiles.image`
- ✅ Logout → `signOut()` from AuthContext

---

### 📅 Bookings Screen (Bookings.tsx)
**Location**: `app/(tabs)/Bookings.tsx`

**What to Fetch**:
```typescript
import { getBookings } from '@/lib/supabase/queries';

// For Upcoming tab:
const { data } = await getBookings(user.id);
const upcoming = data.filter(b =>
  ['pending', 'accepted', 'in_progress'].includes(b.status)
);

// For History tab:
const history = data.filter(b =>
  ['completed', 'cancelled'].includes(b.status)
);
```

**Database Tables**:
- `bookings` (JOIN with `cars`, `services`, `buildings`)

**What User Sees**:

**Upcoming Tab**:
- Active bookings
- Status: "Not Started Yet", "In Progress"
- Car name and license plate
- Reference number (#D-652563)
- Schedule date and time

**History Tab**:
- Completed bookings
- Status: "Complete", "Cancelled"
- Same details as upcoming

**Card Details**:
```
Status: [In progress]
Car Name: BMW                    → From bookings.cars.name
Car License Plate: BXD-255366    → From bookings.cars.license_plate
Reference Number: #D-652563      → From bookings.reference_number
Schedule: 4 Nov, 10:00-11:00 AM  → From bookings.schedule_date + schedule_time
```

---

### 🛒 Cart Screen (Cart.tsx)
**Location**: `app/Cart.tsx`

**What to Fetch**:
```typescript
import {
  getCartItems,
  updateCartItem,
  removeFromCart,
  clearCart
} from '@/lib/supabase/queries';

const { data: cart } = await getCartItems(user.id);

// Each item has:
// - cart_items.quantity
// - services.title, description, price
// - cars.name, license_plate
```

**Database Tables**:
- `cart_items` (JOIN with `services`, `cars`)

**What User Sees**:
- List of cart items with service images
- Service name (from `services.title`)
- Price (from `services.price`)
- Quantity controls (+/-)
- Total: Sum of (price × quantity) for all items

**Actions**:
- ✅ Update quantity → `updateCartItem(itemId, newQty)`
- ✅ Remove item → `removeFromCart(itemId)`
- ✅ Checkout → `clearCart(userId)` + navigate to checkout

**Empty State**:
- Show when `cart.length === 0`
- Display "Empty Cart" message
- Show clipboard icon

---

## 🚗 Car Management Pages

### ➕ AddCar.tsx
**Location**: `app/AddCar.tsx`

**What to Do**:
```typescript
import { addCar } from '@/lib/supabase/queries';

const handleAdd = async () => {
  await addCar({
    user_id: user.id,
    name: 'BMW X5',
    license_plate: 'DXB-12345',
    model: 'X5',
    color: 'Black',
  });
};
```

**Database Tables**:
- `cars` (INSERT)

**Form Fields**:
- Car Name* (required)
- License Plate* (required)
- Model (optional)
- Color (optional)
- Image (optional - upload to Storage)

**What User Sees**:
- Form to add new car
- Image picker for car photo
- Success message after adding

---

### ✏️ EditCar.tsx
**Location**: `app/EditCar.tsx`

**What to Do**:
```typescript
import { getCars, updateCar } from '@/lib/supabase/queries';

// Get car by ID
const { data: cars } = await getCars(user.id);
const car = cars.find(c => c.id === carId);

// Update car
await updateCar(carId, {
  name: 'Updated Name',
  license_plate: 'NEW-PLATE',
});
```

**Database Tables**:
- `cars` (SELECT, UPDATE)

**What User Sees**:
- Pre-filled form with current car details
- Same fields as AddCar
- Update button
- Delete option

---

### 📋 EditCarsCollection.tsx
**Location**: `app/EditCarsCollection.tsx`

**What to Do**:
```typescript
import { getCars, deleteCar } from '@/lib/supabase/queries';

const { data: cars } = await getCars(user.id);

// Display list of cars
cars.map(car => (
  <CarCard
    name={car.name}
    license={car.license_plate}
    onEdit={() => router.push(`/EditCar?id=${car.id}`)}
    onDelete={() => deleteCar(car.id)}
  />
));
```

**Database Tables**:
- `cars` (SELECT, DELETE)

**What User Sees**:
- Grid/list of all user's cars
- Each card shows car name, license plate, image
- Edit and Delete buttons
- "Add New Car" button

---

## 💰 Payment & Wallet Pages

### 💳 MyWallet.tsx
**Location**: `app/MyWallet.tsx`

**What to Fetch**:
```typescript
import {
  getWalletBalance,
  getWalletTransactions,
  addWalletTransaction
} from '@/lib/supabase/queries';

// Get balance
const { balance } = await getWalletBalance(user.id);

// Get transactions
const { data: transactions } = await getWalletTransactions(user.id);

// Add money
await addWalletTransaction({
  user_id: user.id,
  amount: 100,
  type: 'credit',
  description: 'Money added',
  reference: `TXN-${Date.now()}`
});
```

**Database Tables**:
- `wallet_transactions`

**What User Sees**:

**Balance Card**:
- Current balance (calculated from transactions)
- "Add Money" button

**Transaction List**:
```
Money added to wallet
+AED 100.00          → Green for credit
Jan 5, 2025

Service payment
-AED 50.00           → Red for debit
Jan 4, 2025
```

**Balance Calculation**:
```typescript
balance = transactions.reduce((sum, txn) =>
  txn.type === 'credit' ? sum + txn.amount : sum - txn.amount
, 0);
```

---

## 📍 Location Pages

### 🏢 AddBuilding.tsx
**Location**: `app/AddBuilding.tsx`

**What to Do**:
```typescript
import { addBuilding } from '@/lib/supabase/queries';

await addBuilding({
  user_id: user.id,
  name: 'Marina Towers',
  address: 'Dubai Marina',
  city: 'Dubai',
  country: 'UAE',
  is_default: true
});
```

**Database Tables**:
- `buildings` (INSERT)

**Form Fields**:
- Building Name*
- Address*
- City*
- Country*
- Set as default (checkbox)

---

### 🔄 ChangeBuilding.tsx
**Location**: `app/ChangeBuilding.tsx`

**What to Do**:
```typescript
import { getBuildings, updateBuilding } from '@/lib/supabase/queries';

const { data: buildings } = await getBuildings(user.id);

// Set default building
await updateBuilding(buildingId, { is_default: true });
```

**Database Tables**:
- `buildings` (SELECT, UPDATE)

**What User Sees**:
- List of saved buildings
- Radio button to select default
- Edit/Delete options

---

## 📦 Order Flow Pages

### 📅 ScheduleOrder.tsx
**Location**: `app/ScheduleOrder.tsx`

**What to Do**:
```typescript
import { createBooking } from '@/lib/supabase/queries';

await createBooking({
  user_id: user.id,
  car_id: selectedCarId,
  service_id: selectedServiceId,
  building_id: selectedBuildingId,
  schedule_date: '2025-01-10',
  schedule_time: '10:00-11:00 AM',
  total_price: 50.00,
  status: 'pending'
  // reference_number auto-generated
});
```

**Database Tables**:
- `bookings` (INSERT)
- `services` (SELECT for prices)
- `cars` (SELECT for user's cars)
- `buildings` (SELECT for locations)

**What User Sees**:
- Service selection
- Car selection
- Building selection
- Date picker
- Time slot picker
- Total price
- Confirm booking button

---

### ✅ OrderPlaced.tsx
**Location**: `app/OrderPlaced.tsx`

**What to Show**:
- Success message
- Booking reference number
- Schedule details
- "View Order" button

---

### 🚧 OrderInProgress.tsx
**Location**: `app/OrderInProgress.tsx`

**What to Fetch**:
```typescript
import { getBookings, updateBookingStatus } from '@/lib/supabase/queries';

const bookingId = params.id;
const { data: bookings } = await getBookings(user.id);
const booking = bookings.find(b => b.id === bookingId);

// Real-time status updates
supabase
  .channel('booking-changes')
  .on('postgres_changes', {
    event: 'UPDATE',
    table: 'bookings',
    filter: `id=eq.${bookingId}`
  }, (payload) => {
    // Update UI with new status
  })
  .subscribe();
```

**Database Tables**:
- `bookings` (SELECT, UPDATE with real-time)

**What User Sees**:
- Current status: Accepted → In Progress → Completed
- Status timeline with checkmarks
- Car and service details
- Worker info (if available)
- Cancel button

**Status Flow**:
1. **Pending** - Just created
2. **Accepted** - Worker assigned
3. **In Progress** - Worker on the way / working
4. **Completed** - Job done, show rating modal

---

### 🔍 HistoryDetails.tsx
**Location**: `app/HistoryDetails.tsx`

**What to Fetch**:
```typescript
const { data: bookings } = await getBookings(user.id);
const booking = bookings.find(b => b.id === params.id);

// Also get review if exists
const { data: review } = await supabase
  .from('reviews')
  .select('*')
  .eq('booking_id', booking.id)
  .single();
```

**Database Tables**:
- `bookings` (SELECT)
- `reviews` (SELECT)

**What User Sees**:
- Completed booking details
- Rating given (if any)
- Review comment
- Receipt / Invoice
- "Book Again" button

---

## 🛍️ Service Pages

### 🧼 ServicesScreen.tsx
**Location**: `app/ServicesScreen.tsx`

**What to Fetch**:
```typescript
import { getServices, addToCart } from '@/lib/supabase/queries';

const { data: services } = await getServices();

// Add to cart
await addToCart({
  user_id: user.id,
  service_id: service.id,
  car_id: selectedCarId,
  quantity: 1
});
```

**Database Tables**:
- `services` (SELECT)
- `cart_items` (INSERT)

**What User Sees**:
- List of all services with:
  - Service image
  - Title (e.g., "Interior Cleaning")
  - Description
  - Price (AED 80.00)
  - "Add to Cart" button
- Category filters

---

### 📦 ProductDetails.tsx
**Location**: `app/ProductDetails.tsx`

**What to Fetch**:
```typescript
const serviceId = params.id;
const { data: services } = await getServices();
const service = services.find(s => s.id === serviceId);
```

**Database Tables**:
- `services` (SELECT single)

**What User Sees**:
- Large service image
- Full description
- Price
- Features/Inclusions
- "Add to Cart" or "Book Now" button

---

### 🛒 CheckoutDetails.tsx
**Location**: `app/CheckoutDetails.tsx`

**What to Do**:
```typescript
import {
  getCartItems,
  createBooking,
  clearCart,
  addWalletTransaction
} from '@/lib/supabase/queries';

// 1. Get cart items
const { data: cart } = await getCartItems(user.id);

// 2. Calculate total
const total = cart.reduce((sum, item) =>
  sum + (item.services.price * item.quantity), 0
);

// 3. Create booking(s) for each cart item
for (const item of cart) {
  await createBooking({
    user_id: user.id,
    car_id: item.car_id,
    service_id: item.service_id,
    building_id: selectedBuildingId,
    schedule_date: selectedDate,
    schedule_time: selectedTime,
    total_price: item.services.price * item.quantity,
    status: 'pending'
  });
}

// 4. Process payment (debit wallet)
await addWalletTransaction({
  user_id: user.id,
  amount: total,
  type: 'debit',
  description: 'Service booking payment',
  reference: `ORDER-${Date.now()}`
});

// 5. Clear cart
await clearCart(user.id);

// 6. Navigate to success page
router.push('/OrderPlaced');
```

**Database Tables**:
- `cart_items` (SELECT, DELETE)
- `bookings` (INSERT)
- `wallet_transactions` (INSERT)
- `buildings` (SELECT)

**What User Sees**:
- Order summary from cart
- Selected building/address
- Selected date & time
- Payment method (Wallet)
- Total amount
- "Place Order" button

---

### 🎁 Offers.tsx
**Location**: `app/Offers.tsx`

**What to Fetch**:
```typescript
// You can create an 'offers' table or filter services
const { data: services } = await getServices();
const offers = services.filter(s => s.category === 'subscription');
```

**Database Tables**:
- `services` (filtered by category or add `offers` table)

**What User Sees**:
- Special offers and discounts
- Subscription packages
- Limited-time deals

---

## ⚙️ Settings Pages

### 🔔 NotificationSettings.tsx
**Location**: `app/NotificationSettings.tsx`

**What to Do**:
```typescript
import { getNotifications, markNotificationAsRead } from '@/lib/supabase/queries';

const { data: notifications } = await getNotifications(user.id);

// Mark as read
await markNotificationAsRead(notificationId);
```

**Database Tables**:
- `notifications`

**What User Sees**:
- Toggle for push notifications
- Toggle for email notifications
- Notification history
- Mark all as read option

---

### 🔐 PasswordSettings.tsx
**Location**: `app/PasswordSettings.tsx`

**What to Do**:
```typescript
import { supabase } from '@/lib/supabase/client';

// Note: Supabase phone auth doesn't use passwords
// You can skip this page or repurpose it for phone number change

await supabase.auth.updateUser({
  phone: newPhoneNumber
});
```

**What User Sees**:
- Change phone number option
- Requires OTP verification

---

### 👥 ReferAFriend.tsx
**Location**: `app/ReferAFriend.tsx`

**What to Do**:
```typescript
const referralCode = user.id.slice(0, 8).toUpperCase();
```

**What User Sees**:
- Unique referral code/link
- Copy button
- Share button (WhatsApp, SMS, etc.)
- Referral history

---

### 🆘 Support.tsx
**Location**: `app/Support.tsx`

**What to Do**:
```typescript
// Create 'support_tickets' table or use external service
```

**What User Sees**:
- FAQ section
- Contact form
- Chat support
- Phone number / Email

---

## 📊 Summary Table

| Page | Tables Used | Auth Required | Real-time | Storage |
|------|------------|---------------|-----------|---------|
| SignIn | - | No | - | - |
| SignUp | profiles | No | - | - |
| Home | profiles, bookings, services | Yes | Yes (bookings) | - |
| Profile | profiles | Yes | - | Yes (avatar) |
| Bookings | bookings + joins | Yes | Yes | - |
| Cart | cart_items + joins | Yes | Optional | - |
| AddCar | cars | Yes | - | Yes (car image) |
| EditCar | cars | Yes | - | Yes (car image) |
| EditCarsCollection | cars | Yes | - | - |
| MyWallet | wallet_transactions | Yes | - | - |
| AddBuilding | buildings | Yes | - | - |
| ScheduleOrder | bookings, services, cars, buildings | Yes | - | - |
| OrderInProgress | bookings | Yes | Yes | - |
| HistoryDetails | bookings, reviews | Yes | - | - |
| ServicesScreen | services, cart_items | Yes | - | - |
| CheckoutDetails | cart_items, bookings, wallet_transactions | Yes | - | - |

---

## 🎯 Priority Implementation Order

### Phase 1: Core Auth (Day 1)
1. ✅ AuthContext
2. ✅ SignIn
3. ✅ SignUp
4. ✅ VerificationCode

### Phase 2: Basic Features (Day 2)
5. Home Screen
6. Profile Screen
7. AddCar
8. EditCarsCollection

### Phase 3: Booking Flow (Day 3)
9. ServicesScreen
10. Cart
11. ScheduleOrder
12. OrderPlaced
13. Bookings Screen

### Phase 4: Advanced Features (Day 4)
14. OrderInProgress (with real-time)
15. MyWallet
16. HistoryDetails
17. CheckoutDetails

### Phase 5: Polish (Day 5)
18. Storage (images)
19. Real-time subscriptions
20. Notifications
21. Testing & Bug Fixes

---

**Quick Reference Created**: January 2025
