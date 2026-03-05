import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Search, Loader2, Calendar, CreditCard, Truck, X, CheckCircle2, Clock, Box, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'We have received your order.' },
    { key: 'processing', label: 'Preparing', icon: Package, desc: 'Your items are being packed.' },
    { key: 'shipped', label: 'On the Way', icon: Truck, desc: 'Your order has been shipped.' },
    { key: 'out_for_delivery', label: 'Near You', icon: MapPin, desc: 'The delivery person is close by.' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully reached your address.' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-20 font-urbanist px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-50/50 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-xl mx-auto text-center relative z-10">
          <div className="h-20 w-20 bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-10 shadow-sm">
            <Package size={32} className="text-slate-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight flex flex-col mb-6">
            <span className="capitalize">Track Your</span>
            <span className="italic text-blue-600 capitalize">Order.</span>
          </h1>
          <p className="text-slate-500 font-medium text-base mb-12 max-w-sm mx-auto">Login to see your history or enter your guest email below.</p>
          
          <form onSubmit={handleGuestSearch} className="flex flex-col gap-4 mb-16">
            <input 
              type="email" required placeholder="GUEST EMAIL ADDRESS" value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-none focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
            />
            <button className="h-16 px-12 bg-slate-900 text-white rounded-none font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">
              TRACK NOW
            </button>
          </form>

          <div className="pt-10 border-t border-slate-100">
            <Link to="/login" className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] hover:underline">SIGN IN FOR FULL HISTORY</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist relative overflow-hidden">
      <SEO title="Order History | MyPrinterMan" />
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-50/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-100 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-6 bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600">History Archive</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
              <span className="capitalize">My</span>
              <span className="italic text-blue-600 capitalize">Orders.</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 border border-slate-100">
             <span className="h-2 w-2 bg-blue-600 animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">{orders.length} Total Orders</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Searching Records...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 border border-slate-100">
            <Package size={40} className="text-slate-200 mx-auto mb-8" />
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">No Orders Found</h3>
            <Link to="/shop" className="h-14 px-10 bg-slate-900 text-white inline-flex items-center gap-4 font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all mt-8">
              BROWSE SHOP <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                key={order.id} className="bg-white border border-slate-100 overflow-hidden group hover:border-blue-100 transition-all duration-300"
              >
                <div className="p-8 border-b border-slate-50 flex flex-wrap items-center justify-between gap-8 bg-slate-50/30">
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Order Code</p>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">#{order.order_code || order.id}</h3>
                    </div>
                    <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Placed On</p>
                      <p className="text-[11px] font-black text-slate-900 uppercase">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className={cn(
                      "px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border shadow-sm",
                      order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      order.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-blue-50 text-blue-600 border-blue-100"
                    )}>
                      {order.status}
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-2xl font-black text-blue-600 tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-10 flex flex-col lg:flex-row gap-12">
                  <div className="flex-1 space-y-6">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6 group/item">
                        <div className="h-16 w-16 bg-slate-50 border border-slate-100 flex items-center justify-center p-3 shrink-0 transition-all group-hover/item:border-blue-100">
                          <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[14px] font-black text-slate-900 uppercase truncate group-hover/item:text-blue-600 transition-colors">{item.product_name.toLowerCase()}</h4>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Qty: {item.quantity} // ${parseFloat(item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[350px] space-y-6 lg:border-l lg:border-slate-100 lg:pl-12">
                    <div className="space-y-2">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Shipping To</p>
                       <p className="text-xs font-black text-slate-900 uppercase leading-relaxed">{order.address}, {order.city} {order.zipCode}</p>
                    </div>
                    <button onClick={() => setSelectedOrder(order)} className="w-full h-12 bg-slate-900 text-white flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                      TRACK STATUS <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-slate-950/20 backdrop-blur-md z-[1000]" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white z-[1001] shadow-2xl p-10 font-urbanist border border-slate-100">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Tracking Order.</h2>
                  <button onClick={() => setSelectedOrder(null)} className="h-10 w-10 bg-slate-50 flex items-center justify-center text-slate-900 hover:bg-red-500 hover:text-white transition-all border border-slate-100"><X size={20} /></button>
                </div>
                <div className="space-y-10 relative">
                  <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-100" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-8">
                        <div className={cn("h-10 w-10 flex items-center justify-center z-10 transition-all duration-500 border", isCompleted ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-200 border-slate-100')}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className={cn("text-xs font-black uppercase tracking-widest", isCompleted ? 'text-slate-950' : 'text-slate-300')}>{step.label}</h4>
                          <p className={cn("text-[10px] font-bold mt-1", isCompleted ? 'text-slate-500' : 'text-slate-300')}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
