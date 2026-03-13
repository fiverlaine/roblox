import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { TelegramLead, Payment } from '../lib/types';
import { useAuthStore } from './authStore';

interface LeadFilters {
  startDate?: string;
  endDate?: string;
  paymentType?: string;
  qualification?: string;
}

interface AffiliateState {
  leads: TelegramLead[];
  loading: boolean;
  fetchLeads: (filters?: LeadFilters) => Promise<void>;
  exportLeadsCSV: () => string;
}

export const useAffiliateStore = create<AffiliateState>()((set, get) => ({
  leads: [],
  loading: false,

  fetchLeads: async (filters?: LeadFilters) => {
    set({ loading: true });
    try {
      const { profile } = useAuthStore.getState();
      
      if (!profile || !profile.is_affiliate || !profile.affiliate_utms || profile.affiliate_utms.length === 0) {
        set({ leads: [] });
        return;
      }

      let query = supabase
        .from('telegram_leads')
        .select('*, profile:profiles(*)')
        .not('telegram_id', 'is', null)
        .in('utm_source', profile.affiliate_utms)
        .order('created_at', { ascending: false });

      if (filters?.startDate) query = query.gte('created_at', filters.startDate);
      if (filters?.endDate) query = query.lte('created_at', filters.endDate + 'T23:59:59');
      if (filters?.qualification === 'qualified') query = query.eq('status', 'qualified');
      if (filters?.qualification === 'new') query = query.eq('status', 'new');

      const { data, error } = await query;
      if (error) throw error;
      let leads = (data ?? []) as TelegramLead[];

      // Fetch payments for these leads
      const userIds = leads.map((l) => l.user_id).filter(Boolean) as string[];
      if (userIds.length > 0) {
        const { data: pmts } = await supabase
          .from('payments')
          .select('*')
          .in('user_id', userIds)
          .eq('status', 'paid')
          .order('created_at', { ascending: false });

        if (pmts) {
          leads = leads.map((l) => ({
            ...l,
            payments: pmts.filter((p: Payment) => p.user_id === l.user_id),
          }));
        }
      }

      // Filter by payment type if requested
      if (filters?.paymentType && filters.paymentType !== 'all') {
        leads = leads.filter((l) => 
          l.payments?.some((p) => p.type === filters.paymentType)
        );
      }

      set({ leads });
    } finally {
      set({ loading: false });
    }
  },

  exportLeadsCSV: () => {
    const { leads } = get();
    const headers = [
      'Telegram Username',
      'Telegram ID',
      'Usuário Plataforma',
      'Email',
      'Nome',
      'Telefone',
      'CPF',
      'Cidade',
      'Status',
      'Total Pago',
      'UTM Source',
      'Criado Em',
    ];

    const rows = leads.map((lead) => [
      lead.telegram_username ?? '',
      lead.telegram_id?.toString() ?? '',
      lead.profile?.full_name ?? '',
      lead.profile?.email ?? '',
      lead.profile?.full_name ?? '',
      lead.profile?.phone ?? '',
      lead.profile?.cpf ?? '',
      lead.profile?.city ?? '',
      lead.status,
      lead.total_paid.toString(),
      lead.utm_source ?? '',
      lead.created_at,
    ]);

    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(',')).join('\n');
    return csv;
  },
}));
