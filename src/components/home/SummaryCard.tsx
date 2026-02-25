import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useItemStore } from '../../stores/itemStore';

export default function SummaryCard() {
  const { userItems } = useItemStore();

  const activeCount = userItems.filter((i) => i.status === 'active').length;
  const soldCount = userItems.filter((i) => i.status === 'sold').length;
  const total = activeCount + soldCount;
  const sellRate = total > 0 ? Math.round((soldCount / total) * 100) : 0;

  return (
    <div className="mb-lg">
      <div className="flex items-center justify-between mb-md px-xs">
        <h2 className="text-title font-bold text-text-primary">Meu Resumo</h2>
      </div>
      <div className="group relative overflow-hidden rounded-[24px] bg-white border border-ui-border shadow-soft p-lg cursor-pointer transition-all duration-300 hover:shadow-medium hover:border-brand-primary/30">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <ShoppingBag className="w-24 h-24 text-brand-primary transform rotate-12 translate-x-4 -translate-y-4" />
        </div>
        <div className="flex items-center justify-between gap-md relative z-10">
          <div>
            <p className="text-caption text-text-secondary font-medium">Performance de Vendas</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-text-primary">{sellRate}%</span>
              <span className="text-xs text-text-secondary">taxa de venda</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
            <ArrowRight size={20} />
          </div>
        </div>
        <div className="mt-lg">
          <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-primary to-blue-400 relative transition-all duration-500"
              style={{ width: `${sellRate}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          <div className="mt-md grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-text-tertiary">Ativos</p>
              <p className="text-lg font-bold text-text-primary">{activeCount}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-text-tertiary">Vendidos</p>
              <p className="text-lg font-bold text-green-600">{soldCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

