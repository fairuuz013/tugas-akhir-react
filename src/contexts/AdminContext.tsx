import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

export interface Order {
    id: string;
    userId: string;
    userName: string;
    items: Array<{
        productId: number;
        productName: string;
        quantity: number;
        price: number;
    }>;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
    shippingAddress: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'customer';
    joinDate: string;
    lastLogin: string;
    orderCount: number;
    totalSpent: number;
}

export interface SalesData {
    date: string;
    revenue: number;
    orders: number;
    customers: number;
}

export interface ProductStats {
    productId: number;
    productName: string;
    sales: number;
    revenue: number;
    stock: number;
    rating: number;
}

interface AdminState {
    orders: Order[];
    users: User[];
    salesData: SalesData[];
    productStats: ProductStats[];
}

type AdminAction =
    | { type: 'SET_ORDERS'; payload: Order[] }
    | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
    | { type: 'SET_USERS'; payload: User[] }
    | { type: 'UPDATE_USER_ROLE'; payload: { userId: string; role: User['role'] } }
    | { type: 'SET_SALES_DATA'; payload: SalesData[] }
    | { type: 'SET_PRODUCT_STATS'; payload: ProductStats[] };

interface AdminContextType {
    state: AdminState;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
    updateUserRole: (userId: string, role: User['role']) => void;
    getDashboardStats: () => {
        totalRevenue: number;
        totalOrders: number;
        totalUsers: number;
        totalProducts: number;
        revenueGrowth: number;
        orderGrowth: number;
    };
    getRecentOrders: () => Order[];
    getTopProducts: () => ProductStats[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.payload };

        case 'UPDATE_ORDER_STATUS':
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.orderId
                        ? { ...order, status: action.payload.status }
                        : order
                ),
            };

        case 'SET_USERS':
            return { ...state, users: action.payload };

        case 'UPDATE_USER_ROLE':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.userId
                        ? { ...user, role: action.payload.role }
                        : user
                ),
            };

        case 'SET_SALES_DATA':
            return { ...state, salesData: action.payload };

        case 'SET_PRODUCT_STATS':
            return { ...state, productStats: action.payload };

        default:
            return state;
    }
};

// Sample data
const sampleOrders: Order[] = [
    {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        items: [
            { productId: 1, productName: 'Fjallraven Backpack', quantity: 1, price: 109.95 },
            { productId: 2, productName: 'Mens T-Shirt', quantity: 2, price: 22.3 },
        ],
        total: 154.55,
        status: 'delivered',
        date: '2024-01-15',
        shippingAddress: '123 Main St, New York, NY',
    },
    {
        id: '2',
        userId: 'user2',
        userName: 'Jane Smith',
        items: [
            { productId: 3, productName: 'Samsung TV', quantity: 1, price: 699.99 },
        ],
        total: 699.99,
        status: 'processing',
        date: '2024-01-16',
        shippingAddress: '456 Oak Ave, Los Angeles, CA',
    },
    {
        id: '3',
        userId: 'user3',
        userName: 'Mike Johnson',
        items: [
            { productId: 4, productName: 'WD Hard Drive', quantity: 1, price: 64.99 },
            { productId: 5, productName: 'SanDisk SSD', quantity: 1, price: 109.99 },
        ],
        total: 174.98,
        status: 'shipped',
        date: '2024-01-17',
        shippingAddress: '789 Pine Rd, Chicago, IL',
    },
];

const sampleUsers: User[] = [
    {
        id: 'user1',
        username: 'john_doe',
        email: 'john@example.com',
        role: 'customer',
        joinDate: '2023-12-01',
        lastLogin: '2024-01-15',
        orderCount: 5,
        totalSpent: 1250.75,
    },
    {
        id: 'user2',
        username: 'jane_smith',
        email: 'jane@example.com',
        role: 'customer',
        joinDate: '2023-11-15',
        lastLogin: '2024-01-16',
        orderCount: 3,
        totalSpent: 899.99,
    },
    {
        id: 'user3',
        username: 'admin_user',
        email: 'admin@example.com',
        role: 'admin',
        joinDate: '2023-10-01',
        lastLogin: '2024-01-17',
        orderCount: 0,
        totalSpent: 0,
    },
];

const sampleSalesData: SalesData[] = [
    { date: '2024-01-01', revenue: 1250, orders: 8, customers: 5 },
    { date: '2024-01-02', revenue: 1890, orders: 12, customers: 8 },
    { date: '2024-01-03', revenue: 2100, orders: 15, customers: 10 },
    { date: '2024-01-04', revenue: 1750, orders: 11, customers: 7 },
    { date: '2024-01-05', revenue: 2300, orders: 16, customers: 11 },
    { date: '2024-01-06', revenue: 1950, orders: 13, customers: 9 },
    { date: '2024-01-07', revenue: 2450, orders: 18, customers: 12 },
];

const sampleProductStats: ProductStats[] = [
    { productId: 1, productName: 'Fjallraven Backpack', sales: 45, revenue: 4947.75, stock: 15, rating: 4.5 },
    { productId: 2, productName: 'Mens T-Shirt', sales: 89, revenue: 1984.7, stock: 50, rating: 4.2 },
    { productId: 3, productName: 'Samsung TV', sales: 23, revenue: 16099.77, stock: 8, rating: 4.8 },
    { productId: 4, productName: 'WD Hard Drive', sales: 67, revenue: 4354.33, stock: 25, rating: 4.1 },
    { productId: 5, productName: 'SanDisk SSD', sales: 34, revenue: 3739.66, stock: 12, rating: 4.6 },
];

const initialState: AdminState = {
    orders: sampleOrders,
    users: sampleUsers,
    salesData: sampleSalesData,
    productStats: sampleProductStats,
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(adminReducer, initialState);

    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
    };

    const updateUserRole = (userId: string, role: User['role']) => {
        dispatch({ type: 'UPDATE_USER_ROLE', payload: { userId, role } });
    };

    const getDashboardStats = () => {
        const totalRevenue = state.salesData.reduce((sum, day) => sum + day.revenue, 0);
        const totalOrders = state.salesData.reduce((sum, day) => sum + day.orders, 0);
        const totalUsers = state.users.length;
        const totalProducts = state.productStats.length;

        // Calculate growth (simplified)
        const revenueGrowth = 12.5; // Mock growth percentage
        const orderGrowth = 8.3; // Mock growth percentage

        return {
            totalRevenue,
            totalOrders,
            totalUsers,
            totalProducts,
            revenueGrowth,
            orderGrowth,
        };
    };

    const getRecentOrders = () => {
        return state.orders
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
    };

    const getTopProducts = () => {
        return state.productStats
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);
    };

    const value: AdminContextType = {
        state,
        updateOrderStatus,
        updateUserRole,
        getDashboardStats,
        getRecentOrders,
        getTopProducts,
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdminContext must be used within an AdminProvider');
    }
    return context;
};