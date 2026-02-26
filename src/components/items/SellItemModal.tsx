import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import type { UserItem } from '../../lib/types';
import { useAuthStore } from '../../stores/authStore';
import { useItemStore } from '../../stores/itemStore';

interface SellItemModalProps {
  userItem: UserItem | null;
  onClose: () => void;
}

export default function SellItemModal({ userItem, onClose }: SellItemModalProps) {
  const { profile, updateProfile } = useAuthStore();
  const { sellItem } = useItemStore();

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [cpf, setCpf] = useState(profile?.cpf || '');

  const values = useMemo(() => {
    if (!userItem?.item) return { gross: 0, fee: 0, net: 0 };
    const robux = userItem.item.price_robux;
    
    // Adjusted rates to match the mobile photo reference:
    // Net: R$ 1.100,90 for 23.914 Robux -> ~0.046037 per Robux
    // Gross: R$ 1.282,44 for 23.914 Robux -> ~0.053627 per Robux
    // Fee: ~14.155% of Gross
    
    const net = robux * 0.046037;
    const gross = robux * 0.053627;
    const fee = gross - net;
    
    return { gross, fee, net };
  }, [userItem]);

  if (!userItem || !userItem.item) return null;

  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(val);

  const handleConfirmSell = async () => {
    if (!fullName.trim() || !cpf.trim()) {
      toast.error('Por favor, preencha todos os campos para a declaração fiscal.');
      return;
    }
    setStep('processing');
    try {
      await updateProfile({ full_name: fullName, cpf });
      await new Promise(r => setTimeout(r, 3000));
      await sellItem(userItem.id);
      setStep('success');
    } catch (err: unknown) {
      setStep('form');
      toast.error(err instanceof Error ? err.message : 'Erro ao vender item');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
        onClick={step === 'processing' ? undefined : onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          onClick={e => e.stopPropagation()}
          className="w-full sm:max-w-[430px] bg-white sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl"
          style={{ maxHeight: '95vh', overflowY: 'auto' }}
        >
          <AnimatePresence mode="wait">

            {/* ====== STEP: FORM ====== */}
            {step === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ padding: '24px 24px 32px' }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div>
                    <h2 style={{ fontSize: 24, fontWeight: 750, color: '#1a1d23', margin: 0, lineHeight: 1.2 }}>
                      Vender Item
                    </h2>
                    <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4, fontWeight: 500, marginBottom: 0 }}>
                      Confirme seus dados para declaração fiscal
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#cbd5e1',
                      padding: 4,
                      marginTop: -2,
                    }}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Price card */}
                <div style={{
                  backgroundColor: '#f1f4f9',
                  borderRadius: 20,
                  padding: '24px',
                  marginTop: 24,
                  marginBottom: 20,
                }}>
                  {/* Row 1: Valor do item */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Valor do item</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#1a1d23' }}>{formatBRL(values.gross)}</span>
                  </div>

                  {/* Row 2: Taxa */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <AlertCircle size={14} style={{ color: '#9b2c2c', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#9b2c2c' }}>Taxa de venda da plataforma</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#95233f' }}>- {formatBRL(values.fee)}</span>
                  </div>

                  {/* Row 3: Valor líquido */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#1a1d23' }}>Valor líquido</span>
                    <span style={{ fontSize: 28, fontWeight: 900, color: '#127d56', letterSpacing: -0.5 }}>
                      {formatBRL(values.net)}
                    </span>
                  </div>
                </div>

                {/* Alert: taxa */}
                <div style={{
                  backgroundColor: '#fef3f2',
                  border: '1px solid #fee2e2',
                  borderRadius: 16,
                  padding: '16px',
                  display: 'flex',
                  gap: 12,
                  marginBottom: 24,
                }}>
                  <AlertCircle size={20} style={{ color: '#b91c1c', flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 800, color: '#991b1b', margin: 0, marginBottom: 4 }}>
                      Taxa de venda da plataforma
                    </p>
                    <p style={{ fontSize: 12, color: '#b91c1c', fontWeight: 500, margin: 0, lineHeight: 1.5, opacity: 0.8 }}>
                      A taxa de <strong>{formatBRL(values.fee)}</strong> será descontada automaticamente do valor da venda. Você receberá o valor líquido na sua carteira.
                    </p>
                  </div>
                </div>

                {/* Nome Completo */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 750, color: '#1a1d23', marginBottom: 10 }}>
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Nome do titular da conta"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      height: 56,
                      borderRadius: 16,
                      border: '1.5px solid #f1f5f9',
                      backgroundColor: '#f8fafc',
                      padding: '0 20px',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#1a1d23',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* CPF */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 750, color: '#1a1d23', marginBottom: 10 }}>
                    CPF <span style={{ fontWeight: 500, color: '#94a3b8' }}>(Apenas para nota fiscal)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    style={{
                      width: '100%',
                      height: 56,
                      borderRadius: 16,
                      border: '1.5px solid #f1f5f9',
                      backgroundColor: '#f8fafc',
                      padding: '0 20px',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#1a1d23',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Info box */}
                <div style={{
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fef3c7',
                  borderRadius: 16,
                  padding: '16px',
                  display: 'flex',
                  gap: 12,
                  marginBottom: 32,
                }}>
                  <AlertCircle size={18} style={{ color: '#d97706', flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12, color: '#92400e', fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
                    Estes dados são necessários apenas para emissão de nota fiscal da transação. O valor será creditado no seu saldo da plataforma para saque posterior.
                  </p>
                </div>

                {/* Confirmar Venda button */}
                <button
                  onClick={handleConfirmSell}
                  style={{
                    width: '100%',
                    height: 60,
                    borderRadius: 24,
                    backgroundColor: '#39d353',
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 16px rgba(57,211,83,0.25)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  Confirmar Venda
                </button>
              </motion.div>
            )}

            {/* ====== STEP: PROCESSING ====== */}
            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: '60px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {/* Spinner */}
                <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 28 }}>
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    border: '5px solid #E8EDFF',
                    borderTopColor: '#4F6BFF',
                    animation: 'spin 0.8s linear infinite',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }} />
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    border: '4px solid #C7D2FE',
                    borderTopColor: '#4F6BFF',
                    animation: 'spin 1.2s linear infinite reverse',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }} />
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1d23', margin: 0, marginBottom: 8 }}>
                  Processando Venda...
                </h2>
                <p style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500, margin: 0, maxWidth: 240, lineHeight: 1.5 }}>
                  Aguarde, estamos comprando este item de você.
                </p>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </motion.div>
            )}

            {/* ====== STEP: SUCCESS ====== */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '48px 24px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {/* Green check circle */}
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  boxShadow: '0 0 0 16px rgba(34,197,94,0.12)',
                }}>
                  <CheckCircle size={40} color="#fff" />
                </div>

                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1a1d23', margin: 0, marginBottom: 8 }}>
                  Venda Concluída!
                </h2>
                <p style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600, marginBottom: 32 }}>O valor já está na sua conta.</p>

                {/* Summary */}
                <div style={{
                  width: '100%',
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid #f1f5f9',
                  borderRadius: 24,
                  padding: '24px',
                  marginBottom: 32,
                }}>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#94a3b8', textTransform: 'uppercase', margin: 0, marginBottom: 6 }}>VALOR DO ITEM</p>
                    <p style={{ fontSize: 22, fontWeight: 900, color: '#1a1d23', margin: 0 }}>{formatBRL(values.gross)}</p>
                  </div>
                  <div style={{ height: 1, backgroundColor: '#f1f5f9', marginBottom: 16 }} />
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#94a3b8', textTransform: 'uppercase', margin: 0, marginBottom: 6 }}>TAXA DE VENDA</p>
                    <p style={{ fontSize: 18, fontWeight: 900, color: '#95233f', margin: 0 }}>- {formatBRL(values.fee)}</p>
                  </div>
                  <div style={{ height: 1, backgroundColor: '#f1f5f9', marginBottom: 16 }} />
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#127d56', textTransform: 'uppercase', margin: 0, marginBottom: 6 }}>VALOR LÍQUIDO CREDITADO</p>
                    <p style={{ fontSize: 32, fontWeight: 950, color: '#127d56', margin: 0, letterSpacing: -0.5 }}>{formatBRL(values.net)}</p>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  style={{
                    width: '100%',
                    height: 60,
                    borderRadius: 24,
                    backgroundColor: '#1a1d23',
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  Fechar e Ver Saldo
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
