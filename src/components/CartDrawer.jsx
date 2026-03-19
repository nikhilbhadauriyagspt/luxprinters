import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/100x100?text=Product";
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Glassmorphic Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[1000]"
          />

          {/* Luxury Minimal Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white z-[1001] flex flex-col font-jakarta shadow-2xl"
          >
            {/* Header */}
            <div className="px-8 py-10 flex items-center justify-between border-b border-[#333330]/5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#96968B] block">Your Selection</span>
                <h2 className="text-2xl font-light uppercase tracking-tight text-black">Shopping <span className="font-medium italic text-[#96968B]">Bag</span></h2>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-12 w-12 flex items-center justify-center rounded-full text-[#333330]/40 hover:text-black hover:bg-[#FBFBFA] transition-all group"
              >
                <X size={20} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-10">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="group flex gap-8 relative"
                    >
                      {/* Image Platform */}
                      <div className="h-28 w-28 bg-[#F8F8F6] rounded-2xl flex items-center justify-center flex-shrink-0 p-4 overflow-hidden relative group-hover:bg-[#E5E5E0] transition-colors duration-500 border border-[#333330]/5">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col py-1">
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-black text-[#96968B] uppercase tracking-[0.2em] bg-[#F1F1E9] px-2 py-0.5 rounded-sm">Premium</span>
                            <button 
                              onClick={() => removeFromCart(item.id)} 
                              className="text-[#333330]/20 hover:text-black transition-colors p-1"
                            >
                              <X size={14} strokeWidth={2} />
                            </button>
                          </div>
                          <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                            <h3 className="text-[13px] font-medium text-black leading-snug line-clamp-2 hover:text-[#96968B] transition-colors uppercase tracking-tight">{item.name}</h3>
                          </Link>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center bg-[#FBFBFA] border border-[#333330]/5 rounded-full h-8 px-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-6 flex items-center justify-center text-[#333330]/40 hover:text-black transition-colors"><Minus size={10} /></button>
                            <span className="text-[11px] font-bold w-6 text-center text-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-6 flex items-center justify-center text-[#333330]/40 hover:text-black transition-colors"><Plus size={10} /></button>
                          </div>
                          <span className="text-[15px] font-semibold text-black tracking-tight">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="h-24 w-24 bg-[#FBFBFA] rounded-full flex items-center justify-center border border-[#333330]/5">
                    <ShoppingCart size={32} strokeWidth={1} className="text-[#96968B]/30" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-light uppercase tracking-widest text-black">Your bag is empty</h3>
                    <p className="text-xs font-light text-[#666660] uppercase tracking-widest leading-relaxed">Discover our premium printer collection</p>
                  </div>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="group relative inline-flex items-center gap-4 bg-[#1A1A1A] text-white h-12 px-10 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95"
                  >
                    <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em]">Start Shopping</span>
                    <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 space-y-8 bg-[#FBFBFA] border-t border-[#333330]/5">
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                     <span className="text-[9px] font-bold text-[#96968B] uppercase tracking-[0.3em] block">Estimated Total</span>
                     <span className="text-4xl font-light text-black tracking-tighter leading-none">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#333330]/40">
                    <Package size={14} strokeWidth={1.5} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{cartCount} Items</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="group relative w-full inline-flex items-center justify-center gap-6 bg-[#1A1A1A] text-white h-16 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95"
                  >
                    <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">Continue to Checkout</span>
                    <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                    <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                  <button 
                    onClick={closeCartDrawer}
                    className="w-full text-center py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#333330]/40 hover:text-black transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
