import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Pen,
  Coins,
  DollarSign,
  Shield,
  CreditCard,
  Phone,
  Calendar,
  LogOut,
  Award,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';
import { formatCurrency, formatRobux, formatCPF, formatPhone } from '../lib/utils';

const MONTHS_PT = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

function formatDatePt(iso: string | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getDate()} de ${MONTHS_PT[d.getMonth()]} de ${d.getFullYear()}`;
}

export default function Profile() {
  const { profile, signOut } = useAuthStore();
  const navigate = useNavigate();
  if (!profile) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch {
      toast.error('Erro ao sair da conta');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
        <div className="bg-gray-900 h-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-gray-900"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container-app px-4 -mt-24 relative z-10 max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                  <img
                    src={profile.avatar_url || '/assets/avatar-DZBXmQLv.webp'}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="absolute bottom-0 right-0 p-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow-md text-gray-600 transition-all border border-white"
                  title="Editar Perfil"
                >
                  <Pen size={16} />
                </button>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {profile.full_name || 'Usuário'}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1 rounded-full text-sm">
                <Mail size={14} />
                <span>{profile.email}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
                <Coins size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatRobux(profile.robux_balance)}</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Saldo em Robux</p>
            </div>
            <button 
              onClick={() => navigate('/carteira')}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:border-green-300 transition-colors"
            >
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2">
                <DollarSign size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(profile.real_balance)}</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Saldo em Reais</p>
            </button>
          </div>

          {profile.has_seller_pass && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-500/30 text-yellow-400">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-0.5 flex items-center gap-2">
                      Roblox Seller Pass
                      <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30 font-bold uppercase tracking-wider">Ativo</span>
                    </h3>
                    <p className="text-gray-400 text-sm">Membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!profile.has_seller_pass && (
            <div className="mb-6">
              <div 
                onClick={() => navigate('/licenca')}
                className="w-full bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between gap-4 transition-colors hover:border-brand-primary/30 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100 text-gray-400">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Sem Licença Ativa</h3>
                    <p className="text-gray-500 text-sm">Adquira o Seller Pass para vender</p>
                  </div>
                </div>
                <div className="btn btn-primary h-10 px-md text-body flex items-center justify-center cursor-pointer">
                  Adquirir
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <User size={20} className="text-blue-600" />
              <h3 className="font-bold text-gray-900 text-lg">Informações Pessoais</h3>
            </div>
            
            <div className="space-y-5">
              <div className="w-full">
                <label className="block text-body font-medium text-text-primary mb-xs">Nome Completo</label>
                <div className="relative">
                  <div className="absolute left-md top-1/2 -translate-y-1/2 text-ui-iconMuted">
                    <User size={18} />
                  </div>
                  <input
                    className="input w-full pl-12 bg-gray-50 border-gray-100"
                    disabled
                    value={profile.full_name || ''}
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-body font-medium text-text-primary mb-xs">Email</label>
                <div className="relative">
                  <div className="absolute left-md top-1/2 -translate-y-1/2 text-ui-iconMuted">
                    <Mail size={18} />
                  </div>
                  <input
                    className="input w-full pl-12 bg-gray-50 border-gray-100 opacity-70"
                    disabled
                    value={profile.email || ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="w-full">
                  <label className="block text-body font-medium text-text-primary mb-xs">CPF</label>
                  <div className="relative">
                    <div className="absolute left-md top-1/2 -translate-y-1/2 text-ui-iconMuted">
                      <CreditCard size={18} />
                    </div>
                    <input
                      className="input w-full pl-12 bg-gray-50 border-gray-100"
                      disabled
                      placeholder="000.000.000-00"
                      value={profile.cpf ? formatCPF(profile.cpf) : ''}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-body font-medium text-text-primary mb-xs">Telefone</label>
                  <div className="relative">
                    <div className="absolute left-md top-1/2 -translate-y-1/2 text-ui-iconMuted">
                      <Phone size={18} />
                    </div>
                    <input
                      className="input w-full pl-12 bg-gray-50 border-gray-100"
                      disabled
                      placeholder="(00) 00000-0000"
                      value={profile.phone ? formatPhone(profile.phone) : ''}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm py-2">
              <Calendar size={14} />
              <span>Membro desde {formatDatePt(profile.created_at)}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full py-4 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium flex items-center justify-center gap-2 text-sm"
            >
              <LogOut size={18} />
              Sair da Conta
            </button>
          </div>
        </div>
      </div>
  );
}
