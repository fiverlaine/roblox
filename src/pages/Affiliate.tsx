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
  Link,
  MessageSquare,
  UserPlus,
} from 'lucide-react';
import { useAffiliateStore } from '../stores/affiliateStore';
import { useAuthStore } from '../stores/authStore';
import { formatCurrency, formatDate } from '../lib/utils';
import AffiliateNotifications from '../components/AffiliateNotifications';

export default function Affiliate() {
  const { profile } = useAuthStore();
  const { leads, stats, loading, fetchLeads, exportLeadsCSV } = useAffiliateStore();
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    paymentType: '',
    qualification: '',
    utmSource: '',
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
      utmSource: filters.utmSource || undefined,
    });
  };

  const handleClearFilters = () => {
    setFilters({ startDate: '', endDate: '', paymentType: '', qualification: '', utmSource: '' });
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

  const metrics = [
    {
      label: 'Iniciaram Bot',
      value: stats?.botStarters?.toLocaleString('pt-BR') || '0',
      subtitle: stats?.byUtm && stats.byUtm.length > 0 && !filters.utmSource && profile.affiliate_utms.length > 1 ? (
        <div className="mt-3 space-y-1.5 w-full">
          {stats.byUtm.map(u => (
            <div key={u.utm} className="flex justify-between items-center text-[10px] text-text-secondary font-medium">
              <span className="truncate mr-2 px-1.5 py-0.5 bg-background-secondary rounded text-text-primary/70">{u.utm}</span>
              <span className="text-text-primary font-bold">{u.botStarters}</span>
            </div>
          ))}
        </div>
      ) : null,
      icon: MessageSquare,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
    },
    {
      label: 'Entraram Grupo',
      value: stats?.groupJoiners?.toLocaleString('pt-BR') || '0',
      subtitle: stats?.byUtm && stats.byUtm.length > 0 && !filters.utmSource && profile.affiliate_utms.length > 1 ? (
        <div className="mt-3 space-y-1.5 w-full">
          {stats.byUtm.map(u => (
            <div key={u.utm} className="flex justify-between items-center text-[10px] text-text-secondary font-medium">
              <span className="truncate mr-2 px-1.5 py-0.5 bg-background-secondary rounded text-text-primary/70">{u.utm}</span>
              <span className="text-text-primary font-bold">{u.groupJoiners}</span>
            </div>
          ))}
        </div>
      ) : null,
      icon: UserPlus,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
    },
    {
      label: 'Cadastros',
      value: leads.length.toLocaleString('pt-BR'),
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Pagantes',
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
  ];

  return (
    <div className="space-y-6 pt-4" style={{ margin: '15px' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">
            Painel do Afiliado
          </h2>
          <p className="text-sm text-text-secondary">Acompanhe seus leads indicados e ganhos gerados através das suas UTMs.</p>
        </div>
        <div className="flex gap-2">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-background-primary text-text-secondary border border-ui-divider mr-2">
            <Link className="w-4 h-4 text-brand-primary" />
            Minhas UTMs: <span className="text-text-primary font-mono">{profile.affiliate_utms.join(', ')}</span>
          </div>
          <button
            onClick={() => fetchLeads()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-background-primary text-text-primary hover:bg-background-secondary transition-colors border border-ui-divider disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>
      </div>

      <div className="sm:hidden flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-background-primary text-text-secondary border border-ui-divider">
        <Link className="w-4 h-4 text-brand-primary min-w-4" />
        <span className="truncate">UTMs: <span className="text-text-primary font-mono">{profile.affiliate_utms.join(', ')}</span></span>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-background-primary rounded-2xl p-6 border border-ui-divider flex flex-col justify-start group hover:border-brand-primary/30 transition-all shadow-sm h-full"
          >
            <div className="flex items-start justify-between w-full">
              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">{m.label}</p>
                <p className="text-3xl font-bold text-text-primary tracking-tight">{m.value}</p>
              </div>
              <div className={`w-14 h-14 rounded-2xl ${m.bg} flex items-center justify-center transition-transform group-hover:scale-110 shrink-0`}>
                <m.icon className={`w-7 h-7 ${m.color}`} />
              </div>
            </div>
            {m.subtitle && (
              <div className="mt-auto pt-4 border-t border-ui-divider/50 w-full">
                {m.subtitle}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pushcut Notifications Config */}
      <AffiliateNotifications />

      {/* Filters */}
      <div className="bg-background-primary rounded-2xl p-6 border border-ui-divider shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-text-secondary" />
            <h3 className="text-lg font-bold text-text-primary">Filtros</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleClearFilters}
              className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors mr-2"
            >
              Limpar
            </button>
            <button
              onClick={handleApplyFilters}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold bg-brand-primary text-white hover:opacity-90 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              Aplicar
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">UTM</label>
            <select
              value={filters.utmSource}
              onChange={(e) => setFilters((p) => ({ ...p, utmSource: e.target.value }))}
              className="w-full bg-background-secondary border border-ui-divider rounded-xl py-3 px-4 text-text-primary text-sm focus:outline-none focus:border-brand-primary/50 transition-all appearance-none cursor-pointer"
            >
              <option value="">Todas UTMs</option>
              {profile.affiliate_utms.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Data Inicial</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters((p) => ({ ...p, startDate: e.target.value }))}
              className="w-full bg-background-secondary border border-ui-divider rounded-xl py-3 px-4 text-text-primary text-sm focus:outline-none focus:border-brand-primary/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Data Final</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters((p) => ({ ...p, endDate: e.target.value }))}
              className="w-full bg-background-secondary border border-ui-divider rounded-xl py-3 px-4 text-text-primary text-sm focus:outline-none focus:border-brand-primary/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Tipo de Pagamento</label>
            <select
              value={filters.paymentType}
              onChange={(e) => setFilters((p) => ({ ...p, paymentType: e.target.value }))}
              className="w-full bg-background-secondary border border-ui-divider rounded-xl py-3 px-4 text-text-primary text-sm focus:outline-none focus:border-brand-primary/50 transition-all appearance-none cursor-pointer"
            >
              <option value="">Todos</option>
              <option value="license">Licença</option>
              <option value="withdrawal_fee">Taxa de Saque</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Qualificação</label>
            <select
              value={filters.qualification}
              onChange={(e) => setFilters((p) => ({ ...p, qualification: e.target.value }))}
              className="w-full bg-background-secondary border border-ui-divider rounded-xl py-3 px-4 text-text-primary text-sm focus:outline-none focus:border-brand-primary/50 transition-all appearance-none cursor-pointer"
            >
              <option value="">Todos</option>
              <option value="qualified">Qualificados</option>
              <option value="new">Novos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-background-primary rounded-2xl border border-ui-divider overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-ui-divider">
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
            Meus Leads <span className="px-2 py-0.5 rounded-lg bg-background-secondary text-text-secondary text-sm font-mono tracking-tighter">({leads.length})</span>
          </h3>
          <button
            onClick={handleExportCSV}
            disabled={leads.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-states-success text-white hover:opacity-90 transition-all shadow-lg shadow-states-success/20 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>

        <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-background-secondary/50">
                <th className="text-left py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-widest whitespace-nowrap">TELEGRAM</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-widest whitespace-nowrap">USUÁRIO DA PLATAFORMA</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-widest whitespace-nowrap">DADOS PESSOAIS</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-widest whitespace-nowrap text-center">STATUS</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-widest whitespace-nowrap">PAGAMENTOS</th>
                <th className="text-right py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-widest whitespace-nowrap">TOTAL PAGO</th>
                <th className="text-right py-4 px-6 text-[10px] font-bold text-text-secondary uppercase tracking-widest whitespace-nowrap">VINCULADO EM</th>
                <th className="text-right py-4 px-6 text-[10px] font-bold text-brand-primary uppercase tracking-widest whitespace-nowrap">UTM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ui-divider">
              {loading && leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="w-8 h-8 text-brand-primary animate-spin" />
                      <span className="text-text-secondary font-medium">Buscando seus leads...</span>
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-10 h-10 text-ui-divider" />
                      <span className="text-text-secondary font-medium">Você ainda não tem leads vinculados às suas UTMs.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-background-secondary/30 transition-all duration-200">
                    <td className="py-6 px-6 align-top">
                      <div className="min-w-[140px]">
                        <p className="text-text-primary text-sm font-bold group-hover:text-brand-primary transition-colors">
                          {lead.telegram_username ? `@${lead.telegram_username}` : (lead.telegram_name || 'Usuário sem nome')}
                        </p>
                        <p className="text-[10px] text-text-secondary font-mono mt-1">ID: {lead.telegram_id ?? '-'}</p>
                      </div>
                    </td>
                    <td className="py-6 px-6 align-top">
                      <div className="min-w-[180px]">
                        {lead.profile ? (
                          <>
                            <p className="text-text-primary text-sm font-medium leading-tight">{lead.profile.full_name}</p>
                            <p className="text-xs text-text-secondary mt-1">{lead.profile.email}</p>
                          </>
                        ) : (
                          <span className="text-text-secondary text-xs italic">Perfil não encontrado</span>
                        )}
                      </div>
                    </td>
                    <td className="py-6 px-6 align-top">
                      <div className="min-w-[220px]">
                        {lead.profile && (
                          <div className="space-y-1 text-xs text-text-secondary font-medium leading-relaxed">
                            <p className="text-text-primary">{lead.profile.full_name}</p>
                            <p>{lead.profile.email}</p>
                            {lead.profile.phone && <p>{lead.profile.phone}</p>}
                            {lead.profile.cpf && <p className="font-mono text-[11px] bg-background-secondary inline-block px-1 rounded">CPF: {lead.profile.cpf}</p>}
                            {lead.profile.city && <p className="text-text-secondary">{lead.profile.city} / {lead.profile.state}</p>}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-6 px-6 align-top text-center">
                      {lead.total_paid > 0 ? (
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-states-success uppercase tracking-tight">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Qualificado
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-text-secondary uppercase tracking-tight opacity-70">
                          <XCircle className="w-3.5 h-3.5" />
                          Novo
                        </span>
                      )}
                    </td>
                    <td className="py-6 px-6 align-top">
                      <div className="min-w-[200px] space-y-2">
                        {lead.payments && lead.payments.length > 0 ? (
                          lead.payments.map((p, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-[11px] text-text-secondary font-medium">
                                {p.type === 'license' ? 'Licença' : 'Taxa de Saque'}: 
                                <span className="text-text-primary ml-2">{formatCurrency(p.amount)}</span>
                              </span>
                              <span className="text-[10px] text-text-secondary font-mono italic">
                                ({formatDate(p.created_at)})
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-text-secondary text-xs italic opacity-40">— Nenhum pagamento</span>
                        )}
                      </div>
                    </td>
                    <td className="py-6 px-6 align-top text-right">
                      <p className={`text-base font-black ${lead.total_paid > 0 ? 'text-states-success' : 'text-text-secondary'}`}>
                        {formatCurrency(lead.total_paid)}
                      </p>
                    </td>
                    <td className="py-6 px-6 align-top text-right">
                      <p className="text-text-secondary text-xs font-mono whitespace-nowrap group-hover:text-text-primary transition-colors">
                        {formatDate(lead.created_at)}
                      </p>
                    </td>
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
