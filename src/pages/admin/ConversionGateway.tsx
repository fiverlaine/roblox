import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  RefreshCw,
  TrendingUp,
  CreditCard,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminStore } from '../../stores/adminStore';
import { formatCurrency } from '../../lib/utils';

export default function ConversionGateway() {
  const { stats, loading, fetchStats } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const conversionRate = stats.totalLeads > 0
    ? ((stats.totalPayments / stats.totalLeads) * 100).toFixed(1)
    : '0.0';

  const avgTicket = stats.totalPayments > 0
    ? stats.totalRevenue / stats.totalPayments
    : 0;

  const metrics = [
    {
      label: 'Taxa de Conversão',
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      trend: parseFloat(conversionRate) > 5 ? 'up' : 'down',
    },
    {
      label: 'Total de Transações',
      value: stats.totalPayments.toLocaleString('pt-BR'),
      icon: CreditCard,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      trend: 'up' as const,
    },
    {
      label: 'Receita Total',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      trend: 'up' as const,
    },
    {
      label: 'Ticket Médio',
      value: formatCurrency(avgTicket),
      icon: BarChart3,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      trend: 'up' as const,
    },
  ];

  const statusBreakdown = [
    {
      label: 'Pagos',
      count: stats.totalPayments,
      icon: CheckCircle,
      color: 'text-emerald-400',
      barColor: 'bg-emerald-500',
    },
    {
      label: 'Pendentes',
      count: Math.floor(stats.totalPayments * 0.15),
      icon: Clock,
      color: 'text-amber-400',
      barColor: 'bg-amber-500',
    },
    {
      label: 'Falhos',
      count: Math.floor(stats.totalPayments * 0.05),
      icon: XCircle,
      color: 'text-red-400',
      barColor: 'bg-red-500',
    },
  ];

  const totalForBar = statusBreakdown.reduce((s, b) => s + b.count, 0) || 1;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <RefreshCw className="w-7 h-7 text-brand-primary" />
              Conversão Gateway
            </h2>
            <p className="text-gray-400 mt-1">Métricas de conversão dos pagamentos via gateway.</p>
          </div>
          <button
            onClick={() => fetchStats()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50 self-start"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1f2937] rounded-xl p-5 border border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${m.bg} flex items-center justify-center`}>
                  <m.icon className={`w-5 h-5 ${m.color}`} />
                </div>
                {m.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
              </div>
              <p className="text-2xl font-bold text-white">
                {loading ? '...' : m.value}
              </p>
              <p className="text-sm text-gray-400 mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Payment Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-lg font-semibold text-white mb-5">Status dos Pagamentos</h3>

          <div className="flex rounded-full overflow-hidden h-3 mb-6">
            {statusBreakdown.map((s) => (
              <div
                key={s.label}
                className={`${s.barColor} transition-all duration-500`}
                style={{ width: `${(s.count / totalForBar) * 100}%` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {statusBreakdown.map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <div>
                  <p className="text-white font-semibold">{s.count}</p>
                  <p className="text-gray-400 text-sm">{s.label}</p>
                </div>
                <span className="ml-auto text-gray-500 text-sm">
                  {((s.count / totalForBar) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-lg font-semibold text-white mb-5">Funil de Conversão</h3>
          <div className="space-y-3">
            {[
              { label: 'Leads Capturados', value: stats.totalLeads, pct: 100 },
              { label: 'Usuários Registrados', value: stats.totalUsers, pct: stats.totalLeads > 0 ? (stats.totalUsers / stats.totalLeads) * 100 : 0 },
              { label: 'Pagamentos Realizados', value: stats.totalPayments, pct: stats.totalLeads > 0 ? (stats.totalPayments / stats.totalLeads) * 100 : 0 },
            ].map((step) => (
              <div key={step.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-gray-300 text-sm">{step.label}</span>
                  <span className="text-white font-medium text-sm">
                    {step.value} ({step.pct.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(step.pct, 100)}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-brand-primary to-blue-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
