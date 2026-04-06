import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Search, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAdminStore } from '../../stores/adminStore';
import { formatDate } from '../../lib/utils';
import type { Profile } from '../../lib/types';
import toast from 'react-hot-toast';

export default function Users() {
  const { users, loading, fetchUsers, updateUser } = useAdminStore();
  const [search, setSearch] = useState('');
  
  // Modal states
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [affiliateSettings, setAffiliateSettings] = useState({
    is_affiliate: false,
    affiliate_ref: '' as string,
    saque_recusado_fraude: false,
  });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (editingUser) {
      setAffiliateSettings({
        is_affiliate: editingUser.is_affiliate || false,
        affiliate_ref: editingUser.affiliate_ref || '',
        saque_recusado_fraude: editingUser.saque_recusado_fraude || false,
      });
    }
  }, [editingUser]);

  const handleSearch = () => {
    fetchUsers(search || undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const generateRef = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setAffiliateSettings(s => ({ ...s, affiliate_ref: result }));
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      await updateUser(editingUser.id, {
        is_affiliate: affiliateSettings.is_affiliate,
        affiliate_ref: affiliateSettings.is_affiliate ? (affiliateSettings.affiliate_ref || null) : null,
        saque_recusado_fraude: affiliateSettings.saque_recusado_fraude,
      });
      toast.success('Configurações de afiliado salvas com sucesso!');
      setEditingUser(null);
    } catch (error) {
      toast.error('Erro ao salvar as configurações.');
      console.error(error);
    } finally {
      setSaving(false);
    }
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
                    Licenças
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Afiliado
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Cadastro
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {loading && users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      Carregando usuários...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const hasLicense = user.has_seller_pass || user.payments?.some(p => p.type === 'license');
                    const hasWithdrawalFee = user.payments?.some(p => p.type === 'withdrawal_fee');
                    
                    return (
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
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            {hasLicense ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase bg-emerald-400/5 px-2 py-0.5 rounded border border-emerald-400/10">
                                <CheckCircle className="w-2.5 h-2.5" />
                                Premium
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase bg-gray-500/5 px-2 py-0.5 rounded border border-gray-500/10">
                                <XCircle className="w-2.5 h-2.5" />
                                S/ Licença
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {hasWithdrawalFee ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 uppercase bg-blue-400/5 px-2 py-0.5 rounded border border-blue-400/10">
                                <CheckCircle className="w-2.5 h-2.5" />
                                Taxa Saque
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase bg-gray-500/5 px-2 py-0.5 rounded border border-gray-500/10">
                                <XCircle className="w-2.5 h-2.5" />
                                S/ Taxa
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {user.is_affiliate ? (
                          <div className="inline-flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">ATIVO</span>
                            <span className="text-[10px] font-mono text-purple-400/60 uppercase">REF: {user.affiliate_ref}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-600 uppercase">Não</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-400 text-xs font-medium bg-gray-800/50 inline-block px-2.5 py-1 rounded-lg border border-gray-700/50">
                          {formatDate(user.created_at)}
                        </p>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="px-3 py-1.5 rounded bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 text-xs font-medium transition-colors border border-brand-primary/20"
                        >
                          Configurar
                        </button>
                      </td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1f2937] rounded-2xl w-full max-w-md border border-gray-700/50 shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="text-xl font-bold text-white">Configurar Usuário</h3>
              <p className="text-sm text-gray-400 mt-1">{editingUser.full_name}</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Aprovar como Afiliado</h4>
                  <p className="text-xs text-gray-400">Permite que o usuário acesse o painel /affiliate</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={affiliateSettings.is_affiliate}
                    onChange={(e) => setAffiliateSettings(s => ({ ...s, is_affiliate: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                </label>
              </div>

              {affiliateSettings.is_affiliate && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white block">Código Ref do Afiliado</label>
                  <p className="text-xs text-gray-400">Defina um código único ou gere um aleatório (7 caracteres). Este código será usado como <code className="bg-gray-800 px-1 rounded text-brand-primary">&ref=CODIGO</code> na URL.</p>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={affiliateSettings.affiliate_ref}
                      onChange={(e) => setAffiliateSettings(s => ({ ...s, affiliate_ref: e.target.value }))}
                      placeholder="Ex: aB3xKz7"
                      maxLength={10}
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white text-sm font-mono focus:border-brand-primary focus:outline-none"
                    />
                    <button
                      onClick={generateRef}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Gerar
                    </button>
                  </div>

                  {affiliateSettings.affiliate_ref && (
                    <div className="mt-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1.5">URL modelo do afiliado:</p>
                      <p className="text-xs text-brand-primary font-mono break-all select-all">
                        https://seusite.com/redirect.html?utm_source=FB&amp;utm_campaign={'{{campaign.name}}'}&amp;ref={affiliateSettings.affiliate_ref}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <hr className="border-gray-700/50" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-red-500">Bloqueio Antifraude (Recusa de Saque)</h4>
                  <p className="text-xs text-gray-400">Ativa o modal global de segurança antifraude bloqueando a conta.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={affiliateSettings.saque_recusado_fraude}
                    onChange={(e) => setAffiliateSettings(s => ({ ...s, saque_recusado_fraude: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700/50 flex justify-end gap-3 bg-[#1a2332]">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveUser}
                disabled={saving}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
                Salvar Configurações
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
