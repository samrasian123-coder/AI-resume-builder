-- Supabase Schema for AI Resume Builder

-- 1. Create profiles table
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  phone_number text,
  location text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Create resumes table
CREATE TABLE public.resumes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content jsonb DEFAULT '{}'::jsonb, -- Stores the actual resume data (experience, education, etc)
  template_id text DEFAULT 'modern',
  is_public boolean DEFAULT false,
  ats_score integer,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for resumes
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own resumes." ON public.resumes FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can insert own resumes." ON public.resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes." ON public.resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes." ON public.resumes FOR DELETE USING (auth.uid() = user_id);

-- 3. Create cover_letters table
CREATE TABLE public.cover_letters (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  resume_id uuid REFERENCES public.resumes(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for cover_letters
ALTER TABLE public.cover_letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cover letters." ON public.cover_letters FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cover letters." ON public.cover_letters FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cover letters." ON public.cover_letters FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cover letters." ON public.cover_letters FOR DELETE USING (auth.uid() = user_id);

-- 4. Create analytics table
CREATE TABLE public.analytics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type text NOT NULL, -- e.g., 'resume_created', 'ai_summary_generated', 'pdf_downloaded'
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for analytics
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analytics." ON public.analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert analytics." ON public.analytics FOR INSERT WITH CHECK (true); -- Usually handled by service role

-- Function to automatically handle updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER on_resumes_updated
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER on_cover_letters_updated
  BEFORE UPDATE ON public.cover_letters
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
