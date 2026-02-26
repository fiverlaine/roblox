import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Coins, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
        className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[28rem] bg-white rounded-t-3xl p-5 pb-8 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-text-primary">Finalizar Compra</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center"
            >
              <X className="w-4 h-4 text-text-secondary" />
            </button>
          </div>

          <div className="flex items-center gap-3 p-3 bg-background-secondary rounded-2xl mb-5">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
              ) : (
                <Coins className="w-8 h-8 text-brand-primary/40" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-text-primary line-clamp-1">{item.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-brand-primary">
                <Coins className="w-3.5 h-3.5" />
                <span className="text-sm font-bold">{formatRobux(item.price_robux)} R$</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 font-medium">Seu saldo de Robux</span>
              <span className={`text-sm font-bold ${hasEnoughRobux ? 'text-brand-primary' : 'text-red-500'}`}>
                {profile ? formatRobux(profile.robux_balance) : 0} R$
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 font-medium">Valor do Card</span>
              <span className="text-sm font-bold text-gray-900">
                - {formatRobux(item.price_robux)} R$
              </span>
            </div>
            <div className="h-px bg-gray-200 w-full my-2"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900 font-bold">Saldo restante</span>
              <span className={`text-sm font-bold ${hasEnoughRobux ? 'text-brand-primary' : 'text-red-500'}`}>
                {profile ? formatRobux(profile.robux_balance - item.price_robux) : 0} R$
              </span>
            </div>
          </div>

          {!hasEnoughRobux ? (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm text-red-700 font-medium text-center">
                  Você não tem saldo de Robux suficiente para esta compra.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  navigate('/comprar-robux');
                }}
                className="btn btn-primary w-full bg-brand-primary hover:bg-brand-primary/90"
              >
                <Coins className="w-5 h-5 mr-2" />
                Comprar mais Robux
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>
            </div>
          ) : (
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processando...
                </>
              ) : (
                'Confirmar Compra'
              )}
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
