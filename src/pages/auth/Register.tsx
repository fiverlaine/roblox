import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, Loader2, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';

export default function Register() {
  const navigate = useNavigate();
  const { signUp, loading } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-background-soft flex items-center justify-center p-lg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-xl">
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
          <h1 className="text-title font-bold text-text-inverse mb-xs">Criar Conta</h1>
          <p className="text-body text-text-inverse/80">Junte-se ao Roblox Vault</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background-primary rounded-xl p-xl shadow-soft"
        >
          <form onSubmit={handleSubmit} className="space-y-md">
            <div className="w-full">
              <label className="block text-body font-medium text-text-primary mb-xs">Nome</label>
              <div className="relative">
                <div className="absolute left-md top-1/2 -translate-y-1/2 text-ui-iconMuted">
                  <UserIcon size={20} />
                </div>
                <input
                  className="input w-full pl-12"
                  type="text"
                  placeholder="Seu nome"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

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
                  placeholder="Mínimo 6 caracteres"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-body font-medium text-text-primary mb-xs">Confirmar Senha</label>
              <div className="relative">
                <div className="absolute left-md top-1/2 -translate-y-1/2 text-ui-iconMuted">
                  <Lock size={20} />
                </div>
                <input
                  className="input w-full pl-12"
                  type="password"
                  placeholder="Digite novamente"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              className="btn btn-primary h-[52px] px-xl w-full mt-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <UserPlus size={20} />
                  Criar Conta
                </>
              )}
            </button>
          </form>

          <div className="mt-lg text-center">
            <p className="text-body text-text-secondary">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-brand-primary font-semibold hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
