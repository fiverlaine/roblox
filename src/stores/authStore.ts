import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Profile } from '../lib/types';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  initialize: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadProfile: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  refreshBalance: () => Promise<void>;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  profile: null,
  loading: false,
  initialized: false,

  initialize: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      set({ user: session.user });
      await get().loadProfile();
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
      if (session?.user) {
        get().loadProfile();
      } else {
        set({ profile: null });
      }
    });

    set({ initialized: true });
  },

  signUp: async (email, password, fullName) => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, profile: null });
  },

  loadProfile: async () => {
    const user = get().user;
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    set({ profile: data as Profile });
  },

  updateProfile: async (data) => {
    const user = get().user;
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id);

    if (error) throw error;
    await get().loadProfile();
  },

  refreshBalance: async () => {
    const user = get().user;
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('robux_balance, real_balance')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...data } : null,
    }));
  },

  isAdmin: () => get().profile?.role === 'admin',
}));
