# Local Supabase Setup Guide
## Mobile Car Wash App - Team Onboarding

This guide will help your team members set up Supabase locally and connect to the existing database structure without starting from scratch.

---

## Prerequisites

Before you begin, make sure you have:
- Node.js (v16 or higher)
- npm or yarn
- Docker Desktop (required for Supabase local development)
- Git

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/Loomlyne/mobile-car-wash-app.git
cd mobile-car-wash-app
```

---

## Step 2: Install Dependencies

```bash
npm install
```

---

## Step 3: Install Supabase CLI

### macOS (using Homebrew)
```bash
brew install supabase/tap/supabase
```

### Windows (using Scoop)
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Linux
```bash
brew install supabase/tap/supabase
```

### Alternative (NPM - All platforms)
```bash
npm install -g supabase
```

Verify installation:
```bash
supabase --version
```

---

## Step 4: Start Docker Desktop

Make sure Docker Desktop is running on your machine. Supabase requires Docker to run locally.

**Check if Docker is running:**
```bash
docker --version
docker ps
```

---

## Step 5: Start Supabase Locally

The project already has Supabase configuration files (`supabase/config.toml` and migrations), so you can start it directly:

```bash
# Make sure you're in the project root directory
cd /path/to/mobile-car-wash-app

# Start Supabase (this will pull Docker images on first run - may take a few minutes)
supabase start
```

**Important:** The first time you run this command, it will download several Docker images (~1-2 GB). This is normal and only happens once.

---

## Step 6: Get Your Local Credentials

After Supabase starts successfully, you'll see output similar to this:

```
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Save these credentials!** You'll need them in the next step.

To view them again at any time:
```bash
supabase status
```

---

## Step 7: Configure Environment Variables

Create a `.env` file in the project root (or update the existing one):

```bash
cp .env.example .env
```

Edit the `.env` file and add your local Supabase credentials:

```env
# Supabase Configuration (Local Development)
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-step-6

# Optional: For admin operations (be careful with this key!)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-from-step-6
```

**Replace** `your-anon-key-from-step-6` with the actual `anon key` from the previous step.

---

## Step 8: Verify Database Setup

The database schema is already applied automatically through migrations! You can verify by:

### Option 1: Using Supabase Studio (Recommended)
1. Open http://127.0.0.1:54323 in your browser
2. Go to **Table Editor** in the left sidebar
3. You should see all tables:
   - profiles
   - cars
   - buildings
   - services
   - bookings
   - cart_items
   - reviews
   - wallet_transactions
   - notifications

### Option 2: Using SQL Editor
1. Open http://127.0.0.1:54323
2. Go to **SQL Editor**
3. Run this query to check all tables:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

---

## Step 9: Configure Phone Authentication

For local testing, we'll use test phone numbers (no real SMS required):

1. Open Supabase Studio: http://127.0.0.1:54323
2. Navigate to **Authentication** → **Settings** → **Phone**
3. Enable Phone authentication
4. Scroll down to **Test OTPs**
5. Add test phone numbers for development:

```
+1234567890 → 123456
+9647012345678 → 654321
```

These numbers will always use the specified OTP codes during development.

**Note:** The test OTP configuration is already set in `supabase/config.toml`:
```toml
[auth.sms.test_otp]
"+1234567890" = "123456"
```

---

## Step 10: Seed Sample Data (Optional)

If you want to start with sample services data:

1. Open SQL Editor in Supabase Studio
2. Run the seed data from `lib/supabase/schema.sql` (lines 228-235)

Or manually insert via Studio:
- Go to **Table Editor** → **services**
- Click **Insert row** → **Insert manually**

Sample services are already included at the end of the migration file, so they should already be there!

---

## Step 11: Run the App

Now you're ready to run the app:

### For iOS (requires macOS)
```bash
npx expo start
# Press 'i' for iOS simulator
```

### For Android
```bash
npx expo start
# Press 'a' for Android emulator
```

### For Web (for testing)
```bash
npx expo start
# Press 'w' for web browser
```

---

## Step 12: Test Authentication

1. Open the app in your simulator/emulator
2. Go to Sign Up
3. Use one of the test phone numbers: `+1234567890`
4. Enter the OTP: `123456`
5. You should be signed in successfully!

---

## Common Commands

### Check Supabase Status
```bash
supabase status
```

### Stop Supabase
```bash
supabase stop
```

### Restart Supabase
```bash
supabase restart
```

### View Logs
```bash
supabase logs
```

### Reset Database (WARNING: Deletes all data!)
```bash
supabase db reset
```

### Create a New Migration
```bash
supabase migration new migration_name
```

### Apply Migrations
```bash
supabase db push
```

---

## Accessing Supabase Services

Once Supabase is running locally, you can access:

| Service | URL | Description |
|---------|-----|-------------|
| **Supabase Studio** | http://127.0.0.1:54323 | Database GUI, table editor, SQL editor |
| **API** | http://127.0.0.1:54321 | REST API endpoint |
| **Database** | postgresql://postgres:postgres@127.0.0.1:54322/postgres | Direct PostgreSQL connection |
| **Inbucket** | http://127.0.0.1:54324 | Email testing (catches all emails) |

---

