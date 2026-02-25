import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type {
  TelegramLead,
  GatewayConfig,
  BotConfig,
  UtmifyConfig,
  Profile,
  Payment,
} from '../lib/types';

interface AdminStats {
  totalUsers: number;
  totalLeads: number;
  totalPayments: number;
  totalRevenue: number;
  paymentsOverTime: { date: string; amount: number }[];
}

interface LeadFilters {
  startDate?: string;
  endDate?: string;
  paymentType?: string;
  qualification?: string;
}

interface AdminState {
  leads: TelegramLead[];
  users: Profile[];
  gatewayConfigs: GatewayConfig[];
  botConfigs: BotConfig[];
  utmifyConfig: UtmifyConfig | null;
  stats: AdminStats;
  loading: boolean;

  fetchStats: () => Promise<void>;
  fetchLeads: (filters?: LeadFilters) => Promise<void>;
  fetchUsers: (search?: string) => Promise<void>;
  fetchGatewayConfigs: () => Promise<void>;
  saveGatewayConfig: (config: Partial<GatewayConfig> & { id?: number; gateway_name: string }) => Promise<void>;
  fetchBotConfigs: () => Promise<void>;
  saveBotConfig: (config: Partial<BotConfig> & { id?: number }) => Promise<void>;
  fetchUtmifyConfig: () => Promise<void>;
  saveUtmifyConfig: (config: Partial<UtmifyConfig> & { id?: number }) => Promise<void>;
  exportLeadsCSV: () => string;
}

export const useAdminStore = create<AdminState>()((set, get) => ({
  leads: [],
  users: [],
  gatewayConfigs: [],
  botConfigs: [],
  utmifyConfig: null,
  stats: {
    totalUsers: 0,
    totalLeads: 0,
    totalPayments: 0,
    totalRevenue: 0,
    paymentsOverTime: [],
  },
  loading: false,

  fetchStats: async () => {
    set({ loading: true });
    try {
      const [usersRes, leadsRes, paymentsRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('telegram_leads').select('id', { count: 'exact', head: true }),
        supabase.from('payments').select('amount, created_at, status'),
      ]);

      const payments = (paymentsRes.data ?? []) as Pick<Payment, 'amount' | 'created_at' | 'status'>[];
      const paidPayments = payments.filter((p) => p.status === 'paid');
      const totalRevenue = paidPayments.reduce((sum, p) => sum + p.amount, 0);

      const grouped: Record<string, number> = {};
      paidPayments.forEach((p) => {
        const day = p.created_at.slice(0, 10);
        grouped[day] = (grouped[day] ?? 0) + p.amount;
      });
      const paymentsOverTime = Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-30)
        .map(([date, amount]) => ({ date, amount }));

      set({
        stats: {
          totalUsers: usersRes.count ?? 0,
          totalLeads: leadsRes.count ?? 0,
          totalPayments: paidPayments.length,
          totalRevenue,
          paymentsOverTime,
        },
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchLeads: async (filters?: LeadFilters) => {
    set({ loading: true });
    try {
      let query = supabase
        .from('telegram_leads')
        .select('*, profile:profiles(*)')
        .order('created_at', { ascending: false });

      if (filters?.startDate) query = query.gte('created_at', filters.startDate);
      if (filters?.endDate) query = query.lte('created_at', filters.endDate + 'T23:59:59');
      if (filters?.qualification === 'qualified') query = query.eq('status', 'qualified');
      if (filters?.qualification === 'new') query = query.eq('status', 'new');

      const { data, error } = await query;
      if (error) throw error;

      let leads = (data ?? []) as TelegramLead[];

      if (filters?.paymentType) {
        const leadIds = leads.map((l) => l.id);
        if (leadIds.length > 0) {
          const { data: pmts } = await supabase
            .from('payments')
            .select('*')
            .in('user_id', leads.filter((l) => l.user_id).map((l) => l.user_id!));

          if (pmts && filters.paymentType !== 'all') {
            const userIdsWithType = new Set(
              pmts.filter((p: Payment) => p.type === filters.paymentType).map((p: Payment) => p.user_id)
            );
            leads = leads.filter((l) => l.user_id && userIdsWithType.has(l.user_id));
          }
        }
      }

      set({ leads });
    } finally {
      set({ loading: false });
    }
  },

  fetchUsers: async (search?: string) => {
    set({ loading: true });
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      set({ users: (data ?? []) as Profile[] });
    } finally {
      set({ loading: false });
    }
  },

  fetchGatewayConfigs: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('gateway_configs')
        .select('*')
        .order('gateway_name');
      if (error) throw error;
      set({ gatewayConfigs: (data ?? []) as GatewayConfig[] });
    } finally {
      set({ loading: false });
    }
  },

  saveGatewayConfig: async (config) => {
    set({ loading: true });
    try {
      if (config.id) {
        const { error } = await supabase
          .from('gateway_configs')
          .update(config)
          .eq('id', config.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gateway_configs')
          .insert(config);
        if (error) throw error;
      }
      await get().fetchGatewayConfigs();
    } finally {
      set({ loading: false });
    }
  },

  fetchBotConfigs: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('bot_configs')
        .select('*')
        .order('bot_type');
      if (error) throw error;
      set({ botConfigs: (data ?? []) as BotConfig[] });
    } finally {
      set({ loading: false });
    }
  },

  saveBotConfig: async (config) => {
    set({ loading: true });
    try {
      if (config.id) {
        const { error } = await supabase
          .from('bot_configs')
          .update(config)
          .eq('id', config.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bot_configs')
          .insert(config);
        if (error) throw error;
      }
      await get().fetchBotConfigs();
    } finally {
      set({ loading: false });
    }
  },

  fetchUtmifyConfig: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('utmify_configs')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      set({ utmifyConfig: data as UtmifyConfig | null });
    } finally {
      set({ loading: false });
    }
  },

  saveUtmifyConfig: async (config) => {
    set({ loading: true });
    try {
      if (config.id) {
        const { error } = await supabase
          .from('utmify_configs')
          .update(config)
          .eq('id', config.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('utmify_configs')
          .insert(config);
        if (error) throw error;
      }
      await get().fetchUtmifyConfig();
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
      lead.created_at,
    ]);

    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(',')).join('\n');
    return csv;
  },
}));
