# Database Structure & Relationships
## Visual Guide to Supabase Tables

---

## 📊 Entity Relationship Diagram

```
                                    ┌──────────────┐
                                    │   auth.users │
                                    │   (Supabase) │
                                    └──────┬───────┘
                                           │
                                           │ 1:1
                                           ▼
┌─────────────────────────────────────────────────────────────┐
│                         PROFILES                             │
├─────────────────────────────────────────────────────────────┤
│ • id (UUID) [PK, FK → auth.users.id]                       │
│ • phone (TEXT) [UNIQUE]                                     │
│ • first_name (TEXT)                                         │
│ • last_name (TEXT)                                          │
│ • email (TEXT)                                              │
│ • image (TEXT)                                              │
│ • created_at, updated_at                                    │
└──────────────┬──────────────────────────────────────────────┘
               │
               │ 1:Many
               │
     ┌─────────┼─────────┬─────────┬──────────┬──────────┐
     │         │         │         │          │          │
     ▼         ▼         ▼         ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌──────┐ ┌─────────┐ ┌─────┐ ┌─────────┐
│  CARS  │ │BUILDING│ │BOOKING│ │  CART   │ │WALLET│ │ NOTIF  │
└────────┘ └────────┘ └───┬───┘ └─────────┘ └─────┘ └─────────┘
                          │
                          │ Many:1
                          ▼
                    ┌──────────┐
                    │ SERVICES │
                    └──────────┘
```

---

## 📋 Detailed Table Structures

### 1. PROFILES Table
**Purpose**: Store user profile information

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | UUID | Primary key, references auth.users | `550e8400-e29b-41d4-a716-446655440000` |
| `phone` | TEXT | User's phone number (unique) | `+971501234567` |
| `first_name` | TEXT | User's first name | `John` |
| `last_name` | TEXT | User's last name | `Doe` |
| `email` | TEXT | User's email address | `john@example.com` |
| `image` | TEXT | URL to profile picture | `https://...avatar.jpg` |
| `created_at` | TIMESTAMP | Account creation date | `2025-01-05 10:30:00` |
| `updated_at` | TIMESTAMP | Last update date | `2025-01-05 15:45:00` |

**Relationships**:
- ✅ One profile per user (1:1 with auth.users)
- ✅ One profile can have many cars
- ✅ One profile can have many buildings
- ✅ One profile can have many bookings

**Access Rules (RLS)**:
- ✅ Users can view/update their own profile only
- ❌ Cannot view other users' profiles

---

### 2. CARS Table
**Purpose**: Store user's vehicles

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | SERIAL | Auto-increment primary key | `1`, `2`, `3` |
| `user_id` | UUID | Owner of the car (FK → profiles) | `550e8400-...` |
| `name` | TEXT | Car name/model | `BMW X5` |
| `license_plate` | TEXT | License plate number | `DXB-12345` |
| `model` | TEXT | Detailed model | `X5 2023` |
| `color` | TEXT | Car color | `Black` |
| `image` | TEXT | URL to car photo | `https://...car.jpg` |
| `created_at` | TIMESTAMP | When added | `2025-01-05 11:00:00` |
| `updated_at` | TIMESTAMP | Last modified | `2025-01-05 11:00:00` |

**Relationships**:
- ✅ Many cars belong to one user
- ✅ One car can have many bookings

**Access Rules (RLS)**:
- ✅ Users can CRUD their own cars only
- ❌ Cannot access others' cars

**Example Data**:
```sql
id | user_id | name      | license_plate | model    | color
1  | abc-123 | BMW X5    | DXB-12345     | X5 2023  | Black
2  | abc-123 | Tesla M3  | DXB-67890     | Model 3  | White
3  | xyz-789 | Toyota    | SHJ-11111     | Camry    | Silver
```

---

### 3. BUILDINGS Table
**Purpose**: Store user's addresses/locations

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | SERIAL | Primary key | `1` |
| `user_id` | UUID | Owner (FK → profiles) | `550e8400-...` |
| `name` | TEXT | Building/location name | `Marina Towers` |
| `address` | TEXT | Full address | `Dubai Marina, Tower 1, Floor 15` |
| `city` | TEXT | City name | `Dubai` |
| `country` | TEXT | Country | `UAE` |
| `is_default` | BOOLEAN | Default address flag | `true` |
| `created_at` | TIMESTAMP | When added | `2025-01-05 11:15:00` |
| `updated_at` | TIMESTAMP | Last modified | `2025-01-05 11:15:00` |

