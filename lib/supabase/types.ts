export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          phone: string
          first_name: string | null
          last_name: string | null
          email: string | null
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          phone: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          image?: string | null
          updated_at?: string
        }
      }
      cars: {
        Row: {
          id: number
          user_id: string
          name: string
          license_plate: string
          model: string | null
          color: string | null
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          name: string
          license_plate: string
          model?: string | null
          color?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          name?: string
          license_plate?: string
          model?: string | null
          color?: string | null
          image?: string | null
          updated_at?: string
        }
      }
      buildings: {
        Row: {
          id: number
          user_id: string
          name: string
          address: string
          city: string
          country: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          name: string
          address: string
          city: string
          country: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          name?: string
          address?: string
          city?: string
          country?: string
          is_default?: boolean
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: number
          title: string
          description: string
          price: number
          category: string
          image: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          price: number
          category: string
          image?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          price?: number
          category?: string
          image?: string | null
          is_active?: boolean
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: number
          user_id: string
          car_id: number
          service_id: number
          building_id: number
          status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          schedule_date: string
          schedule_time: string
          reference_number: string
          total_price: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          car_id: number
          service_id: number
          building_id: number
          status?: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          schedule_date: string
          schedule_time: string
          reference_number: string
          total_price: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          car_id?: number
          service_id?: number
          building_id?: number
          status?: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
          schedule_date?: string
          schedule_time?: string
          reference_number?: string
          total_price?: number
          notes?: string | null
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: number
          user_id: string
          service_id: number
          car_id: number
          quantity: number
          date: string | null
          time: string | null
          slot: string | null
          special_instructions: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          service_id: number
          car_id: number
          quantity?: number
          date?: string | null
          time?: string | null
          slot?: string | null
          special_instructions?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          service_id?: number
          car_id?: number
          quantity?: number
          date?: string | null
          time?: string | null
          slot?: string | null
          special_instructions?: string | null
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: number
          user_id: string
          booking_id: number
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          booking_id: number
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          booking_id?: number
          rating?: number
          comment?: string | null
          updated_at?: string
        }
      }
      wallet_transactions: {
        Row: {
          id: number
          user_id: string
          amount: number
          type: 'credit' | 'debit'
          description: string
          reference: string | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          amount: number
          type: 'credit' | 'debit'
          description: string
          reference?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          amount?: number
          type?: 'credit' | 'debit'
          description?: string
          reference?: string | null
        }
      }
      notifications: {
        Row: {
          id: number
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          title: string
          message: string
          type: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
