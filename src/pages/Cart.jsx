import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ChevronLeft, ShieldCheck, ShoppingBag, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-[#F8F8F6] text-[#333330]">
        <SEO title="Empty Bag | Yankee's Printer" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-24 w-24 bg-white rounded-full border border-[#333330]/5 flex items-center justify-center mb-8 shadow-sm"
        >
          <ShoppingBag size={32} className="text-[#96968B]/30" strokeWidth={1} />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tight mb-4 text-center">Your bag is <span className="font-medium italic text-[#96968B]">empty</span></h2>
        <p className="text-[#666660] text-sm font-light mb-10 text-center max-w-xs leading-relaxed">Discover our collection of premium printers and find the perfect addition to your workspace.</p>
        <Link to="/shop" className="group relative inline-flex items-center gap-6 bg-[#1A1A1A] text-white h-14 px-10 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95">
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em]">Start Shopping</span>
          <ArrowRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] font-jakarta text-[#333330] overflow-x-hidden pb-24">
      <SEO title="My Bag | Yankee's Printer" description="Review your selected printers before checkout." />
      
      {/* --- REFINED LUXURY BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Architectural Circle (Scaled down) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-[400px] -left-[400px] md:-top-[500px] md:-left-[500px] w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] bg-[#F1F1E9] rounded-full border border-[#333330]/[0.03] shadow-[inset_0_0_80px_rgba(0,0,0,0.01)]"
        />
      </div>

      {/* --- HERO HEADER --- */}
      <section className="relative pt-32 pb-16 px-6 lg:px-20">
        <div className="max-w-[1920px] mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#333330]/40">Review Selection</span>
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-black uppercase tracking-tighter leading-[0.9]"
          >
            Shopping <span className="font-medium italic text-[#96968B]">Bag</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-20 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* --- CART ITEMS --- */}
          <div className="lg:col-span-8 space-y-10">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row items-center gap-10 group relative pb-10 border-b border-[#333330]/5 last:border-0"
                >
                  {/* Image Platform */}
                  <div className="h-44 w-full sm:w-44 bg-white rounded-[32px] flex items-center justify-center p-8 shrink-0 transition-all duration-700 group-hover:bg-[#E5E5E0] border border-[#333330]/5 shadow-sm group-hover:shadow-md overflow-hidden relative">
                    <img 
                      src={getImagePath(item.images)} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full w-full py-2">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-2">
                        <span className="text-[9px] font-black text-[#96968B] uppercase tracking-[0.2em] bg-[#F1F1E9] px-2.5 py-1 rounded-sm">Premium Selection</span>
                        <Link to={`/product/${item.slug}`}>
                           <h3 className="text-xl font-medium text-black uppercase tracking-tight leading-tight hover:text-[#96968B] transition-colors line-clamp-2">{item.name}</h3>
                        </Link>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#333330]/20 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={20} strokeWidth={1.5} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#333330]/5">
                      {/* Refined Counter */}
                      <div className="h-10 bg-white border border-[#333330]/5 rounded-full flex items-center justify-between px-1 w-[130px] shadow-sm">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center rounded-full text-[#333330]/40 hover:text-black transition-all"><Minus size={12} strokeWidth={1.5} /></button>
                        <span className="text-[12px] font-bold text-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center rounded-full text-[#333330]/40 hover:text-black transition-all"><Plus size={12} strokeWidth={1.5} /></button>
                      </div>
                      
                      <div className="text-right">
                         <span className="text-2xl font-light text-black tracking-tight leading-none">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#333330]/40 hover:text-black transition-all pt-12 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Catalog
            </Link>
          </div>

          {/* --- SUMMARY SIDEBAR: GLASS CANVAS --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-[140px]">
            <div className="bg-white border border-[#333330]/5 p-10 rounded-[40px] space-y-12 shadow-[0_30px_60px_rgba(0,0,0,0.03)] backdrop-blur-md bg-white/95">
              <div className="space-y-8">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#96968B] border-b border-[#333330]/5 pb-4">Order Manifest</h3>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-[#333330]/40 uppercase tracking-[0.2em]">Subtotal</span>
                    <span className="text-sm font-medium text-black">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-[#333330]/40 uppercase tracking-[0.2em]">Shipping</span>
                    <span className="text-[10px] font-bold text-[#96968B] uppercase tracking-[0.2em] bg-[#F1F1E9] px-3 py-1 rounded-full">Complimentary</span>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-[#333330]/5 space-y-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#333330]/40 mb-2">Total Amount</span>
                  <span className="text-5xl font-light text-black tracking-tighter leading-none">${total.toLocaleString()}</span>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/checkout"
                    className="group relative w-full h-16 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center gap-4 text-[12px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 overflow-hidden"
                  >
                    <span className="relative z-10">Proceed to Checkout</span>
                    <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                    <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-3 py-2 text-[#333330]/30">
                    <ShieldCheck size={16} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Checkout Active</span>
                  </div>
                </div>
              </div>

              {/* Payments */}
              <div className="flex items-center justify-center gap-8 opacity-30 grayscale hover:opacity-100 transition-opacity duration-500">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
