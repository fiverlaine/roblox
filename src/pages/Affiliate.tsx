import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  DollarSign,
  RefreshCw,
  Download,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Link,
} from 'lucide-react';
import { useAffiliateStore } from '../stores/affiliateStore';
import { useAuthStore } from '../stores/authStore';
import { formatCurrency, formatDate } from '../lib/utils';

export default function Affiliate() {
  const { profile } = useAuthStore();
  const { leads, loading, fetchLeads, exportLeadsCSV } = useAffiliateStore();
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    paymentType: '',
    qualification: '',
  });

  useEffect(() => {
    if (profile?.is_affiliate) {
      fetchLeads();
    }
  }, [fetchLeads, profile?.is_affiliate]);

  if (!profile) return null;

  if (!profile.is_affiliate) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Acesso Restrito</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Você ainda não é um afiliado aprovado na plataforma. Entre em contato com o suporte para mais informações.
        </p>
      </div>
    );
  }

  const handleApplyFilters = () => {
    fetchLeads({
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      paymentType: filters.paymentType || undefined,
      qualification: filters.qualification || undefined,
    });
  };

  const handleClearFilters = () => {
    setFilters({ startDate: '', endDate: '', paymentType: '', qualification: '' });
    fetchLeads();
  };

  const handleExportCSV = () => {
    const csv = exportLeadsCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meus-leads-afiliado-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const qualifiedLeads = leads.filter((l) => l.total_paid > 0);
  const totalPaid = leads.reduce((sum, l) => sum + l.total_paid, 0);
  const leadsWithPayments = leads.filter((l) => l.total_paid > 0);

  const metrics = [
    {
      label: 'Meus Leads',
      value: leads.length.toLocaleString('pt-BR'),
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Qualificados',
      value: qualifiedLeads.length.toLocaleString('pt-BR'),
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Com Pagamentos',
      value: leadsWithPayments.length.toLocaleString('pt-BR'),
      icon: BarChart3,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Receita Total',
      value: formatCurrency(totalPaid),
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <div className="space-y-6 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Painel do Afiliado
          </h2>
          <p className="text-sm text-gray-400">Acompanhe seus leads indicados e ganhos gerados através das suas UTMs.</p>
        </div>
        <div className="flex gap-2">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#1e222d] text-gray-400 border border-gray-800/50 mr-2">
            <Link className="w-4 h-4 text-brand-primary" />
            Minhas UTMs: <span className="text-white font-mono">{profile.affiliate_utms.join(', ')}</span>
          </div>
          <button
            onClick={() => fetchLeads()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>
      </div>

      <div className="sm:hidden flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-[#1e222d] text-gray-400 border border-gray-800/50">
        <Link className="w-4 h-4 text-brand-primary min-w-4" />
        <span className="truncate">UTMs: <span className="text-white font-mono">{profile.affiliate_utms.join(', ')}</span></span>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1e222d] rounded-2xl p-6 border border-gray-800/50 flex items-center justify-between group hover:border-gray-700/80 transition-all"
          >
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{m.label}</p>
              <p className="text-3xl font-bold text-white tracking-tight">{m.value}</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${m.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <m.icon className={`w-7 h-7 ${m.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#1e222d] rounded-2xl p-6 border border-gray-800/50 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-bold text-white">Filtros</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleClearFilters}
              className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors mr-2"
            >
              Limpar
            </button>
            <button
              onClick={handleApplyFilters}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold bg-brand-primary text-black hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              Aplicar
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Data Inicial</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters((p) => ({ ...p, startDate: e.target.value }))}
              className="w-full bg-[#161a23] border border-gray-700/50 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-brand-primary/50 transition-all [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Data Final</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters((p) => ({ ...p, endDate: e.target.value }))}
              className="w-full bg-[#161a23] border border-gray-700/50 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-brand-primary/50 transition-all [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tipo de Pagamento</label>
            <select
              value={filters.paymentType}
              onChange={(e) => setFilters((p) => ({ ...p, paymentType: e.target.value }))}
              className="w-full bg-[#161a23] border border-gray-700/50 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-brand-primary/50 transition-all appearance-none cursor-pointer"
            >
              <option value="">Todos</option>
              <option value="license">Licença</option>
              <option value="withdrawal_fee">Taxa de Saque</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Qualificação</label>
            <select
              value={filters.qualification}
              onChange={(e) => setFilters((p) => ({ ...p, qualification: e.target.value }))}
              className="w-full bg-[#161a23] border border-gray-700/50 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-brand-primary/50 transition-all appearance-none cursor-pointer"
            >
              <option value="">Todos</option>
              <option value="qualified">Qualificados</option>
              <option value="new">Novos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#1e222d] rounded-2xl border border-gray-800/50 overflow-hidden shadow-xl shadow-black/20">
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Meus Leads <span className="px-2 py-0.5 rounded-lg bg-gray-800/50 text-gray-400 text-sm font-mono tracking-tighter">({leads.length})</span>
          </h3>
          <button
            onClick={handleExportCSV}
            disabled={leads.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-600/90 text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>

        <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#161a23]/30">
                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">TELEGRAM</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">USUÁRIO DA PLATAFORMA</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">DADOS PESSOAIS</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap text-center">STATUS</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">PAGAMENTOS</th>
                <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">TOTAL PAGO</th>
                <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">VINCULADO EM</th>
                <th className="text-right py-4 px-6 text-[10px] font-bold text-brand-primary uppercase tracking-widest whitespace-nowrap">UTM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {loading && leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="w-8 h-8 text-brand-primary animate-spin" />
                      <span className="text-gray-500 font-medium">Buscando seus leads...</span>
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-10 h-10 text-gray-700" />
                      <span className="text-gray-500 font-medium">Você ainda não tem leads vinculados às suas UTMs.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-[#161a23]/50 transition-all duration-200">
                    {/* Telegram */}
                    <td className="py-6 px-6 align-top">
                      <div className="min-w-[140px]">
                        <p className="text-white text-sm font-bold group-hover:text-brand-primary transition-colors">
                          {lead.telegram_username ? `@${lead.telegram_username}` : (lead.telegram_name || 'Usuário sem nome')}
                        </p>
                        <p className="text-[10px] text-gray-600 font-mono mt-1">ID: {lead.telegram_id ?? '-'}</p>
                      </div>
                    </td>
                    {/* Platform User */}
                    <td className="py-6 px-6 align-top">
                      <div className="min-w-[180px]">
                        {lead.profile ? (
                          <>
                            <p className="text-white/90 text-sm font-medium leading-tight">{lead.profile.full_name}</p>
                            <p className="text-xs text-gray-400 mt-1">{lead.profile.email}</p>
                          </>
                        ) : (
                          <span className="text-gray-600 text-xs italic">Perfil não encontrado</span>
                        )}
                      </div>
                    </td>
                    {/* Personal Data */}
                    <td className="py-6 px-6 align-top">
                      <div className="min-w-[220px]">
                        {lead.profile && (
                          <div className="space-y-1 text-xs text-gray-400 font-medium leading-relaxed">
                            <p className="text-gray-300">{lead.profile.full_name}</p>
                            <p>{lead.profile.email}</p>
                            {lead.profile.phone && <p>{lead.profile.phone}</p>}
                            {lead.profile.cpf && <p className="font-mono text-[11px] bg-gray-800/20 inline-block px-1 rounded">CPF: {lead.profile.cpf}</p>}
                            {lead.profile.city && <p className="text-gray-500">{lead.profile.city} / {lead.profile.state}</p>}
                          </div>
                        )}
                      </div>
                    </td>
                    {/* Status */}
                    <td className="py-6 px-6 align-top text-center">
                      {lead.total_paid > 0 ? (
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-400 uppercase tracking-tight">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <CheckCircle className="w-3.5 h-3.5" />
                            Qualificado
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-600 uppercase tracking-tight grayscale opacity-70">
                          <XCircle className="w-3.5 h-3.5" />
                          Novo
                        </span>
                      )}
                    </td>
                    {/* Payments - Detailed List */}
                    <td className="py-6 px-6 align-top">
                      <div className="min-w-[200px] space-y-2">
                        {lead.payments && lead.payments.length > 0 ? (
                          lead.payments.map((p, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-[11px] text-gray-400 font-medium">
                                {p.type === 'license' ? 'Licença' : 'Taxa de Saque'}: 
                                <span className="text-white ml-2">{formatCurrency(p.amount)}</span>
                              </span>
                              <span className="text-[10px] text-gray-600 font-mono italic">
                                ({formatDate(p.created_at)})
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-700 text-xs italic opacity-40">— Nenhum pagamento</span>
                        )}
                      </div>
                    </td>
                    {/* Total Paid */}
                    <td className="py-6 px-6 align-top text-right">
                      <p className={`text-base font-black ${lead.total_paid > 0 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'text-gray-600'}`}>
                        {formatCurrency(lead.total_paid)}
                      </p>
                    </td>
                    {/* Date */}
                    <td className="py-6 px-6 align-top text-right">
                      <p className="text-gray-500 text-xs font-mono whitespace-nowrap group-hover:text-gray-400 transition-colors">
                        {formatDate(lead.created_at)}
                      </p>
                    </td>
                    {/* UTM */}
                    <td className="py-6 px-6 align-top text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-brand-primary/10 text-brand-primary text-xs font-mono border border-brand-primary/20 whitespace-nowrap">
                        {lead.utm_source || 'Desconhecida'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
