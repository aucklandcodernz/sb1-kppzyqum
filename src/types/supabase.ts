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
      tenants: {
        Row: {
          id: string
          created_at: string
          name: string
          owner_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          owner_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          owner_id?: string
        }
      }
      tenant_users: {
        Row: {
          id: string
          created_at: string
          tenant_id: string
          user_id: string
          role: 'admin' | 'user'
        }
        Insert: {
          id?: string
          created_at?: string
          tenant_id: string
          user_id: string
          role?: 'admin' | 'user'
        }
        Update: {
          id?: string
          created_at?: string
          tenant_id?: string
          user_id?: string
          role?: 'admin' | 'user'
        }
      }
    }
  }
}