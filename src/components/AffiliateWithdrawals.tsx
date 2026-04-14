import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { formatCurrency, formatDateTime } from '../lib/utils';
import toast from 'react-hot-toast';
import type { AffiliateWithdrawal } from '../lib/types';

export default function AffiliateWithdrawals() {
  const { profile } = useAuthStore();
  const [expanded, setExpanded] = useState(false);
  const [withdrawals, setWithdrawals] = useState<AffiliateWithdrawal[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [amount, setAmount] = useState('');
  const [pixKeyType, setPixKeyType] = useState<'cpf' | 'email' | 'phone' | 'random'>('cpf');
  const [pixKey, setPixKey] = useState('');

  const commissionBalance = profile?.real_balance ?? 0;

  useEffect(() => {
    if (expanded && profile) {
      fetchWithdrawals();
    }
  }, [expanded, profile]);

  const fetchWithdrawals = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('affiliate_withdrawals')
        .select('*')
        .eq('user_id', profile.id)
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setWithdrawals((data ?? []) as AffiliateWithdrawal[]);
    } catch (err: any) {
      console.error('Error fetching withdrawals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!profile) return;

    const numericAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Informe um valor válido.');
      return;
    }
    if (numericAmount > commissionBalance) {
      toast.error('Saldo de comissão insuficiente.');
      return;
    }
    if (numericAmount < 10) {
      toast.error('Valor mínimo para saque é R$ 10,00.');
      return;
    }
    if (!pixKey.trim()) {
      toast.error('Informe sua chave PIX.');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('affiliate_withdrawals').insert({
        user_id: profile.id,
        amount: numericAmount,
        pix_key_type: pixKeyType,
        pix_key: pixKey.trim(),
        status: 'pending',
      });

      if (error) throw error;

      toast.success('Solicitação de saque enviada! Aguarde a aprovação do admin.');
      setAmount('');
      setPixKey('');
      fetchWithdrawals();
    } catch (err: any) {
      toast.error(err?.message || 'Erro ao solicitar saque.');
    } finally {
      setSubmitting(false);
    }
  };

  const pendingTotal = withdrawals
    .filter((w) => w.status === 'pending')
    .reduce((sum, w) => sum + w.amount, 0);

  const statusConfig = {
    pending: {
      label: 'Pendente',
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    approved: {
      label: 'Aprovado',
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    rejected: {
      label: 'Recusado',
      icon: XCircle,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
  };

  return (
    <div className="bg-background-primary rounded-2xl border border-ui-divider overflow-hidden shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-background-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-text-primary">Saques de Comissão</h3>
            <p className="text-xs text-text-secondary">
              Solicite saques do seu saldo de comissão via PIX.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-text-secondary font-medium">Saldo disponível</p>
            <p className={`text-lg font-black ${commissionBalance > 0 ? 'text-emerald-400' : 'text-text-secondary'}`}>
              {formatCurrency(commissionBalance)}
            </p>
          </div>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-text-secondary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-secondary" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-ui-divider space-y-6">
              {/* Balance card (mobile) */}
              <div className="sm:hidden bg-background-secondary rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm text-text-secondary font-medium">Saldo disponível</span>
                <span className={`text-xl font-black ${commissionBalance > 0 ? 'text-emerald-400' : 'text-text-secondary'}`}>
                  {formatCurrency(commissionBalance)}
                </span>
              </div>

              {/* Pending alert */}
              {pendingTotal > 0 && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <p className="text-sm text-amber-300">
                    Você tem <strong>{formatCurrency(pendingTotal)}</strong> em saques pendentes de aprovação.
                  </p>
                </div>
              )}

              {/* Request form */}
              <div className="bg-background-secondary/50 rounded-xl p-5 space-y-4 border border-ui-divider/50">
                <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <Send className="w-4 h-4 text-brand-primary" />
                  Solicitar Saque
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                      Valor (R$)
                    </label>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Ex: 50,00"
                      className="w-full bg-background-secondary border border-ui-divider rounded-xl py-3 px-4 text-text-primary text-sm font-mono focus:outline-none focus:border-brand-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                      Tipo de Chave PIX
                    </label>
                    <select
                      value={pixKeyType}
                      onChange={(e) => setPixKeyType(e.target.value as any)}
                      className="w-full bg-background-secondary border border-ui-divider rounded-xl py-3 px-4 text-text-primary text-sm focus:outline-none focus:border-brand-primary/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="cpf">CPF</option>
                      <option value="email">E-mail</option>
                      <option value="phone">Telefone</option>
                      <option value="random">Chave Aleatória</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                    Chave PIX
                  </label>
                  <input
                    type="text"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    placeholder="Informe sua chave PIX"
                    className="w-full bg-background-secondary border border-ui-divider rounded-xl py-3 px-4 text-text-primary text-sm font-mono focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || commissionBalance <= 0}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Solicitar Saque
                  </button>
                </div>
              </div>

              {/* History */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-text-secondary" />
                  Histórico de Saques
                </h4>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-text-secondary" />
                  </div>
                ) : withdrawals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Wallet className="w-10 h-10 text-ui-divider mb-3" />
                    <p className="text-text-secondary text-sm font-medium">
                      Nenhuma solicitação de saque ainda.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {withdrawals.map((w) => {
                      const sc = statusConfig[w.status];
                      const StatusIcon = sc.icon;
                      return (
                        <motion.div
                          key={w.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`bg-background-secondary/50 rounded-xl p-4 border ${sc.border} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg ${sc.bg} flex items-center justify-center shrink-0`}>
                              <StatusIcon className={`w-4 h-4 ${sc.color}`} />
                            </div>
                            <div>
                              <p className="text-text-primary text-sm font-bold">
                                {formatCurrency(w.amount)}
                              </p>
                              <p className="text-text-secondary text-[11px] font-mono">
                                PIX {w.pix_key_type.toUpperCase()}: {w.pix_key}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 sm:text-right pl-12 sm:pl-0">
                            <div>
                              <span className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-tight ${sc.color}`}>
                                <StatusIcon className="w-3 h-3" />
                                {sc.label}
                              </span>
                              {w.admin_notes && w.status === 'rejected' && (
                                <p className="text-[10px] text-red-400/70 mt-0.5 max-w-[200px]">
                                  {w.admin_notes}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-text-secondary text-[11px] font-mono whitespace-nowrap">
                                {formatDateTime(w.requested_at)}
                              </p>
                              {w.reviewed_at && (
                                <p className="text-text-secondary/60 text-[10px] font-mono whitespace-nowrap">
                                  Revisado: {formatDateTime(w.reviewed_at)}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
