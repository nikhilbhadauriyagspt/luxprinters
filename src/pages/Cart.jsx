import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white">
        <div className="h-24 w-24 bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
          <ShoppingBag size={40} className="text-slate-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Cart is Empty</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-12">You haven't added anything to your cart yet.</p>
        <Link to="/shop" className="h-16 px-12 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-none flex items-center gap-4 hover:bg-blue-600 transition-all shadow-lg group">
          BROWSE SHOP <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-100 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-6 bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600">Your Selection</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
              <span className="capitalize">Shopping</span>
              <span className="italic text-blue-600 capitalize">Cart.</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 border border-slate-100">
             <span className="h-2 w-2 bg-emerald-500 animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">{cartCount} Items Selected</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 group hover:border-blue-200 transition-all duration-300"
                >
                  <div className="h-32 w-32 sm:h-40 sm:w-40 bg-slate-50 p-6 flex items-center justify-center flex-shrink-0 relative">
                    <img 
                      src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150"; }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 w-full sm:w-auto text-center sm:text-left flex flex-col h-full py-2">
                    <div className="flex flex-col mb-auto">
                      <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2">{item.brand_name || 'AUTHENTIC'}</span>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight line-clamp-2">{item.name.toLowerCase()}</h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
                      <div className="h-12 bg-slate-50 border border-slate-100 flex items-center">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-full w-12 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all border-r border-slate-100"><Minus size={14} /></button>
                        <span className="text-xs font-black w-12 text-center text-slate-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-full w-12 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all border-l border-slate-100"><Plus size={14} /></button>
                      </div>
                      <span className="text-2xl font-black text-slate-900 tracking-tighter">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="h-12 w-12 bg-white border border-slate-100 text-slate-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all sm:self-start shadow-sm"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-all pt-8 group">
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 p-10 lg:p-12 text-white sticky top-32 shadow-xl border border-slate-800">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Price Summary</h3>
                 <ShieldCheck size={18} className="text-blue-400" />
              </div>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                  <span className="text-lg font-black">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Shipping</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-white/5 px-3 py-1 border border-emerald-400/20">Calculated Next</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Grand Total</span>
                  <span className="text-4xl font-black tracking-tighter">${total.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full h-16 bg-blue-600 hover:bg-white hover:text-slate-950 text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-lg group"
              >
                SECURE CHECKOUT
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-center gap-4 opacity-30 grayscale brightness-200">
                 <img src="/brands/hp.png" alt="" className="h-4 w-auto object-contain" />
                 <div className="h-4 w-px bg-white/20" />
                 <span className="text-[8px] font-black tracking-widest">VERIFIED MERCHANT</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
