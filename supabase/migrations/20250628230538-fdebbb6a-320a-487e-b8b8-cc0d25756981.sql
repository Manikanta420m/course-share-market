
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.user_role AS ENUM ('creator', 'investor', 'admin');
CREATE TYPE public.course_status AS ENUM ('draft', 'active', 'paused', 'completed');
CREATE TYPE public.transaction_type AS ENUM ('course_purchase', 'investment', 'revenue_share', 'share_sale');
CREATE TYPE public.investment_status AS ENUM ('active', 'sold', 'pending');

-- Create profiles table for additional user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'investor',
  bio TEXT,
  total_invested DECIMAL(10,2) DEFAULT 0,
  total_earned DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  total_shares INTEGER NOT NULL,
  available_shares INTEGER NOT NULL,
  share_price DECIMAL(10,2) NOT NULL,
  revenue_share_percentage INTEGER NOT NULL CHECK (revenue_share_percentage >= 0 AND revenue_share_percentage <= 100),
  total_revenue DECIMAL(10,2) DEFAULT 0,
  student_count INTEGER DEFAULT 0,
  status course_status DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT available_shares_check CHECK (available_shares <= total_shares AND available_shares >= 0)
);

-- Create investments table
CREATE TABLE public.investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  shares_owned INTEGER NOT NULL CHECK (shares_owned > 0),
  purchase_price DECIMAL(10,2) NOT NULL,
  current_value DECIMAL(10,2) NOT NULL,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  status investment_status DEFAULT 'active',
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  investment_id UUID REFERENCES public.investments(id) ON DELETE SET NULL,
  type transaction_type NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  shares INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Courses policies
CREATE POLICY "Anyone can view active courses" ON public.courses FOR SELECT USING (status = 'active' OR creator_id = auth.uid());
CREATE POLICY "Creators can insert own courses" ON public.courses FOR INSERT WITH CHECK (creator_id = auth.uid());
CREATE POLICY "Creators can update own courses" ON public.courses FOR UPDATE USING (creator_id = auth.uid());

-- Investments policies
CREATE POLICY "Users can view own investments" ON public.investments FOR SELECT USING (investor_id = auth.uid());
CREATE POLICY "Users can insert own investments" ON public.investments FOR INSERT WITH CHECK (investor_id = auth.uid());
CREATE POLICY "Users can update own investments" ON public.investments FOR UPDATE USING (investor_id = auth.uid());

-- Transactions policies
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own transactions" ON public.transactions FOR INSERT WITH CHECK (user_id = auth.uid());

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update course metrics
CREATE OR REPLACE FUNCTION public.update_course_metrics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total revenue and student count
  UPDATE public.courses 
  SET 
    total_revenue = (SELECT COALESCE(SUM(amount), 0) FROM public.transactions WHERE course_id = NEW.course_id AND type = 'course_purchase'),
    student_count = (SELECT COUNT(*) FROM public.transactions WHERE course_id = NEW.course_id AND type = 'course_purchase'),
    updated_at = NOW()
  WHERE id = NEW.course_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update course metrics on new transactions
CREATE OR REPLACE TRIGGER update_course_metrics_trigger
  AFTER INSERT ON public.transactions
  FOR EACH ROW 
  WHEN (NEW.type = 'course_purchase')
  EXECUTE FUNCTION public.update_course_metrics();

-- Enable realtime for all tables
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.courses REPLICA IDENTITY FULL;
ALTER TABLE public.investments REPLICA IDENTITY FULL;
ALTER TABLE public.transactions REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.courses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.investments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