## Understanding the Database Structure

### Core Tables

1. **profiles** - User profile information
   - Automatically created when a user signs up
   - Linked to `auth.users` table

2. **cars** - User's vehicles
   - Each user can have multiple cars
   - Required for bookings

3. **buildings** - User's service locations
   - Delivery addresses for car wash services

4. **services** - Available car wash services
   - Pre-populated with sample data
   - Public read access for all users

5. **bookings** - Service appointments
   - Links users, cars, services, and locations
   - Tracks booking status and history

6. **cart_items** - Shopping cart
   - Temporary storage before checkout

7. **reviews** - Service ratings
   - One review per booking

8. **wallet_transactions** - Payment history
   - Tracks credits and debits

9. **notifications** - User notifications
   - App notifications and alerts

### Security (Row Level Security)

All tables have RLS enabled, meaning:
- Users can only access their own data
- Services are publicly readable
- Authentication is required for all operations

View RLS policies in `lib/supabase/schema.sql` (lines 145-187)

---

## Troubleshooting

### Issue: "Cannot connect to Docker daemon"
**Solution:** Make sure Docker Desktop is running
```bash
# Check Docker status
docker ps
```

### Issue: "Port already in use"
**Solution:** Stop Supabase and check for conflicts
```bash
supabase stop
lsof -i :54321  # Check what's using the port
```

### Issue: "Migration failed"
**Solution:** Reset the database
```bash
supabase db reset
```

### Issue: ".env file not loading"
**Solution:** Make sure your app is restarted after changing .env
```bash
# Kill the Expo dev server and restart
npx expo start --clear
```

### Issue: "Authentication not working"
**Solution:**
1. Check that phone auth is enabled in Supabase Studio
2. Verify test OTP numbers are configured
3. Check that `.env` has correct `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### Issue: "Tables don't exist"
**Solution:** Make sure migrations ran successfully
```bash
supabase status
# Check if migrations are applied
```

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│         React Native App (Expo)         │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │   Supabase Client                │  │
│  │   (lib/supabase/client.ts)       │  │
│  └─────────────────────────────────┘  │
│              ↓                          │
│  ┌─────────────────────────────────┐  │
│  │   Auth Context                   │  │
│  │   (app/context/AuthContext.tsx)  │  │
│  └─────────────────────────────────┘  │
│              ↓                          │
│  ┌─────────────────────────────────┐  │
│  │   Query Helpers                  │  │
│  │   (lib/supabase/queries.ts)      │  │
│  └─────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↓ HTTP/WebSocket
┌─────────────────────────────────────────┐
│      Local Supabase Stack (Docker)       │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │   PostgREST (REST API)           │  │
│  │   Port: 54321                     │  │
│  └──────────────────────────────────┘  │
│              ↓                           │
│  ┌──────────────────────────────────┐  │
│  │   PostgreSQL Database            │  │
│  │   Port: 54322                     │  │
│  └──────────────────────────────────┘  │
│              ↓                           │
│  ┌──────────────────────────────────┐  │
│  │   GoTrue (Auth)                   │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │   Supabase Studio (Dashboard)    │  │
│  │   Port: 54323                     │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## Next Steps

After completing this setup:

1. **Explore the codebase:**
   - `lib/supabase/` - Supabase integration files
   - `app/context/AuthContext.tsx` - Authentication logic
   - `supabase/migrations/` - Database migrations

2. **Read the documentation:**
   - `SUPABASE_INTEGRATION_GUIDE.md` - Detailed integration guide
   - `DATABASE_STRUCTURE.md` - Complete database schema
   - `PAGE_BY_PAGE_CHECKLIST.md` - Implementation checklist
   - `QUICK_START.md` - Quick reference guide

3. **Start developing:**
   - Make changes to the app
   - Test with local Supabase
   - Create new migrations if needed

---

## Team Collaboration Tips

### When pushing database changes:

1. Create a new migration:
```bash
supabase migration new describe_your_change
```

2. Write your SQL in the new migration file:
```sql
-- Example: supabase/migrations/20250106_add_payment_methods.sql
ALTER TABLE profiles ADD COLUMN payment_method TEXT;
```

3. Test locally:
```bash
supabase db reset
# Check if everything works
```

4. Commit and push:
```bash
git add supabase/migrations/
git commit -m "Add payment method to profiles"
git push
```

5. Team members pull and apply:
```bash
git pull
supabase db reset  # Applies all migrations
```

### When collaborating:

- **Always pull before starting work** to get latest migrations
- **Test migrations locally** before pushing
- **Document schema changes** in commit messages
- **Communicate** when making breaking changes

---

## Production Deployment (Future)

When ready to deploy to production:

1. Create a Supabase Cloud project at https://supabase.com
2. Link your local project:
```bash
supabase link --project-ref your-project-ref
```

3. Push migrations to production:
```bash
supabase db push
```

4. Update your production `.env`:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
```

---

## Support

If you run into issues:

1. Check the [Supabase docs](https://supabase.com/docs)
2. Review the existing documentation in this repo
3. Ask the team for help!

### Useful Resources

- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Supabase Local Development](https://supabase.com/docs/guides/cli/local-development)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)

---

**Happy Coding! 🚀**
