/*
  # Initial Schema Setup for Ask Your HR

  1. New Tables
    - `tenants`: Stores organization/company information
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text): Company/organization name
      - `owner_id` (uuid): References the user who created the tenant
    
    - `tenant_users`: Links users to tenants with roles
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `tenant_id` (uuid): References the tenant
      - `user_id` (uuid): References the auth.users
      - `role` (text): User role within the tenant (admin/user)

  2. Security
    - Enable RLS on all tables
    - Policies for tenant access and management
*/

-- Create tenants table
CREATE TABLE IF NOT EXISTS tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  owner_id uuid NOT NULL REFERENCES auth.users(id)
);

-- Create tenant_users table
CREATE TABLE IF NOT EXISTS tenant_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  role text NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user'
);

-- Enable RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_users ENABLE ROW LEVEL SECURITY;

-- Policies for tenants table
CREATE POLICY "Users can view their own tenants"
  ON tenants
  FOR SELECT
  USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM tenant_users
      WHERE tenant_users.tenant_id = tenants.id
      AND tenant_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Only authenticated users can create tenants"
  ON tenants
  FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid());

-- Policies for tenant_users table
CREATE POLICY "Users can view members of their tenants"
  ON tenant_users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = tenant_users.tenant_id
      AND (tenants.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM tenant_users tu
          WHERE tu.tenant_id = tenant_users.tenant_id
          AND tu.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Only tenant admins can manage users"
  ON tenant_users
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM tenant_users tu
      WHERE tu.tenant_id = tenant_users.tenant_id
      AND tu.user_id = auth.uid()
      AND tu.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tenants_owner_id ON tenants(owner_id);
CREATE INDEX IF NOT EXISTS idx_tenant_users_tenant_id ON tenant_users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_users_user_id ON tenant_users(user_id);