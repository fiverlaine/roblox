import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, TrendingUp, DollarSign, Zap, Shield, Copy, CheckCircle, Clock, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../stores/authStore";
import { supabase } from "../lib/supabase";

export default function SellerPass() {
  const navigate = useNavigate();
  const { profile, loadProfile } = useAuthStore();
  const [showPix, setShowPix] = useState(false);
  const [pixCode, setPixCode] = useState("");
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // If user already has seller pass, redirect
  useEffect(() => {
    if (profile?.has_seller_pass) {
      navigate("/carteira");
    }
  }, [profile, navigate]);

  // Poll for payment status
  useEffect(() => {
    if (paymentId && showPix) {
      pollRef.current = setInterval(async () => {
        setCheckingStatus(true);
        const { data, error } = await supabase
          .from("payments")
          .select("status")
          .eq("id", paymentId)
          .single();

        if (!error && data?.status === "paid") {
          clearInterval(pollRef.current!);
          toast.success("Pagamento confirmado! Licença ativada.");
          await loadProfile();
          navigate("/carteira");
        }
        setCheckingStatus(false);
      }, 5000);
    }

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [paymentId, showPix, loadProfile, navigate]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    toast.success("Código PIX copiado!");
  };

  const handleAcquire = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Sessão expirada. Faça login novamente.");
        return;
      }

      const { data: result, error: apiError } = await supabase.functions.invoke(
        'create-payment',
        {
          body: {
            user_id: session.user.id,
            type: "license",
            amount: 34.90,
          },
        }
      );

      if (apiError) {
        toast.error(apiError.message || "Erro ao gerar pagamento");
        return;
      }

      if (result && result.error) {
        toast.error(result.error);
        return;
      }

      setPixCode(result.payment.pix_qrcode || "");
      setPaymentId(result.payment.id);
      setShowPix(true);
      toast.success("PIX gerado com sucesso!", {
        style: {
          borderRadius: "16px",
          padding: "16px",
          fontFamily: "Poppins",
          fontSize: "15px",
          boxShadow: "0 6px 18px 0 rgba(0,0,0,0.08)",
        },
      });
    } catch (error) {
      toast.error("Erro ao gerar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (showPix) {
    return (
      <div className="container-app pb-huge">
        <div className="pt-xl mb-xl">
          <div className="flex items-center justify-between mb-md">
            <h1 className="text-title font-bold text-text-primary">Aguardando Pagamento</h1>
            <button
              onClick={() => { setShowPix(false); if (pollRef.current) clearInterval(pollRef.current); }}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-lg"
        >
          <div className="card text-center">
            <h3 className="text-subtitle font-semibold text-text-primary mb-md">Escaneie o QR Code</h3>
            <div className="bg-background-secondary p-4 rounded-xl inline-block mb-4">
              <div className="bg-white p-2 rounded-lg">
                {pixCode ? (
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCode)}`}
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
            <p className="text-body text-text-secondary">Abra o app do seu banco e escaneie</p>
          </div>

          {pixCode && (
            <div className="card">
              <h3 className="text-subtitle font-semibold text-text-primary mb-md">Ou copie o código PIX</h3>
              <div className="bg-background-secondary rounded-lg p-md mb-md">
                <p className="text-caption text-text-secondary break-all font-mono leading-relaxed">
                  {pixCode}
                </p>
              </div>
              <div className="flex gap-md">
                <button 
                  onClick={handleCopyPix}
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
              <span className="text-body text-text-secondary">Valor a pagar:</span>
              <span className="text-title font-bold text-brand-primary">R$ 34,90</span>
            </div>
          </div>

          <div className="card">
            <h4 className="text-body font-semibold text-text-primary mb-sm">Como pagar:</h4>
            <ol className="space-y-xs text-caption text-text-secondary">
              <li>1. Abra o app do seu banco</li>
              <li>2. Escolha pagar com PIX</li>
              <li>3. Escaneie o QR Code ou cole o código</li>
              <li>4. Confirme o pagamento</li>
              <li>5. Aguarde a confirmação (geralmente instantâneo)</li>
            </ol>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 pt-8 max-w-2xl">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 font-medium"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>

          <div className="text-center relative" style={{ opacity: 1, transform: "none" }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/20 blur-3xl rounded-full -z-10" />
            <div className="mb-8 relative inline-block">
              <img
                src="/assets/icone_seller_pass-C63vdARS.png"
                alt="Roblox Seller Pass"
                className="w-48 h-48 object-contain drop-shadow-2xl"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">
              Roblox Seller Pass
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              Sua licença oficial para converter itens em dinheiro real e lucrar com sua conta.
            </p>
          </div>
        </div>

        <div className="mb-10" style={{ opacity: 1, transform: "none" }}>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-500" />
            <div className="relative z-10">
              <p className="text-gray-400 font-medium mb-2 uppercase tracking-wider text-sm">
                Investimento Único
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-lg text-gray-400">R$</span>
                <span className="text-5xl font-black text-white tracking-tight">34</span>
                <span className="text-2xl font-bold text-gray-400">,90</span>
              </div>
              <p className="text-sm text-gray-400 bg-white/10 inline-block px-3 py-1 rounded-full border border-white/10">
                Acesso Vitalício + Atualizações
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10" style={{ opacity: 1, transform: "none" }}>
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleAcquire}
              disabled={loading}
              className="btn btn-primary h-[52px] px-xl w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white border-0 shadow-lg shadow-orange-500/25 py-4 text-lg font-bold rounded-xl transform transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gerando PIX...
                </>
              ) : (
                "ADQUIRIR SELLER PASS"
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              Pagamento seguro processado via PIX
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-10" style={{ opacity: 1, transform: "none" }}>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star size={20} className="text-yellow-500 fill-yellow-500" />
            Benefícios Exclusivos
          </h2>
          
          <div className="grid gap-4">
            {[
              { 
                icon: <TrendingUp size={24} />, 
                title: "Vendas Ilimitadas", 
                desc: "Não há limites para o quanto você pode vender. Lucre com todos os seus itens raros." 
              },
              { 
                icon: <DollarSign size={24} />, 
                title: "Conversão Automática", 
                desc: "Transforme Robux em BRL instantaneamente com nossa cotação atualizada." 
              },
              { 
                icon: <Zap size={24} />, 
                title: "Saques via PIX", 
                desc: "Receba seu dinheiro em segundos na sua conta bancária. Rápido e seguro." 
              },
              { 
                icon: <Shield size={24} />, 
                title: "Garantia de Segurança", 
                desc: "Transações 100% seguras e monitoradas para sua tranquilidade." 
              }
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-600 shadow-sm">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-1">{benefit.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
