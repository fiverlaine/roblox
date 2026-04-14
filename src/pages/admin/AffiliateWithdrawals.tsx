import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  RefreshCw,
  DollarSign,
  AlertTriangle,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { formatCurrency, formatDateTime } from '../../lib/utils';
import toast from 'react-hot-toast';
import type { AffiliateWithdrawal } from '../../lib/types';

export default function AffiliateWithdrawals() {
  const { profile } = useAuthStore();
  const [withdrawals, setWithdrawals] = useState<AffiliateWithdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectNotes, setRejectNotes] = useState<Record<number, string>>({});
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('affiliate_withdrawals')
        .select('*, profile:profiles(id, full_name, email, real_balance, affiliate_ref, pix_key:cpf)')
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setWithdrawals((data ?? []) as AffiliateWithdrawal[]);
    } catch (err: any) {
      toast.error('Erro ao carregar solicitações.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (withdrawal: AffiliateWithdrawal) => {
    if (!profile) return;
    setProcessing(withdrawal.id);

    try {
      // 1. Update withdrawal status
      const { error: updateError } = await supabase
        .from('affiliate_withdrawals')
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: profile.id,
        })
        .eq('id', withdrawal.id);

      if (updateError) throw updateError;

      // 2. Deduct balance from the affiliate's profile
      const { data: currentProfile, error: profileError } = await supabase
        .from('profiles')
        .select('real_balance')
        .eq('id', withdrawal.user_id)
        .single();

      if (profileError) throw profileError;

      const newBalance = (currentProfile?.real_balance ?? 0) - withdrawal.amount;

      const { error: balanceError } = await supabase
        .from('profiles')
        .update({ real_balance: Math.max(0, newBalance) })
        .eq('id', withdrawal.user_id);

      if (balanceError) throw balanceError;

      toast.success(`Saque de ${formatCurrency(withdrawal.amount)} aprovado! Saldo atualizado.`);
      fetchWithdrawals();
    } catch (err: any) {
      toast.error(err?.message || 'Erro ao aprovar saque.');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (withdrawal: AffiliateWithdrawal) => {
    if (!profile) return;
    setProcessing(withdrawal.id);

    try {
      const { error } = await supabase
        .from('affiliate_withdrawals')
        .update({
          status: 'rejected',
          admin_notes: rejectNotes[withdrawal.id] || null,
          reviewed_at: new Date().toISOString(),
          reviewed_by: profile.id,
        })
        .eq('id', withdrawal.id);

      if (error) throw error;

      toast.success('Saque recusado.');
      setRejectNotes((prev) => {
        const copy = { ...prev };
        delete copy[withdrawal.id];
        return copy;
      });
      fetchWithdrawals();
    } catch (err: any) {
      toast.error(err?.message || 'Erro ao recusar saque.');
    } finally {
      setProcessing(null);
    }
  };

  // Filter and search
  const filtered = withdrawals.filter((w) => {
    if (filterStatus !== 'all' && w.status !== filterStatus) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const name = (w.profile as any)?.full_name?.toLowerCase() ?? '';
      const email = (w.profile as any)?.email?.toLowerCase() ?? '';
      const ref = (w.profile as any)?.affiliate_ref?.toLowerCase() ?? '';
      if (!name.includes(search) && !email.includes(search) && !ref.includes(search)) return false;
    }
    return true;
  });

  const pendingCount = withdrawals.filter((w) => w.status === 'pending').length;
  const pendingTotal = withdrawals
    .filter((w) => w.status === 'pending')
    .reduce((sum, w) => sum + w.amount, 0);
  const approvedTotal = withdrawals
    .filter((w) => w.status === 'approved')
    .reduce((sum, w) => sum + w.amount, 0);

  const statusConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    pending: { label: 'Pendente', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    approved: { label: 'Aprovado', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    rejected: { label: 'Recusado', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Saques de Afiliados</h2>
            <p className="text-sm text-gray-400">
              Gerencie as solicitações de saque de comissão dos afiliados.
            </p>
          </div>
          <button
            onClick={fetchWithdrawals}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1f2937] rounded-2xl p-6 border border-gray-700/50 shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{pendingCount}</span>
            </div>
            <p className="text-2xl font-black text-white">{formatCurrency(pendingTotal)}</p>
            <p className="text-sm text-gray-400 mt-1">Pendentes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1f2937] rounded-2xl p-6 border border-gray-700/50 shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{formatCurrency(approvedTotal)}</p>
            <p className="text-sm text-gray-400 mt-1">Total Aprovado</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1f2937] rounded-2xl p-6 border border-gray-700/50 shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{withdrawals.length}</p>
            <p className="text-sm text-gray-400 mt-1">Total de Solicitações</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-[#1f2937] rounded-xl p-4 border border-gray-700/50 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
          >
            <option value="all">Todos os status</option>
            <option value="pending">Pendentes</option>
            <option value="approved">Aprovados</option>
            <option value="rejected">Recusados</option>
          </select>
        </div>

        {/* Withdrawal List */}
        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-16 bg-[#1f2937] rounded-xl border border-gray-700/50">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-[#1f2937] rounded-xl border border-gray-700/50">
              <Wallet className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-gray-400 font-medium">Nenhuma solicitação encontrada.</p>
            </div>
          ) : (
            filtered.map((w) => {
              const sc = statusConfig[w.status];
              const StatusIcon = sc.icon;
              const isExpanded = expandedId === w.id;
              const profileData = w.profile as any;

              return (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1f2937] rounded-xl border border-gray-700/50 overflow-hidden"
                >
                  {/* Row summary */}
                  <div
                    className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer hover:bg-gray-800/30 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : w.id)}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-xl ${sc.bg} flex items-center justify-center shrink-0`}>
                        <StatusIcon className={`w-5 h-5 ${sc.color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm truncate">
                          {profileData?.full_name ?? 'Usuário desconhecido'}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {profileData?.email ?? '-'}{' '}
                          {profileData?.affiliate_ref && (
                            <span className="text-blue-400 font-mono ml-1">
                              REF: {profileData.affiliate_ref}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pl-14 lg:pl-0">
                      <div className="text-right">
                        <p className="text-white font-black text-lg">{formatCurrency(w.amount)}</p>
                        <p className="text-gray-500 text-[11px] font-mono">{formatDateTime(w.requested_at)}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-tight ${sc.color} ${sc.bg}`}>
                        <StatusIcon className="w-3 h-3" />
                        {sc.label}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="border-t border-gray-700/50 p-5 bg-gray-800/20 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 text-[11px] uppercase font-bold tracking-wider block mb-1">Chave PIX</span>
                          <p className="text-white font-mono text-xs break-all">{w.pix_key}</p>
                          <p className="text-gray-500 text-[10px] uppercase mt-0.5">{w.pix_key_type}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[11px] uppercase font-bold tracking-wider block mb-1">Saldo Atual</span>
                          <p className="text-white font-bold">{formatCurrency(profileData?.real_balance ?? 0)}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[11px] uppercase font-bold tracking-wider block mb-1">Valor Solicitado</span>
                          <p className="text-white font-bold">{formatCurrency(w.amount)}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[11px] uppercase font-bold tracking-wider block mb-1">Saldo Após</span>
                          <p className={`font-bold ${((profileData?.real_balance ?? 0) - w.amount) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {formatCurrency(Math.max(0, (profileData?.real_balance ?? 0) - w.amount))}
                          </p>
                        </div>
                      </div>

                      {w.admin_notes && (
                        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                          <p className="text-red-400 text-xs font-medium">
                            <strong>Motivo da recusa:</strong> {w.admin_notes}
                          </p>
                        </div>
                      )}

                      {/* Actions for pending */}
                      {w.status === 'pending' && (
                        <div className="space-y-3 pt-2">
                          {/* Check if balance sufficient */}
                          {(profileData?.real_balance ?? 0) < w.amount && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                              <p className="text-xs text-red-300">
                                Saldo insuficiente! O afiliado tem {formatCurrency(profileData?.real_balance ?? 0)} mas solicitou {formatCurrency(w.amount)}.
                              </p>
                            </div>
                          )}

                          <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                              Motivo da recusa (opcional)
                            </label>
                            <input
                              type="text"
                              value={rejectNotes[w.id] || ''}
                              onChange={(e) =>
                                setRejectNotes((prev) => ({ ...prev, [w.id]: e.target.value }))
                              }
                              placeholder="Ex: Saldo insuficiente, dados inválidos..."
                              className="w-full bg-gray-900 border border-gray-600 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>

                          <div className="flex gap-3 justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReject(w);
                              }}
                              disabled={processing === w.id}
                              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all disabled:opacity-50"
                            >
                              {processing === w.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                              Recusar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApprove(w);
                              }}
                              disabled={processing === w.id}
                              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                            >
                              {processing === w.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                              Aprovar Saque
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
