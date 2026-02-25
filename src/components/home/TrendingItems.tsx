import { useNavigate } from 'react-router-dom';
import { Sparkles, Coins, ArrowRight } from 'lucide-react';
import { useItemStore } from '../../stores/itemStore';
import { formatRobux } from '../../lib/utils';

export default function TrendingItems() {
  const navigate = useNavigate();
  const { featuredItems } = useItemStore();

  if (featuredItems.length === 0) return null;

  return (
    <div className="mb-xl">
      <div className="flex items-center justify-between mb-md px-xs">
        <div className="flex items-center gap-sm">
          <Sparkles size={20} className="text-brand-primary" />
          <h2 className="text-title font-bold text-text-primary">Em Alta</h2>
        </div>
        <button
          onClick={() => navigate('/loja')}
          className="btn btn-ghost h-10 px-md text-body text-brand-primary font-semibold hover:bg-brand-primary/5 cursor-pointer"
        >
          Ver tudo <ArrowRight size={14} className="ml-1" />
        </button>
      </div>
      
      <div className="relative -mx-lg">
        <div className="flex gap-md overflow-x-auto scrollbar-hide pb-lg px-lg snap-x snap-mandatory scroll-px-lg pt-2">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="min-w-[160px] w-[160px] flex-shrink-0 snap-start bg-white rounded-2xl p-sm shadow-sm hover:shadow-xl hover:shadow-brand-primary/10 transition-all duration-300 border border-transparent hover:border-brand-primary/10"
            >
              <div className="aspect-square bg-background-secondary rounded-xl mb-sm overflow-hidden relative group">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-brand-primary/5');
                      if (e.currentTarget.parentElement) {
                        const fallback = document.createElement('div');
                        fallback.className = "w-12 h-12 rounded-2xl bg-brand-primary/10";
                        e.currentTarget.parentElement.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand-primary/5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>
              <h3 className="text-caption font-bold text-text-primary mb-xxs line-clamp-2 min-h-[2.4em] leading-tight">
                {item.name}
              </h3>
              <div className="flex items-center justify-between mt-xs">
                <div className="flex items-center gap-1">
                  <Coins size={14} className="text-brand-primary" />
                  <span className="text-body font-bold text-brand-primary">
                    {formatRobux(item.price_robux)}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/loja')}
                className="w-full h-10 px-md mt-sm text-xs font-bold rounded-xl shadow-none bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Comprar
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

