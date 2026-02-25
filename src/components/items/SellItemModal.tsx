import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, ShieldCheck, Loader2, Coins, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import type { UserItem } from '../../lib/types';
import { formatCurrency, formatRobux } from '../../lib/utils';
import { useAuthStore } from '../../stores/authStore';
import { useWalletStore } from '../../stores/walletStore';
import { useItemStore } from '../../stores/itemStore';

interface SellItemModalProps {
  userItem: UserItem | null;
  onClose: () => void;
}

export default function SellItemModal({ userItem, onClose }: SellItemModalProps) {
  const { profile } = useAuthStore();
  const { createLicensePayment, createWithdrawalFeePayment, loading: walletLoading } = useWalletStore();
  const { sellItem, loading: itemLoading } = useItemStore();

  const [step, setStep] = useState<'info' | 'processing'>('info');

  const processingFee = useMemo(() => {
    const cents = Math.floor(Math.random() * 99) + 1;
    return 22 + cents / 100;
  }, []);

  if (!userItem || !userItem.item) return null;

  const { item } = userItem;
  const hasSeller = profile?.has_seller_pass ?? false;
  const loading = walletLoading || itemLoading;

  const handleBuyPass = async () => {
    try {
      await createLicensePayment();
      toast.success('Pagamento do Seller Pass criado! Aguarde a confirmação.');
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao adquirir licença';
      toast.error(message);
    }
  };

  const handleSell = async () => {
    setStep('processing');
    try {
      await createWithdrawalFeePayment();
      await sellItem(String(userItem.id));
      toast.success('Item colocado à venda com sucesso!');
      onClose();
    } catch (err: unknown) {
      setStep('info');
      const message = err instanceof Error ? err.message : 'Erro ao vender item';
      toast.error(message);
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
          className="w-full max-w-[28rem] bg-white rounded-t-3xl p-5 pb-8"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-text-primary">Vender Item</h2>
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

          {!hasSeller ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-states-warning/5 border border-states-warning/20 rounded-2xl">
                <AlertTriangle className="w-5 h-5 text-states-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Sem Licença Ativa</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    Adquira o Seller Pass para vender seus itens e converter em dinheiro real.
                  </p>
                </div>
              </div>

              <button
                onClick={handleBuyPass}
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Adquirir Seller Pass - R$ 34,90
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background-secondary rounded-2xl">
                <span className="text-sm text-text-secondary">Taxa de Processamento</span>
                <span className="text-sm font-bold text-text-primary">
                  {formatCurrency(processingFee)}
                </span>
              </div>

              <button
                onClick={handleSell}
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading || step === 'processing' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando venda...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    Confirmar Venda
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