**Relationships**:
- ✅ Many buildings belong to one user
- ✅ One building can have many bookings

**Access Rules (RLS)**:
- ✅ Users can CRUD their own buildings only

**Usage**:
- Used in checkout to select service location
- `is_default = true` is pre-selected

---

### 4. SERVICES Table
**Purpose**: Catalog of available car wash services

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | SERIAL | Primary key | `1` |
| `title` | TEXT | Service name | `One Time Wash` |
| `description` | TEXT | Service details | `Professional car wash service` |
| `price` | DECIMAL | Service price | `50.00` |
| `category` | TEXT | Service category | `basic`, `premium`, `subscription` |
| `image` | TEXT | Service image URL | `https://...service.jpg` |
| `is_active` | BOOLEAN | Is service available? | `true` |
| `created_at` | TIMESTAMP | When added | `2025-01-01 00:00:00` |
| `updated_at` | TIMESTAMP | Last modified | `2025-01-01 00:00:00` |

**Relationships**:
- ✅ One service can be in many bookings
- ✅ One service can be in many cart items

**Access Rules (RLS)**:
- ✅ Anyone can view active services (public read)
- ❌ Only admins can create/update (not implemented in app)

**Example Data**:
```sql
id | title           | description                  | price  | category     | is_active
1  | One Time Wash   | Professional car wash        | 50.00  | basic        | true
2  | Monthly Washes  | Unlimited washes per month   | 180.00 | subscription | true
3  | Interior Clean  | Deep cleaning of interior    | 80.00  | basic        | true
4  | Full Detail     | Complete detailing service   | 200.00 | premium      | true
```

---

### 5. BOOKINGS Table
**Purpose**: Store service bookings/orders

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | SERIAL | Primary key | `1` |
| `user_id` | UUID | Customer (FK → profiles) | `550e8400-...` |
| `car_id` | INT | Which car (FK → cars) | `1` |
| `service_id` | INT | Which service (FK → services) | `1` |
| `building_id` | INT | Service location (FK → buildings) | `1` |
| `status` | TEXT | Order status | `pending`, `accepted`, `in_progress`, `completed`, `cancelled` |
| `schedule_date` | DATE | Service date | `2025-01-10` |
| `schedule_time` | TEXT | Time slot | `10:00-11:00 AM` |
| `reference_number` | TEXT | Unique order ID | `#D-652563` |
| `total_price` | DECIMAL | Final price | `50.00` |
| `notes` | TEXT | Special instructions | `Please call before arrival` |
| `created_at` | TIMESTAMP | Order placed at | `2025-01-05 12:00:00` |
| `updated_at` | TIMESTAMP | Last status update | `2025-01-05 14:30:00` |

**Relationships**:
- ✅ Many bookings belong to one user
- ✅ One booking has one car
- ✅ One booking has one service
- ✅ One booking has one building
- ✅ One booking can have one review

**Status Flow**:
```
pending → accepted → in_progress → completed
                                 ↘ cancelled
```

**Access Rules (RLS)**:
- ✅ Users can view/create/update their own bookings
- ❌ Cannot modify completed bookings

**Example Data**:
```sql
id | user_id | car_id | service_id | status      | schedule_date | reference_number | total_price
1  | abc-123 | 1      | 1          | in_progress | 2025-01-10    | #D-652563        | 50.00
2  | abc-123 | 2      | 3          | completed   | 2025-01-05    | #D-651234        | 80.00
```

---

### 6. CART_ITEMS Table
**Purpose**: Shopping cart for services

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | SERIAL | Primary key | `1` |
| `user_id` | UUID | Cart owner (FK → profiles) | `550e8400-...` |
| `service_id` | INT | Service to book (FK → services) | `1` |
| `car_id` | INT | Which car (FK → cars) | `1` |
| `quantity` | INT | Number of times | `1` |
| `date` | DATE | Preferred date | `2025-01-10` |
| `time` | TEXT | Preferred time | `10:00 AM` |
| `slot` | TEXT | Time slot | `Morning` |
| `special_instructions` | TEXT | Notes | `Extra wax please` |
| `created_at` | TIMESTAMP | Added to cart | `2025-01-05 11:30:00` |
| `updated_at` | TIMESTAMP | Last modified | `2025-01-05 11:45:00` |

