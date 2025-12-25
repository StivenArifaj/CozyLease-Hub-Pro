
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '../types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, role: UserRole, name: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (email, role, name) =>
                set({
                    user: { id: '1', email, role, name },
                    isAuthenticated: true
                }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
