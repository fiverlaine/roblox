import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Store, Package, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const TABS: { path: string; icon: LucideIcon; label: string }[] = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/loja', icon: Store, label: 'Loja' },
  { path: '/itens', icon: Package, label: 'Itens' },
  { path: '/perfil', icon: User, label: 'Perfil' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav z-40">
      {TABS.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center justify-center gap-1 flex-1 relative"
          >
            {isActive && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full" />
            )}
            <div
              style={{
                color: isActive ? 'rgb(70, 120, 192)' : 'rgb(156, 163, 175)',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.2s, color 0.2s',
              }}
            >
              <Icon
                size={24}
                fill={isActive ? '#4678C0' : 'none'}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
            </div>
            <span
              className="text-caption font-medium"
              style={{
                opacity: isActive ? 1 : 0.6,
                color: isActive ? 'rgb(70, 120, 192)' : 'rgb(156, 163, 175)',
                transition: 'opacity 0.2s, color 0.2s',
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
