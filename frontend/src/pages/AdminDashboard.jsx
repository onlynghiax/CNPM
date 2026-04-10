import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingBag, LogOut, ChevronRight } from 'lucide-react';
import AdminOverview from '../components/admin/AdminOverview';
import AdminProducts from '../components/admin/AdminProducts';
import AdminOrders from '../components/admin/AdminOrders';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    // Simple security check (could be more robust)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const tabs = [
        { id: 'overview', name: 'Overview', icon: LayoutDashboard },
        { id: 'products', name: 'Products', icon: Package },
        { id: 'orders', name: 'Orders', icon: ShoppingBag },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <AdminOverview />;
            case 'products': return <AdminProducts />;
            case 'orders': return <AdminOrders />;
            default: return <AdminOverview />;
        }
    };

    return (
        <div className="flex min-h-[80vh] bg-void rounded-2xl border border-white/[0.06] overflow-hidden shadow-2xl">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/[0.06] bg-void/50 backdrop-blur-sm p-6 flex flex-col">
                <div className="mb-10 px-2">
                    <h2 className="text-xl font-bold text-white tracking-tight">Admin Console</h2>
                    <p className="text-[10px] text-muted uppercase tracking-widest mt-1">BadGenius Control</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-white/10 text-white shadow-soft-sm'
                                    : 'text-muted hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
                            <span className="text-sm font-medium">{tab.name}</span>
                            {activeTab === tab.id && (
                                <ChevronRight className="ml-auto opacity-50" size={14} />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-white/5 px-2">
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 text-muted hover:text-white transition-colors group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Exit Admin</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-10 custom-scrollbar">
                <div className="max-w-5xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
