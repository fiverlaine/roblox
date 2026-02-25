import { NavLink, Outlet } from 'react-router-dom';
import { Home, Store, Package, User, Menu, MessageCircle } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import SideMenu from './SideMenu';
import MessagesPanel from './MessagesPanel';

export default function AppLayout() {
  const { menuOpen, messagesOpen, setMenuOpen, setMessagesOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-background-secondary pb-[90px]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-background-primary border-b border-ui-divider z-30 safe-area-top">
        <div className="container-app flex items-center justify-between h-14">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="p-sm rounded-lg hover:bg-background-secondary transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6 text-text-primary" />
          </button>

          <NavLink to="/" className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/assets/logo_icone-CoCIMuPm.png" alt="Icon" className="h-12 w-auto object-contain" />
            <img src="/assets/logo_em_texto-D-gRJvZz.png" alt="Roblox Vault" className="h-10 w-auto object-contain brightness-0 opacity-80 -ml-2" />
          </NavLink>

          <div className="w-10" />

          <button
            type="button"
            onClick={() => setMessagesOpen(true)}
            className="absolute right-4 p-sm rounded-lg hover:bg-background-secondary transition-colors relative"
            aria-label="Mensagens"
          >
            <MessageCircle className="w-6 h-6 text-text-primary" />
          </button>
        </div>
      </div>

      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <MessagesPanel isOpen={messagesOpen} onClose={() => setMessagesOpen(false)} />

      <main className="min-h-screen pt-14">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav z-40">
        <NavLink to="/" className="flex flex-col items-center justify-center gap-1 flex-1 relative">
          {({ isActive }) => (
            <>
              <div style={{ color: isActive ? 'rgb(70, 120, 192)' : 'rgb(156, 163, 175)', transform: isActive ? 'scale(1.1)' : 'none' }}>
                <Home className="w-[22px] h-[22px]" fill={isActive ? '#4678C0' : 'none'} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>
              <span className="text-caption font-medium" style={{ opacity: isActive ? 1 : 0.6, color: isActive ? 'rgb(70, 120, 192)' : 'rgb(156, 163, 175)' }}>
                Início
              </span>
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full"></div>
              )}
            </>
          )}
        </NavLink>

        <NavLink to="/loja" className="flex flex-col items-center justify-center gap-1 flex-1 relative">
          {({ isActive }) => (
            <>
              <div style={{ color: isActive ? 'rgb(70, 120, 192)' : 'rgb(156, 163, 175)', transform: isActive ? 'scale(1.1)' : 'none' }}>
                <Store className="w-[22px] h-[22px]" fill={isActive ? '#4678C0' : 'none'} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>
              <span className="text-caption font-medium" style={{ opacity: isActive ? 1 : 0.6, color: isActive ? 'rgb(70, 120, 192)' : 'rgb(156, 163, 175)' }}>
                Loja
              </span>
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full"></div>
              )}
            </>
          )}
        </NavLink>

        <NavLink to="/itens" className="flex flex-col items-center justify-center gap-1 flex-1 relative">
          {({ isActive }) => (
            <>
              <div style={{ color: isActive ? 'rgb(70, 120, 192)' : 'rgb(156, 163, 175)', transform: isActive ? 'scale(1.1)' : 'none' }}>
                <Package className="w-[22px] h-[22px]" fill={isActive ? '#4678C0' : 'none'} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>
              <span className="text-caption font-medium" style={{ opacity: isActive ? 1 : 0.6, color: isActive ? 'rgb(70, 120, 192)' : 'rgb(156, 163, 175)' }}>
                Itens
              </span>
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full"></div>
              )}
            </>
          )}
        </NavLink>

        <NavLink to="/perfil" className="flex flex-col items-center justify-center gap-1 flex-1 relative">
          {({ isActive }) => (
            <>
              <div style={{ color: isActive ? 'rgb(70, 120, 192)' : 'rgb(156, 163, 175)', transform: isActive ? 'scale(1.1)' : 'none' }}>
                <User className="w-[22px] h-[22px]" fill={isActive ? '#4678C0' : 'none'} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>
              <span className="text-caption font-medium" style={{ opacity: isActive ? 1 : 0.6, color: isActive ? 'rgb(70, 120, 192)' : 'rgb(156, 163, 175)' }}>
                Perfil
              </span>
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full"></div>
              )}
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
}
