import React, { useState } from 'react';
import { type User } from '../contexts/AdminContext';

interface UserManagementProps {
    users: User[];
    onUpdateUserRole: (userId: string, role: User['role']) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ users, onUpdateUserRole }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | User['role']>('all');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleRoleChange = (userId: string, newRole: User['role']) => {
        if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            onUpdateUserRole(userId, newRole);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>

                <div className="flex space-x-4 mt-4 lg:mt-0">
                    <div className="flex-1 lg:flex-none">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full lg:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Orders
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Spent
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Login
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{user.username}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                                        ? 'bg-purple-100 text-purple-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-900">
                                    {user.orderCount}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-900">
                                    ${user.totalSpent.toLocaleString()}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500">
                                    {new Date(user.lastLogin).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-4">
                                    {user.role === 'customer' ? (
                                        <button
                                            onClick={() => handleRoleChange(user.id, 'admin')}
                                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                        >
                                            Make Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleRoleChange(user.id, 'customer')}
                                            className="text-orange-600 hover:text-orange-900 text-sm font-medium"
                                        >
                                            Make Customer
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No users found matching your criteria.
                </div>
            )}
        </div>
    );
};