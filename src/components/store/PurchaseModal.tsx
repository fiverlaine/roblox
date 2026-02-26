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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmar Compra</h3>
            
            <div className="flex items-center gap-4 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-16 h-16 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded">
                    <Coins className="text-brand-primary/40" size={24} />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Coins size={14} className="text-brand-primary" />
                  <span className="font-bold text-brand-primary">{formatRobux(item.price_robux)}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-sm">
              Tem certeza que deseja comprar este item? O valor será descontado do seu saldo imediatamente.
            </p>

            <div className="flex gap-3 justify-end">
              <button 
                onClick={onClose}
                className="btn btn-ghost h-[52px] px-xl"
              >
                Cancelar
              </button>
              <button 
                onClick={handlePurchase}
                disabled={loading || !hasEnoughRobux}
                className="btn btn-primary h-[52px] px-xl min-w-[120px] flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Confirmar'
                )}
              </button>
            </div>

            {!hasEnoughRobux && !loading && (
              <p className="mt-4 text-center text-xs font-bold text-rose-500">
                Saldo de Robux insuficiente
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
