import { motion } from "framer-motion";
import { ShoppingBag, Heart, ArrowRight, Check, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-6 md:px-10 lg:px-16 py-24 lg:py-32 bg-white font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-4 bg-blue-600 animate-pulse" />
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Latest Stock</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
              <span className="capitalize">New</span>
              <span className="italic text-blue-600 capitalize">Arrivals.</span>
            </h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-4 text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors mb-2">
              Explore Complete Store
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border-t border-l border-slate-100">
          {products.map((p, i) => (
              <div 
                key={p.id}
                className="group relative bg-white border-r border-b border-slate-100 p-8 flex flex-col transition-all duration-300 hover:bg-slate-50 h-full overflow-hidden"
              >
                {/* Wishlist */}
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                  className={cn(
                    "absolute top-6 right-6 z-20 h-10 w-10 bg-white border border-slate-100 flex items-center justify-center transition-all duration-300 shadow-sm",
                    isInWishlist(p.id) ? "text-red-500" : "text-slate-300 hover:text-red-500"
                  )}
                >
                  <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                </button>

                {/* Product Info */}
                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col pt-4">
                  <div className="relative aspect-square mb-10 flex items-center justify-center p-4">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Not+Found"; }}
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                    <h3 className="text-lg font-black text-slate-900 capitalize tracking-tight line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {p.name.toLowerCase()}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-black text-slate-950 tracking-tighter">${p.price}</span>
                    </div>
                  </div>
                </Link>

                {/* Action */}
                <div className="mt-10">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                    disabled={addedItems[p.id]}
                    className={cn(
                      "w-full h-12 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
                      addedItems[p.id] 
                        ? "bg-emerald-500 text-white" 
                        : "bg-slate-900 text-white hover:bg-blue-600"
                    )}
                  >
                    {addedItems[p.id] ? <Check size={14} /> : <ShoppingBag size={14} />}
                    {addedItems[p.id] ? "ADDED" : "ADD TO CART"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
