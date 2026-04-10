import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/orders', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setOrders(response.data);
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/api/admin/orders/${id}/status`, `"${newStatus}"`, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Order status updated');
            fetchOrders();
        } catch (error) {
            toast.error('Update failed');
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'PENDING': return <Clock size={16} className="text-white/40" />;
            case 'PROCESSING': return <Package size={16} className="text-white/60" />;
            case 'SHIPPED': return <Truck size={16} className="text-white" />;
            case 'DELIVERED': return <CheckCircle size={16} className="text-mist" />;
            default: return <AlertCircle size={16} />;
        }
    };

    if (loading) return <div className="text-muted animate-pulse">Scanning orders...</div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-white tracking-tight">Order Management</h1>
                <p className="text-muted mt-2">Track and fulfill customer orders globally.</p>
            </header>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/[0.01] border-b border-white/[0.03]">
                            <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-muted font-medium">Order Detail</th>
                            <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-muted font-medium">Customer Info</th>
                            <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-muted font-medium">Payment</th>
                            <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-muted font-medium text-center">Status Control</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-xs font-mono text-white/40 group-hover:text-white/60 transition-colors">ID: #{order.id}</p>
                                        <p className="font-bold text-white mt-1">{order.totalPrice} $</p>
                                        <p className="text-[10px] text-muted uppercase tracking-tight mt-1">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <p className="text-white/80">Customer ID: {order.id * 123} (Mock)</p>
                                        <p className="text-muted text-xs mt-1">No special requests</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                                        {order.paymentMethod}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="relative group/select w-full max-w-[160px]">
                                            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 transition-all
                                                ${order.status === 'DELIVERED' ? 'border-mist/20 bg-mist/5' : ''}`}>
                                                {getStatusIcon(order.status)}
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    className="appearance-none bg-transparent w-full text-xs font-bold text-white outline-none cursor-pointer pr-4"
                                                >
                                                    {statuses.map(s => (
                                                        <option key={s} value={s} className="bg-void text-white">{s}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-3 pointer-events-none opacity-40">
                                                    <Clock size={10} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-20 text-center">
                        <Package size={48} className="mx-auto text-white/5 mb-4" />
                        <p className="text-muted italic">No orders recorded in the archives.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