**Relationships**:
- ✅ Many cart items belong to one user
- ✅ One cart item has one service
- ✅ One cart item has one car

**Access Rules (RLS)**:
- ✅ Users can CRUD their own cart items only

**Usage**:
- Add services to cart before checkout
- Can select date/time preferences
- Cleared after successful booking

---

### 7. REVIEWS Table
**Purpose**: Store user ratings and feedback

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | SERIAL | Primary key | `1` |
| `user_id` | UUID | Reviewer (FK → profiles) | `550e8400-...` |
| `booking_id` | INT | Reviewed booking (FK → bookings) | `1` |
| `rating` | INT | Stars 1-5 | `5` |
| `comment` | TEXT | Review text | `Excellent service!` |
| `created_at` | TIMESTAMP | Review date | `2025-01-05 16:00:00` |
| `updated_at` | TIMESTAMP | Last edit | `2025-01-05 16:00:00` |

**Relationships**:
- ✅ One review belongs to one booking (UNIQUE)
- ✅ One review belongs to one user

**Constraints**:
- ✅ One review per booking (UNIQUE constraint)
- ✅ Rating must be 1-5

**Access Rules (RLS)**:
- ✅ Users can view/create/update their own reviews
- ✅ Reviews visible to service providers (not implemented)

---

### 8. WALLET_TRANSACTIONS Table
**Purpose**: Track user wallet balance and payments

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | SERIAL | Primary key | `1` |
| `user_id` | UUID | Wallet owner (FK → profiles) | `550e8400-...` |
| `amount` | DECIMAL | Transaction amount | `100.00` |
| `type` | TEXT | Transaction type | `credit`, `debit` |
| `description` | TEXT | Transaction details | `Money added to wallet` |
| `reference` | TEXT | Transaction ref | `TXN-1736084567890` |
| `created_at` | TIMESTAMP | Transaction time | `2025-01-05 13:00:00` |

**Transaction Types**:
- `credit`: Money added to wallet (top-up)
- `debit`: Money spent (service payment)

**Balance Calculation**:
```sql
SELECT SUM(
  CASE
    WHEN type = 'credit' THEN amount
    WHEN type = 'debit' THEN -amount
  END
) as balance
FROM wallet_transactions
WHERE user_id = 'YOUR-USER-ID';
```

**Access Rules (RLS)**:
- ✅ Users can view their own transactions
- ✅ Users can add credits (top-up)
- ❌ Cannot modify past transactions

**Example Data**:
```sql
id | user_id | amount | type   | description           | reference
1  | abc-123 | 100.00 | credit | Money added           | TXN-001
2  | abc-123 | 50.00  | debit  | Service payment       | ORDER-001
3  | abc-123 | 200.00 | credit | Money added           | TXN-002

-- Balance: 100 - 50 + 200 = 250.00 AED
```

---

### 9. NOTIFICATIONS Table
**Purpose**: Store user notifications

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | SERIAL | Primary key | `1` |
| `user_id` | UUID | Recipient (FK → profiles) | `550e8400-...` |
| `title` | TEXT | Notification title | `Booking Confirmed` |
| `message` | TEXT | Notification body | `Your booking #D-652563 is confirmed` |
| `type` | TEXT | Notification category | `booking`, `payment`, `promo` |
| `is_read` | BOOLEAN | Read status | `false` |
| `created_at` | TIMESTAMP | When sent | `2025-01-05 12:05:00` |

**Notification Types**:
- `booking`: Booking status updates
- `payment`: Payment confirmations
- `promo`: Promotional offers
- `reminder`: Upcoming service reminders

**Access Rules (RLS)**:
- ✅ Users can view/update their own notifications

---

## 🔗 Relationship Summary

### User → Multiple Resources
```
1 User (Profile)
  ├─ Many Cars (1:Many)
  ├─ Many Buildings (1:Many)
  ├─ Many Bookings (1:Many)
  ├─ Many Cart Items (1:Many)
  ├─ Many Reviews (1:Many)
  ├─ Many Wallet Transactions (1:Many)
  └─ Many Notifications (1:Many)
```

