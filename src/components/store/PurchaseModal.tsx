import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Loader2, Coins } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Item } from '../../lib/types';
import { formatRobux } from '../../lib/utils';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';

interface PurchaseModalProps {
  item: Item | null;
  onClose: () => void;
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function PurchaseModal({ item, onClose }: PurchaseModalProps) {
  const { profile, refreshBalance } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  if (!item) return null;

  const isValid =
    cardNumber.replace(/\s/g, '').length === 16 &&
    cardName.trim().length >= 3 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    /^\d{3,4}$/.test(cvv);

  const handlePurchase = async () => {
    if (!isValid) {
      toast.error('Preencha todos os dados do cartão');
      return;
    }

    if (!profile?.telegram_id) {
      toast.error('Vincule seu Telegram ao perfil antes de comprar. Acesse seu Perfil e informe seu @ do Telegram.');
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Sessão expirada. Faça login novamente.');
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-card-purchase`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            card_number: cardNumber,
            holder_name: cardName,
            expiry,
            cvv,
            item_id: item.id,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || 'Erro ao processar compra');
        return;
      }

      await refreshBalance();
      toast.success('Compra realizada com sucesso!');
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

          {!profile?.telegram_id && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4">
              <p className="text-xs text-orange-700 font-medium">
                ⚠️ Vincule seu Telegram ao perfil antes de comprar. Acesse seu Perfil e informe seu @ do Telegram.
              </p>
            </div>
          )}

          <h3 className="text-sm font-semibold text-text-primary mb-1">Dados do Cartão</h3>
          <p className="text-xs text-text-secondary mb-3">Use o cartão gerado no bot do Telegram</p>

          <div className="space-y-3">
            <div className="relative">
              <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-tertiary pointer-events-none" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Número do Cartão"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className="input pl-11"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Nome no Cartão"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="input"
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Validade (MM/AA)"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                className="input"
              />
            </div>

            <input
              type="text"
              inputMode="numeric"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="input max-w-[120px]"
            />
          </div>

          <button
            onClick={handlePurchase}
            disabled={!isValid || loading}
            className="btn btn-primary w-full mt-5 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Coins className="w-5 h-5" />
                Comprar por {formatRobux(item.price_robux)} Robux
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
