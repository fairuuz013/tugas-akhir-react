import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

export interface User {
    id: string;
    email: string;
    name: string;
    username?: string;
    role: 'user' | 'admin';
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

// Mock user data
const mockUsers = [
    {
        id: '1',
        email: 'user@example.com',
        password: 'user123',
        name: 'Regular User',
        username: 'user',
        role: 'user' as const
    },
    {
        id: '2',
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User',
        username: 'admin',
        role: 'admin' as const
    }
];

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const foundUser = mockUsers.find(u => u.email === email && u.password === password);
                if (foundUser) {
                    const { password: _, ...userWithoutPassword } = foundUser;
                    setUser(userWithoutPassword);
                    setIsAuthenticated(true);
                    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    };

    const logout = (): void => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const value: AuthState = {
        user,
        isAuthenticated,
        login,
        logout,
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthState => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Alias untuk kompatibilitas
export const useAuthContext = useAuth;