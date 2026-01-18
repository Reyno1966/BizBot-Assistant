"use client";
import React, { useState } from 'react';
import {
    Calendar,
    FileText,
    Users,
    PieChart,
    Bell,
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Plus,
    MessageSquare,
    Bot,
    MoreHorizontal,
    Settings,
    Scissors,
    Stethoscope,
    Gavel,
    Home,
    Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// Industry Presets
const industries = [
    { id: 'barber', name: 'Barbería / Estética', icon: Scissors, color: 'text-orange-400' },
    { id: 'health', name: 'Clínica / Salud', icon: Stethoscope, color: 'text-teal-400' },
    { id: 'legal', name: 'Despacho Legal', icon: Gavel, color: 'text-blue-400' },
    { id: 'realestate', name: 'Inmobiliaria', icon: Home, color: 'text-emerald-400' },
    { id: 'consulting', name: 'Consultoría', icon: Briefcase, color: 'text-indigo-400' },
];

// Mock data for the chart based on image
const mockFinancialData = [
    { name: 'Sun', value: 35000 },
    { name: 'Mon', value: 45000 },
    { name: 'Tue', value: 85000 },
    { name: 'Wed', value: 65000 },
    { name: 'Thu', value: 95000 },
    { name: 'Fri', value: 75000 },
    { name: 'Sat', value: 110000 },
    { name: 'Sun', value: 90000 },
];


export default function BizBotDashboard() {
    const [activeTab, setActiveTab] = useState('Citas');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Chat State
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Business Configuration State
    const [businessConfig, setBusinessConfig] = useState({
        name: 'Barbería El Corte',
        industry: 'barber',
        currency: 'USD',
        services: ['Corte Clásico', 'Barba', 'Tinte']
    });

    const currentIndustry = industries.find(i => i.id === businessConfig.industry) || industries[0];

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/v1/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    tenant_id: 'f0f33af6-ac87-4c2b-8ec9-0baa4820303c', // Mock Tenant ID
                    customer_id: '32c016c1-996a-4473-8ba9-dc8b954202b1' // Mock Customer ID
                })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', text: data.response }]);
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            setMessages(prev => [...prev, { role: 'assistant', text: 'Ups, tuve un problema de conexión. ¿Podrías intentar de nuevo?' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0f1115] text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#181a1f] border-r border-white/5 flex flex-col p-6">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Bot size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">BizBot</h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Assistant</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { name: 'Citas', icon: Calendar },
                        { name: 'Facturación', icon: FileText },
                        { name: 'Clientes', icon: Users },
                        { name: 'Contabilidad', icon: PieChart },
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`sidebar-item w-full ${activeTab === item.name ? 'sidebar-item-active' : ''}`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </button>
                    ))}
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className={`sidebar-item w-full ${isSettingsOpen ? 'sidebar-item-active' : ''}`}
                    >
                        <Settings size={20} />
                        <span className="font-medium">Mi Negocio</span>
                    </button>
                </nav>

                <div className="mt-auto space-y-4">
                    <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-4 border border-indigo-500/20">
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Prueba Gratis</p>
                        <p className="text-sm font-medium text-slate-300 mb-3">7 días de acceso total sin compromiso.</p>
                        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition-colors">
                            Activar por $9.99/mes
                        </button>
                    </div>
                    <button className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors px-2">
                        <MoreHorizontal size={20} />
                        <span className="text-sm font-medium">Ayuda</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 bg-white/5 rounded-2xl ${currentIndustry.color}`}>
                            <currentIndustry.icon size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">{businessConfig.name}</h2>
                            <p className="text-sm text-slate-500 font-medium">{currentIndustry.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Search size={22} />
                        </button>
                        <div className="relative">
                            <button className="p-2 text-slate-400 hover:text-white transition-colors">
                                <Bell size={22} />
                            </button>
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold border-2 border-[#0f1115]">
                                3
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10">
                            <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" />
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-8">
                    {/* Calendar Section (Dynamic Title) */}
                    <section className="dashboard-card p-6">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-4">
                                <div className="flex gap-1">
                                    <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10"><ChevronLeft size={18} /></button>
                                    <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10"><ChevronRight size={18} /></button>
                                </div>
                                <h3 className="text-xl font-bold">Gestión de {activeTab}</h3>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-bold flex items-center gap-2">
                                    <Plus size={16} /> Nueva {activeTab === 'Citas' ? 'Cita' : 'Factura'}
                                </button>
                            </div>
                        </div>

                        {activeTab === 'Citas' && (
                            <div className="border-t border-white/5 pt-6 text-center py-20 bg-white/[0.02] rounded-2xl">
                                <Calendar size={48} className="mx-auto mb-4 text-slate-600" />
                                <p className="text-slate-400">Aquí se mostrará tu agenda personalizada para <span className="text-white font-bold">{businessConfig.name}</span></p>
                            </div>
                        )}
                    </section>

                    {/* Financial Summary */}
                    <section className="dashboard-card p-6">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-xl font-bold">Rendimiento Financiero</h3>
                            <button className="text-slate-500 hover:text-white transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockFinancialData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e2126', border: 'none', borderRadius: '12px' }} />
                                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>
                </div>
            </main>

            {/* SETTINGS MODAL - Business Personalization */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsSettingsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#181a1f] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl z-[110]"
                        >
                            <h3 className="text-2xl font-bold mb-6">Transforma tu Negocio</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Nombre de la Empresa</label>
                                    <input
                                        type="text"
                                        value={businessConfig.name}
                                        onChange={(e) => setBusinessConfig({ ...businessConfig, name: e.target.value })}
                                        className="w-full bg-[#0f1115] border border-white/5 p-4 rounded-2xl outline-none focus:border-indigo-500 transition-all font-bold"
                                        placeholder="Ej: Clínica Dental Smile"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">¿A qué te dedicas?</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {industries.map((ind) => (
                                            <button
                                                key={ind.id}
                                                onClick={() => setBusinessConfig({ ...businessConfig, industry: ind.id })}
                                                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${businessConfig.industry === ind.id ? 'bg-indigo-600 border-indigo-400' : 'bg-[#0f1115] border-white/5 text-slate-400'}`}
                                            >
                                                <ind.icon size={20} />
                                                <span className="text-[10px] font-bold uppercase tracking-tight text-center">{ind.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={() => setIsSettingsOpen(false)}
                                        className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                                    >
                                        Guardar y Transformar Aplicación
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Floating Chat Button */}
            <button
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all z-50"
            >
                <MessageSquare className="text-white" size={28} />
            </button>

            {/* Chat Overlay */}
            <AnimatePresence>
                {isChatOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsChatOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                            className="fixed bottom-0 right-8 w-[400px] h-[650px] bg-[#181a1f] rounded-t-3xl border-x border-t border-white/10 shadow-2xl z-[70] overflow-hidden flex flex-col"
                        >
                            <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <Bot size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">BizBot Assistant</h4>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                            <span className="text-[10px] font-bold text-white/70 uppercase">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsChatOpen(false)} className="text-white/60 hover:text-white">
                                    <Plus className="rotate-45" size={24} />
                                </button>
                            </div>

                            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-[#0f1115]/50 scroll-smooth">
                                {messages.length === 0 && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                                            <Bot size={16} />
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 max-w-[85%]">
                                            <p className="text-sm">
                                                ¡Hola! 👋 Soy el asistente de <span className="text-indigo-400 font-bold">{businessConfig.name}</span>.
                                                Dime, ¿en qué puedo ayudarte hoy con la gestión de tu negocio de <span className="text-indigo-400">{currentIndustry.name}</span>?
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-white/5'}`}>
                                            {msg.role === 'user' ? <Users size={16} /> : <Bot size={16} />}
                                        </div>
                                        <div className={`p-4 rounded-2xl max-w-[85%] border shadow-sm ${msg.role === 'user'
                                                ? 'bg-indigo-600/20 border-indigo-500/30 rounded-tr-none text-white'
                                                : 'bg-white/5 border-white/5 rounded-tl-none text-slate-100'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                                            <Bot size={16} />
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-[#181a1f] border-t border-white/5">
                                <div className="bg-[#0f1115] rounded-xl flex items-center p-2 border border-white/5 focus-within:border-indigo-500/50 transition-all">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Escribe un mensaje..."
                                        className="bg-transparent flex-1 px-4 py-2 text-sm outline-none"
                                    />
                                    <button className="bg-indigo-600 p-2 rounded-lg hover:bg-indigo-500 transition-colors">
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
