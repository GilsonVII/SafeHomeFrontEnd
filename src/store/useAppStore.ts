import { create } from 'zustand';
import type { User } from '@models/User';
import * as storage from '@services/storageService';

export type AuthStatus = 'loading' | 'logged_in' | 'logged_out';

interface AppState {
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setAuthStatus: (status: AuthStatus) => void;

    // Salva tudo: token no SecureStore, user na store.
    login: (user: User, token: string) => Promise<void>;

    // Limpa tudo: storage e store.
    logout: () => Promise<void>;

    // Lê o storage e atualiza a store. Usado na splash pra ver se o usuário
    // já tava logado antes de abrir o app
    hydrate: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
    user: null,
    token: null,
    authStatus: 'loading',

    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setAuthStatus: (authStatus) => set({ authStatus }),

    login: async (user, token) => {
        await storage.saveAuthToken(token);
        await storage.saveUserId(user.id_usuario);
        set({ user, token, authStatus: 'logged_in' });
    },

    logout: async () => {
        await storage.clearAuth();
        set({ user: null, token: null, authStatus: 'logged_out' });
    },

    hydrate: async () => {
        const token = await storage.getAuthToken();
        if (token) {
            set({ token, authStatus: 'logged_in' });
        } else {
            set({ authStatus: 'logged_out' });
        }
    },
}));
