import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft, ShieldCheck, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white">
        <div className="h-32 w-32 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
          <ShoppingCart size={48} className="text-slate-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-4xl font-black text-indigo-950 uppercase tracking-tighter mb-4">Cart is Empty.</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-12">You haven't added any premium hardware yet.</p>
        <Link to="/shop" className="h-16 px-12 bg-indigo-950 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center gap-4 hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-xl shadow-indigo-950/10 group active:scale-95">
          START SHOPPING <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pb-12 relative">
          <div className="flex flex-col items-start text-left relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-amber-500" />
              <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">Inventory Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-indigo-950 leading-none tracking-tighter uppercase">
              Shopping <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">Selection.</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-indigo-50/50 px-8 py-4 rounded-[2rem] border border-indigo-100/50">
             <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
             <p className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-900">{cartCount} Items Selected</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-slate-100 p-6 sm:p-10 rounded-[3rem] flex flex-col sm:flex-row items-center gap-10 group hover:border-indigo-600 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="h-40 w-40 sm:h-48 sm:w-48 bg-slate-50 rounded-[2.5rem] p-8 flex items-center justify-center flex-shrink-0 relative transition-all group-hover:bg-indigo-50/30">
                    <img 
                      src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150"; }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 w-full sm:w-auto text-center sm:text-left flex flex-col justify-between h-full py-2">
                    <div className="flex flex-col mb-auto">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3 px-3 py-1 bg-indigo-50 self-start rounded-full">{item.brand_name || 'AUTHENTIC'}</span>
                      <h3 className="text-xl md:text-2xl font-black text-indigo-950 uppercase tracking-tight leading-[1.1] line-clamp-2">{item.name.toLowerCase()}</h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mt-10 pt-8 border-t border-slate-50">
                      <div className="h-14 bg-slate-50 rounded-2xl px-2 flex items-center border border-slate-100">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-10 w-10 flex items-center justify-center bg-white rounded-xl text-indigo-950 shadow-sm transition-all active:scale-90"><Minus size={16} strokeWidth={3} /></button>
                        <span className="text-sm font-black w-14 text-center text-indigo-950">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-10 w-10 flex items-center justify-center bg-white rounded-xl text-indigo-950 shadow-sm transition-all active:scale-90"><Plus size={16} strokeWidth={3} /></button>
                      </div>
                      <div className="flex flex-col items-center sm:items-end">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Item Total</span>
                         <span className="text-3xl font-black text-indigo-950 tracking-tighter">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-8 right-8 h-12 w-12 bg-white border border-slate-100 rounded-full text-slate-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all shadow-sm active:scale-90"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-all pt-12 group">
              <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50">
                 <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              Continue Hardware Exploration
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-indigo-950 p-10 lg:p-16 text-white rounded-[3rem] sticky top-32 shadow-2xl shadow-indigo-950/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 flex items-center justify-between mb-12 pb-8 border-b border-white/10">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500">Summary Hub</h3>
                 <ShieldCheck size={22} className="text-amber-500" />
              </div>
              
              <div className="relative z-10 space-y-8 mb-12">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-indigo-300 uppercase tracking-widest">Base Subtotal</span>
                  <span className="text-xl font-black">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-indigo-300 uppercase tracking-widest">Shipping Node</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-4 py-1.5 rounded-full border border-emerald-400/20">Free Tier Eligible</span>
                </div>
                <div className="flex flex-col items-center justify-center pt-10 border-t border-white/10">
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">Grand Total Amount</span>
                  <span className="text-6xl font-black tracking-tighter text-white">${total.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="relative z-10 w-full h-20 bg-amber-500 text-indigo-950 flex items-center justify-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] rounded-[2rem] hover:bg-white hover:text-indigo-950 transition-all shadow-xl shadow-amber-500/20 group active:scale-95"
              >
                PROCEED TO CHECKOUT
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="relative z-10 mt-12 pt-10 border-t border-white/10 flex flex-col items-center gap-4 opacity-40">
                 <p className="text-[9px] font-black tracking-[0.3em] uppercase">Verified & Secured Payment Network</p>
                 <div className="text-indigo-300 italic font-black text-2xl">PayPal</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
