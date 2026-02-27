-- =====================================================
-- 1. Expand telegram_leads with CAPI tracking fields
-- =====================================================
ALTER TABLE telegram_leads ADD COLUMN IF NOT EXISTS fbc text;
ALTER TABLE telegram_leads ADD COLUMN IF NOT EXISTS ip_address text;
ALTER TABLE telegram_leads ADD COLUMN IF NOT EXISTS user_agent text;

COMMENT ON COLUMN telegram_leads.fbc IS 'Facebook Click ID cookie (fb.1.timestamp.fbclid)';
COMMENT ON COLUMN telegram_leads.ip_address IS 'IP address captured at redirect page for CAPI';
COMMENT ON COLUMN telegram_leads.user_agent IS 'User-Agent captured at redirect page for CAPI';

-- =====================================================
-- 2. Add group_chat_id to bot_configs
-- =====================================================
ALTER TABLE bot_configs ADD COLUMN IF NOT EXISTS group_chat_id text;

COMMENT ON COLUMN bot_configs.group_chat_id IS 'Telegram group chat ID (numeric) used to generate unique invite links via createChatInviteLink';

-- =====================================================
-- 3. Create pixel_configs table for Facebook CAPI
-- =====================================================
CREATE TABLE IF NOT EXISTS pixel_configs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  pixel_id text NOT NULL,
  access_token text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE pixel_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage pixel_configs"
  ON pixel_configs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

COMMENT ON TABLE pixel_configs IS 'Facebook Pixel configurations for server-side CAPI integration.';

-- =====================================================
-- 4. Create capi_logs table for debugging CAPI events
-- =====================================================
CREATE TABLE IF NOT EXISTS capi_logs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lead_id bigint REFERENCES telegram_leads(id) ON DELETE SET NULL,
  start_param text,
  event_name text NOT NULL,
  pixel_id text,
  status text NOT NULL CHECK (status IN ('success', 'error', 'skipped')),
  request_payload jsonb,
  response_payload jsonb,
  error_message text,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE capi_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view capi_logs"
  ON capi_logs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

COMMENT ON TABLE capi_logs IS 'Debug logs for Facebook CAPI event delivery.';
