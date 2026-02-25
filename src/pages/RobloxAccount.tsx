import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Link2, 
  User as UserIcon, 
  Lock, 
  AlertCircle 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function RobloxAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);
    // Simular sincronização com mensagem de manutenção
    setTimeout(() => {
      setLoading(false);
      toast.error('O sistema de sincronização automática está em manutenção. Por favor, tente novamente mais tarde.');
    }, 2000);
  };

  return (
    <div className="container-app pb-huge">
      <div className="pt-md mb-lg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-title font-bold text-text-primary mb-xs">Conta Roblox</h1>
          <p className="text-body text-text-secondary">Sincronize sua conta do Roblox com a plataforma</p>
        </motion.div>
      </div>

      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-xl"
        >
          <div className="card bg-brand-primary/10 border-2 border-brand-primary/30">
            <div className="flex items-start gap-md">
              <div className="p-sm rounded-lg bg-brand-primary/20">
                <Gamepad2 className="text-brand-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-body font-bold text-text-primary mb-xs">Conecte sua conta do Roblox</h3>
                <p className="text-caption text-text-secondary leading-relaxed">
                  Para sincronizar sua conta, forneça suas credenciais do Roblox. Suas informações serão usadas apenas para vincular sua conta à plataforma.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card">
            <div className="flex items-center gap-md mb-lg">
              <div className="p-md rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary">
                <Link2 className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-subtitle font-bold text-text-primary">Sincronizar Conta</h2>
                <p className="text-caption text-text-secondary">Insira suas credenciais do Roblox</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-lg">
              <div>
                <label className="block text-body font-semibold text-text-primary mb-sm">
                  Nome de Usuário do Roblox
                </label>
                <div className="relative">
                  <div className="absolute left-md top-1/2 -translate-y-1/2 text-ui-iconMuted">
                    <UserIcon size={20} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input w-full pl-12"
                    placeholder="Digite seu username do Roblox"
                  />
                </div>
                <p className="text-caption text-text-secondary mt-xs">Seu nome de usuário do Roblox (sem @)</p>
              </div>

              <div>
                <label className="block text-body font-semibold text-text-primary mb-sm">
                  Senha do Roblox
                </label>
                <div className="relative">
                  <div className="absolute left-md top-1/2 -translate-y-1/2 text-ui-iconMuted">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input w-full pl-12"
                    placeholder="Digite sua senha"
                  />
                </div>
                <p className="text-caption text-text-secondary mt-xs">Sua senha do Roblox para autenticação</p>
              </div>

              <div className="flex items-start gap-sm p-md bg-background-secondary rounded-lg border border-ui-divider">
                <AlertCircle className="text-ui-icon mt-xxs flex-shrink-0" size={16} />
                <p className="text-caption text-text-secondary">
                  <strong className="text-text-primary">Importante:</strong> Nunca compartilhe suas credenciais do Roblox com terceiros. Utilizamos criptografia para proteger suas informações.
                </p>
              </div>

              <div className="pt-md">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full h-[52px]"
                >
                  <div className="flex items-center justify-center gap-sm">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Link2 size={20} />
                        <span>Sincronizar Conta</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-xl"
        >
          <div className="card bg-background-secondary">
            <h3 className="text-body font-bold text-text-primary mb-md">Por que preciso conectar minha conta?</h3>
            <div className="space-y-md text-caption text-text-secondary">
              <p>• Permite que você receba Robux diretamente na sua conta do Roblox</p>
              <p>• Facilita a verificação de transações e histórico</p>
              <p>• Garante que você é o proprietário legítimo da conta</p>
              <p>• Protege contra fraudes e uso indevido</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
