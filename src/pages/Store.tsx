import { useEffect, useState } from 'react';
import { Search, Coins, Sparkles, TrendingUp, ShoppingBag, Filter } from 'lucide-react';
import PurchaseModal from '../components/store/PurchaseModal';
import { useItemStore } from '../stores/itemStore';
import { useAuthStore } from '../stores/authStore';
import { formatRobux } from '../lib/utils';
import type { Item } from '../lib/types';

const CATEGORIES = [
  { key: '', label: 'Todos' },
  { key: 'Limited', label: 'Limitados' },
  { key: 'Avatar', label: 'Roupas' },
  { key: 'Accessory', label: 'Acessórios' },
];

export default function Store() {
  const { items, loading, loadingMore, totalPages, currentPage, fetchItems, loadMoreItems } = useItemStore();
  const { profile } = useAuthStore();
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchItems(category || undefined, search || undefined, 1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search, category, fetchItems]);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
        <div className="relative bg-white border-b border-gray-100 pt-8 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 p-12 bg-brand-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} /> Loja Oficial
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Explore Itens Raros</h1>
                <p className="text-gray-500 text-lg">Atualize seu avatar com os melhores itens da comunidade.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-lg border border-white/50 shadow-lg p-5 rounded-2xl min-w-[280px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Seu Saldo Disponível</span>
                  <div className="bg-green-100 text-green-700 p-1.5 rounded-lg">
                    <TrendingUp size={16} />
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <Coins size={24} className="text-brand-accent mb-1 fill-current" />
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">
                    {formatRobux(profile?.robux_balance ?? 0)}
                  </span>
                  <span className="text-sm font-medium text-gray-400 mb-1.5">Robux</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Busque por nome, criador ou tipo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-sm outline-none text-gray-700"
                  />
                </div>
                
                <div className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-gray-200 shadow-sm min-w-[220px]">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                    <Coins size={16} className="text-brand-primary" />
                    <span>Faixa de Preço:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary transition-colors" />
                    <span className="text-gray-400 font-medium">-</span>
                    <input type="number" placeholder="Max" className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <button className="btn btn-primary h-10 px-md text-body w-full mt-1 flex justify-center items-center gap-2">
                    <Filter size={14} /> Filtrar
                  </button>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                {CATEGORIES.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setCategory(key)}
                    className={
                      category === key
                        ? 'px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all bg-gray-900 text-white shadow-md transform scale-105'
                        : 'px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8 pb-10">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-3 shadow-sm animate-pulse">
                  <div className="aspect-square rounded-xl bg-gray-100 mb-3" />
                  <div className="h-4 w-3/4 rounded bg-gray-100 mb-2" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={40} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Nenhum item encontrado</h3>
              <p className="text-gray-500">Tente ajustar sua busca ou filtros</p>
            </div>
          ) : (
            <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-brand-primary/20 cursor-pointer"
                >
                  <div className="aspect-square rounded-xl bg-gray-50 mb-3 overflow-hidden relative">
                    <img
                      src={item.image_url || '/placeholder.png'}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-brand-primary/5');
                        if (e.currentTarget.parentElement && !e.currentTarget.parentElement.querySelector('.fallback-icon')) {
                          const fallback = document.createElement('div');
                          fallback.className = "fallback-icon w-12 h-12 rounded-2xl bg-brand-primary/10";
                          e.currentTarget.parentElement.appendChild(fallback);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <button className="btn btn-primary h-10 px-md text-body shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        Comprar Agora
                      </button>
                    </div>
                    {item.rarity && (
                      <span className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        {item.rarity}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight min-h-[2.5em]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      por <span className="font-medium text-brand-primary truncate">{item.creator ?? 'Roblox Vault'}</span>
                    </p>
                    <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-2">
                      <div className="flex items-center gap-1.5 bg-brand-secondary/20 px-2.5 py-1 rounded-lg">
                        <Coins size={14} className="text-brand-primary" />
                        <span className="text-sm font-bold text-brand-primary">
                          {formatRobux(item.price_robux)}
                        </span>
                      </div>
                      <button className="md:hidden bg-brand-primary text-white p-2 rounded-lg">
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {currentPage < totalPages && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => loadMoreItems()}
                  disabled={loadingMore}
                  className="btn btn-primary h-12 px-8 rounded-xl font-semibold disabled:opacity-60"
                >
                  {loadingMore ? 'Carregando...' : 'Carregar mais'}
                </button>
              </div>
            )}
            </>
          )}
        </div>

      <PurchaseModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

