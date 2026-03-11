import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ChevronLeft, ArrowRight, ShieldCheck, Activity, Plus, Sparkles, Box, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from "../config";
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-urbanist bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <div className="h-32 w-32 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center mb-8 mx-auto shadow-sm">
            <Heart size={48} className="text-slate-200" />
          </div>
          <h2 className="text-4xl font-black text-indigo-950 uppercase tracking-tighter mb-4">Wishlist is Empty.</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-12 max-w-xs mx-auto">You haven't saved any premium hardware yet.</p>
          <Link to="/shop" className="h-16 px-12 bg-indigo-950 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-xl shadow-indigo-950/10 flex items-center gap-4 mx-auto w-fit active:scale-95 group">
            BROWSE INVENTORY <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist relative">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pb-12 relative">
          <div className="flex flex-col items-start text-left relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-amber-500" />
              <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">Saved Selection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-indigo-950 leading-none tracking-tighter uppercase">
              My <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">Wishlist.</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-red-50/50 px-8 py-4 rounded-[2rem] border border-red-100/50">
             <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
             <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-900">{wishlistCount} Units Reserved</p>
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p, i) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-5 transition-all duration-500 flex flex-col hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/5 h-full overflow-hidden"
              >
                {/* Remove */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className="absolute top-6 right-6 z-20 h-10 w-10 bg-white border border-slate-100 rounded-full text-slate-300 hover:text-red-500 flex items-center justify-center transition-all shadow-sm active:scale-90"
                >
                  <Trash2 size={18} />
                </button>

                {/* Product Info */}
                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col pt-4">
                  <div className="relative aspect-square mb-8 rounded-[2rem] bg-white border border-slate-50 flex items-center justify-center p-6 overflow-hidden transition-all duration-500 group-hover:bg-slate-50/50">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="space-y-3 px-2">
                    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2 px-2.5 py-1 bg-indigo-50 self-start rounded-full">{p.brand_name || 'AUTHENTIC'}</span>
                    <h3 className="text-base md:text-lg font-black text-indigo-950 capitalize tracking-tight line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {p.name.toLowerCase()}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-black text-indigo-950 tracking-tighter">${p.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>

                {/* Action */}
                <div className="mt-8 px-2 pb-2">
                  <button 
                    onClick={() => addToCart(p)}
                    className="w-full h-14 bg-indigo-950 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-lg active:scale-95"
                  >
                    <Plus size={18} strokeWidth={3} /> ADD TO CART
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
          <Link to="/shop" className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-all">
            <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50">
               <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            Back to Hardware Hub
          </Link>
          <div className="flex items-center gap-8 opacity-40">
             <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-indigo-950" />
                <span className="text-[10px] font-black tracking-widest uppercase text-indigo-950">Official Support</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
