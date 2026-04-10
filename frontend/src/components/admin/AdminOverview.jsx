import React, { useState, useEffect } from 'react';
import { DollarSign, Archive, Clock, ArrowUpRight } from 'lucide-react';
import axios from 'axios';

const AdminOverview = () => {
    const [stats, setStats] = useState({ totalRevenue: 0, totalItemsSold: 0, recentOrders: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/stats', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Total Revenue', value: `${stats.totalRevenue.toLocaleString()} $`, icon: DollarSign, color: 'text-white' },
        { title: 'Total Albums Sold', value: stats.totalItemsSold, icon: Archive, color: 'text-mist' },
    ];

    if (loading) return <div className="text-muted animate-pulse">Loading analytics...</div>;

    return (
        <div className="space-y-10 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
                <p className="text-muted mt-2">Financial performance and recent activity tracking.</p>
            </header>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/[0.06] p-8 rounded-2xl hover:border-white/10 transition-all group overflow-hidden relative">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs uppercase tracking-widest text-muted font-medium mb-3">{card.title}</p>
                                <p className={`text-4xl font-bold ${card.color}`}>{card.value}</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                                <card.icon size={20} className="text-white" />
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
            <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/[0.03] flex justify-between items-center">
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
                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {stats.recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-6 py-4 text-sm font-mono text-white/50 group-hover:text-white transition-colors">#{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-muted">{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-white">{order.totalPrice} $</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            order.status === 'DELIVERED' ? 'bg-mist/10 text-mist' : 
                                            order.status === 'PENDING' ? 'bg-white/10 text-white' : 'bg-white/5 text-muted'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminOverview;
