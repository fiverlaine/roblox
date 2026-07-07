import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Save,
  Zap,
  Shield,
  Globe,
  X,
  Power,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminStore } from '../../stores/adminStore';
import { supabase } from '../../lib/supabase';
import type { GatewayConfig } from '../../lib/types';

const GATEWAYS = [
  {
    name: 'zucropay',
    label: 'ZucroPay',
    description: 'Gateway de pagamentos PIX integrado. Gateway original do sistema.',
    features: ['PIX Instantâneo', 'Webhook automático', 'API Key auth'],
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    name: 'suitpay',
    label: 'SuitPay',
    description: 'Gateway de pagamentos PIX com alta disponibilidade e QR Code base64.',
    features: ['PIX Cash-in', 'QR Code base64', 'Webhook com hash SHA-256', 'ci/cs auth'],
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    name: 'bspay',
    label: 'BSPay',
    description: 'Gateway alternativo PIX com webhook configurável.',
    features: ['PIX Instantâneo', 'Webhook automático', 'Conciliação em tempo real'],
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    name: 'virtus_bank',
    label: 'Virtus Bank',
    description: 'Banco digital com integração de pagamentos PIX e boleto.',
    features: ['PIX', 'Boleto Bancário', 'TED/DOC', 'API Restful'],
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
];

export default function Gateways() {
  const { gatewayConfigs, loading, fetchGatewayConfigs, saveGatewayConfig } = useAdminStore();
  const [configuring, setConfiguring] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [activating, setActivating] = useState<string | null>(null);
  const [form, setForm] = useState({
    client_id: '',
    client_secret: '',
    api_url: '',
    webhook_url: '',
  });

  useEffect(() => {
    fetchGatewayConfigs();
  }, [fetchGatewayConfigs]);

  const getConfig = (name: string): GatewayConfig | undefined =>
    gatewayConfigs.find((c) => c.gateway_name === name);

  const activeGateway = gatewayConfigs.find((c) => c.is_active);

  const openConfig = (name: string) => {
    const existing = getConfig(name);
    setForm({
      client_id: existing?.client_id ?? '',
      client_secret: existing?.client_secret ?? '',
      api_url: existing?.api_url ?? '',
      webhook_url: existing?.webhook_url ?? '',
    });
    setShowSecret(false);
    setConfiguring(name);
  };

  const handleSave = async () => {
    if (!configuring) return;
    try {
      const existing = getConfig(configuring);
      await saveGatewayConfig({
        ...form,
        id: existing?.id,
        gateway_name: configuring,
        is_active: existing?.is_active ?? false,
      });
      toast.success('Configuração salva com sucesso!');
      setConfiguring(null);
    } catch {
      toast.error('Erro ao salvar configuração');
    }
  };

  const handleActivate = async (name: string) => {
    setActivating(name);
    try {
      // 1. Make sure the target gateway exists in DB
      const existing = getConfig(name);

      if (!existing) {
        toast.error(`Gateway "${name}" não encontrado. Configure-o primeiro.`);
        return;
      }

      // 2. Deactivate ALL gateways
      const { error: deactivateErr } = await supabase
        .from('gateway_configs')
        .update({ is_active: false })
        .neq('id', 0); // update all rows

      if (deactivateErr) throw deactivateErr;

      // 3. Activate only the selected one
      const { error: activateErr } = await supabase
        .from('gateway_configs')
        .update({ is_active: true })
        .eq('id', existing.id);

      if (activateErr) throw activateErr;

      // 4. Refresh store
      await fetchGatewayConfigs();
      toast.success(`Gateway ${GATEWAYS.find(g => g.name === name)?.label ?? name} ativado com sucesso!`);
    } catch (err) {
      console.error('Error activating gateway:', err);
      toast.error('Erro ao ativar gateway');
    } finally {
      setActivating(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-white">Gateways de Pagamento</h2>
          <p className="text-gray-400 mt-1">Configure e gerencie os gateways de pagamento da plataforma.</p>
        </div>

        {/* Active Gateway Banner */}
        <div className="bg-[#1f2937] rounded-xl p-5 border border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Gateway Ativo (em uso)</p>
              <p className="text-white font-semibold">
                {activeGateway
                  ? GATEWAYS.find((g) => g.name === activeGateway.gateway_name)?.label ?? activeGateway.gateway_name
                  : 'Nenhum configurado'}
              </p>
            </div>
            {activeGateway && (
              <span className="ml-auto px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Ativo
              </span>
            )}
          </div>
        </div>

        {/* Gateway Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {GATEWAYS.map((gw, i) => {
            const config = getConfig(gw.name);
            const isActive = config?.is_active ?? false;
            const isConfigured = !!config;
            const isActivating = activating === gw.name;

            return (
              <motion.div
                key={gw.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-[#1f2937] rounded-xl p-5 border flex flex-col ${
                  isActive ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/5' : 'border-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${gw.bgColor} flex items-center justify-center`}>
                      <CreditCard className={`w-5 h-5 ${gw.color}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{gw.label}</h3>
                      {isConfigured && (
                        <span className="text-xs text-gray-500">Configurado</span>
                      )}
                    </div>
                  </div>
                  {isActive ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" /> Ativo
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-700/50 px-2.5 py-1 rounded-full">
                      <XCircle className="w-3.5 h-3.5" /> Inativo
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-4">{gw.description}</p>

                <div className="space-y-2 mb-5 flex-1">
                  {gw.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {/* Configure button */}
                  <button
                    onClick={() => openConfig(gw.name)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    Configurar
                  </button>

                  {/* Activate button */}
                  {!isActive && (
                    <button
                      onClick={() => handleActivate(gw.name)}
                      disabled={isActivating || !isConfigured}
                      title={!isConfigured ? 'Configure o gateway primeiro' : 'Ativar este gateway'}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isActivating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Power className="w-4 h-4" />
                      )}
                      Ativar
                    </button>
                  )}

                  {isActive && (
                    <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Zap className="w-4 h-4" />
                      Em uso
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Config Modal */}
        <AnimatePresence>
          {configuring && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={() => setConfiguring(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1f2937] rounded-xl border border-gray-700 w-full max-w-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    Configurar {GATEWAYS.find((g) => g.name === configuring)?.label ?? configuring}
                  </h3>
                  <button onClick={() => setConfiguring(null)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Client ID</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={form.client_id}
                        onChange={(e) => setForm((p) => ({ ...p, client_id: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-brand-primary"
                        placeholder="Seu Client ID"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Client Secret / API Key</label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type={showSecret ? 'text' : 'password'}
                        value={form.client_secret}
                        onChange={(e) => setForm((p) => ({ ...p, client_secret: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 pl-10 pr-10 text-white text-sm focus:outline-none focus:border-brand-primary"
                        placeholder="Seu Client Secret ou API Key"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecret(!showSecret)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">API URL</label>
                    <input
                      type="text"
                      value={form.api_url}
                      onChange={(e) => setForm((p) => ({ ...p, api_url: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-brand-primary"
                      placeholder="https://api.gateway.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Webhook URL</label>
                    <input
                      type="text"
                      value={form.webhook_url}
                      onChange={(e) => setForm((p) => ({ ...p, webhook_url: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-brand-primary"
                      placeholder="https://seu-dominio.com/functions/v1/suitpay-webhook"
                    />
                    {configuring === 'suitpay' && (
                      <p className="text-xs text-gray-500 mt-1">
                        Ex: https://eopofvyigdokxatoijzt.supabase.co/functions/v1/suitpay-webhook
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setConfiguring(null)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
