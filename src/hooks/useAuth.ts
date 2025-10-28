import { useState, useCallback } from 'react';
import { type AuthState, type User } from '@/contexts/AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const useAuth = (): AuthState => {
    const [user, setUser] = useLocalStorage<User | null>('user', null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);

    const login = useCallback(async (username: string, password: string): Promise<boolean> => {
        // Simulasi login
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (username === 'admin' && password === 'password') {
            const userData: User = {
                id: 1,
                username: 'admin',
                email: 'admin@example.com'
            };
            setUser(userData);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }, [setUser]);

    const logout = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
    }, [setUser]);

    return {
        user,
        isAuthenticated,
        login,
        logout
    };
};