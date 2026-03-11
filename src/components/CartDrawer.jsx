import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-indigo-950/20 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-white z-[1001] flex flex-col font-urbanist border-l border-slate-100"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 relative bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="h-[1px] w-8 bg-amber-500" />
                     <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">My Cart</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-indigo-950 leading-none tracking-tighter uppercase">
                    Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Selection.</span>
                  </h2>
                </div>
                <button 
                  onClick={closeCartDrawer}
                  className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white transition-all shadow-sm border border-slate-100 active:scale-90"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="group flex gap-6 p-5 bg-white border border-slate-100 rounded-[2rem] hover:border-indigo-600 transition-all duration-500 relative"
                    >
                      <div className="h-24 w-24 bg-white border border-slate-50 rounded-2xl p-4 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100x100"; }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest px-2 py-0.5 bg-indigo-50 rounded-full">{item.brand_name || 'AUTHENTIC'}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-300 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <h3 className="text-sm font-black text-indigo-950 uppercase truncate pr-4">{item.name.toLowerCase()}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                          <div className="h-10 bg-slate-50 rounded-xl px-1 flex items-center border border-slate-100">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center hover:bg-white rounded-lg text-indigo-950 transition-all active:scale-90"><Minus size={14} strokeWidth={3} /></button>
                            <span className="text-xs font-black w-8 text-center text-indigo-950">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center hover:bg-white rounded-lg text-indigo-950 transition-all active:scale-90"><Plus size={14} strokeWidth={3} /></button>
                          </div>
                          <span className="text-base font-black text-indigo-950 tracking-tight">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
                    <ShoppingCart size={40} className="text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-black text-indigo-950 uppercase tracking-tighter mb-3">Cart is Empty.</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-10">You haven't added any premium hardware yet.</p>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="h-16 px-12 bg-indigo-950 text-white text-[11px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-xl shadow-indigo-950/10 flex items-center justify-center rounded-2xl active:scale-95"
                  >
                    START SHOPPING
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-slate-50 border-t border-slate-100 rounded-t-[3rem]">
                <div className="flex items-center justify-between mb-8 px-2">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Total Amount</span>
                     <span className="text-4xl font-black text-indigo-950 tracking-tighter">${total.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Items</span>
                     <span className="text-2xl font-black text-indigo-600">{cartCount}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link 
                    to="/cart" 
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-white border border-slate-200 text-indigo-950 rounded-2xl flex items-center justify-center text-[11px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-sm active:scale-95"
                  >
                    VIEW FULL CART
                  </Link>
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-amber-500 text-indigo-950 rounded-2xl flex items-center justify-center gap-4 text-[12px] font-black uppercase tracking-widest hover:bg-indigo-950 hover:text-white transition-all shadow-xl shadow-amber-500/20 group active:scale-95"
                  >
                    SECURE CHECKOUT
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
                   <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-indigo-950" />
                      <span className="text-[9px] font-black uppercase tracking-widest">VERIFIED PURCHASE</span>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
