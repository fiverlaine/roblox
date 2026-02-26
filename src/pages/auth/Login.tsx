import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, loading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    try {
      await signIn(email, password);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Erro ao fazer login';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4678C0] via-[#ABDEFD] to-[#f7f9fc] flex items-center justify-center p-6 pb-20">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10"
        >
          <div className="inline-block mb-4">
            <img 
              src="/assets/logo_icone-CoCIMuPm.png" 
              alt="Logo" 
              className="w-32 h-32 object-contain drop-shadow-2xl" 
            />
          </div>
          <h1 className="text-3xl font-black text-white mb-1 drop-shadow-sm">Roblox Vault</h1>
          <p className="text-white/90 font-medium">A melhor loja de Robux!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="••••••••"
                  autoComplete="current-password"
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

            <button
              className="btn btn-primary h-14 px-xl w-full text-lg shadow-lg shadow-brand-primary/20"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-log-in"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" x2="3" y1="12" y2="12" />
                  </svg>
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              Não tem uma conta?{' '}
              <Link to="/registro" className="text-brand-primary font-bold hover:underline transition-all">
                Criar conta
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

