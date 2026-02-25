import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  CreditCard,
  DollarSign,
  RefreshCw,
  Download,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  FileText,
  Star,
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminStore } from '../../stores/adminStore';
import { formatCurrency, formatDate } from '../../lib/utils';

export default function TelegramAnalytics() {
  const { leads, loading, fetchLeads, exportLeadsCSV } = useAdminStore();
  const [showDocs, setShowDocs] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    paymentType: '',
    qualification: '',
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
    link.download = `leads-telegram-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const qualifiedLeads = leads.filter((l) => l.status === 'qualified');
  const totalPaid = leads.reduce((sum, l) => sum + l.total_paid, 0);
  const leadsWithPayments = leads.filter((l) => l.total_paid > 0);

  const metrics = [
    {
      label: 'Total de Leads',
      value: leads.length.toLocaleString('pt-BR'),
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Leads Qualificados',
      value: qualifiedLeads.length.toLocaleString('pt-BR'),
      icon: Star,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Total de Pagamentos',
      value: leadsWithPayments.length.toLocaleString('pt-BR'),
      icon: CreditCard,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Receita Total',
      value: formatCurrency(totalPaid),
      icon: DollarSign,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-brand-primary" />
              Analytics do Telegram
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDocs(!showDocs)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              <FileText className="w-4 h-4" />
              {showDocs ? 'Ocultar' : 'Mostrar'} Documentação
            </button>
            <button
              onClick={() => fetchLeads()}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
          </div>
        </div>

        {/* Docs Panel */}
        {showDocs && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-5"
          >
            <h3 className="text-white font-semibold mb-2">Documentação da API</h3>
            <p className="text-gray-400 text-sm">
              Os leads são capturados automaticamente quando usuários iniciam o bot do Telegram.
              Parâmetros UTM são extraídos do link de início e armazenados para rastreamento.
              A qualificação acontece quando o lead realiza um pagamento.
            </p>
          </motion.div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1f2937] rounded-xl p-5 border border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${m.bg} flex items-center justify-center`}>
                  <m.icon className={`w-5 h-5 ${m.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{m.value}</p>
              <p className="text-sm text-gray-400 mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-[#1f2937] rounded-xl p-5 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-brand-primary" />
            <h3 className="text-white font-semibold">Filtros</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Data Inicial</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters((p) => ({ ...p, startDate: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-brand-primary [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Data Final</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters((p) => ({ ...p, endDate: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-brand-primary [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Tipo de Pagamento</label>
              <select
                value={filters.paymentType}
                onChange={(e) => setFilters((p) => ({ ...p, paymentType: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-brand-primary"
              >
                <option value="">Todos</option>
                <option value="license">Licença</option>
                <option value="withdrawal_fee">Taxa de Saque</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Qualificação</label>
              <select
                value={filters.qualification}
                onChange={(e) => setFilters((p) => ({ ...p, qualification: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-brand-primary"
              >
                <option value="">Todos</option>
                <option value="qualified">Qualificados</option>
                <option value="new">Novos</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              Limpar
            </button>
            <button
              onClick={handleApplyFilters}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              Aplicar
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-[#1f2937] rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Leads ({leads.length})</h3>
            <button
              onClick={handleExportCSV}
              disabled={leads.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Telegram
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Usuário da Plataforma
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Dados Pessoais
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Total Pago
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Vinculado Em
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {loading && leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      Carregando leads...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      Nenhum lead encontrado
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-800/50 transition-colors">
                      {/* Telegram */}
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-white text-sm font-medium">
                            @{lead.telegram_username ?? 'sem_username'}
                          </p>
                          <p className="text-gray-500 text-xs">
                            ID: {lead.telegram_id ?? '-'}
                          </p>
                        </div>
                      </td>
                      {/* Platform User */}
                      <td className="py-3 px-4">
                        {lead.profile ? (
                          <div>
                            <p className="text-white text-sm">{lead.profile.full_name}</p>
                            <p className="text-gray-500 text-xs">{lead.profile.email}</p>
                          </div>
                        ) : (
                          <span className="text-gray-600 text-sm">Não vinculado</span>
                        )}
                      </td>
                      {/* Personal Data */}
                      <td className="py-3 px-4">
                        {lead.profile ? (
                          <div className="space-y-0.5 text-xs text-gray-400">
                            <p>{lead.profile.full_name}</p>
                            <p>{lead.profile.email}</p>
                            {lead.profile.phone && <p>{lead.profile.phone}</p>}
                            {lead.profile.cpf && <p>CPF: {lead.profile.cpf}</p>}
                            {lead.profile.city && <p>{lead.profile.city}</p>}
                          </div>
                        ) : (
                          <span className="text-gray-600 text-xs">-</span>
                        )}
                      </td>
                      {/* Status */}
                      <td className="py-3 px-4">
                        {lead.status === 'qualified' ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Qualificado
                          </span>
                        ) : lead.status === 'registered' ? (
                          <span className="inline-flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Registrado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-700/50 px-2.5 py-1 rounded-full">
                            <XCircle className="w-3.5 h-3.5" />
                            Novo
                          </span>
                        )}
                      </td>
                      {/* Total Paid */}
                      <td className="py-3 px-4">
                        <p className={`text-sm font-medium ${lead.total_paid > 0 ? 'text-emerald-400' : 'text-gray-500'}`}>
                          {formatCurrency(lead.total_paid)}
                        </p>
                      </td>
                      {/* Date */}
                      <td className="py-3 px-4">
                        <p className="text-gray-400 text-sm whitespace-nowrap">
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
