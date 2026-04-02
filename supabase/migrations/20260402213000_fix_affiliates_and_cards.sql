-- 1. Create generated_cards table
CREATE TABLE IF NOT EXISTS public.generated_cards (
    id bigint generated always as identity primary key,
    telegram_id bigint not null,
    card_number text not null,
    holder_name text not null,
    expiry text not null,
    cvv text not null,
    card_type text not null,
    bank text not null,
    brand text not null,
    bin text not null,
    cpf text not null,
    dob text not null,
    address text not null,
    is_free boolean not null default true,
    is_used boolean not null default false,
    used_by uuid references public.profiles(id) on delete set null,
    used_at timestamptz,
    created_at timestamptz not null default now()
);

ALTER TABLE public.generated_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view generated_cards"
  ON public.generated_cards
  FOR SELECT
  TO authenticated
  USING ( public.is_admin() );

-- 2. Update handle_new_user to link telegram_leads using telegram_username
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_telegram text;
BEGIN
  v_telegram := coalesce(new.raw_user_meta_data ->> 'telegram_username', '');

  INSERT INTO public.profiles (id, full_name, email, avatar_url, telegram_username)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'avatar_url', ''),
    v_telegram
  );

  -- Link logic for Telegram Affiliates Tracking
  IF v_telegram != '' THEN
    -- Strip '@' if they provided it
    v_telegram := replace(v_telegram, '@', '');
    
    UPDATE public.telegram_leads
    SET user_id = new.id, status = 'registered'
    WHERE lower(telegram_username) = lower(v_telegram)
      AND user_id IS NULL;
  END IF;

  RETURN new;
END;
$$;
