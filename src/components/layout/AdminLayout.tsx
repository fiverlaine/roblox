import { type ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Bot,
  TrendingUp,
  RefreshCw,
  BarChart3,
  Webhook,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { cn } from '../../lib/utils';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  CreditCard,
  Users,
  Bot,
  TrendingUp,
  RefreshCw,
  BarChart3,
  Webhook,
};

const SIDEBAR_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/admin/gateways', label: 'Gateways de Pagamento', icon: 'CreditCard' },
  { path: '/admin/usuarios', label: 'Usuários', icon: 'Users' },
  { path: '/admin/bot-telegram', label: 'Bot do Telegram', icon: 'Bot' },
  { path: '/admin/utmify', label: 'Integração Utmify', icon: 'TrendingUp' },
  { path: '/admin/conversao-gateway', label: 'Conversão Gateway', icon: 'RefreshCw' },
  { path: '/admin/analytics-telegram', label: 'Analytics Telegram', icon: 'BarChart3' },
  { path: '/admin/webhooks', label: 'Webhooks', icon: 'Webhook' },
];

const SIDEBAR_WIDTH = 256; // px

interface AdminLayoutProps {
  children: ReactNode;
}

function SidebarNav({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 12px' }}>
      {SIDEBAR_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            onClick={onItemClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )
            }
          >
            {({ isActive }) => (
              <>
                {Icon && (
                  <Icon
                    className={cn(
                      'w-5 h-5 shrink-0',
                      isActive ? 'text-white' : 'text-gray-500'
                    )}
                  />
                )}
                <span className="truncate">{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { profile, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#111827' }}>

      {/* Desktop Sidebar — always visible on large screens */}
      <aside
        style={{
          width: SIDEBAR_WIDTH,
          minWidth: SIDEBAR_WIDTH,
          flexShrink: 0,
          backgroundColor: '#1a2233',
          borderRight: '1px solid #1f2d40',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
        className="hidden lg:flex"
      >
        {/* Logo */}
        <div style={{ height: 64, display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', borderBottom: '1px solid #1f2d40', flexShrink: 0 }}>
          <Shield className="w-6 h-6 text-blue-500" />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>Admin Panel</span>
        </div>
        <SidebarNav />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -SIDEBAR_WIDTH }}
              animate={{ x: 0 }}
              exit={{ x: -SIDEBAR_WIDTH }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                width: SIDEBAR_WIDTH,
                backgroundColor: '#1a2233',
                borderRight: '1px solid #1f2d40',
                zIndex: 110,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderBottom: '1px solid #1f2d40', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Shield className="w-6 h-6 text-blue-500" />
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>Admin Panel</span>
                </div>
                <button onClick={() => setMobileOpen(false)} style={{ color: '#9ca3af' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarNav onItemClick={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Right column: header + content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Header */}
        <header
          style={{
            height: 64,
            backgroundColor: '#1a2233',
            borderBottom: '1px solid #1f2d40',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              style={{ color: '#9ca3af', display: 'flex' }}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>
              Painel Admin &mdash; <span style={{ color: '#3b82f6' }}>Roblox Vault</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: '#9ca3af', fontSize: 14 }} className="hidden sm:block">
              {profile?.full_name ?? 'Admin'}
            </span>
            <button
              onClick={handleSignOut}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                borderRadius: 8, fontSize: 14, color: '#f87171',
                backgroundColor: 'transparent', cursor: 'pointer',
              }}
              className="hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
