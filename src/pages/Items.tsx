import { useEffect, useState } from 'react';
import {
  Package,
  Coins,
  Code,
  ArrowRightLeft,
  DollarSign,
  AlertCircle,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useItemStore } from '../stores/itemStore';
import { useAuthStore } from '../stores/authStore';
import { formatRobux } from '../lib/utils';
import SellItemModal from '../components/items/SellItemModal';
import type { UserItem } from '../lib/types';

export default function Items() {
  const navigate = useNavigate();
  const { profile } = useAuthStore();
  const { userItems, loading, fetchUserItems } = useItemStore();
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  const [selectedUserItem, setSelectedUserItem] = useState<UserItem | null>(null);
  const [skinCode, setSkinCode] = useState('');

  useEffect(() => {
    fetchUserItems();
  }, [fetchUserItems]);

  const activeItems = userItems.filter((ui) => ui.status === 'active');

  const handleSellClick = async (userItem: UserItem) => {
    if (!profile?.has_seller_pass) {
      setSellerModalOpen(true);
    } else {
      setSelectedUserItem(userItem);
    }
  };

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
                        <button 
                          onClick={() => handleSellClick(userItem)}
                          className="btn btn-ghost h-10 px-md text-body w-full bg-white hover:bg-green-50 text-gray-600 hover:text-green-700 border border-gray-200 hover:border-green-200 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-sm"
                        >
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

      {/* Modal Resgatar Skin */}
      <AnimatePresence>
        {redeemModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setRedeemModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
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
                  >
                    <X size={20} />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Código da Skin
                      </label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Ex: SKIN-1234-ABCD"
                        value={skinCode}
                        onChange={(e) => setSkinCode(e.target.value)}
                        autoFocus
                      />
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Seller Pass */}
      <AnimatePresence>
        {sellerModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSellerModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-yellow-50 to-white -z-0"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
              
              <button
                onClick={() => setSellerModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-10 backdrop-blur-sm"
              >
                <X size={20} />
              </button>

              <div className="p-8 relative z-0 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full transform scale-150"></div>
                  <img
                    src="/assets/icone_seller_pass-C63vdARS.png"
                    alt="Roblox Seller Pass"
                    className="w-40 h-40 object-contain relative z-10 drop-shadow-lg"
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                  Se torne um vendedor na plataforma
                </h2>
                
                <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4"></div>
                
                <p className="text-gray-500 font-medium mb-4">
                  Sua conta ainda não está habilitada para vendas.
                </p>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  Para desbloquear o poder de vender seus itens e começar a lucrar, você precisa adquirir o <span className="font-bold text-gray-900">Roblox Seller Pass</span> — sua licença oficial de vendedor na plataforma.
                </p>

                <div className="space-y-3 w-full">
                  <button
                    onClick={() => navigate('/licenca')}
                    className="btn btn-primary h-[52px] px-xl w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white border-0 shadow-lg shadow-orange-500/20 py-4 text-base font-bold transform hover:scale-[1.02] transition-all"
                  >
                    ADQUIRIR SELLER PASS
                  </button>
                  <button
                    onClick={() => setSellerModalOpen(false)}
                    className="btn btn-ghost h-[52px] px-xl w-full text-gray-400 hover:text-gray-600 hover:bg-transparent text-sm font-medium"
                  >
                    Agora não
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Modal Vender Item */}
      <SellItemModal 
        userItem={selectedUserItem}
        onClose={() => setSelectedUserItem(null)}
      />
    </>
  );
}

