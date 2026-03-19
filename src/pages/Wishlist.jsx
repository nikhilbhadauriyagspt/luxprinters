import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingCart, Eye, X, ChevronLeft, Package, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } = useCart();
  const [hoveredId, setHoveredId] = useState(null);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-[#F8F8F6] text-[#333330]">
        <SEO title="Empty Wishlist | Yankee's Printer" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-24 w-24 bg-white rounded-full border border-[#333330]/5 flex items-center justify-center mb-8 shadow-sm"
        >
          <Heart size={32} className="text-[#96968B]/30" strokeWidth={1} />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tight mb-4 text-center">Your wishlist is <span className="font-medium italic text-[#96968B]">empty</span></h2>
        <p className="text-[#666660] text-sm font-light mb-10 text-center max-w-xs leading-relaxed">Save your favorite printers here to easily find them later in your curated collection.</p>
        <Link to="/shop" className="group relative inline-flex items-center gap-6 bg-[#1A1A1A] text-white h-14 px-10 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95">
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em]">Start Shopping</span>
          <ArrowRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] font-jakarta text-[#333330] overflow-x-hidden">
      <SEO title="My Wishlist | Yankee's Printer" description="Review your saved printers." />
      
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
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#333330]/40">Personal Collection</span>
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-black uppercase tracking-tighter leading-[0.9]"
          >
            My <span className="font-medium italic text-[#96968B]">Wishlist</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-20 py-12 md:py-20 relative z-10">
        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p, idx) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (idx % 5) * 0.05 }}
                className="group relative flex flex-col h-full"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Platform */}
                <div className="relative aspect-[4/5] w-full bg-white rounded-[24px] border border-[#333330]/5 flex items-center justify-center p-6 overflow-hidden transition-all duration-700 group-hover:bg-[#E5E5E0] group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
                  <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  <motion.img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                    animate={hoveredId === p.id ? { scale: 1.05, y: -5 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Remove Button */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/80 backdrop-blur-md border border-white/50 flex items-center justify-center text-[#333330]/40 hover:text-red-500 transition-all duration-300 z-20 shadow-sm"
                    title="Remove from Wishlist"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>

                  {/* Quick Add Action */}
                  <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button 
                      onClick={(e) => handleAddToCart(e, p)}
                      className="h-8 w-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#333330] active:scale-90 transition-all"
                    >
                      <Plus size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="pt-4 px-1 text-center space-y-1">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[12px] font-medium text-black uppercase tracking-tight line-clamp-1 group-hover:text-[#96968B] transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[12px] font-semibold text-[#333330]">${p.price}</span>
                    <div className="w-6 h-[1px] bg-[#333330]/10 mt-1 transition-all duration-500 group-hover:w-12 group-hover:bg-[#96968B]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-24 pt-12 border-t border-[#333330]/5 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#333330]/40 hover:text-black transition-all">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
