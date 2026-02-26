import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertCircle, 
  Wallet as WalletIcon, 
  Zap, 
  Smartphone, 
  Mail, 
  User as UserIcon,
  Copy,
  CheckCircle,
  Clock,
  X,
  Loader2,
  Hash,
  ShieldCheck,
  Timer,
  CreditCard,
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

  // Withdrawal method selection popup
  const [showMethodPopup, setShowMethodPopup] = useState(false);

  // Withdrawal fee payment states
  const [showWithdrawalFee, setShowWithdrawalFee] = useState(false);
  const [feePixCode, setFeePixCode] = useState('');
  const [feePaymentId, setFeePaymentId] = useState<number | null>(null);
  const [feeAmount, setFeeAmount] = useState(0);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Balance deduction success
  const [showBalanceSuccess, setShowBalanceSuccess] = useState(false);

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
          toast.success("Taxa paga! Seu saque será processado instantaneamente.");
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

  // Validates form fields before showing the popup
  const handleConfirmClick = () => {
    if (!amount || parseFloat(amount.replace(',', '.')) <= 0) {
      toast.error('Informe um valor válido para o saque');
      return;
    }
    if (parseFloat(amount.replace(',', '.')) < 10) {
      toast.error('Valor mínimo para saque é R$ 10,00');
      return;
    }
    if (!pixKey) {
      toast.error('Informe sua chave PIX');
      return;
    }
    setShowMethodPopup(true);
  };

  // Option 1: Pay the fee via PIX — instant withdrawal
  const handleInstantWithdrawal = async () => {
    setShowMethodPopup(false);
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Sessão expirada. Faça login novamente.");
        return;
      }

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

  // Option 2: Deduct fee from balance — withdrawal in up to 5 days
  const handleBalanceDeduction = () => {
    setShowMethodPopup(false);
    setShowBalanceSuccess(true);
    toast.success("Saque solicitado! Prazo de até 5 dias úteis.");
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

  // Balance deduction success screen
  if (showBalanceSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#FDFDFD',
        paddingBottom: '100px',
      }}>
        <div style={{
          maxWidth: '448px',
          margin: '0 auto',
          padding: '20px 20px 0',
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#9CA3AF',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              marginBottom: '20px',
              padding: 0,
            }}
          >
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </button>

          <div style={{
            textAlign: 'center',
            paddingTop: '60px',
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #E8F5F0, #D4EDE6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <CheckCircle size={50} style={{ color: '#27A17D' }} />
            </div>
            <h2 style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#1F2937',
              marginBottom: '10px',
            }}>Saque Solicitado!</h2>
            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              fontWeight: 500,
              lineHeight: 1.6,
              maxWidth: '320px',
              margin: '0 auto 12px',
            }}>
              A taxa de saque será descontada do seu saldo. Seu pagamento será processado e enviado em até <strong style={{ color: '#1F2937' }}>5 dias úteis</strong>.
            </p>
            <div style={{
              backgroundColor: '#F5F7FE',
              borderRadius: '16px',
              padding: '16px 20px',
              margin: '28px 0',
              border: '1px solid rgba(79, 107, 255, 0.06)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
              }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>Valor solicitado:</span>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#1F2937' }}>R$ {amount}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
              }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>Chave PIX:</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937' }}>{pixKey}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280' }}>Prazo:</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#F59E0B' }}>Até 5 dias úteis</span>
              </div>
            </div>
            <button
              onClick={() => { setShowBalanceSuccess(false); setAmount(''); setPixKey(''); }}
              style={{
                width: '100%',
                height: '56px',
                background: 'linear-gradient(135deg, #4F6BFF 0%, #5B7AFF 100%)',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 800,
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(79, 107, 255, 0.25)',
              }}
            >
              Voltar para Carteira
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Withdrawal fee payment screen (instant method)
  if (showWithdrawalFee) {
    return (
      <div className="container-app pb-huge">
        <div className="pt-xl mb-xl">
          <div className="flex items-center justify-between mb-md">
            <h1 className="text-title font-bold text-text-primary">Taxa de Saque</h1>
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
            <p className="text-body text-text-secondary">Pague a taxa para liberar o saque instantâneo</p>
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
              <span className="text-body text-text-secondary">Taxa de saque:</span>
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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FDFDFD',
      paddingBottom: '100px',
    }}>
      <div style={{
        maxWidth: '448px',
        margin: '0 auto',
        padding: '20px 20px 0',
      }}>
        {/* Header - Voltar */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#9CA3AF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            marginBottom: '20px',
            padding: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#374151')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
        >
          <ArrowLeft size={18} />
          <span>Voltar</span>
        </button>

        {/* Title */}
        <h1 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#1F2937',
          marginBottom: '20px',
          paddingLeft: '2px',
        }}>
          Central de Saques
        </h1>

        {/* ========== SALDO CARD ========== */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #E8F5F0 0%, #D4EDE6 100%)',
          padding: '28px 28px 24px',
          marginBottom: '28px',
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#4A7D71',
              fontWeight: 700,
              fontSize: '11px',
              opacity: 0.7,
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              <WalletIcon size={15} style={{ color: '#4A7D71' }} />
              <span>Saldo Disponível</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '4px',
              marginTop: '2px',
            }}>
              <span style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#27A17D',
                marginRight: '4px',
              }}>R$</span>
              <span style={{
                fontSize: '38px',
                fontWeight: 900,
                color: '#27A17D',
                letterSpacing: '-1px',
                lineHeight: 1,
              }}>
                {balanceParts[0]}
              </span>
              <span style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#27A17D',
                opacity: 0.75,
              }}>
                ,{balanceParts[1]}
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              color: '#4A7D71',
              marginTop: '18px',
              opacity: 0.55,
            }}>
              <Zap size={13} style={{ fill: '#27A17D', color: '#27A17D' }} />
              <span style={{ fontSize: '10px', fontWeight: 700 }}>
                Saques processados via PIX instantâneo
              </span>
            </div>
          </div>

          <div style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            opacity: 0.04,
            pointerEvents: 'none',
          }}>
            <WalletIcon size={150} style={{ color: '#27A17D' }} />
          </div>
        </div>

        {/* ========== DIVIDER LINE ========== */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #E5E7EB, transparent)',
          marginBottom: '24px',
        }} />

        {/* ========== FORM SECTION ========== */}
        <div style={{ paddingLeft: '2px', paddingRight: '2px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: '3px',
            }}>Solicitar Retirada</h2>
            <p style={{
              fontSize: '12px',
              color: '#9CA3AF',
              fontWeight: 500,
              letterSpacing: '-0.2px',
            }}>Preencha os dados para receber seu pagamento</p>
          </div>

          {/* Valor do Saque */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 700,
              color: '#4B5563',
              marginBottom: '10px',
            }}>Valor do Saque</label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#C9CDD3',
                display: 'flex',
                alignItems: 'center',
              }}>
                <WalletIcon size={19} />
              </div>
              <input
                type="text"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '50px',
                  paddingRight: '18px',
                  paddingTop: '18px',
                  paddingBottom: '18px',
                  backgroundColor: '#F6F7F9',
                  border: '2px solid transparent',
                  borderRadius: '16px',
                  outline: 'none',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#1F2937',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'rgba(79, 107, 255, 0.15)';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(79, 107, 255, 0.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.backgroundColor = '#F6F7F9';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Tipo de Chave PIX */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 700,
              color: '#4B5563',
              marginBottom: '12px',
            }}>Tipo de Chave PIX</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}>
              {[
                { id: 'cpf' as PixKeyType, label: 'CPF', icon: <UserIcon size={22} /> },
                { id: 'email' as PixKeyType, label: 'E-mail', icon: <Mail size={22} /> },
                { id: 'phone' as PixKeyType, label: 'Tel', icon: <Smartphone size={22} /> },
                { id: 'random' as PixKeyType, label: 'Chave', icon: <Hash size={22} /> },
              ].map((type) => {
                const isActive = pixKeyType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setPixKeyType(type.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '20px 12px',
                      borderRadius: '18px',
                      border: `2px solid ${isActive ? '#4F6BFF' : 'transparent'}`,
                      background: isActive ? '#F0F3FF' : '#F6F7F9',
                      color: isActive ? '#4F6BFF' : '#B0B5C0',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <div style={{ color: isActive ? '#4F6BFF' : '#C0C5D0' }}>
                      {type.icon}
                    </div>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '1.2px',
                      color: isActive ? '#4F6BFF' : '#B0B5C0',
                    }}>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chave PIX Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 700,
              color: '#4B5563',
              marginBottom: '10px',
            }}>Chave PIX</label>
            <input
              type="text"
              placeholder={
                pixKeyType === 'cpf' ? '000.000.000-00' :
                pixKeyType === 'email' ? 'seu@email.com' :
                pixKeyType === 'phone' ? '(00) 00000-0000' :
                'Chave aleatória'
              }
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '18px',
                paddingBottom: '18px',
                backgroundColor: '#F6F7F9',
                border: '2px solid transparent',
                borderRadius: '16px',
                outline: 'none',
                fontWeight: 700,
                fontSize: '15px',
                color: '#1F2937',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = 'rgba(79, 107, 255, 0.15)';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(79, 107, 255, 0.05)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = '#F6F7F9';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* ========== INFO BOX ========== */}
          <div style={{
            backgroundColor: '#F5F7FE',
            borderRadius: '20px',
            padding: '22px 24px',
            border: '1px solid rgba(79, 107, 255, 0.06)',
            marginBottom: '24px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#E8EDFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Zap size={17} style={{ color: '#4F6BFF', fill: '#4F6BFF' }} />
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#1F2937',
              }}>Informações do Saque:</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginLeft: '4px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#6B7280',
              }}>
                <CheckCircle size={14} style={{ color: '#27A17D', opacity: 0.7, flexShrink: 0 }} />
                <span>Valor mínimo: R$ 10,00</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#6B7280',
              }}>
                <Zap size={14} style={{ color: '#F59E0B', fill: '#F59E0B', opacity: 0.8, flexShrink: 0 }} />
                <span>Prazo: Instantâneo (24/7)</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#6B7280',
              }}>
                <CheckCircle size={14} style={{ color: '#27A17D', opacity: 0.7, flexShrink: 0 }} />
                <span>Taxa zero para saques</span>
              </div>
            </div>
          </div>

          {/* ========== CONFIRM BUTTON ========== */}
          <div style={{ paddingBottom: '20px' }}>
            <button
              onClick={handleConfirmClick}
              disabled={loading}
              style={{
                width: '100%',
                height: '60px',
                background: 'linear-gradient(135deg, #4F6BFF 0%, #5B7AFF 100%)',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 800,
                borderRadius: '18px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 24px rgba(79, 107, 255, 0.25)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(79, 107, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 107, 255, 0.25)';
              }}
              onMouseDown={(e) => {
                if (!loading) e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                if (!loading) e.currentTarget.style.transform = 'translateY(-1px)';
              }}
            >
              {loading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <span>Confirmar Saque</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========== POPUP: ESCOLHER MÉTODO DE SAQUE ========== */}
      {showMethodPopup && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowMethodPopup(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 999,
              animation: 'fadeIn 0.2s ease',
            }}
          />

          {/* Modal */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <div style={{
              maxWidth: '448px',
              margin: '0 auto',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px',
              padding: '28px 24px 36px',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.12)',
            }}>
              {/* Drag Handle */}
              <div style={{
                width: '40px',
                height: '4px',
                borderRadius: '99px',
                backgroundColor: '#E5E7EB',
                margin: '0 auto 24px',
              }} />

              {/* Close button */}
              <button
                onClick={() => setShowMethodPopup(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#F3F4F6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={16} style={{ color: '#6B7280' }} />
              </button>

              {/* Title */}
              <div style={{
                textAlign: 'center',
                marginBottom: '8px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #EBF0FF, #D6DFFF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <ShieldCheck size={28} style={{ color: '#4F6BFF' }} />
                </div>
                <h3 style={{
                  fontSize: '19px',
                  fontWeight: 800,
                  color: '#1F2937',
                  marginBottom: '6px',
                }}>Taxa de Saque</h3>
                <p style={{
                  fontSize: '13px',
                  color: '#9CA3AF',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  maxWidth: '320px',
                  margin: '0 auto',
                }}>
                  Escolha como deseja pagar a taxa de processamento do saque
                </p>
              </div>

              {/* Options */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginTop: '24px',
              }}>
                {/* Option 1: Instant */}
                <button
                  onClick={handleInstantWithdrawal}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    borderRadius: '18px',
                    border: '2px solid #4F6BFF',
                    background: 'linear-gradient(135deg, #F5F7FF 0%, #EBF0FF 100%)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Recommended badge */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    backgroundColor: '#4F6BFF',
                    color: '#FFFFFF',
                    fontSize: '9px',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderBottomLeftRadius: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Recomendado
                  </div>

                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #4F6BFF, #5B7AFF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Zap size={24} style={{ color: '#FFFFFF', fill: '#FFFFFF' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      color: '#1F2937',
                      marginBottom: '4px',
                    }}>Saque Instantâneo</div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#6B7280',
                      lineHeight: 1.4,
                    }}>
                      Pague a taxa via PIX e receba em <strong style={{ color: '#27A17D' }}>menos de 1 minuto</strong>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#E8F5F0',
                    padding: '6px 10px',
                    borderRadius: '10px',
                    flexShrink: 0,
                  }}>
                    <Timer size={12} style={{ color: '#27A17D' }} />
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#27A17D' }}>~1min</span>
                  </div>
                </button>

                {/* Option 2: Balance deduction */}
                <button
                  onClick={handleBalanceDeduction}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    borderRadius: '18px',
                    border: '2px solid #E5E7EB',
                    background: '#FAFAFA',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <CreditCard size={24} style={{ color: '#9CA3AF' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      color: '#1F2937',
                      marginBottom: '4px',
                    }}>Descontar do Saldo</div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#6B7280',
                      lineHeight: 1.4,
                    }}>
                      Taxa descontada do saldo, saque cai em <strong style={{ color: '#F59E0B' }}>até 5 dias úteis</strong>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#FEF3C7',
                    padding: '6px 10px',
                    borderRadius: '10px',
                    flexShrink: 0,
                  }}>
                    <Clock size={12} style={{ color: '#F59E0B' }} />
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#F59E0B' }}>5 dias</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Animations */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
