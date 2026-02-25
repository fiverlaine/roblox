import { useEffect, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './stores/authStore'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import Store from './pages/Store'
import Items from './pages/Items'
import Profile from './pages/Profile'
import BuyRobux from './pages/BuyRobux'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/admin/Dashboard'
import Gateways from './pages/admin/Gateways'
import Users from './pages/admin/Users'
import TelegramBot from './pages/admin/TelegramBot'
import UtmifyIntegration from './pages/admin/UtmifyIntegration'
import TelegramAnalytics from './pages/admin/TelegramAnalytics'
import Webhooks from './pages/admin/Webhooks'
import ConversionGateway from './pages/admin/ConversionGateway'
import SellerPass from './pages/SellerPass'
import Wallet from './pages/Wallet'
import RobloxAccount from './pages/RobloxAccount'
import Support from './pages/Support'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, initialized } = useAuthStore()
  if (!initialized) return null
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AdminRoute({ children }: { children: ReactNode }) {
  const { user, initialized, isAdmin } = useAuthStore()
  if (!initialized) return null
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin()) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  const { initialize, initialized } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-secondary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* Layout único: AppLayout não desmonta ao trocar de página, menu fica fixo */}
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="loja" element={<Store />} />
          <Route path="itens" element={<Items />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="comprar-robux" element={<BuyRobux />} />
          <Route path="licenca" element={<SellerPass />} />
          <Route path="carteira" element={<Wallet />} />
          <Route path="conta-roblox" element={<RobloxAccount />} />
          <Route path="suporte" element={<Support />} />
        </Route>

        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/gateways" element={<AdminRoute><Gateways /></AdminRoute>} />
        <Route path="/admin/usuarios" element={<AdminRoute><Users /></AdminRoute>} />
        <Route path="/admin/bot-telegram" element={<AdminRoute><TelegramBot /></AdminRoute>} />
        <Route path="/admin/utmify" element={<AdminRoute><UtmifyIntegration /></AdminRoute>} />
        <Route path="/admin/analytics-telegram" element={<AdminRoute><TelegramAnalytics /></AdminRoute>} />
        <Route path="/admin/webhooks" element={<AdminRoute><Webhooks /></AdminRoute>} />
        <Route path="/admin/conversao-gateway" element={<AdminRoute><ConversionGateway /></AdminRoute>} />
      </Routes>
      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { borderRadius: '16px', padding: '12px 20px', fontSize: '14px' } }} />
    </BrowserRouter>
  )
}
