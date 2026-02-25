import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminStore } from '../../stores/adminStore';
import { useAuthStore } from '../../stores/authStore';
import { formatCurrency } from '../../lib/utils';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export default function Dashboard() {
  const { stats, loading, fetchStats } = useAdminStore();
  const { profile } = useAuthStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statCards = [
    {
      label: 'Total Usuários',
      value: stats.totalUsers.toLocaleString('pt-BR'),
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Total Leads',
      value: stats.totalLeads.toLocaleString('pt-BR'),
      icon: MessageSquare,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Pagamentos',
      value: stats.totalPayments.toLocaleString('pt-BR'),
      icon: CreditCard,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Receita Total',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1f2937] border border-gray-700/50 rounded-2xl p-8 shadow-lg relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2">
              Bem-vindo, {profile?.full_name ?? 'Admin'}! 👋
            </h2>
            <p className="text-gray-400 text-base max-w-2xl">
              Aqui está uma visão consolidada do desempenho da plataforma Roblox Vault nos últimos dias.
            </p>
          </div>
          <div className="absolute right-[-20px] top-[-20px] opacity-[0.03] rotate-12 pointer-events-none">
            <TrendingUp size={160} />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-[#1f2937] rounded-2xl p-6 border border-gray-700/50 shadow-md hover:border-gray-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <TrendingUp className="w-3 h-3" />
                  <span>Crescendo</span>
                </div>
              </div>
              <div>
                <p className="text-3xl font-black text-white tracking-tight leading-none mb-1">
                  {loading ? '...' : card.value}
                </p>
                <p className="text-sm font-medium text-gray-400">{card.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1f2937] rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Receita nos Últimos 30 Dias
          </h3>
          {stats.paymentsOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.paymentsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#6B7280"
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(d: string) => d.slice(5)}
                />
                <YAxis
                  stroke="#6B7280"
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(v: number) => `R$${v}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value: unknown) => [formatCurrency(Number(value)), 'Receita']}
                  labelFormatter={(label: unknown) => `Data: ${String(label)}`}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4678C0"
                  strokeWidth={2}
                  dot={{ fill: '#4678C0', r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              {loading ? 'Carregando dados...' : 'Nenhum dado de pagamento disponível'}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}
