import { useAdminContext } from '../contexts/AdminContext';

export const useAdmin = () => {
    const {
        state,
        updateOrderStatus,
        updateUserRole,
        getDashboardStats,
        getRecentOrders,
        getTopProducts,
    } = useAdminContext();

    return {
        orders: state.orders,
        users: state.users,
        salesData: state.salesData,
        productStats: state.productStats,
        updateOrderStatus,
        updateUserRole,
        dashboardStats: getDashboardStats(),
        recentOrders: getRecentOrders(),
        topProducts: getTopProducts(),
    };
};