import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ChevronLeft, ArrowRight, ShieldCheck, Activity, Plus, Sparkles, Box } from 'lucide-react';
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
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center"
        >
          <div className="h-20 w-20 bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 mx-auto">
            <Heart size={32} className="text-slate-200" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Wishlist is Empty</h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-12 max-w-xs mx-auto">You haven't saved any items yet.</p>
          <Link to="/shop" className="h-16 px-12 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-lg flex items-center gap-4 mx-auto w-fit">
            BROWSE SHOP <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-100 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-6 bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600">Saved Items</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
              <span className="capitalize">My</span>
              <span className="italic text-blue-600 capitalize">Wishlist.</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-6 py-3 border border-slate-100">
             <span className="h-2 w-2 bg-red-500 animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">{wishlistCount} Units Saved</p>
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-slate-100">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p, i) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative bg-white border-r border-b border-slate-100 p-8 flex flex-col transition-all duration-300 hover:bg-slate-50 h-full overflow-hidden"
              >
                {/* Remove */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className="absolute top-6 right-6 z-20 h-10 w-10 bg-white border border-slate-100 text-slate-300 hover:text-red-500 flex items-center justify-center transition-all shadow-sm"
                >
                  <Trash2 size={16} />
                </button>

                {/* Product Info */}
                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col pt-4">
                  <div className="relative aspect-square mb-10 flex items-center justify-center p-4">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                    <h3 className="text-lg font-black text-slate-900 capitalize tracking-tight line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {p.name.toLowerCase()}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-black text-slate-950 tracking-tighter">${p.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>

                {/* Action */}
                <div className="mt-10">
                  <button 
                    onClick={() => addToCart(p)}
                    className="w-full h-12 bg-slate-900 text-white flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all"
                  >
                    <Plus size={16} /> ADD TO CART
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
          <Link to="/shop" className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Continue Shopping
          </Link>
          <div className="flex items-center gap-8 opacity-40 grayscale">
             <img src="/brands/hp.png" alt="" className="h-5 w-auto object-contain" />
             <div className="h-5 w-px bg-slate-200" />
             <span className="text-[9px] font-black tracking-widest uppercase text-slate-900">Official Hub Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
