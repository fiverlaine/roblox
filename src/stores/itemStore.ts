import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Item, UserItem } from '../lib/types';

const PAGE_SIZE = 20;

interface ItemState {
  items: Item[];
  featuredItems: Item[];
  userItems: UserItem[];
  loading: boolean;
  loadingMore: boolean;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  lastCategory: string | undefined;
  lastSearch: string | undefined;
  fetchItems: (category?: string, search?: string, page?: number) => Promise<void>;
  loadMoreItems: () => Promise<void>;
  fetchFeaturedItems: () => Promise<void>;
  fetchUserItems: () => Promise<void>;
  purchaseItem: (itemId: string, cardData: Record<string, unknown>) => Promise<void>;
  sellItem: (userItemId: number) => Promise<void>;
}

export const useItemStore = create<ItemState>()((set, get) => ({
  items: [],
  featuredItems: [],
  userItems: [],
  loading: false,
  loadingMore: false,
  totalItems: 0,
  totalPages: 0,
  currentPage: 0,
  lastCategory: undefined,
  lastSearch: undefined,

  fetchItems: async (category?: string, search?: string, page = 1) => {
    const isFirstPage = page === 1;
    if (isFirstPage) set({ loading: true });
    try {
      let query = supabase
        .from('items')
        .select('*', { count: 'exact' })
        .eq('is_active', true);

      if (category) {
        if (category === 'Limited') {
          query = query.ilike('rarity', '%Limited%');
        } else if (category === 'Accessory') {
          query = query.in('category', ['Hat', 'FaceAccessory', 'BackAccessory', 'Gear']);
        } else {
          query = query.eq('category', category);
        }
      }
      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, error, count } = await query
        .order('price_robux', { ascending: true })
        .range(from, to);

      if (error) throw error;
      const list = (data ?? []) as Item[];
      const total = count ?? 0;
      const totalPages = Math.ceil(total / PAGE_SIZE) || 1;

      if (isFirstPage) {
        set({
          items: list,
          totalItems: total,
          totalPages,
          currentPage: page,
          lastCategory: category,
          lastSearch: search,
        });
      } else {
        set((state) => ({
          items: [...state.items, ...list],
          currentPage: page,
        }));
      }
    } finally {
      set({ loading: false });
    }
  },

  loadMoreItems: async () => {
    const { currentPage, totalPages, loading, loadingMore, lastCategory, lastSearch } = get();
    if (loading || loadingMore || currentPage >= totalPages) return;
    set({ loadingMore: true });
    try {
      await get().fetchItems(lastCategory, lastSearch, currentPage + 1);
    } finally {
      set({ loadingMore: false });
    }
  },

  fetchFeaturedItems: async () => {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true)
      .limit(10);

    if (error) throw error;
    const list = (data ?? []) as Item[];
    // Embaralha para "Em alta" variar a cada recarregamento
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    set({ featuredItems: list });
  },

  fetchUserItems: async () => {
    set({ loading: true });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_items')
        .select('*, item:items(*)')
        .eq('user_id', user.id);

      if (error) throw error;
      set({ userItems: (data ?? []) as UserItem[] });
    } finally {
      set({ loading: false });
    }
  },

  purchaseItem: async (itemId: string, cardData: Record<string, unknown>) => {
    set({ loading: true });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: item, error: itemError } = await supabase
        .from('items')
        .select('price_robux')
        .eq('id', itemId)
        .single();
      if (itemError) throw itemError;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('robux_balance')
        .eq('id', user.id)
        .single();
      if (profileError) throw profileError;

      if (profile.robux_balance < item.price_robux) {
        throw new Error('Saldo de Robux insuficiente');
      }

      const { error: purchaseError } = await supabase.from('purchases').insert({
        user_id: user.id,
        item_id: itemId,
        card_data: cardData,
      });
      if (purchaseError) throw purchaseError;

      const { error: userItemError } = await supabase.from('user_items').insert({
        user_id: user.id,
        item_id: itemId,
        card_data: cardData,
        status: 'active',
      });
      if (userItemError) throw userItemError;

      await supabase
        .from('profiles')
        .update({ robux_balance: profile.robux_balance - item.price_robux })
        .eq('id', user.id);
    } finally {
      set({ loading: false });
    }
  },

  sellItem: async (userItemId: number) => {
    set({ loading: true });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get item price
      const { data: userItem, error: uiError } = await supabase
        .from('user_items')
        .select('*, item:items(price_robux)')
        .eq('id', userItemId)
        .single();
      
      if (uiError || !userItem) throw uiError || new Error('Item not found');

      const itemValue = (userItem.item.price_robux * 0.05);

      const { error: updateError } = await supabase
        .from('user_items')
        .update({ status: 'selling' })
        .eq('id', userItemId);

      if (updateError) throw updateError;

      // Update profile balance
      const { data: profile } = await supabase
        .from('profiles')
        .select('real_balance')
        .eq('id', user.id)
        .single();

      await supabase
        .from('profiles')
        .update({ real_balance: (profile?.real_balance || 0) + itemValue })
        .eq('id', user.id);

      // Refresh user items
      await get().fetchUserItems();
    } finally {
      set({ loading: false });
    }
  },
}));
