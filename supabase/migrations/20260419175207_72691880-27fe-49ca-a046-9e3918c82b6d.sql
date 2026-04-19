-- Briefing requests table
CREATE TABLE public.briefing_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.briefing_requests ENABLE ROW LEVEL SECURITY;

-- Admins table (whitelist of user_ids allowed to access admin features)
CREATE TABLE public.admins (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Security definer to check admin status without RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admins WHERE user_id = _user_id)
$$;

-- Policies for briefing_requests
CREATE POLICY "Anyone can submit a briefing request"
  ON public.briefing_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view briefing requests"
  ON public.briefing_requests
  FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update briefing requests"
  ON public.briefing_requests
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete briefing requests"
  ON public.briefing_requests
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Policies for admins
CREATE POLICY "Admins can view admin list"
  ON public.admins
  FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Auto-promote apexwebsolutions23@outlook.com to admin on signup
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'apexwebsolutions23@outlook.com' THEN
    INSERT INTO public.admins (user_id) VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();