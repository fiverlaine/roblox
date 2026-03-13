import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Home,
  User,
  Package,
  Coins,
  Wallet,
  Gamepad2,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  Store,
  CreditCard,
  Bot,
  TrendingUp,
  BarChart3,
  Webhook,
  RefreshCw,
  Award,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { SIDEBAR_ITEMS } from '../../lib/constants';
import { formatCurrency, formatRobux } from '../../lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  User,
  Package,
  Coins,
  Wallet,
  Gamepad2,
  HelpCircle,
  LayoutDashboard,
  Store,
  CreditCard,
  Bot,
  TrendingUp,
  BarChart3,
  Webhook,
  RefreshCw,
};

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuthStore();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
      navigate('/login', { replace: true });
    } catch {
      /* signOut error handled upstream */
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm z-40"
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-background-primary shadow-medium z-50 flex flex-col"
          >
            <div className="p-xl border-b border-ui-divider">
              <div className="flex items-center justify-between mb-lg">
                <NavLink to="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                  <img src="/assets/logo_icone-CoCIMuPm.png" alt="Icon" className="h-12 w-auto object-contain" />
                  <img src="/assets/logo_em_texto-D-gRJvZz.png" alt="Roblox Vault" className="h-10 w-auto object-contain brightness-0 opacity-80 -ml-2" />
                </NavLink>
                <button
                  onClick={onClose}
                  className="p-sm rounded-lg hover:bg-background-secondary transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6 text-text-primary" />
                </button>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-ui-border">
                  <img
                    src={profile?.avatar_url || '/assets/avatar-DZBXmQLv.webp'}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== '/assets/avatar-DZBXmQLv.webp') {
                        target.src = '/assets/avatar-DZBXmQLv.webp';
                      }
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body font-semibold text-text-primary truncate">
                    {profile?.full_name || 'Usuário'}
                  </p>
                  <p className="text-caption text-text-secondary truncate">
                    {profile?.email || ''}
                  </p>
                </div>
              </div>

              {profile?.has_seller_pass && (
                <div className="mt-md p-sm bg-gradient-to-r from-brand-accent/20 to-brand-accent/10 rounded-lg flex items-center gap-sm">
                  <Award className="w-4 h-4 text-brand-accent" strokeWidth={2.5} />
                  <span className="text-caption font-semibold text-brand-accent">Licença Premium</span>
                </div>
              )}
            </div>

            <nav className="flex-1 overflow-y-auto p-md space-y-xs">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = ICON_MAP[item.icon];
                const isActive = location.pathname === item.path;

                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-md px-md py-sm rounded-lg transition-all ${
                      isActive
                        ? 'bg-brand-primary text-text-inverse'
                        : 'text-text-primary hover:bg-background-secondary'
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className="w-5 h-5 shrink-0"
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />
                    )}
                    <span className="text-body font-medium flex-1 text-left">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
            <div className="p-md border-t border-ui-divider">
              <div className="grid grid-cols-2 gap-sm mb-md">
                <div className="bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 rounded-lg p-sm">
                  <p className="text-caption text-text-secondary mb-xxs">Robux</p>
                  <p className="text-subtitle font-bold text-brand-primary">
                    {formatRobux(profile?.robux_balance ?? 0)}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-states-success/10 to-states-success/5 rounded-lg p-sm">
                  <p className="text-caption text-text-secondary mb-xxs">Reais</p>
                  <p className="text-subtitle font-bold text-states-success">
                    {formatCurrency(profile?.real_balance ?? 0)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-md px-md py-sm rounded-lg text-states-error hover:bg-states-error/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-body font-medium">Sair</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
