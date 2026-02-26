import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, loading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-background-soft flex items-center justify-center p-lg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-huge">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-block mb-2"
          >
            <img
              src="/assets/logo_icone-CoCIMuPm.png"
              alt="Logo"
              className="w-32 h-32 object-contain drop-shadow-2xl"
            />
          </motion.div>
          <h1 className="text-title font-bold text-text-inverse mb-xs">Roblox Vault</h1>
          <p className="text-body text-text-inverse/80">A melhor loja de Robux!</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background-primary rounded-xl p-xl shadow-soft"
        >
          <form onSubmit={handleSubmit} className="space-y-lg">
            <div className="w-full">
              <label className="block text-body font-medium text-text-primary mb-xs">Email</label>
              <div className="relative">
                <div className="absolute left-md top-1/2 -translate-y-1/2 text-ui-iconMuted">
                  <Mail size={20} />
                </div>
                <input
                  className="input w-full pl-12"
                  type="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-body font-medium text-text-primary mb-xs">Senha</label>
              <div className="relative">
                <div className="absolute left-md top-1/2 -translate-y-1/2 text-ui-iconMuted">
                  <Lock size={20} />
                </div>
                <input
                  className="input w-full pl-12"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              className="btn btn-primary h-[52px] px-xl w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-lg text-center">
            <p className="text-body text-text-secondary">
              Não tem uma conta?{' '}
              <Link to="/registro" className="text-brand-primary font-semibold hover:underline">
                Criar conta
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
