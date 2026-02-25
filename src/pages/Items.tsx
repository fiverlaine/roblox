import { useEffect, useState } from 'react';
import {
  Package,
  Coins,
  Code,
  ArrowRightLeft,
  DollarSign,
  AlertCircle,
  X,
  Search,
} from 'lucide-react';
import { useItemStore } from '../stores/itemStore';
import { formatRobux } from '../lib/utils';

export default function Items() {
  const { userItems, loading, fetchUserItems } = useItemStore();
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [skinCode, setSkinCode] = useState('');

  useEffect(() => {
    fetchUserItems();
  }, [fetchUserItems]);

  const activeItems = userItems.filter((ui) => ui.status === 'active');

  return (
    <>
    <div className="min-h-screen bg-gray-50 pb-20">
        <div className="w-full bg-gray-900 shadow-sm">
          <img src="/assets/banner_loja-C3jkUOGT.png" alt="Banner Loja" className="w-full h-auto block" />
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Seu Inventário</h1>
              <p className="text-gray-500">Gerencie seus itens e converta em dinheiro real.</p>
              <button
                type="button"
                onClick={() => setRedeemModalOpen(true)}
                className="h-10 px-4 rounded-xl text-body mt-3 flex items-center justify-center mx-auto md:mx-0 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium transition-all"
              >
                <Code size={16} className="mr-2" />
                Digitar código Skin
              </button>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-xl border border-gray-200">
              <div className="bg-white p-2 rounded-lg shadow-sm text-brand-primary">
                <Package size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider text-left">
                  Total de Itens
                </span>
                <span className="text-xl font-bold text-gray-900 leading-none text-left">
                  {activeItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all">
            <div className="shrink-0 bg-orange-100 text-orange-600 p-2 rounded-full">
              <AlertCircle size={20} />
            </div>
            <span className="text-sm font-semibold text-orange-900 flex-1">
              Sincronize sua conta do roblox para trazer seus itens de lá também!
            </span>
            <ArrowRightLeft size={18} className="text-orange-400" />
          </div>
        </div>

        <div className="container mx-auto px-4 pb-10">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-white rounded-[20px] p-4 shadow-sm animate-pulse">
                  <div className="aspect-square rounded-2xl bg-gray-100 mb-4" />
                  <div className="h-4 w-3/4 rounded bg-gray-100 mb-2" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          ) : activeItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={40} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Nenhum item encontrado</h3>
              <p className="text-gray-500">Seu inventário está vazio</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {activeItems.map((userItem) => {
                const item = userItem.item;
                if (!item) return null;

                return (
                  <div
                    key={userItem.id}
                    className="group bg-white rounded-[20px] p-4 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-100 relative overflow-hidden"
                  >
                    <div className="aspect-square rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 mb-4 overflow-hidden relative flex items-center justify-center group-hover:from-gray-100 group-hover:to-gray-200 transition-colors">
                      <img
                        src={item.image_url || '/placeholder.png'}
                        alt={item.name}
                        className="w-[85%] h-[85%] object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-sm"
                      />
                      {item.rarity && (
                        <span className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg border border-white/10">
                          {item.rarity}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-gray-800 leading-tight line-clamp-2 min-h-[2.5rem]" title={item.name}>
                          {item.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                          <Coins size={14} className="text-blue-600 fill-blue-600" />
                          <span className="text-sm font-bold text-blue-700">
                            {formatRobux(item.price_robux)}
                          </span>
                        </div>
                        <div className="text-[10px] md:text-xs font-medium text-gray-400">
                          ≈ R$ {(item.price_robux * 0.05).toFixed(2)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 pt-2">
                        <button className="btn btn-primary h-10 px-md text-body w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 shadow-md shadow-blue-500/20 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]">
                          <ArrowRightLeft size={16} className="mr-2" />
                          Transferir p/ conta
                        </button>
                        <button className="btn btn-ghost h-10 px-md text-body w-full bg-white hover:bg-green-50 text-gray-600 hover:text-green-700 border border-gray-200 hover:border-green-200 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-sm">
                          <DollarSign size={16} className="mr-2" />
                          Vender Item
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal Resgatar Skin - igual ao itens.html */}
      {redeemModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setRedeemModalOpen(false)}
          role="dialog"
          aria-label="Resgatar Skin"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Code size={24} className="text-brand-primary" />
                  Resgatar Skin
                </h2>
                <button
                  type="button"
                  onClick={() => setRedeemModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                  aria-label="Fechar"
                >
                  <X size={20} />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: chamar API para resgatar skin pelo código
                  setRedeemModalOpen(false);
                  setSkinCode('');
                }}
              >
                <div className="space-y-4 mb-6">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Digite o código da skin para adicioná-la ao seu inventário.
                    </p>
                  </div>
                  <div className="w-full">
                    <label className="block text-body font-medium text-text-primary mb-xs">
                      Código da Skin
                    </label>
                    <div className="relative">
                      <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        className="input w-full pl-12"
                        placeholder="Ex: SKIN-1234-ABCD"
                        value={skinCode}
                        onChange={(e) => setSkinCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary h-[52px] px-xl w-full"
                >
                  Buscar Skin
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

