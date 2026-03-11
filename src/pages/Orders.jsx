import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Search, Loader2, Calendar, CreditCard, Truck, X, CheckCircle2, Clock, Box, MapPin, ArrowRight, ShoppingCart } from 'lucide-react';
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
      <div className="min-h-screen bg-white pt-40 pb-20 font-urbanist px-6 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-xl w-full text-center relative z-10">
          <div className="h-24 w-24 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-10 shadow-sm">
            <Package size={40} className="text-slate-200" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-indigo-950 leading-none tracking-tighter uppercase mb-6">
            Track Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Order.</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg mb-12 max-w-sm mx-auto">Login to see your history or enter your guest email below.</p>
          
          <form onSubmit={handleGuestSearch} className="flex flex-col gap-4 mb-16 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-500/5">
            <div className="space-y-2 text-left">
               <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">Email Address</label>
               <input 
                 type="email" required placeholder="email@domain.com" value={guestEmail}
                 onChange={(e) => setGuestEmail(e.target.value)}
                 className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all"
               />
            </div>
            <button className="h-16 px-12 bg-indigo-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-xl shadow-indigo-950/10 active:scale-95">
              TRACK SHIPMENT NOW
            </button>
          </form>

          <div className="pt-10 border-t border-slate-100">
            <Link to="/login" className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">SIGN IN FOR FULL ORDER HISTORY</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist relative overflow-hidden">
      <SEO title="Order History | PrinterPrime
 
 " />
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pb-12 relative">
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-amber-500" />
              <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">History Archive</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-indigo-950 leading-none tracking-tighter uppercase">
              My <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">Orders.</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-indigo-50/50 px-8 py-4 rounded-[2rem] border border-indigo-100/50">
             <div className="h-2 w-2 bg-indigo-600 rounded-full animate-pulse" />
             <p className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-900">{orders.length} Total Units Ordered</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Searching Records...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 border border-slate-100 rounded-[3rem]">
            <Package size={48} className="text-slate-200 mx-auto mb-8" />
            <h3 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter">No Orders Found</h3>
            <Link to="/shop" className="h-16 px-12 bg-indigo-950 text-white inline-flex items-center gap-4 font-black text-[11px] uppercase tracking-widest hover:bg-amber-500 hover:text-indigo-950 transition-all mt-10 rounded-2xl shadow-xl shadow-indigo-950/10">
              EXPLORE HARDWARE <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                key={order.id} className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden group hover:border-indigo-600 transition-all duration-500 shadow-xl shadow-indigo-500/5"
              >
                {/* Order Meta Header */}
                <div className="p-8 lg:p-10 border-b border-slate-50 flex flex-wrap items-center justify-between gap-8 bg-slate-50/50">
                  <div className="flex items-center gap-10">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Order Identity</p>
                      <h3 className="text-base font-black text-indigo-950 uppercase tracking-tight">#{order.order_code || order.id}</h3>
                    </div>
                    <div className="h-10 w-px bg-slate-200 hidden sm:block" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Timeline</p>
                      <p className="text-sm font-black text-indigo-950 uppercase">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className={cn(
                      "px-5 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 rounded-full border shadow-sm",
                      order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      order.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-indigo-50 text-indigo-600 border-indigo-100"
                    )}>
                      <div className={cn("h-1.5 w-1.5 rounded-full", 
                        order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-500" :
                        order.status === 'pending' ? "bg-amber-500" : "bg-indigo-500"
                      )} />
                      {order.status}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Final Total</p>
                      <p className="text-3xl font-black text-indigo-950 tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items & Shipping */}
                <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-16">
                  <div className="flex-1 space-y-8">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-8 group/item">
                        <div className="h-24 w-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-5 shrink-0 transition-all group-hover/item:border-indigo-200 group-hover/item:bg-white group-hover/item:shadow-lg group-hover/item:shadow-indigo-500/5">
                          <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform group-hover/item:scale-110" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-1.5 block">Premium Hardware</span>
                          <h4 className="text-lg font-black text-indigo-950 uppercase truncate group-hover/item:text-indigo-600 transition-colors leading-none mb-2">{item.product_name.toLowerCase()}</h4>
                          <div className="flex items-center gap-4">
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                             <div className="h-1 w-1 rounded-full bg-slate-200" />
                             <p className="text-[11px] font-black text-indigo-950 uppercase tracking-widest">${parseFloat(item.price).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[400px] space-y-8 lg:border-l lg:border-slate-100 lg:pl-16">
                    <div className="space-y-4">
                       <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-indigo-600" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Destination</p>
                       </div>
                       <p className="text-sm font-black text-indigo-950 uppercase leading-relaxed">{order.address}<br/>{order.city}, {order.zipCode}</p>
                    </div>
                    
                    <button onClick={() => setSelectedOrder(order)} className="w-full h-16 bg-indigo-950 text-white rounded-[1.5rem] flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-xl shadow-indigo-950/10 active:scale-95 group">
                      TRACK SHIPMENT STATUS 
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-indigo-950/20 backdrop-blur-sm z-[1000]" />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: '-45%' }} animate={{ opacity: 1, scale: 1, y: '-50%' }} exit={{ opacity: 0, scale: 0.95, y: '-45%' }} className="fixed top-1/2 left-1/2 w-full max-w-xl bg-white z-[1001] shadow-2xl rounded-[3rem] p-12 font-urbanist border border-slate-100">
                <div className="flex items-center justify-between mb-12 pb-8 border-b border-slate-100">
                  <div className="space-y-1">
                     <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Real-time Node</span>
                     <h2 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter">Tracking Live.</h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white transition-all border border-slate-100 active:scale-90"><X size={24} /></button>
                </div>
                <div className="space-y-12 relative px-4">
                  <div className="absolute left-[35px] top-4 bottom-4 w-[2px] bg-slate-100" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-10">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center z-10 transition-all duration-700 border-2", isCompleted ? 'bg-indigo-950 text-white border-indigo-950 shadow-lg shadow-indigo-950/20' : 'bg-white text-slate-200 border-slate-100')}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 pt-1">
                          <h4 className={cn("text-sm font-black uppercase tracking-widest", isCompleted ? 'text-indigo-950' : 'text-slate-300')}>{step.label}</h4>
                          <p className={cn("text-xs font-medium mt-1.5 leading-relaxed", isCompleted ? 'text-slate-500' : 'text-slate-300')}>{step.desc}</p>
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
