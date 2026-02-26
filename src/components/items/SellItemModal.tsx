import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, Loader2, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import type { UserItem } from '../../lib/types';
import { useAuthStore } from '../../stores/authStore';
import { useItemStore } from '../../stores/itemStore';

interface SellItemModalProps {
  userItem: UserItem | null;
  onClose: () => void;
}

export default function SellItemModal({ userItem, onClose }: SellItemModalProps) {
  const { profile } = useAuthStore();
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
                    <h2 className="text-[24px] font-black text-gray-900 tracking-tight">Vender Item</h2>
                    <button
                      onClick={onClose}
                      className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-[14px] text-gray-400 font-medium mb-8">Confirme seus dados para declaração fiscal</p>

                  {/* Price Summary Card */}
                  <div className="bg-[#F8F9FC] rounded-[24px] p-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-bold text-[14px]">Valor do item</span>
                        <span className="text-gray-900 font-black text-[16px]">{formatBRL(values.gross)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5 text-rose-500">
                          <AlertCircle size={14} />
                          <span className="font-bold text-[12px]">Taxa de venda da plataforma</span>
                        </div>
                        <span className="text-rose-500 font-black text-[14px]">- {formatBRL(values.fee)}</span>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-gray-500 font-bold text-[14px]">Valor líquido</span>
                        <span className="text-[28px] font-black text-[#22C55E] tracking-tighter">
                          {formatBRL(values.net)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Alert Box */}
                  <div className="bg-[#FFF9F2] border border-[#FFE4CC] rounded-2xl p-4 flex gap-3 mb-8">
                    <AlertCircle className="w-5 h-5 text-[#FF8800] shrink-0 mt-0.5" />
                    <div className="text-[11px] leading-relaxed">
                      <p className="text-[#995500] font-bold mb-0.5">Taxa de venda da plataforma</p>
                      <p className="text-[#B36B00] font-medium opacity-80">
                        A taxa de <span className="font-bold">{formatBRL(values.fee)}</span> será descontada automaticamente do valor da venda. Você receberá o valor líquido na sua carteira.
                      </p>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-6 mb-8 text-left">
                    <div className="space-y-2">
                      <label className="block text-[13px] font-bold text-gray-700 ml-1">Nome Completo</label>
                      <input
                        type="text"
                        placeholder="Nome do titular da conta"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-[60px] px-6 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#22C55E]/5 focus:border-[#22C55E]/30 transition-all outline-none font-bold text-gray-800 placeholder:text-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[13px] font-bold text-gray-700 ml-1">CPF (Apenas para nota fiscal)</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="w-full h-[60px] px-6 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#22C55E]/5 focus:border-[#22C55E]/30 transition-all outline-none font-bold text-gray-800 placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-[#FDFDFE] border border-gray-100/50 rounded-2xl p-4 flex gap-3 mb-8">
                    <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                      <Info className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                       Estes dados são necessários apenas para emissão de nota fiscal da transação. O valor será creditado no seu saldo da plataforma para saque posterior.
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleConfirmSell}
                    className="w-full h-[64px] bg-[#22C55E] hover:bg-[#1BA84E] text-white text-base font-black rounded-[20px] shadow-lg shadow-[#22C55E]/20 transition-all active:scale-[0.98] flex items-center justify-center"
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
                  <div className="relative mb-8">
                     <div className="w-24 h-24 rounded-full border-4 border-gray-100 border-t-[#4F6BFF] animate-spin"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#E8EDFF] flex items-center justify-center">
                           <Loader2 size={32} className="text-[#4F6BFF] animate-spin" />
                        </div>
                     </div>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Processando Venda...</h2>
                  <p className="text-sm text-gray-400 font-medium max-w-[240px]">
                    Aguarde, estamos comprando este item de você.
                  </p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-28 h-28 bg-[#E8FBF0] rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-[#22C55E] blur-[40px] opacity-10 rounded-full animate-pulse"></div>
                    <CheckCircle2 size={56} className="text-[#22C55E] relative z-10" />
                  </div>
                  
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Venda Concluída!</h2>
                  <p className="text-sm text-gray-400 font-medium mb-8">O valor já está na sua conta.</p>

                  <div className="w-full bg-[#F8F9FC] rounded-[24px] p-6 mb-8 text-left space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Valor do item</span>
                        <span className="text-gray-900 font-black text-[16px]">{formatBRL(values.gross)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Taxa de venda</span>
                        <span className="text-rose-500 font-black text-[14px]">- {formatBRL(values.fee)}</span>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Valor líquido creditado</span>
                        <span className="text-[22px] font-black text-[#22C55E] tracking-tight">
                          {formatBRL(values.net)}
                        </span>
                      </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full h-[64px] bg-[#1F2937] hover:bg-black text-white text-[17px] font-black rounded-2xl shadow-xl transition-all active:scale-[0.98]"
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
