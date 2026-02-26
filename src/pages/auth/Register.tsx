import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, Loader2, Eye, EyeOff, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';

export default function Register() {
  const navigate = useNavigate();
  const { signUp, loading } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error('Preencha todos os campos');
      return;
    }

    if (password.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    try {
      await signUp(email, password, fullName);
      toast.success('Conta criada com sucesso!');
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Erro ao criar conta';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4678C0] via-[#ABDEFD] to-[#f7f9fc] flex items-center justify-center p-6 pb-20">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-block mb-3">
            <img 
              src="/assets/logo_icone-CoCIMuPm.png" 
              alt="Logo" 
              className="w-32 h-32 object-contain drop-shadow-2xl" 
            />
          </div>
          <h1 className="text-3xl font-black text-white mb-1 drop-shadow-sm">Criar Conta</h1>
          <p className="text-white/90 font-medium">Junte-se ao Roblox Vault</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="w-full">
              <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">Nome</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <UserIcon size={20} />
                </div>
                <input
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-primary/20 outline-none text-gray-700 transition-all font-medium"
                  type="text"
                  placeholder="Seu nome"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-primary/20 outline-none text-gray-700 transition-all font-medium"
                  type="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">Senha</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  className="w-full h-14 pl-12 pr-12 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-primary/20 outline-none text-gray-700 transition-all font-medium"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">Confirmar Senha</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-primary/20 outline-none text-gray-700 transition-all font-medium"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite novamente"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              className="btn btn-primary h-14 px-xl w-full text-lg shadow-lg shadow-brand-primary/20"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <UserPlus size={20} strokeWidth={2.5} />
                  Criar Conta
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-2">
            <p className="text-gray-500 font-medium">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-brand-primary font-bold hover:underline transition-all">
                Entrar
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
