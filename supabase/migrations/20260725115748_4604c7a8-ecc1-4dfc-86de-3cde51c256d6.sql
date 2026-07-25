
-- Revoke public execute on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_admin_user() FROM PUBLIC, anon, authenticated;

-- Replace is_admin() usage in RLS policies with inline EXISTS so authenticated no longer needs EXECUTE.
-- Also allow admin users to see their own admin row (needed for the EXISTS check under RLS).

-- admins table
DROP POLICY IF EXISTS "Admins can view admin list" ON public.admins;
CREATE POLICY "Admins can view own admin row"
  ON public.admins FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- briefing_requests policies
DROP POLICY IF EXISTS "Admins can view briefing requests" ON public.briefing_requests;
DROP POLICY IF EXISTS "Admins can update briefing requests" ON public.briefing_requests;
DROP POLICY IF EXISTS "Admins can delete briefing requests" ON public.briefing_requests;
DROP POLICY IF EXISTS "Anyone can submit a briefing request" ON public.briefing_requests;

CREATE POLICY "Admins can view briefing requests"
  ON public.briefing_requests FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admins a WHERE a.user_id = auth.uid()));

CREATE POLICY "Admins can update briefing requests"
  ON public.briefing_requests FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admins a WHERE a.user_id = auth.uid()));

CREATE POLICY "Admins can delete briefing requests"
  ON public.briefing_requests FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admins a WHERE a.user_id = auth.uid()));

-- Replace always-true INSERT policy with a validating check
CREATE POLICY "Anyone can submit a briefing request"
  ON public.briefing_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (message IS NULL OR char_length(message) <= 5000)
    AND status = 'new'
  );

-- reviews policies
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can submit a review" ON public.reviews;

CREATE POLICY "Admins can update reviews"
  ON public.reviews FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admins a WHERE a.user_id = auth.uid()));

CREATE POLICY "Admins can delete reviews"
  ON public.reviews FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admins a WHERE a.user_id = auth.uid()));

-- Replace always-true INSERT policy with a validating check;
-- prevent submitters from self-approving.
CREATE POLICY "Anyone can submit a review"
  ON public.reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(quote) BETWEEN 5 AND 2000
    AND (role IS NULL OR char_length(role) <= 100)
    AND approved = false
  );