### Booking → Multiple Resources
```
1 Booking
  ├─ 1 User (Many:1)
  ├─ 1 Car (Many:1)
  ├─ 1 Service (Many:1)
  ├─ 1 Building (Many:1)
  └─ 0 or 1 Review (1:0..1)
```

### Service → Multiple Bookings
```
1 Service
  ├─ Many Bookings (1:Many)
  └─ Many Cart Items (1:Many)
```

---

## 📈 Data Flow Examples

### Example 1: User Sign Up Flow
```
1. User signs up with phone → auth.users table
2. Trigger fires → Creates profile in profiles table
3. User completes profile → Updates profiles table
```

### Example 2: Booking Flow
```
1. User adds service to cart → cart_items table
2. User goes to checkout → Reads from cart_items
3. User confirms order → Creates booking in bookings table
4. Payment processed → Creates transaction in wallet_transactions
5. Cart cleared → Deletes from cart_items
6. Notification sent → Creates notification in notifications table
```

### Example 3: Service Completion Flow
```
1. Booking status updated to 'completed' → bookings table
2. User prompted to rate → Creates review in reviews table
3. Notification sent → notifications table
```

---

## 🎯 Index Strategy

All tables have these indexes for performance:

```sql
-- User-based queries (very common)
CREATE INDEX idx_cars_user_id ON cars(user_id);
CREATE INDEX idx_buildings_user_id ON buildings(user_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);

-- Status-based queries
CREATE INDEX idx_bookings_status ON bookings(status);

-- Foreign key lookups
CREATE INDEX idx_bookings_car_id ON bookings(car_id);
CREATE INDEX idx_bookings_service_id ON bookings(service_id);
```

---

## 🔐 Row Level Security (RLS) Summary

| Table | Policy | Description |
|-------|--------|-------------|
| profiles | View own | `auth.uid() = id` |
| cars | CRUD own | `auth.uid() = user_id` |
| buildings | CRUD own | `auth.uid() = user_id` |
| services | Public read | `is_active = true` |
| bookings | View/Create own | `auth.uid() = user_id` |
| cart_items | CRUD own | `auth.uid() = user_id` |
| reviews | View/Create own | `auth.uid() = user_id` |
| wallet_transactions | View/Create own | `auth.uid() = user_id` |
| notifications | View/Update own | `auth.uid() = user_id` |

**Key Points**:
- ✅ Users can only access their own data
- ✅ Services are publicly readable (anyone can browse)
- ✅ RLS is enforced at database level (secure)

---

## 📊 Sample Queries

### Get user with all their data
```sql
SELECT
  p.*,
  json_agg(DISTINCT c.*) as cars,
  json_agg(DISTINCT b.*) as buildings,
  json_agg(DISTINCT bk.*) as bookings
FROM profiles p
LEFT JOIN cars c ON c.user_id = p.id
LEFT JOIN buildings b ON b.user_id = p.id
LEFT JOIN bookings bk ON bk.user_id = p.id
WHERE p.id = 'USER-ID'
GROUP BY p.id;
```

### Get upcoming bookings with details
```sql
SELECT
  bk.*,
  json_build_object(
    'name', c.name,
    'license_plate', c.license_plate
  ) as car,
  json_build_object(
    'title', s.title,
    'price', s.price
  ) as service,
  json_build_object(
    'name', b.name,
    'address', b.address
  ) as building
FROM bookings bk
LEFT JOIN cars c ON c.id = bk.car_id
LEFT JOIN services s ON s.id = bk.service_id
LEFT JOIN buildings b ON b.id = bk.building_id
WHERE bk.user_id = 'USER-ID'
  AND bk.status IN ('pending', 'accepted', 'in_progress')
ORDER BY bk.schedule_date ASC;
```

### Calculate wallet balance
```sql
SELECT
  SUM(CASE
    WHEN type = 'credit' THEN amount
    WHEN type = 'debit' THEN -amount
  END) as balance
FROM wallet_transactions
WHERE user_id = 'USER-ID';
```

---

**Document Created**: January 2025
**Database Version**: 1.0.0
