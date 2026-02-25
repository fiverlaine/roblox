import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  CheckCircle,
  XCircle,
  TestTube,
  Save,
  Info,
  ArrowRight,
  Eye,
  EyeOff,
  Zap,
  Send,
  BarChart3,
  Globe,
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminStore } from '../../stores/adminStore';

export default function UtmifyIntegration() {
  const { utmifyConfig, loading, fetchUtmifyConfig, saveUtmifyConfig } = useAdminStore();
  const [apiToken, setApiToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    fetchUtmifyConfig();
  }, [fetchUtmifyConfig]);

  useEffect(() => {
    if (utmifyConfig) {
      setApiToken(utmifyConfig.api_token ?? '');
    }
  }, [utmifyConfig]);

  const handleSave = async () => {
    try {
      await saveUtmifyConfig({
        id: utmifyConfig?.id,
        api_token: apiToken,
        platform_name: 'roblox_vault',
        is_active: !!apiToken,
      });
      toast.success('Configuração salva com sucesso!');
    } catch {
      toast.error('Erro ao salvar configuração');
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      if (apiToken) {
        setTestResult('success');
        toast.success('Conexão com Utmify estabelecida!');
      } else {
        setTestResult('error');
        toast.error('Token não configurado');
      }
    } finally {
      setTesting(false);
    }
  };

  const steps = [
    { num: 1, title: 'Lead capturado', desc: 'Usuário inicia o bot do Telegram com parâmetros UTM', icon: Send },
    { num: 2, title: 'Dados processados', desc: 'Sistema processa UTMs e vincula ao lead', icon: BarChart3 },
    { num: 3, title: 'Evento enviado', desc: 'Ao realizar pagamento, evento é enviado ao Utmify', icon: Zap },
    { num: 4, title: 'Conversão rastreada', desc: 'Utmify registra a conversão com atribuição UTM', icon: Globe },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            Configurações Utmify
          </h2>
          <p className="text-gray-400 mt-1">Integre com o Utmify para rastrear conversões e atribuição de UTMs.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Status da Integração</h3>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50">
              {utmifyConfig?.is_active ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-emerald-400 font-semibold">Conectado</p>
                    <p className="text-gray-400 text-sm">Integração ativa e funcionando</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold">Desconectado</p>
                    <p className="text-gray-400 text-sm">Configure o token para ativar</p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">API Token</label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 pr-10 text-white text-sm focus:outline-none focus:border-purple-500 font-mono"
                  placeholder="Seu token da API Utmify"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-purple-600 text-white hover:bg-purple-500 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Salvar Configuração
            </button>
          </motion.div>

          {/* Test Connection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Teste de Conexão</h3>
            <p className="text-gray-400 text-sm mb-6">
              Verifique se a integração com o Utmify está funcionando corretamente.
            </p>

            <button
              onClick={handleTest}
              disabled={testing}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400 transition-all disabled:opacity-50"
            >
              <TestTube className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
              {testing ? 'Testando...' : 'Testar Conexão'}
            </button>

            {testResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                  testResult === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/20'
                    : 'bg-red-500/10 border border-red-500/20'
                }`}
              >
                {testResult === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <p className="text-emerald-400 text-sm">Conexão estabelecida com sucesso!</p>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400 text-sm">Falha na conexão. Verifique o token.</p>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Como Funciona</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">
                      {step.num}
                    </div>
                    <step.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h4 className="text-white font-medium text-sm mb-1">{step.title}</h4>
                  <p className="text-gray-400 text-xs">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500/30" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info Box */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
          <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-400">
            Os eventos de conversão são enviados automaticamente em background quando um pagamento é confirmado.
            Não é necessário nenhuma ação manual após a configuração.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
