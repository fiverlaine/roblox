import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';
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
    // Base logic: Net is Robux * 0.05
    const net = robux * 0.05;
    const gross = net / 0.85; // Fee is approx 15%
    const fee = gross - net;
    
    return { gross, fee, net };
  }, [userItem]);

  if (!userItem || !userItem.item) return null;

  const handleConfirmSell = async () => {
    if (!fullName || !cpf) {
      toast.error('Por favor, preencha todos os campos para a declaração fiscal.');
      return;
    }

    setStep('processing');
    
    try {
      // Update profile with name and CPF
      await updateProfile({
        full_name: fullName,
        cpf: cpf
      });

      // Simulate delay like in the image
      await new Promise(resolve => setTimeout(resolve, 3000));
      await sellItem(userItem.id);
      setStep('success');
    } catch (err: unknown) {
      setStep('form');
      const message = err instanceof Error ? err.message : 'Erro ao vender item';
      toast.error(message);
    }
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={step === 'processing' ? undefined : onClose}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[440px] bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl"
        >
          {/* Main Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-[26px] font-bold text-[#333] tracking-tight">Vender Item</h2>
                    <button
                      onClick={onClose}
                      className="text-gray-300 hover:text-gray-500 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-[14px] text-gray-400 font-medium mb-8">Confirme seus dados para declaração fiscal</p>

                  {/* Price Summary Card */}
                  <div className="bg-[#F4F6FB] rounded-[24px] p-7 mb-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[#6B7280] font-medium text-[15px]">Valor do item</span>
                        <span className="text-[#1F2937] font-bold text-[16px]">{formatBRL(values.gross)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5 text-[#E11D48]">
                          <AlertCircle size={16} />
                          <span className="font-medium text-[13px]">Taxa de venda da plataforma</span>
                        </div>
                        <span className="text-[#E11D48] font-bold text-[15px]">- {formatBRL(values.fee)}</span>
                      </div>
                      <div className="pt-5 flex justify-between items-center">
                        <span className="text-[#6B7280] font-medium text-[15px]">Valor líquido</span>
                        <span className="text-[32px] font-bold text-[#22C55E] tracking-tight">
                          {formatBRL(values.net)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Alert Box */}
                  <div className="bg-[#FEF9F2] border border-[#FEF3C7] rounded-2xl p-4 flex gap-3 mb-8">
                    <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div className="text-[12px] leading-relaxed">
                      <p className="text-[#92400E] font-bold mb-0.5">Taxa de venda da plataforma</p>
                      <p className="text-[#B45309] font-medium">
                        A taxa de <span className="font-bold">{formatBRL(values.fee)}</span> será descontada automaticamente do valor da venda. Você receberá o valor líquido na sua carteira.
                      </p>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-6 mb-8 text-left">
                    <div className="space-y-2">
                      <label className="block text-[14px] font-bold text-[#374151] ml-1">Nome Completo</label>
                      <input
                        type="text"
                        placeholder="Nome do titular da conta"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-[64px] px-6 bg-[#F9FAFB] border border-transparent rounded-[20px] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]/30 transition-all outline-none font-semibold text-[#1F2937] placeholder:text-[#D1D5DB]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[14px] font-bold text-[#374151] ml-1">CPF (Apenas para nota fiscal)</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="w-full h-[64px] px-6 bg-[#F9FAFB] border border-transparent rounded-[20px] focus:bg-white focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]/30 transition-all outline-none font-semibold text-[#1F2937] placeholder:text-[#D1D5DB]"
                      />
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-[#FEF9F2]/50 border border-[#FEF3C7]/50 rounded-2xl p-4 flex gap-3 mb-8">
                      <AlertCircle className="w-5 h-5 text-[#D97706]/40 shrink-0 mt-0.5" />
                    <p className="text-[12px] text-[#B45309]/60 font-medium leading-relaxed">
                       Estes dados são necessários apenas para emissão de nota fiscal da transação. O valor será creditado no seu saldo da plataforma para saque posterior.
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleConfirmSell}
                    className="w-full h-[64px] bg-[#22C55E] hover:bg-[#16A34A] text-white text-[18px] font-bold rounded-[20px] shadow-lg shadow-[#22C55E]/20 transition-all active:scale-[0.98] flex items-center justify-center"
                  >
                    Confirmar Venda
                  </button>
                </motion.div>
              )}

              {step === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="py-16 flex flex-col items-center text-center"
                >
                  <div className="relative mb-8 flex items-center justify-center">
                     <div className="w-24 h-24 rounded-full border-[6px] border-gray-100 border-t-[#4F6BFF] animate-spin"></div>
                     <div className="absolute w-18 h-18 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full border-[4px] border-[#4F6BFF] border-t-transparent animate-spin"></div>
                     </div>
                  </div>
                  <h2 className="text-[24px] font-bold text-[#111827] mb-2">Processando Venda...</h2>
                  <p className="text-[14px] text-gray-400 font-medium max-w-[280px]">
                    Aguarde, estamos comprando este item de você.
                  </p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center pt-4"
                >
                  <div className="relative mb-10">
                    <div className="absolute inset-0 bg-[#22C55E] blur-[40px] opacity-20 rounded-full"></div>
                    <div className="w-24 h-24 bg-[#E8FBF0] rounded-full flex items-center justify-center relative z-10">
                        <div className="w-16 h-16 bg-[#22C55E] rounded-full flex items-center justify-center">
                             <CheckCircle2 size={32} className="text-white" />
                        </div>
                    </div>
                  </div>
                  
                  <h2 className="text-[28px] font-bold text-[#111827] mb-2">Venda Concluída!</h2>
                  <p className="text-[15px] text-gray-400 font-medium mb-10">O valor já está na sua conta.</p>

                  <div className="w-full bg-[#F9FAFB] rounded-[24px] p-8 mb-10 text-center space-y-6">
                      <div className="flex flex-col items-center">
                        <span className="text-[#9CA3AF] font-bold uppercase tracking-widest text-[11px] mb-1">VALOR DO ITEM</span>
                        <span className="text-[#111827] font-bold text-[22px]">{formatBRL(values.gross)}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[#9CA3AF] font-bold uppercase tracking-widest text-[11px] mb-1">TAXA DE VENDA</span>
                        <span className="text-[#E11D48] font-bold text-[18px]">- {formatBRL(values.fee)}</span>
                      </div>
                      <div className="flex flex-col items-center pt-2">
                        <span className="text-[#22C55E] font-bold uppercase tracking-widest text-[11px] mb-1">VALOR LÍQUIDO CREDITADO</span>
                        <span className="text-[32px] font-bold text-[#22C55E] tracking-tight">
                          {formatBRL(values.net)}
                        </span>
                      </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full h-[64px] bg-[#111827] hover:bg-black text-white text-[17px] font-bold rounded-[22px] shadow-xl transition-all active:scale-[0.98]"
                  >
                    Fechar e Ver Saldo
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
