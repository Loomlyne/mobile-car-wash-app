# Screen to Table Mapping
## Visual Guide: Which Screen Uses Which Tables

---

## 📱 Quick Reference Map

```
┌────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                          │
└────────────────────────────────────────────────────────────────┘

SignIn.tsx
  └─→ [auth.users] (Supabase Auth)

SignUp.tsx
  └─→ [auth.users] → [profiles] (auto-created)

VerificationCode.tsx
  └─→ [auth.users] → [profiles] (updated)


┌────────────────────────────────────────────────────────────────┐
│                       MAIN SCREENS                              │
└────────────────────────────────────────────────────────────────┘

Home Screen (index.tsx)
  ├─→ [profiles]         Read: user name, avatar
  ├─→ [services]         Read: list of available services
  └─→ [bookings]         Read: current active booking

Profile Screen (Profile.tsx)
  ├─→ [profiles]         Read/Update: all profile fields
  └─→ [auth.users]       Sign out

Bookings Screen (Bookings.tsx)
  ├─→ [bookings]         Read: all user bookings
  ├─→ [cars]             Read (JOIN): car details
  ├─→ [services]         Read (JOIN): service details
  └─→ [buildings]        Read (JOIN): location details


┌────────────────────────────────────────────────────────────────┐
│                     CAR MANAGEMENT                              │
└────────────────────────────────────────────────────────────────┘

AddCar.tsx
  └─→ [cars]             Create: new car

EditCar.tsx
  └─→ [cars]             Read/Update/Delete: car details

EditCarsCollection.tsx
  └─→ [cars]             Read: list all cars, Delete: remove car

ChooseCar.tsx
  └─→ [cars]             Read: list for selection


┌────────────────────────────────────────────────────────────────┐
│                    SHOPPING & ORDERS                            │
└────────────────────────────────────────────────────────────────┘

ServicesScreen.tsx
  ├─→ [services]         Read: all available services
  └─→ [cart_items]       Create: add to cart

ProductDetails.tsx
  ├─→ [services]         Read: service details
  └─→ [cart_items]       Create: add to cart

Cart.tsx
  ├─→ [cart_items]       Read/Update/Delete: cart contents
  ├─→ [services]         Read (JOIN): service prices, details
  └─→ [cars]             Read (JOIN): car details

CheckoutDetails.tsx
  ├─→ [cart_items]       Read: items to checkout, Delete: clear cart
  ├─→ [bookings]         Create: new bookings
  ├─→ [wallet_transactions] Create: payment deduction
  └─→ [buildings]        Read: delivery location

ScheduleOrder.tsx
  ├─→ [services]         Read: service to book
  ├─→ [cars]             Read: cars for selection
  ├─→ [buildings]        Read: locations for selection
  └─→ [bookings]         Create: new booking

OrderPlaced.tsx
  └─→ [bookings]         Read: booking details (reference number)

OrderInProgress.tsx
  ├─→ [bookings]         Read/Update: status updates (REALTIME)
  ├─→ [cars]             Read (JOIN): car details
  └─→ [services]         Read (JOIN): service details

HistoryDetails.tsx
  ├─→ [bookings]         Read: completed booking
  ├─→ [reviews]          Read: user's rating
  ├─→ [cars]             Read (JOIN): car details
  └─→ [services]         Read (JOIN): service details


┌────────────────────────────────────────────────────────────────┐
│                   LOCATION MANAGEMENT                           │
└────────────────────────────────────────────────────────────────┘

AddBuilding.tsx
  └─→ [buildings]        Create: new building/address

PickBuilding.tsx
  └─→ [buildings]        Read: list for selection

ChangeBuilding.tsx
  ├─→ [buildings]        Read: list all buildings
  └─→ [buildings]        Update: set default building


┌────────────────────────────────────────────────────────────────┐
│                   WALLET & PAYMENTS                             │
└────────────────────────────────────────────────────────────────┘

MyWallet.tsx
  └─→ [wallet_transactions] Read: all transactions, Create: add money


┌────────────────────────────────────────────────────────────────┐
│                        REVIEWS                                  │
└────────────────────────────────────────────────────────────────┘

RatingModal (Component)
  └─→ [reviews]          Create: new review after booking


┌────────────────────────────────────────────────────────────────┐
│                    OTHER FEATURES                               │
└────────────────────────────────────────────────────────────────┘

NotificationSettings.tsx
  └─→ [notifications]    Read/Update: notifications

EditProfile.tsx
  └─→ [profiles]         Update: profile information
  └─→ [Storage: avatars] Upload: profile picture

Offers.tsx
  └─→ [services]         Read: promotional services

Support.tsx
  └─→ (No database - UI only or external support system)

ReferAFriend.tsx
  └─→ (No database - uses user.id for referral code)

PasswordSettings.tsx
  └─→ [auth.users]       Update: phone number (requires OTP)
```

