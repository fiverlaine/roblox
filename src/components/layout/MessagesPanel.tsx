import { useEffect } from 'react';
import { X, Search, MessageCircle } from 'lucide-react';

interface MessagesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MessagesPanel({ isOpen, onClose }: MessagesPanelProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - fecha ao clicar */}
      <button
        type="button"
        aria-label="Fechar mensagens"
        onClick={onClose}
        className="fixed inset-0 bg-black/30 z-40 md:bg-black/20"
      />

      {/* Painel fixo à direita: abaixo do header, acima do bottom-nav no mobile */}
      <div
        className="fixed right-0 top-14 bottom-[90px] md:bottom-0 w-full md:w-[380px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100 overflow-hidden transition-transform duration-200 ease-out"
        role="dialog"
        aria-label="Mensagens"
      >
        <div className="flex flex-col h-full bg-white">
          {/* Cabeçalho */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <h2 className="text-xl font-bold text-gray-900">Mensagens</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Busca */}
          <div className="px-4 pb-2 pt-2 shrink-0">
            <div className="bg-gray-100 rounded-lg p-2 flex items-center gap-2 text-gray-500 cursor-text">
              <Search className="w-[18px] h-[18px] shrink-0" />
              <span className="text-sm">Pesquisar...</span>
            </div>
          </div>

          {/* Lista de conversas (estado vazio) */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col items-center justify-center h-64 text-center p-6 text-gray-400">
              <MessageCircle className="w-12 h-12 mb-3 opacity-20" />
              <p className="font-medium">Nenhuma conversa</p>
              <p className="text-xs mt-1">Suas conversas aparecerão aqui.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
