import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  RefreshCw,
  Download,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  LayoutDashboard,
  Link as LinkIcon,
  MousePointer2,
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminStore } from '../../stores/adminStore';
import { formatCurrency, formatDate } from '../../lib/utils';

export default function GlobalLeadsReport() {
  const { leads, loading, fetchLeads, exportLeadsCSV } = useAdminStore();
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    paymentType: '',
    qualification: '',
    affiliate_ref: '',
  });

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleApplyFilters = () => {
    fetchLeads({
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      paymentType: filters.paymentType || undefined,
      qualification: filters.qualification || undefined,
      affiliate_ref: filters.affiliate_ref || undefined,
    });
  };

  const handleClearFilters = () => {
    setFilters({ startDate: '', endDate: '', paymentType: '', qualification: '', affiliate_ref: '' });
    fetchLeads();
  };

  const handleExportCSV = () => {
    const csv = exportLeadsCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-global-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const qualifiedLeads = leads.filter((l) => l.total_paid > 0);
  const totalPaid = leads.reduce((sum, l) => sum + Number(l.total_paid || 0), 0);

  const metrics = [
    {
      label: 'Total de Leads',
      value: leads.length.toLocaleString('pt-BR'),
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Vendas Confirmadas',
      value: qualifiedLeads.length.toLocaleString('pt-BR'),
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Receita Total',
      value: formatCurrency(totalPaid),
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Ticket Médio',
      value: formatCurrency(qualifiedLeads.length > 0 ? totalPaid / qualifiedLeads.length : 0),
      icon: LayoutDashboard,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Relatório Global de Leads & Vendas
            </h2>
            <p className="text-sm text-gray-400">Visão geral de todo o tráfego, afiliados e conversões do sistema.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchLeads()}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
            <button
              onClick={handleExportCSV}
              disabled={leads.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1e222d] rounded-2xl p-6 border border-gray-800/50 flex items-center justify-between group hover:border-brand-primary/30 transition-all shadow-sm"
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
              <h3 className="text-lg font-bold text-white">Filtros Avançados</h3>
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
                className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                Filtrar Resultados
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Data Inicial</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters((p) => ({ ...p, startDate: e.target.value }))}
                className="w-full bg-[#161a23] border border-gray-700/50 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Data Final</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters((p) => ({ ...p, endDate: e.target.value }))}
                className="w-full bg-[#161a23] border border-gray-700/50 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Afiliado (REF)</label>
              <input
                type="text"
                placeholder="Ex: YrKVqav"
                value={filters.affiliate_ref}
                onChange={(e) => setFilters((p) => ({ ...p, affiliate_ref: e.target.value }))}
                className="w-full bg-[#161a23] border border-gray-700/50 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tipo Pagamento</label>
              <select
                value={filters.paymentType}
                onChange={(e) => setFilters((p) => ({ ...p, paymentType: e.target.value }))}
                className="w-full bg-[#161a23] border border-gray-700/50 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer appearance-none"
              >
                <option value="">Todos</option>
                <option value="license">Licença</option>
                <option value="withdrawal_fee">Taxa de Saque</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
              <select
                value={filters.qualification}
                onChange={(e) => setFilters((p) => ({ ...p, qualification: e.target.value }))}
                className="w-full bg-[#161a23] border border-gray-700/50 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer appearance-none"
              >
                <option value="">Todos</option>
                <option value="qualified">Pagos</option>
                <option value="new">Pendentes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-[#1e222d] rounded-2xl border border-gray-800/50 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-800/50">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Listagem de Leads & Conversões <span className="px-2 py-0.5 rounded-lg bg-gray-800/50 text-gray-400 text-sm font-mono tracking-tighter">({leads.length})</span>
            </h3>
          </div>

          <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#161a23]/50">
                  <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">USUÁRIO / TELEGRAM</th>
                  <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">ORIGEM / AFILIADO</th>
                  <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">UTM SOURCE</th>
                  <th className="text-center py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">STATUS</th>
                  <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">PAGAMENTOS</th>
                  <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">TOTAL PAGO</th>
                  <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">DATA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {loading && leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                        <span className="text-gray-500 font-medium">Buscando dados globais...</span>
                      </div>
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-10 h-10 text-gray-700" />
                        <span className="text-gray-500 font-medium">Nenhum lead encontrado para os filtros atuais.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="group hover:bg-[#161a23]/50 transition-all duration-200">
                      <td className="py-6 px-6 align-top">
                        <div className="min-w-[180px]">
                          {lead.profile ? (
                            <>
                              <p className="text-white text-sm font-bold">{lead.profile.full_name}</p>
                              <p className="text-xs text-gray-400">{lead.profile.email}</p>
                            </>
                          ) : (
                            <p className="text-white text-sm font-bold">Sem Registro no Site</p>
                          )}
                          <p className="text-[10px] text-blue-400/70 font-mono mt-1">
                            Tele: {lead.telegram_username ? `@${lead.telegram_username}` : (lead.telegram_name || 'Desconhecido')}
                          </p>
                        </div>
                      </td>
                      <td className="py-6 px-6 align-top">
                        <div className="flex flex-col gap-1">
                          {lead.affiliate_ref ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[11px] font-bold border border-purple-500/20 w-fit">
                              <LinkIcon className="w-3 h-3" />
                              {lead.affiliate_ref}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gray-500/10 text-gray-500 text-[11px] font-bold border border-gray-500/20 w-fit">
                              <MousePointer2 className="w-3 h-3" />
                              Direto / Orgânico
                            </span>
                          )}
                          {lead.utm_campaign && (
                            <span className="text-[10px] text-gray-500 truncate max-w-[120px]">
                              Camp: {lead.utm_campaign}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-6 px-6 align-top">
                        <span className="text-xs text-gray-400 font-mono">
                          {lead.utm_source || '—'}
                        </span>
                      </td>
                      <td className="py-6 px-6 align-top text-center">
                        {lead.total_paid > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                            <CheckCircle className="w-3 h-3" />
                            Pago
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                            <XCircle className="w-3 h-3" />
                            Pendente
                          </span>
                        )}
                      </td>
                      <td className="py-6 px-6 align-top">
                        <div className="min-w-[150px] space-y-1">
                          {lead.payments && lead.payments.length > 0 ? (
                            lead.payments.map((p, idx) => (
                              <p key={idx} className="text-[10px] text-gray-400">
                                {p.type === 'license' ? 'Licença' : 'Saque'}: <span className="text-gray-200">{formatCurrency(p.amount)}</span>
                              </p>
                            ))
                          ) : (
                            <p className="text-[10px] text-gray-600 italic">Sem vendas</p>
                          )}
                        </div>
                      </td>
                      <td className="py-6 px-6 align-top text-right">
                        <p className={`text-sm font-black ${lead.total_paid > 0 ? 'text-emerald-400' : 'text-gray-600'}`}>
                          {formatCurrency(lead.total_paid)}
                        </p>
                      </td>
                      <td className="py-6 px-6 align-top text-right">
                        <p className="text-gray-500 text-[10px] font-mono">
                          {formatDate(lead.created_at)}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
