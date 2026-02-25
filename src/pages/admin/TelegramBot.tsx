import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Play,
  RotateCcw,
  Save,
  MessageSquare,
  DollarSign,
  Settings,
  Link,
  Users,
  BarChart3,
  Eye,
  EyeOff,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminStore } from '../../stores/adminStore';
import type { BotConfig } from '../../lib/types';

type Tab = 'overview' | 'config' | 'users';

export default function TelegramBot() {
  const { botConfigs, loading, fetchBotConfigs, saveBotConfig } = useAdminStore();
  const [activeTab, setActiveTab] = useState<Tab>('config');
  const [showToken, setShowToken] = useState(false);
  const [form, setForm] = useState<Partial<BotConfig>>({
    bot_type: 'funnel',
    token: '',
    welcome_message: 'Bem-vindo ao Roblox Vault! 🎮\n\nAqui você pode comprar Robux com segurança e praticidade.',
    price_per_card: 34.90,
    free_purchases: 0,
    card_limit: 5,
    pix_expiration_min: 30,
    group_link: '',
    channel_link: '',
  });

  useEffect(() => {
    fetchBotConfigs();
  }, [fetchBotConfigs]);

  useEffect(() => {
    if (botConfigs.length > 0) {
      const config = botConfigs[0];
      setForm({
        id: config.id,
        bot_type: config.bot_type,
        token: config.token ?? '',
        welcome_message: config.welcome_message,
        price_per_card: config.price_per_card,
        free_purchases: config.free_purchases,
        card_limit: config.card_limit,
        pix_expiration_min: config.pix_expiration_min,
        group_link: config.group_link ?? '',
        channel_link: config.channel_link ?? '',
      });
    }
  }, [botConfigs]);

  const handleSave = async () => {
    try {
      await saveBotConfig(form as Partial<BotConfig> & { id?: number });
      toast.success('Configurações salvas com sucesso!');
    } catch {
      toast.error('Erro ao salvar configurações');
    }
  };

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: BarChart3 },
    { id: 'config' as Tab, label: 'Configurações', icon: Settings },
    { id: 'users' as Tab, label: 'Usuários', icon: Users },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600/20 to-cyan-600/10 rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Bot do Telegram</h2>
                <p className="text-blue-300/70 text-sm">Gerenciamento e Analytics Completas</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">
                <Play className="w-4 h-4" />
                Iniciar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-amber-600 text-white hover:bg-amber-500 transition-colors">
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1f2937] rounded-xl p-1 border border-gray-700/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Visão Geral do Bot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-emerald-400 font-semibold mt-1">
                  {botConfigs[0]?.is_active ? 'Ativo' : 'Inativo'}
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Tipo</p>
                <p className="text-white font-semibold mt-1">
                  {form.bot_type === 'funnel' ? 'Funil de Vendas' : 'Cartão'}
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Preço por Compra</p>
                <p className="text-white font-semibold mt-1">R$ {form.price_per_card?.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'config' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Token */}
            <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5 text-brand-primary" />
                <h3 className="text-lg font-semibold text-white">Token do Bot</h3>
              </div>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={form.token ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, token: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 pr-10 text-white text-sm focus:outline-none focus:border-brand-primary font-mono"
                  placeholder="Cole o token do BotFather aqui"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="mt-3 flex items-start gap-2 text-xs text-gray-500">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  Para obter o token, abra o Telegram, busque por @BotFather, envie /newbot e siga as instruções.
                  O token terá o formato: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz
                </p>
              </div>
            </div>

            {/* Preços */}
            <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Preços</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Preço por Compra (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price_per_card ?? 0}
                  onChange={(e) => setForm((p) => ({ ...p, price_per_card: parseFloat(e.target.value) || 0 }))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Configurações Gerais */}
            <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Configurações Gerais</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Compras Gratuitas
                  </label>
                  <input
                    type="number"
                    value={form.free_purchases ?? 0}
                    onChange={(e) => setForm((p) => ({ ...p, free_purchases: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Limite do Cartão
                  </label>
                  <input
                    type="number"
                    value={form.card_limit ?? 0}
                    onChange={(e) => setForm((p) => ({ ...p, card_limit: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Expiração PIX (min)
                  </label>
                  <input
                    type="number"
                    value={form.pix_expiration_min ?? 30}
                    onChange={(e) => setForm((p) => ({ ...p, pix_expiration_min: parseInt(e.target.value) || 30 }))}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Mensagens</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Mensagem de Boas-vindas
                </label>
                <textarea
                  value={form.welcome_message ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, welcome_message: e.target.value }))}
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-brand-primary resize-none"
                  placeholder="Digite a mensagem de boas-vindas..."
                />
              </div>
            </div>

            {/* Links */}
            <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <Link className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Links</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Grupo de Suporte
                  </label>
                  <input
                    type="text"
                    value={form.group_link ?? ''}
                    onChange={(e) => setForm((p) => ({ ...p, group_link: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-brand-primary"
                    placeholder="https://t.me/seu_grupo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Canal de Avisos
                  </label>
                  <input
                    type="text"
                    value={form.channel_link ?? ''}
                    onChange={(e) => setForm((p) => ({ ...p, channel_link: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-brand-primary"
                    placeholder="https://t.me/seu_canal"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Usuários do Bot</h3>
            <p className="text-gray-400 text-sm">
              Visualize os leads e usuários do bot na aba de Analytics do Telegram para dados detalhados.
            </p>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}
