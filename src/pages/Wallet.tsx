import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertCircle, 
  Wallet as WalletIcon, 
  Zap, 
  Smartphone, 
  Mail, 
  Key, 
  User as UserIcon,
  DollarSign,
  Copy,
  CheckCircle,
  Clock,
  X,
  Loader2,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

type PixKeyType = 'cpf' | 'email' | 'phone' | 'random';

export default function Wallet() {
  const navigate = useNavigate();
  const { profile, loadProfile } = useAuthStore();
  const [amount, setAmount] = useState('');
  const [pixKeyType, setPixKeyType] = useState<PixKeyType>('cpf');
  const [pixKey, setPixKey] = useState('');
  const [loading, setLoading] = useState(false);

  // Withdrawal fee payment states
  const [showWithdrawalFee, setShowWithdrawalFee] = useState(false);
  const [feePixCode, setFeePixCode] = useState('');
  const [feePaymentId, setFeePaymentId] = useState<number | null>(null);
  const [feeAmount, setFeeAmount] = useState(0);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasLicense = profile?.has_seller_pass ?? false;
  const balance = profile?.real_balance ?? 0;

  const balanceParts = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance).split(',');

  // Poll for fee payment status
  useEffect(() => {
    if (feePaymentId && showWithdrawalFee) {
      pollRef.current = setInterval(async () => {
        setCheckingStatus(true);
        const { data, error } = await supabase
          .from("payments")
          .select("status")
          .eq("id", feePaymentId)
          .single();

        if (!error && data?.status === "paid") {
          clearInterval(pollRef.current!);
          toast.success("Taxa paga! Seus itens serão processados para venda.");
          await loadProfile();
          setShowWithdrawalFee(false);
        }
        setCheckingStatus(false);
      }, 5000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [feePaymentId, showWithdrawalFee, loadProfile]);

  const handleRequestWithdrawal = async () => {
    if (!amount || parseFloat(amount.replace(',', '.')) <= 0) {
      toast.error('Informe um valor válido para o saque');
      return;
    }
    if (!pixKey) {
      toast.error('Informe sua chave PIX');
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Sessão expirada. Faça login novamente.");
        return;
      }

      // Generate random cents for the withdrawal fee between 01 and 15
      const randomCents = Math.floor(Math.random() * 15) + 1;
      const withdrawalFee = 1 + randomCents / 100;
      setFeeAmount(withdrawalFee);

      const { data: result, error: apiError } = await supabase.functions.invoke(
        'create-payment',
        {
          body: {
            user_id: session.user.id,
            type: "withdrawal_fee",
            amount: withdrawalFee,
          },
        }
      );

      if (apiError) {
        toast.error(apiError.message || "Erro ao gerar pagamento da taxa");
        return;
      }

      if (result && result.error) {
        toast.error(result.error);
        return;
      }

      setFeePixCode(result.payment.pix_qrcode || '');
      setFeePaymentId(result.payment.id);
      setShowWithdrawalFee(true);
      toast.success("PIX da taxa gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao processar saque. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!hasLicense) {
    return (
      <div className="container-app pb-huge">
        <div className="pt-xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-sm text-text-secondary mb-lg hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          
          <div className="card text-center py-xl border-orange-100 bg-orange-50/30">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-md animate-pulse">
              <AlertCircle size={48} className="text-orange-500" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-xs">Licença Necessária</h2>
            <p className="text-body text-gray-500 mb-lg max-w-sm mx-auto px-4 leading-relaxed">
              Para realizar saques, você precisa ter uma licença de vendedor ativa na plataforma.
            </p>
            <button
              onClick={() => navigate('/licenca')}
              className="btn btn-primary h-[52px] px-xl mx-auto shadow-lg shadow-brand-primary/20"
            >
              Adquirir Licença
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Withdrawal fee payment modal
  if (showWithdrawalFee) {
    return (
      <div className="container-app pb-huge">
        <div className="pt-xl mb-xl">
          <div className="flex items-center justify-between mb-md">
            <h1 className="text-title font-bold text-text-primary">Taxa de Venda</h1>
            <button
              onClick={() => { setShowWithdrawalFee(false); if (pollRef.current) clearInterval(pollRef.current); }}
              className="p-sm rounded-lg hover:bg-background-secondary transition-colors"
            >
              <X size={24} className="text-text-primary" />
            </button>
          </div>
          <div className="flex items-center gap-sm text-text-secondary">
            <Clock size={16} />
            <span className="text-caption">Expira em 30 min</span>
            {checkingStatus && (
              <span className="text-caption text-brand-primary flex items-center gap-1">
                <Loader2 size={12} className="animate-spin" />
                Verificando...
              </span>
            )}
          </div>
        </div>

        <div className="space-y-lg">
          <div className="card text-center">
            <h3 className="text-subtitle font-semibold text-text-primary mb-md">Escaneie o QR Code</h3>
            <div className="bg-background-secondary p-4 rounded-xl inline-block mb-4">
              <div className="bg-white p-2 rounded-lg">
                {feePixCode ? (
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(feePixCode)}`}
                    alt="PIX QR Code"
                    className="w-[200px] h-[200px] mx-auto"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                    <Loader2 size={40} className="animate-spin text-gray-300" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-body text-text-secondary">Pague a taxa para liberar a venda dos seus itens</p>
          </div>

          {feePixCode && (
            <div className="card">
              <h3 className="text-subtitle font-semibold text-text-primary mb-md">Copie o código PIX</h3>
              <div className="bg-background-secondary rounded-lg p-md mb-md">
                <p className="text-caption text-text-secondary break-all font-mono leading-relaxed">
                  {feePixCode}
                </p>
              </div>
              <div className="flex gap-md">
                <button 
                  onClick={() => { navigator.clipboard.writeText(feePixCode); toast.success("Código PIX copiado!"); }}
                  className="btn btn-secondary h-[52px] flex-1 flex items-center justify-center gap-2"
                >
                  <Copy size={20} />
                  <span>Copiar Código</span>
                </button>
                <button 
                  onClick={() => toast.success("Aguardando confirmação do banco...")}
                  className="btn btn-secondary h-[52px] flex-1 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  <span>Já Paguei</span>
                </button>
              </div>
            </div>
          )}

          <div className="card bg-background-secondary">
            <div className="flex justify-between items-center">
              <span className="text-body text-text-secondary">Taxa de venda:</span>
              <span className="text-title font-bold text-brand-primary">
                R$ {feeAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 pt-8 max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-8 font-medium group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar</span>
        </button>

        <h1 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Central de Saques</h1>

        {/* Saldo Disponível Card */}
        <div className="relative overflow-hidden rounded-[32px] bg-[#E8F5F1] p-8 mb-10 group selection:bg-emerald-100">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-emerald-800/60 mb-3 font-semibold text-sm">
              <WalletIcon size={18} />
              <span>Saldo Disponível</span>
            </div>
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="text-2xl font-bold text-emerald-500">R$</span>
              <span className="text-5xl font-black text-emerald-500 tracking-tighter">
                {balanceParts[0]}
              </span>
              <span className="text-3xl font-bold text-emerald-500/70">
                ,{balanceParts[1]}
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-800/50">
              <Zap size={16} className="fill-emerald-800/10 text-emerald-500" />
              <span className="text-xs font-bold">Saques processados via PIX instantâneo</span>
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <WalletIcon size={200} />
          </div>
        </div>

        {/* Form Solicitar Retirada */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-1">Solicitar Retirada</h2>
            <p className="text-sm text-gray-500 font-medium">Preencha os dados para receber seu pagamento</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2.5">
              <label className="block text-sm font-bold text-gray-700 px-1">Valor do Saque</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <WalletIcon size={20} />
                </div>
                <input
                  type="text"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-14 pr-5 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none font-bold text-gray-800"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700 px-1">Tipo de Chave PIX</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'cpf', label: 'CPF', icon: <UserIcon size={20} /> },
                  { id: 'email', label: 'E-mail', icon: <Mail size={20} /> },
                  { id: 'phone', label: 'Tel', icon: <Smartphone size={20} /> },
                  { id: 'random', label: 'Chave', icon: <Key size={20} /> }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPixKeyType(type.id as PixKeyType)}
                    className={`flex flex-col items-center justify-center gap-2.5 p-5 rounded-2xl border-2 transition-all duration-200 ${
                      pixKeyType === type.id
                        ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-md transform scale-[1.02]'
                        : 'bg-white border-gray-50 text-gray-400 hover:border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`${pixKeyType === type.id ? 'text-blue-600' : 'text-gray-300'}`}>
                      {type.icon}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">{type.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <input
                  type="text"
                  placeholder={`Informe seu ${pixKeyType === 'random' ? 'Chave Aleatória' : pixKeyType.toUpperCase()}`}
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  className="w-full px-6 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none font-bold text-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 pb-10">
            <button
              onClick={handleRequestWithdrawal}
              disabled={loading}
              className="w-full h-[64px] bg-gray-900 hover:bg-black text-white text-lg font-black rounded-2xl shadow-xl shadow-gray-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <DollarSign size={22} className="text-emerald-400" />
                  <span>Solicitar Saque</span>
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-5 font-bold uppercase tracking-widest bg-gray-50 py-2 rounded-full inline-block px-6 mx-auto w-full">
              O processamento pode levar até 2 horas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
