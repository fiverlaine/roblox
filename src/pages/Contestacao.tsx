import { useState } from 'react';
import { FileText, Upload, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Contestacao() {
  const [justificativa, setJustificativa] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (justificativa.length < 10) return;
    
    setSaving(true);
    try {
      // Aqui seria feito o envio dos dados e imagens para o backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Sua contestação foi enviada e está em análise.');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao enviar contestação.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto pt-8 sm:pt-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <FileText className="text-white w-7 h-7" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white mb-0">
                  Contestação de Fraude
                </h1>
                <p className="text-blue-100 text-sm mb-0">
                  Envie provas de que suas atividades são legítimas
                </p>
              </div>
            </div>
          </div>
          <form className="p-5 sm:p-8 space-y-5" onSubmit={handleSubmit}>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-xs text-red-800 leading-relaxed mb-0">
                <strong>ATENÇÃO:</strong> Caso sua contestação seja analisada
                e julgada improcedente, a Roblox Vault reserva-se o direito de
                iniciar procedimentos legais com base nos dados cadastrados na
                sua conta, conforme previsto no Art. 171 do Código Penal
                (estelionato) e Lei nº 12.737/2012 (crimes cibernéticos).
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Explique sua versão dos fatos *
              </label>
              <textarea
                rows={5}
                placeholder="Descreva detalhadamente por que você acredita que não há irregularidade. Inclua informações sobre como adquiriu os Robux, se o cartão é de sua titularidade, etc."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none text-sm resize-none transition-colors"
                required
                minLength={10}
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">
                {justificativa.length} caracteres (mínimo 10)
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Envie provas (prints, comprovantes)
              </label>
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Selecionar imagens (0/5)
                </button>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={justificativa.length < 10 || saving}
              className="w-full py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl text-sm sm:text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {saving ? 'Enviando...' : 'Enviar Contestação'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
