import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';
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
            className="fixed inset-0 bg-slate-950/20 backdrop-blur-md z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[450px] bg-white z-[1001] shadow-2xl flex flex-col font-urbanist border-l border-slate-100"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                     <div className="h-1 w-1 bg-blue-600 animate-pulse" />
                     <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Current Cart</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight flex flex-col">
                    <span className="capitalize">Your</span>
                    <span className="italic text-blue-600 capitalize">Selection.</span>
                  </h2>
                </div>
                <button 
                  onClick={closeCartDrawer}
                  className="h-12 w-12 bg-slate-50 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all border border-slate-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={item.id} 
                      className="group flex gap-6 p-4 border border-slate-100 hover:border-blue-200 hover:bg-slate-50/50 transition-all duration-300"
                    >
                      <div className="h-24 w-24 bg-white border border-slate-100 p-4 flex items-center justify-center flex-shrink-0 relative">
                        <img 
                          src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100x100"; }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{item.brand_name || 'AUTHENTIC'}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-300 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <h3 className="text-[13px] font-black text-slate-900 uppercase truncate pr-4">{item.name.toLowerCase()}</h3>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="h-10 bg-white border border-slate-100 flex items-center">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-full w-8 flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border-r border-slate-100"><Minus size={12} strokeWidth={3} /></button>
                            <span className="text-xs font-black w-10 text-center text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-full w-8 flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border-l border-slate-100"><Plus size={12} strokeWidth={3} /></button>
                          </div>
                          <span className="text-base font-black text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="h-20 w-20 bg-slate-50 flex items-center justify-center mb-8 border border-slate-100">
                    <ShoppingBag size={32} className="text-slate-200" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">Cart is Empty.</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed mb-10">You haven't added any products yet.</p>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="h-14 px-10 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center"
                  >
                    SHOP NOW
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Subtotal</span>
                     <span className="text-3xl font-black text-slate-900 tracking-tighter">${total.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total Items</span>
                     <span className="text-xl font-black text-blue-600">{cartCount}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link 
                    to="/cart" 
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-white border border-slate-200 text-slate-900 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                  >
                    VIEW FULL CART
                  </Link>
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-blue-600 text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl group"
                  >
                    SECURE CHECKOUT
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                   <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-slate-900" />
                      <span className="text-[8px] font-black uppercase tracking-widest">VERIFIED</span>
                   </div>
                   <div className="h-1 w-1 bg-slate-300" />
                   <div className="flex items-center gap-2">
                      <img src="/brands/hp.png" alt="" className="h-3 w-auto grayscale" />
                      <span className="text-[8px] font-black uppercase tracking-widest">PARTNER</span>
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
