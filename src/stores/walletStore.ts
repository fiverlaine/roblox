import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { Payment } from '../lib/types'

interface WalletState {
  payments: Payment[]
  pendingPayment: Payment | null
  loading: boolean
  fetchPayments: () => Promise<void>
  createLicensePayment: () => Promise<Payment>
  createWithdrawalFeePayment: () => Promise<Payment>
  checkPaymentStatus: (paymentId: number) => Promise<Payment>
}

export const useWalletStore = create<WalletState>()((set) => ({
  payments: [],
  pendingPayment: null,
  loading: false,

  fetchPayments: async () => {
    set({ loading: true })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ payments: (data ?? []) as Payment[] })
    } finally {
      set({ loading: false })
    }
  },

  createLicensePayment: async () => {
    set({ loading: true })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Não autenticado')

      const amount = 1.00
      const externalId = `lic_${user.id}_${Date.now()}`

      const { data, error } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          type: 'license',
          amount,
          status: 'pending',
          gateway: 'bspay',
          external_id: externalId,
        })
        .select()
        .single()

      if (error) throw error
      const payment = data as Payment
      set({ pendingPayment: payment })
      return payment
    } finally {
      set({ loading: false })
    }
  },

  createWithdrawalFeePayment: async () => {
    set({ loading: true })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Não autenticado')

      const amount = 1.00
      const externalId = `wfee_${user.id}_${Date.now()}`

      const { data, error } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          type: 'withdrawal_fee',
          amount,
          status: 'pending',
          gateway: 'bspay',
          external_id: externalId,
        })
        .select()
        .single()

      if (error) throw error
      const payment = data as Payment
      set({ pendingPayment: payment })
      return payment
    } finally {
      set({ loading: false })
    }
  },

  checkPaymentStatus: async (paymentId: number) => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single()

    if (error) throw error
    const payment = data as Payment

    set((state) => ({
      pendingPayment: state.pendingPayment?.id === paymentId ? payment : state.pendingPayment,
      payments: state.payments.map((p) => (p.id === paymentId ? payment : p)),
    }))

    return payment
  },
}))
