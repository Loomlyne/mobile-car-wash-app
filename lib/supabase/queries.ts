import { supabase } from './client';
import type { Database } from './types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Car = Database['public']['Tables']['cars']['Row'];
type Building = Database['public']['Tables']['buildings']['Row'];
type Service = Database['public']['Tables']['services']['Row'];
type Booking = Database['public']['Tables']['bookings']['Row'];
type CartItem = Database['public']['Tables']['cart_items']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];
type WalletTransaction = Database['public']['Tables']['wallet_transactions']['Row'];
type Notification = Database['public']['Tables']['notifications']['Row'];

// ============= PROFILE QUERIES =============

export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    return { data: null, error: error.message };
  }
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return { data: null, error: error.message };
  }
}

// ============= CAR QUERIES =============

export async function getCars(userId: string) {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching cars:', error);
    return { data: null, error: error.message };
  }
}

export async function addCar(carData: Database['public']['Tables']['cars']['Insert']) {
  try {
    const { data, error } = await supabase
      .from('cars')
      .insert(carData)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error adding car:', error);
    return { data: null, error: error.message };
  }
}

export async function updateCar(carId: number, updates: Database['public']['Tables']['cars']['Update']) {
  try {
    const { data, error } = await supabase
      .from('cars')
      .update(updates)
      .eq('id', carId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating car:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteCar(carId: number) {
  try {
    const { error } = await supabase
      .from('cars')
      .delete()
      .eq('id', carId);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error deleting car:', error);
    return { error: error.message };
  }
}

// ============= BUILDING QUERIES =============

export async function getBuildings(userId: string) {
  try {
    const { data, error } = await supabase
      .from('buildings')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching buildings:', error);
    return { data: null, error: error.message };
  }
}

export async function addBuilding(buildingData: Database['public']['Tables']['buildings']['Insert']) {
  try {
    const { data, error } = await supabase
      .from('buildings')
      .insert(buildingData)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error adding building:', error);
    return { data: null, error: error.message };
  }
}

export async function updateBuilding(buildingId: number, updates: Database['public']['Tables']['buildings']['Update']) {
  try {
    const { data, error } = await supabase
      .from('buildings')
      .update(updates)
      .eq('id', buildingId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating building:', error);
    return { data: null, error: error.message };
  }
}

// ============= SERVICE QUERIES =============

export async function getServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return { data: null, error: error.message };
  }
}

// ============= BOOKING QUERIES =============

export async function getBookings(userId: string, status?: string) {
  try {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        cars(name, license_plate, model),
        services(title, description, price),
        buildings(name, address, city)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return { data: null, error: error.message };
  }
}

export async function createBooking(bookingData: Database['public']['Tables']['bookings']['Insert']) {
  try {
    // Generate unique reference number
    const refNumber = `#D-${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabase
      .from('bookings')
      .insert({ ...bookingData, reference_number: refNumber })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return { data: null, error: error.message };
  }
}

export async function updateBookingStatus(bookingId: number, status: string) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: status as any })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating booking status:', error);
    return { data: null, error: error.message };
  }
}

// ============= CART QUERIES =============

export async function getCartItems(userId: string) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        services(title, description, price, image),
        cars(name, license_plate)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching cart items:', error);
    return { data: null, error: error.message };
  }
}

export async function addToCart(cartItem: Database['public']['Tables']['cart_items']['Insert']) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .insert(cartItem)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    return { data: null, error: error.message };
  }
}

export async function updateCartItem(itemId: number, quantity: number) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating cart item:', error);
    return { data: null, error: error.message };
  }
}

export async function removeFromCart(itemId: number) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error removing from cart:', error);
    return { error: error.message };
  }
}

export async function clearCart(userId: string) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error clearing cart:', error);
    return { error: error.message };
  }
}

// ============= REVIEW QUERIES =============

export async function addReview(reviewData: Database['public']['Tables']['reviews']['Insert']) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error adding review:', error);
    return { data: null, error: error.message };
  }
}

// ============= WALLET QUERIES =============

export async function getWalletBalance(userId: string) {
  try {
    const { data, error } = await supabase
      .from('wallet_transactions')
      .select('amount, type')
      .eq('user_id', userId);

    if (error) throw error;

    const balance = data.reduce((acc, transaction) => {
      return transaction.type === 'credit'
        ? acc + Number(transaction.amount)
        : acc - Number(transaction.amount);
    }, 0);

    return { balance, error: null };
  } catch (error: any) {
    console.error('Error fetching wallet balance:', error);
    return { balance: 0, error: error.message };
  }
}

export async function getWalletTransactions(userId: string) {
  try {
    const { data, error } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching wallet transactions:', error);
    return { data: null, error: error.message };
  }
}

export async function addWalletTransaction(transaction: Database['public']['Tables']['wallet_transactions']['Insert']) {
  try {
    const { data, error } = await supabase
      .from('wallet_transactions')
      .insert(transaction)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error adding wallet transaction:', error);
    return { data: null, error: error.message };
  }
}

// ============= NOTIFICATION QUERIES =============

export async function getNotifications(userId: string) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching notifications:', error);
    return { data: null, error: error.message };
  }
}

export async function markNotificationAsRead(notificationId: number) {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Error marking notification as read:', error);
    return { error: error.message };
  }
}
