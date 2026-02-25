import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Coins, Wallet, Zap } from 'lucide-react';

const actions = [
  {
    label: 'Loja',
    icon: ShoppingBag,
    path: '/loja',
    gradient: 'from-brand-primary to-blue-500',
    shadow: 'shadow-brand-primary/20',
  },
  {
    label: 'Robux',
    icon: Coins,
    path: '/comprar-robux',
    gradient: 'from-brand-accent to-orange-400',
    shadow: 'shadow-brand-accent/20',
  },
  {
    label: 'Carteira',
    icon: Wallet,
    path: '/carteira',
    gradient: 'from-green-500 to-emerald-400',
    shadow: 'shadow-green-500/20',
  },
] as const;

export default function QuickAccess() {
  const navigate = useNavigate();

  return (
    <div className="mb-xl">
      <div className="flex items-center justify-between mb-md px-xs">
        <h2 className="text-title font-bold text-text-primary flex items-center gap-2">
          <Zap size={20} className="text-yellow-500 fill-yellow-500" />
          Acesso Rápido
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-md px-1">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent"
          >
            <div
              className={`w-16 h-16 rounded-[24px] bg-gradient-to-br ${action.gradient} shadow-lg ${action.shadow} flex items-center justify-center transition-all group-hover:scale-110 group-active:scale-95`}
            >
              <action.icon size={28} className="text-white" />
            </div>
            <span className="text-xs font-bold text-text-primary group-hover:text-brand-primary transition-colors">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