---

## 📊 Table Usage Summary

### By Frequency (Most Used First)

1. **profiles** (11 screens)
   - Nearly every authenticated screen

2. **bookings** (9 screens)
   - Core booking flow screens

3. **services** (8 screens)
   - Shopping and service browsing

4. **cars** (9 screens)
   - Anywhere car selection/display is needed

5. **buildings** (5 screens)
   - Location/address selection

6. **cart_items** (4 screens)
   - Shopping cart flow

7. **wallet_transactions** (2 screens)
   - Payment related screens

8. **reviews** (2 screens)
   - After booking completion

9. **notifications** (1 screen)
   - Settings page

---

## 🔄 CRUD Operations by Screen

### CREATE Operations

| Screen | Table | What's Created |
|--------|-------|----------------|
| SignUp | profiles | New user profile |
| AddCar | cars | New vehicle |
| AddBuilding | buildings | New address |
| ServicesScreen | cart_items | Add to cart |
| ScheduleOrder | bookings | New booking |
| CheckoutDetails | bookings | Multiple bookings from cart |
| CheckoutDetails | wallet_transactions | Payment record |
| MyWallet | wallet_transactions | Top-up transaction |
| RatingModal | reviews | Service rating |

### READ Operations

| Screen | Tables | What's Read |
|--------|--------|-------------|
| Home | profiles, services, bookings | Dashboard data |
| Profile | profiles | User info |
| Bookings | bookings + cars + services + buildings | Order list with details |
| Cart | cart_items + services + cars | Cart contents |
| EditCarsCollection | cars | User's vehicles |
| MyWallet | wallet_transactions | Transaction history |
| OrderInProgress | bookings + cars + services | Live order status |

### UPDATE Operations

| Screen | Table | What's Updated |
|--------|-------|----------------|
| EditProfile | profiles | User information |
| EditCar | cars | Vehicle details |
| ChangeBuilding | buildings | Default address |
| Cart | cart_items | Item quantities |
| OrderInProgress | bookings | Order status |
| NotificationSettings | notifications | Mark as read |

### DELETE Operations

| Screen | Table | What's Deleted |
|--------|-------|----------------|
| EditCar | cars | Remove vehicle |
| EditCarsCollection | cars | Remove vehicle |
| Cart | cart_items | Remove item |
| CheckoutDetails | cart_items | Clear cart after checkout |

---

## 🎯 Implementation Priority by Data Dependency

### Level 1: Independent (Implement First)
No dependencies on other screens

- [x] **AuthContext** - Foundation
- [ ] **SignIn** - auth.users only
- [ ] **SignUp** - auth.users + profiles
- [ ] **AddCar** - cars only
- [ ] **AddBuilding** - buildings only
- [ ] **MyWallet** - wallet_transactions only

### Level 2: Basic Dependencies
Depends on Level 1

- [ ] **Home Screen** - profiles (shows name)
- [ ] **Profile** - profiles (shows full profile)
- [ ] **EditCarsCollection** - cars (list cars from AddCar)
- [ ] **EditCar** - cars (edit existing cars)
- [ ] **ServicesScreen** - services (browse available services)

### Level 3: Multiple Dependencies
Depends on Level 1 & 2

- [ ] **Cart** - cart_items + services + cars
- [ ] **ScheduleOrder** - services + cars + buildings
- [ ] **Bookings** - bookings + cars + services + buildings

### Level 4: Complex Flow
Depends on Level 1, 2, & 3

- [ ] **CheckoutDetails** - cart_items + bookings + wallet_transactions + buildings
- [ ] **OrderInProgress** - bookings (with real-time)
- [ ] **HistoryDetails** - bookings + reviews

---

## 🔗 Screen Flow & Data Flow

### Booking Creation Flow

