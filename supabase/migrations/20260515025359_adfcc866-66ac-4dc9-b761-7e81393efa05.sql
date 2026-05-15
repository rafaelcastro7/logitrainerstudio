
-- Auto-approve new users on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_approval()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.user_approvals (user_id, status, reviewed_at)
  VALUES (NEW.id, 'approved', now())
  ON CONFLICT (user_id) DO UPDATE SET status = 'approved', reviewed_at = now();
  RETURN NEW;
END;
$function$;

-- Backfill: approve all existing users
UPDATE public.user_approvals SET status = 'approved', reviewed_at = now() WHERE status <> 'approved';

-- Ensure triggers exist on auth.users for profile + approval + referral
DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_auth_user_created_approval ON auth.users;
CREATE TRIGGER on_auth_user_created_approval
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_approval();

DROP TRIGGER IF EXISTS on_auth_user_created_referral ON auth.users;
CREATE TRIGGER on_auth_user_created_referral
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_referral();
