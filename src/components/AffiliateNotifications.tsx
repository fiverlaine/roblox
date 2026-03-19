import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  BellRing,
  Save,
  Loader2,
  Eye,
  Settings,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Clock,
  CheckCircle,
  Shield,
  Zap,
  Send,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-hot-toast';

interface NotificationConfig {
  id?: number;
  user_id: string;
  pushcut_api_key: string;
  pushcut_notification_name: string;
  notify_new_lead: boolean;
  notify_sale_pending: boolean;
  notify_sale_approved: boolean;
  custom_title_new_lead: string;
  custom_text_new_lead: string;
  custom_title_sale_pending: string;
  custom_text_sale_pending: string;
  custom_title_sale_approved: string;
  custom_text_sale_approved: string;
  is_active: boolean;
}

const DEFAULT_CONFIG: Omit<NotificationConfig, 'user_id'> = {
  pushcut_api_key: '',
  pushcut_notification_name: 'RobloxVault',
  notify_new_lead: true,
  notify_sale_pending: true,
  notify_sale_approved: true,
  custom_title_new_lead: 'Novo Lead! 🎯',
  custom_text_new_lead: 'Um novo lead acabou de entrar no grupo.',
  custom_title_sale_pending: 'Venda pendente! ⏳',
  custom_text_sale_pending: 'Valor: {valor}',
  custom_title_sale_approved: 'Venda aprovada! 💰',
  custom_text_sale_approved: 'Valor: {valor}',
  is_active: false,
};

type PreviewType = 'new_lead' | 'sale_pending' | 'sale_approved';

const EVENT_ICONS: Record<PreviewType, typeof UserPlus> = {
  new_lead: UserPlus,
  sale_pending: Clock,
  sale_approved: CheckCircle,
};

const EVENT_LABELS: Record<PreviewType, string> = {
  new_lead: 'Novo Lead',
  sale_pending: 'Venda Pendente',
  sale_approved: 'Venda Aprovada',
};

