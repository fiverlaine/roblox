import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Coins } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Item } from '../../lib/types';
import { formatRobux } from '../../lib/utils';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';

interface PurchaseModalProps {
  item: Item | null;
  onClose: () => void;
}

export default function PurchaseModal({ item, onClose }: PurchaseModalProps) {
  const { profile, refreshBalance } = useAuthStore();
  const [loading, setLoading] = useState(false);

  if (!item) return null;

  const hasEnoughRobux = profile && profile.robux_balance >= item.price_robux;

  const handlePurchase = async () => {
    if (!profile) return;
    if (!hasEnoughRobux) {
      toast.error('Saldo de Robux insuficiente');
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Sessão expirada. Faça login novamente.');
        return;
      }

      const { data: result, error: apiError } = await supabase.functions.invoke(
        'buy-item-with-robux',
        {
          body: { item_id: item.id },
        }
      );

      if (apiError) {
        toast.error(apiError.message || 'Erro ao processar compra');
        return;
      }

      if (result && result.error) {
        toast.error(result.error);
        return;
      }

      await refreshBalance();
      toast.success('Item comprado com sucesso!');
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao processar compra';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[340px] bg-white rounded-[32px] p-8 shadow-2xl"
        >
          <h2 className="text-[20px] font-bold text-gray-800 mb-6">Confirmar Compra</h2>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[24px] mb-6">
            <div className="w-16 h-16 rounded-[18px] bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
              ) : (
                <Coins className="w-8 h-8 text-brand-primary/40" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-bold text-gray-800 mb-1 line-clamp-1">{item.name}</h3>
              <div className="flex items-center gap-1 text-[#4F6BFF]">
                <Coins className="w-3.5 h-3.5" />
                <span className="text-[14px] font-black">{formatRobux(item.price_robux)}</span>
              </div>
            </div>
          </div>

          <p className="text-[14px] leading-relaxed text-gray-400 font-medium mb-8">
            Tem certeza que deseja comprar este item? O valor será descontado do seu saldo imediatamente.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="h-[52px] flex items-center justify-center text-[15px] font-bold text-[#4F6BFF]/70 hover:text-[#4F6BFF] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handlePurchase}
              disabled={loading || !hasEnoughRobux}
              className="h-[52px] bg-[#4F6BFF] hover:bg-[#3D57E6] disabled:opacity-50 text-white text-[15px] font-bold rounded-full shadow-lg shadow-[#4F6BFF]/20 transition-all active:scale-[0.98] flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Confirmar'
              )}
            </button>
          </div>

          {!hasEnoughRobux && !loading && (
            <p className="mt-4 text-center text-[11px] font-bold text-rose-500">
              Saldo de Robux insuficiente
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
