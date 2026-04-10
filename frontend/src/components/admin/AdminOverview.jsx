import React, { useState, useEffect } from 'react';
import { DollarSign, Archive, Clock, ArrowUpRight, AlertCircle } from 'lucide-react';
import axiosClient from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';

const AdminOverview = () => {
    const [stats, setStats] = useState({ totalRevenue: 0, totalItemsSold: 0, recentOrders: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get('/api/admin/stats');
                setStats(response.data || { totalRevenue: 0, totalItemsSold: 0, recentOrders: [] });
                setError(null);
            } catch (err) {
                console.error('Failed to fetch stats', err);
                setError('Failed to load dashboard data. Please check your connection.');
                if (err.response?.status === 401 || err.response?.status === 403) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [navigate]);

    const cards = [
        { title: 'Total Revenue', value: `${(stats?.totalRevenue || 0).toLocaleString()} $`, icon: DollarSign, color: 'text-white' },
        { title: 'Total Albums Sold', value: stats?.totalItemsSold || 0, icon: Archive, color: 'text-mist' },
    ];

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-pulse">
            <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-white animate-spin"></div>
            <p className="text-muted text-sm font-light tracking-widest uppercase">Syncing Analytics...</p>
        </div>
    );

    if (error) return (
        <div className="bg-mist/5 border border-mist/10 rounded-2xl p-10 text-center space-y-4">
            <AlertCircle className="mx-auto text-mist/40" size={40} />
            <p className="text-white font-medium">{error}</p>
            <button 
                onClick={() => window.location.reload()}
                className="text-xs uppercase tracking-widest text-mist underline underline-offset-4"
            >
                Retry Request
            </button>
        </div>
    );

    return (
        <div className="space-y-10 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
                <p className="text-muted mt-2">Financial performance and recent activity tracking.</p>
            </header>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(cards || []).map((card, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/[0.06] p-8 rounded-2xl hover:border-white/10 transition-all group overflow-hidden relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted font-medium mb-3">{card?.title}</p>
                                <p className={`text-4xl font-bold ${card?.color}`}>{card?.value}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                                {card?.icon && <card.icon size={20} className="text-white" />}
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-wider">
                            <span className="flex items-center gap-1 text-mist">
                                <ArrowUpRight size={12} />
                                Updated just now
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Table */}
            <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/[0.03] flex justify-between items-center bg-white/[0.01]">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-muted" />
                        <h3 className="font-semibold text-white">Recent Activity</h3>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.01] border-b border-white/[0.03]">
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted font-medium">Order ID</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted font-medium">Date</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted font-medium">Total</th>
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted font-medium text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {(stats?.recentOrders || []).map((order) => (
                                <tr key={order?.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-6 py-4 text-sm font-mono text-white/50 group-hover:text-white transition-colors">#{order?.id}</td>
                                    <td className="px-6 py-4 text-sm text-muted">{order?.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-white">{order?.totalPrice || 0} $</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            order?.status === 'DELIVERED' ? 'bg-mist/10 text-mist' : 
                                            order?.status === 'PENDING' ? 'bg-white/10 text-white' : 'bg-white/5 text-muted'
                                        }`}>
                                            {order?.status || 'UNKNOWN'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                        <div className="p-10 text-center text-muted italic text-sm">No recent orders.</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdminOverview;