const EVENT_COLORS: Record<PreviewType, { text: string; bg: string; border: string; glow: string }> = {
  new_lead: { text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', glow: 'shadow-sky-500/10' },
  sale_pending: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', glow: 'shadow-amber-500/10' },
  sale_approved: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/10' },
};

export default function AffiliateNotifications() {
  const { profile } = useAuthStore();
  const [config, setConfig] = useState<NotificationConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [previewType, setPreviewType] = useState<PreviewType>('sale_approved');
  const [showCustomize, setShowCustomize] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('affiliate_notification_configs')
        .select('*')
        .eq('user_id', profile.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setConfig(data as NotificationConfig);
      } else {
        setConfig({ ...DEFAULT_CONFIG, user_id: profile.id });
      }
    } catch {
      setConfig({ ...DEFAULT_CONFIG, user_id: profile!.id });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config || !profile) return;
    setSaving(true);
    try {
      const payload = {
        user_id: profile.id,
        pushcut_api_key: config.pushcut_api_key,
        pushcut_notification_name: config.pushcut_notification_name,
        notify_new_lead: config.notify_new_lead,
        notify_sale_pending: config.notify_sale_pending,
        notify_sale_approved: config.notify_sale_approved,
        custom_title_new_lead: config.custom_title_new_lead,
        custom_text_new_lead: config.custom_text_new_lead,
        custom_title_sale_pending: config.custom_title_sale_pending,
        custom_text_sale_pending: config.custom_text_sale_pending,
        custom_title_sale_approved: config.custom_title_sale_approved,
        custom_text_sale_approved: config.custom_text_sale_approved,
        is_active: config.is_active,
        updated_at: new Date().toISOString(),
      };

      if (config.id) {
        const { error } = await supabase
          .from('affiliate_notification_configs')
          .update(payload)
          .eq('id', config.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('affiliate_notification_configs')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        if (data) setConfig(data as NotificationConfig);
      }

      toast.success('Configurações salvas com sucesso!');
    } catch (err: any) {
      toast.error(err?.message || 'Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof NotificationConfig, value: any) => {
    if (!config) return;
    setConfig({ ...config, [field]: value });
  };

  const handleTest = async () => {
    if (!config || !profile) return;

    // Salva primeiro se não tiver salvo
    if (!config.id) {
      toast.error('Salve as configurações primeiro!');
      return;
    }
    if (!config.pushcut_api_key || !config.pushcut_notification_name) {
      toast.error('Preencha a API Key e o nome da notificação!');
      return;
    }
    if (!config.is_active) {
      toast.error('Ative as notificações primeiro!');
      return;
    }

    setTesting(true);
    const utmSource = profile.affiliate_utms?.[0] || 'teste';
    const events: { type: string; enabled: boolean }[] = [
      { type: 'new_lead', enabled: config.notify_new_lead },
      { type: 'sale_pending', enabled: config.notify_sale_pending },
      { type: 'sale_approved', enabled: config.notify_sale_approved },
    ];

    const enabledEvents = events.filter(e => e.enabled);
    if (enabledEvents.length === 0) {
      toast.error('Ative pelo menos um tipo de notificação!');
      setTesting(false);
      return;
    }

    let successCount = 0;
    for (const event of enabledEvents) {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const res = await fetch(`${supabaseUrl}/functions/v1/pushcut-notify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_type: event.type,
            utm_source: utmSource,
            amount: event.type !== 'new_lead' ? 99.90 : undefined,
            lead_name: event.type === 'new_lead' ? 'Teste Manual' : undefined,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.sent > 0) successCount++;
        }
      } catch (err) {
        console.error(`[Test] Failed for ${event.type}:`, err);
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} notificação(ões) enviada(s) com sucesso!`);
    } else {
      toast.error('Nenhuma notificação foi enviada. Verifique sua API Key e o nome da notificação no Pushcut.');
    }
    setTesting(false);
  };

  // --- Preview helpers ---
  const PREVIEW_VALUES: Record<string, string> = {
    valor: 'R$ 99,90',
    nome: 'João Silva',
    utm: 'tiktok',
  };

  const renderPreviewText = (template: string) => {
    // Split by placeholders and render with highlight color
    const parts = template.split(/(\{\w+\})/);
    return parts.map((part, i) => {
      const match = part.match(/^\{(\w+)\}$/);
      if (match && PREVIEW_VALUES[match[1]]) {
        return <span key={i} style={{ color: '#a78bfa', fontWeight: 500 }}>{PREVIEW_VALUES[match[1]]}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const getPreviewTitle = () => {
    if (!config) return '';
    switch (previewType) {
      case 'new_lead': return config.custom_title_new_lead;
      case 'sale_pending': return config.custom_title_sale_pending;
      case 'sale_approved': return config.custom_title_sale_approved;
    }
  };

  const getPreviewText = () => {
    if (!config) return '';
    switch (previewType) {
      case 'new_lead': return config.custom_text_new_lead;
      case 'sale_pending': return config.custom_text_sale_pending;
      case 'sale_approved': return config.custom_text_sale_approved;
    }
  };

  if (loading) {
    return (
      <div className="bg-background-primary rounded-2xl p-8 border border-ui-divider flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-background-primary rounded-2xl border border-ui-divider shadow-sm overflow-hidden"
    >
      {/* Header - always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-background-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
            <BellRing className="w-6 h-6 text-violet-400" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              Notificações Pushcut
              {config.is_active && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                  Ativo
                </span>
              )}
            </h3>
            <p className="text-sm text-text-secondary mt-0.5">
              Receba alertas no seu Celular em tempo real.
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-text-secondary" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-secondary" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6 border-t border-ui-divider pt-6">

              {/* Master Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-background-secondary/50 border border-ui-divider">
                <div className="flex items-center gap-3">
                  <Zap className={`w-5 h-5 ${config.is_active ? 'text-emerald-400' : 'text-text-secondary'}`} />
                  <div>
                    <p className="text-sm font-bold text-text-primary">Notificações ativas</p>
                    <p className="text-xs text-text-secondary mt-0.5">Ative para receber alertas no app Pushcut</p>
                  </div>
                </div>
                <button
                  onClick={() => updateField('is_active', !config.is_active)}
                  style={{
                    position: 'relative',
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    backgroundColor: config.is_active ? '#10b981' : '#d1d5db',
                    flexShrink: 0,
                    padding: 0,
                    boxShadow: config.is_active ? '0 0 12px rgba(16,185,129,0.3)' : 'none',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: config.is_active ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      transition: 'left 0.3s',
                    }}
                  />
                </button>
              </div>

              {/* API Config */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                    <Shield className="w-3.5 h-3.5 inline mr-1 opacity-60" />
                    API Key do Pushcut
                  </label>
                  <input
                    type="password"
                    value={config.pushcut_api_key}
                    onChange={(e) => updateField('pushcut_api_key', e.target.value)}
                    placeholder="Cole sua API Key aqui..."
                    className="w-full bg-background-secondary border border-ui-divider rounded-xl py-3 px-4 text-text-primary text-sm focus:outline-none focus:border-violet-500/50 transition-all font-mono"
                  />
                  <p className="text-[10px] text-text-secondary mt-1.5 opacity-60">
                    Encontre em: Pushcut App → Account → API Key
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                    <Bell className="w-3.5 h-3.5 inline mr-1 opacity-60" />
                    Nome da Notificação
                  </label>
                  <input
                    type="text"
                    value={config.pushcut_notification_name}
                    onChange={(e) => updateField('pushcut_notification_name', e.target.value)}
                    placeholder="RobloxVault"
                    className="w-full bg-background-secondary border border-ui-divider rounded-xl py-3 px-4 text-text-primary text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                  />
                  <p className="text-[10px] text-text-secondary mt-1.5 opacity-60">
                    Crie uma notificação no Pushcut com esse nome
                  </p>
                </div>
              </div>

              {/* Event Toggles */}
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                  Tipos de Notificação
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {([
                    { key: 'notify_new_lead' as const, type: 'new_lead' as PreviewType },
                    { key: 'notify_sale_pending' as const, type: 'sale_pending' as PreviewType },
                    { key: 'notify_sale_approved' as const, type: 'sale_approved' as PreviewType },
                  ]).map(({ key, type }) => {
                    const Icon = EVENT_ICONS[type];
                    const colors = EVENT_COLORS[type];
                    const enabled = config[key] as boolean;
                    return (
                      <div
                        key={key}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                          enabled
                            ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
                            : 'bg-background-secondary/30 border-ui-divider opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${colors.text}`} />
                          </div>
                          <div className="text-left">
                            <p className={`text-sm font-bold ${enabled ? 'text-text-primary' : 'text-text-secondary'}`}>
                              {EVENT_LABELS[type]}
                            </p>
                            <p className="text-[10px] text-text-secondary mt-0.5">
                              {enabled ? 'Ativado' : 'Desativado'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => updateField(key, !enabled)}
                          style={{
                            position: 'relative',
                            width: '36px',
                            height: '20px',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            backgroundColor: enabled ? '#10b981' : '#d1d5db',
                            flexShrink: 0,
                            padding: 0,
                            boxShadow: enabled ? '0 0 8px rgba(16,185,129,0.3)' : 'none',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: '2px',
                              left: enabled ? '18px' : '2px',
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              backgroundColor: '#fff',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                              transition: 'left 0.3s',
                            }}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customize Messages Toggle */}
              <button
                onClick={() => setShowCustomize(!showCustomize)}
                className="flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Personalizar mensagens
                {showCustomize ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {showCustomize && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden space-y-5"
                  >
                    {/* Placeholder hint */}
                    <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/10">
                      <p className="text-[11px] text-text-secondary">
                        <span className="font-bold text-violet-400">Variáveis disponíveis:</span>{' '}
                        <code className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[11px] font-mono">{'{valor}'}</code> = valor em R${' · '}
                        <code className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[11px] font-mono">{'{nome}'}</code> = nome do lead{' · '}
                        <code className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[11px] font-mono">{'{utm}'}</code> = utm source
                      </p>
                    </div>

                    {/* New Lead */}
                    <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/10 space-y-3">
                      <p className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                        <UserPlus className="w-3.5 h-3.5" /> Novo Lead
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-text-secondary mb-1">Título</label>
                          <input
                            value={config.custom_title_new_lead}
                            onChange={(e) => updateField('custom_title_new_lead', e.target.value)}
                            className="w-full bg-background-secondary border border-ui-divider rounded-lg py-2.5 px-3 text-text-primary text-sm focus:outline-none focus:border-sky-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-text-secondary mb-1">Descrição</label>
                          <input
                            value={config.custom_text_new_lead}
                            onChange={(e) => updateField('custom_text_new_lead', e.target.value)}
                            placeholder="Nome: {nome}"
                            className="w-full bg-background-secondary border border-ui-divider rounded-lg py-2.5 px-3 text-text-primary text-sm focus:outline-none focus:border-sky-500/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sale Pending */}
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Venda Pendente
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-text-secondary mb-1">Título</label>
                          <input
                            value={config.custom_title_sale_pending}
                            onChange={(e) => updateField('custom_title_sale_pending', e.target.value)}
                            className="w-full bg-background-secondary border border-ui-divider rounded-lg py-2.5 px-3 text-text-primary text-sm focus:outline-none focus:border-amber-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-text-secondary mb-1">Descrição</label>
                          <input
                            value={config.custom_text_sale_pending}
                            onChange={(e) => updateField('custom_text_sale_pending', e.target.value)}
                            placeholder="Valor: {valor}"
                            className="w-full bg-background-secondary border border-ui-divider rounded-lg py-2.5 px-3 text-text-primary text-sm focus:outline-none focus:border-amber-500/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sale Approved */}
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-3">
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Venda Aprovada
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-text-secondary mb-1">Título</label>
                          <input
                            value={config.custom_title_sale_approved}
                            onChange={(e) => updateField('custom_title_sale_approved', e.target.value)}
                            className="w-full bg-background-secondary border border-ui-divider rounded-lg py-2.5 px-3 text-text-primary text-sm focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-text-secondary mb-1">Descrição</label>
                          <input
                            value={config.custom_text_sale_approved}
                            onChange={(e) => updateField('custom_text_sale_approved', e.target.value)}
                            placeholder="Valor: {valor}"
                            className="w-full bg-background-secondary border border-ui-divider rounded-lg py-2.5 px-3 text-text-primary text-sm focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Preview Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Prévia da Notificação
                  </label>
                  <div className="flex gap-1.5">
                    {(['new_lead', 'sale_pending', 'sale_approved'] as PreviewType[]).map((type) => {
                      const colors = EVENT_COLORS[type];
                      return (
                        <button
                          key={type}
                          onClick={() => setPreviewType(type)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                            previewType === type
                              ? `${colors.bg} ${colors.text} ${colors.border} border`
                              : 'text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          {EVENT_LABELS[type]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notification Preview Card */}
                <div className="flex justify-center">
                  <motion.div
                    key={previewType}
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ maxWidth: '340px', width: '100%' }}
                  >
                    <div
                      style={{
                        background: 'rgba(0, 0, 0, 0.35)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '14px',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          background: 'rgba(0,0,0,0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity={0.9}>
                          <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44a1 1 0 0 1-.99.01l-7.9-4.44A1 1 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44a1 1 0 0 1 .99-.01l7.9 4.44c.32.18.53.51.53.88v9z" />
                        </svg>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                        <span
                          style={{
                            fontSize: '13px',
                            color: '#eee',
                            fontWeight: 700,
                            lineHeight: 1.3,
                          }}
                        >
                          {getPreviewTitle() || 'Título'}
                        </span>
                        <span
                          style={{
                            fontSize: '12px',
                            color: '#ccc',
                            fontWeight: 300,
                            lineHeight: 1.4,
                          }}
                        >
                          {renderPreviewText(getPreviewText() || 'Descrição')}
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            color: '#999',
                            fontWeight: 300,
                            lineHeight: 1.3,
                          }}
                        >
                          UTM: {PREVIEW_VALUES.utm}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleTest}
                  disabled={testing || saving}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-background-secondary text-text-primary border border-ui-divider hover:border-brand-primary/40 transition-all disabled:opacity-50"
                >
                  {testing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Testar notificação
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold bg-brand-primary text-black hover:opacity-90 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Salvar Configurações
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
