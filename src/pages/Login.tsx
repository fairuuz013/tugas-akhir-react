import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                navigate(from, { replace: true });
            } else {
                setError('Email atau password salah');
            }
        } catch (err) {
            setError('Terjadi kesalahan saat login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                padding: '40px'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                    }}>
                        <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>R</span>
                    </div>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '8px'
                    }}>
                        Welcome Back
                    </h2>
                    <p style={{ color: '#6b7280' }}>
                        Sign in to your account
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} style={{ marginBottom: '32px' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '8px'
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '8px'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <div style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            fontSize: '14px'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: loading ? '#9ca3af' : '#1f2937',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                {/* Demo Accounts */}
                <div style={{
                    background: '#f9fafb',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #e5e7eb'
                }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1f2937',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>
                        Demo Accounts
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{
                            background: 'white',
                            padding: '16px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <h4 style={{ fontWeight: '500', color: '#1f2937' }}>User Account</h4>
                                <span style={{
                                    background: '#dcfce7',
                                    color: '#166534',
                                    fontSize: '12px',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontWeight: '500'
                                }}>
                                    User
                                </span>
                            </div>
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                <p><strong>Email:</strong> user@example.com</p>
                                <p><strong>Password:</strong> user123</p>
                            </div>
                        </div>

                        <div style={{
                            background: 'white',
                            padding: '16px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <h4 style={{ fontWeight: '500', color: '#1f2937' }}>Admin Account</h4>
                                <span style={{
                                    background: '#f3e8ff',
                                    color: '#7c3aed',
                                    fontSize: '12px',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontWeight: '500'
                                }}>
                                    Admin
                                </span>
                            </div>
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                <p><strong>Email:</strong> admin@example.com</p>
                                <p><strong>Password:</strong> admin123</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;