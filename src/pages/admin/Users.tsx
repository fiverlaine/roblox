import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Search, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminStore } from '../../stores/adminStore';
import { formatCurrency, formatRobux, formatDate } from '../../lib/utils';

export default function Users() {
  const { users, loading, fetchUsers } = useAdminStore();
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = () => {
    fetchUsers(search || undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <UsersIcon className="w-7 h-7 text-brand-primary" />
              Gerenciamento de Usuários
            </h2>
            <p className="text-gray-400 mt-1">
              {users.length} usuário{users.length !== 1 ? 's' : ''} encontrado{users.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => fetchUsers(search || undefined)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50 self-start"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>

        {/* Search */}
        <div className="bg-[#1f2937] rounded-xl p-4 border border-gray-700/50">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-brand-primary"
                placeholder="Buscar por nome ou email..."
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1f2937] rounded-xl border border-gray-700/50 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Saldos
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Cadastro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {loading && users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-500">
                      Carregando usuários...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-500">
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800/40 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full border-2 border-brand-primary/10 bg-brand-primary/5 flex items-center justify-center text-brand-primary font-bold text-sm shrink-0 transition-transform group-hover:scale-105">
                            {user.full_name?.charAt(0)?.toUpperCase() ?? '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white text-sm font-semibold truncate leading-tight">{user.full_name}</p>
                            <p className="text-gray-500 text-xs truncate mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-500 text-[10px] font-bold">R$</span>
                            <span className="text-white text-sm font-mono font-medium">{formatRobux(user.robux_balance)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-emerald-400 text-xs font-semibold">
                              {formatCurrency(user.real_balance)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {user.has_seller_pass ? (
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                            <CheckCircle className="w-3 h-3" />
                            Premiado
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-700/50 px-3 py-1.5 rounded-full border border-gray-600/20">
                            <XCircle className="w-3 h-3" />
                            Padrão
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-400 text-xs font-medium bg-gray-800/50 inline-block px-2.5 py-1 rounded-lg border border-gray-700/50">
                          {formatDate(user.created_at)}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
