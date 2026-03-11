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
    <section className="px-6 md:px-10 lg:px-16 py-20 lg:py-28 bg-white font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* --- MATCHING CENTERED AMBER HEADER --- */}
        <div className="flex flex-col items-center text-center mb-20 relative px-6">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tighter uppercase inline-block relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
                New Arrivals
              </span>
            </h2>
            
          </div>
          <p className="mt-6 text-slate-500 text-sm md:text-base font-medium max-w-xl leading-relaxed mx-auto">
            Explore our latest inventory of high-performance printing hardware and precision tools.
          </p>
        </div>

        {/* --- MODERN PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {products.map((p, i) => (
              <div 
                key={p.id}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-5 transition-all duration-500 flex flex-col hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/5 h-full overflow-hidden"
              >
                {/* Image Area - Pure White */}
                <div className="relative aspect-square rounded-[2rem] bg-white border border-slate-50 flex items-center justify-center p-6 mb-6 overflow-hidden transition-all duration-500 group-hover:bg-slate-50/50">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className={cn(
                      "absolute top-3 right-3 z-20 h-9 w-9 bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-50",
                      isInWishlist(p.id) ? "text-red-500 scale-110" : "text-slate-300 hover:text-red-500 hover:scale-110"
                    )}
                  >
                    <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>

                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Hardware"; }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col px-2">
                  <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2 px-2.5 py-1 bg-indigo-50 self-start rounded-full">
                    {p.brand_name || 'AUTHENTIC'}
                  </span>
                  
                  <Link to={`/product/${p.slug}`} className="flex-1">
                    <h3 className="text-base md:text-lg font-black text-slate-900 capitalize tracking-tight line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {p.name.toLowerCase()}
                    </h3>
                  </Link>

                  <div className="mt-6 flex items-center justify-between pt-5 border-t border-slate-50">
                    <div className="flex flex-col">
                       <span className="text-2xl font-black text-slate-900 tracking-tighter">${p.price}</span>
                    </div>

                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                      disabled={addedItems[p.id]}
                      className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg active:scale-90 z-30 relative",
                        addedItems[p.id] 
                          ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                          : "bg-indigo-950 text-white hover:bg-amber-500 hover:text-indigo-950 shadow-indigo-950/20 hover:shadow-amber-500/30"
                      )}
                    >
                      {addedItems[p.id] ? <Check size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                    </button>
                  </div>
                </div>

                <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0 rounded-[2.5rem]" />
              </div>
            ))}
        </div>

        {/* --- EXPLORE BUTTON --- */}
        <div className="mt-20 flex justify-center">
           <Link to="/shop" className="group flex items-center gap-6 p-2 pr-10 bg-slate-50 border border-slate-100 rounded-full hover:bg-indigo-950 hover:border-indigo-900 transition-all duration-500">
              <div className="h-14 w-14 bg-indigo-950 group-hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors">
                 <ArrowRight size={24} className="text-white group-hover:text-indigo-950" />
              </div>
              <span className="text-sm font-black text-indigo-950 group-hover:text-white uppercase tracking-widest">Explore Full Inventory</span>
           </Link>
        </div>
      </div>
    </section>
  );
}
