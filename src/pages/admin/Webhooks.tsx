import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Webhook,
  Copy,
  CheckCircle,
  XCircle,
  ExternalLink,
  Shield,
  Bot,
  CreditCard,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/layout/AdminLayout';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

interface WebhookEntry {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  color: string;
  bg: string;
}

export default function Webhooks() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const webhooks: WebhookEntry[] = [
    {
      id: 'bspay',
      name: 'BSPay Webhook',
      description: 'Recebe notificações de pagamento PIX do gateway BSPay. Configure esta URL no painel da BSPay.',
      url: `${SUPABASE_URL || 'https://seu-projeto.supabase.co'}/functions/v1/bspay-webhook`,
      icon: CreditCard,
      active: true,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      id: 'telegram-funnel',
      name: 'Telegram Bot - Funil',
      description: 'Webhook para o bot de funil do Telegram. Configure no BotFather com /setwebhook.',
      url: `${SUPABASE_URL || 'https://seu-projeto.supabase.co'}/functions/v1/telegram-funnel-bot`,
      icon: Bot,
      active: true,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      id: 'telegram-card',
      name: 'Telegram Bot - Cartão',
      description: 'Webhook para o bot de cartão do Telegram. Configure no BotFather com /setwebhook.',
      url: `${SUPABASE_URL || 'https://seu-projeto.supabase.co'}/functions/v1/telegram-card-bot`,
      icon: Bot,
      active: false,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      id: 'utmify',
      name: 'Utmify Postback',
      description: 'URL de postback para receber dados de conversão do Utmify.',
      url: `${SUPABASE_URL || 'https://seu-projeto.supabase.co'}/functions/v1/utmify-postback`,
      icon: Shield,
      active: false,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  const handleCopy = async (id: string, url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL copiada!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Webhook className="w-7 h-7 text-brand-primary" />
            Webhooks
          </h2>
          <p className="text-gray-400 mt-1">URLs de webhook que precisam ser configuradas nos serviços externos.</p>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-400">
            Configure estas URLs nos respectivos serviços para que a plataforma receba notificações
            em tempo real. Copie a URL e cole no painel de configuração de cada serviço.
          </p>
        </div>

        {/* Webhook Cards */}
        <div className="space-y-4">
          {webhooks.map((wh, i) => (
            <motion.div
              key={wh.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1f2937] rounded-xl p-5 border border-gray-700/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-lg ${wh.bg} flex items-center justify-center shrink-0`}>
                    <wh.icon className={`w-5 h-5 ${wh.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-semibold">{wh.name}</h3>
                      {wh.active ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-700/50 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" />
                          Inativo
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{wh.description}</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-gray-800 rounded-lg py-2 px-3 text-sm text-gray-300 font-mono truncate border border-gray-700">
                        {wh.url}
                      </code>
                      <button
                        onClick={() => handleCopy(wh.id, wh.url)}
                        className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                      >
                        {copiedId === wh.id ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copiedId === wh.id ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* External Links */}
        <div className="bg-[#1f2937] rounded-xl p-5 border border-gray-700/50">
          <h3 className="text-white font-semibold mb-4">Links Úteis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="https://t.me/BotFather"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              <Bot className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white text-sm font-medium">BotFather</p>
                <p className="text-gray-500 text-xs">Configure webhooks do Telegram</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 ml-auto" />
            </a>
            <a
              href="https://docs.bspay.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-white text-sm font-medium">BSPay Docs</p>
                <p className="text-gray-500 text-xs">Documentação da API BSPay</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 ml-auto" />
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