```
1. ServicesScreen
   └→ User browses [services]
   └→ User adds to cart → INSERT into [cart_items]

2. Cart
   └→ Display items from [cart_items] JOIN [services]
   └→ User proceeds to checkout

3. CheckoutDetails
   ├→ Read [cart_items] for order summary
   ├→ Read [buildings] for delivery location
   ├→ Read [cars] for vehicle selection
   ├→ CREATE bookings from cart items
   ├→ CREATE wallet_transaction (debit)
   └→ DELETE all [cart_items]

4. OrderPlaced
   └→ Display booking reference from [bookings]

5. Bookings
   └→ List shows new booking from [bookings]

6. OrderInProgress
   ├→ Display booking details from [bookings]
   └→ REALTIME updates to booking.status

7. HistoryDetails
   ├→ After completion, view from [bookings]
   └→ Rate service → INSERT into [reviews]
```

### User Profile Flow

```
1. SignUp
   └→ CREATE [auth.users]
   └→ Trigger CREATE [profiles]

2. VerificationCode
   └→ UPDATE [profiles] with full details

3. Home/Profile
   └→ READ [profiles] to display user info

4. EditProfile
   └→ UPDATE [profiles]
   └→ Upload to [Storage: avatars]
```

### Car Management Flow

```
1. AddCar
   └→ INSERT into [cars]

2. EditCarsCollection
   └→ SELECT [cars] WHERE user_id = current_user

3. EditCar
   ├→ SELECT specific car from [cars]
   ├→ UPDATE [cars]
   └→ Optional: DELETE from [cars]

4. ChooseCar (during booking)
   └→ SELECT [cars] for dropdown selection
```

---

## 📱 Screen Access Patterns

### Authenticated Screens (Require Login)

All screens EXCEPT:
- SignIn
- SignUp
- VerificationCode

### Screens with Realtime Updates

- **OrderInProgress** - Booking status changes
- **(Optional) Cart** - Sync across devices
- **(Optional) Notifications** - New notification alerts

### Screens with File Uploads

- **EditProfile** - Profile picture to `avatars` bucket
- **AddCar** - Car photo to `car-images` bucket
- **EditCar** - Car photo to `car-images` bucket

---

## 🎨 Example Query Patterns

### Home Screen
```typescript
// Get user profile
const { data: profile } = await getProfile(user.id);

// Get active services
const { data: services } = await getServices();

// Get current booking
const { data: bookings } = await getBookings(user.id, 'in_progress');
```

### Bookings Screen
```typescript
// With JOINs for complete data
const { data } = await supabase
  .from('bookings')
  .select(`
    *,
    cars(name, license_plate),
    services(title, price),
    buildings(name, address)
  `)
  .eq('user_id', user.id)
  .eq('status', 'pending');
```

### Cart Screen
```typescript
// Get cart with service and car details
const { data } = await supabase
  .from('cart_items')
  .select(`
    *,
    services(title, description, price, image),
    cars(name, license_plate)
  `)
  .eq('user_id', user.id);
```

---

## 🚦 Data Flow Decision Tree

```
User opens screen
    │
    ├─→ Is user authenticated? (useAuth)
    │   NO → Redirect to SignIn
    │   YES ↓
    │
    ├─→ Fetch required data
    │   ├─→ Single table? Use helper function from queries.ts
    │   └─→ Multiple tables? Use JOIN query
    │
    ├─→ Display data in UI
    │
    ├─→ User takes action (add/edit/delete)
    │   ├─→ Optimistic update (update UI immediately)
    │   └─→ Send request to Supabase
    │
    └─→ Handle response
        ├─→ Success: Keep optimistic update
        └─→ Error: Revert and show error message
```

---

## 📋 Complete Table Reference

| Table | Used By # Screens | Primary Use Case |
|-------|-------------------|------------------|
| auth.users | 3 | Authentication only |
| profiles | 11 | User information everywhere |
| cars | 9 | Vehicle selection & display |
| buildings | 5 | Location selection |
| services | 8 | Service catalog |
| bookings | 9 | Order management |
| cart_items | 4 | Shopping cart |
| wallet_transactions | 2 | Payments |
| reviews | 2 | Ratings |
| notifications | 1 | Alerts |

---

## 🎯 Testing Checklist by Screen

For each screen, verify:

### Data Loading
- [ ] Loading state shows while fetching
- [ ] Data displays correctly after load
- [ ] Empty state shows when no data
- [ ] Error state shows on fetch failure

### User Actions
- [ ] Create operations work
- [ ] Update operations work
- [ ] Delete operations work
- [ ] Optimistic updates feel instant

### Access Control
- [ ] Only user's own data is shown
- [ ] RLS prevents accessing others' data
- [ ] Unauthenticated users are redirected

---

**Document Created**: January 2025
**Use This**: Quick reference when implementing any screen
