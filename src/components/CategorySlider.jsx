import { motion } from "framer-motion";
import { Heart, ShoppingCart, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function CategorySlider({ title, products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
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

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-12 md:py-16 w-full overflow-hidden font-jakarta">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-20">
        
        {/* --- REFINED MINIMAL HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-[1px] bg-[#333330]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#333330]/40">Enterprise Grade</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-[#333330] tracking-tight uppercase"
            >
              {title.split(' ').slice(0, -1).join(' ')} <span className="font-medium italic text-[#96968B]">{title.split(' ').pop()}</span>
            </motion.h2>
          </div>
          
          <Link to="/shop" className="hidden md:flex items-center gap-2 group/link border-b border-[#333330]/10 pb-1 hover:border-[#333330] transition-all">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#333330]">Full Series</span>
            <ArrowRight size={14} className="text-[#333330] group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- COMPACT LANDSCAPE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {products.slice(0, 9).map((p, idx) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.05 }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex flex-row items-center gap-5 p-3 rounded-[24px] bg-[#F8F8F6] border border-transparent hover:bg-white hover:border-[#333330]/5 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.04)] transition-all duration-500"
            >
              {/* Compact Image Area */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-white rounded-[18px] flex items-center justify-center p-4 overflow-hidden border border-[#333330]/5">
                <motion.img 
                  src={getImagePath(p.images)} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                  animate={hoveredId === p.id ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Minimalist Heart Button */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className={cn(
                    "absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300 z-20",
                    isInWishlist(p.id) ? "text-red-500" : "text-[#333330]/20 hover:text-[#333330]"
                  )}
                >
                  <Heart size={12} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={2} />
                </button>
              </div>

              {/* Minimal Info Area */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="space-y-1">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[13px] font-medium text-[#333330] uppercase tracking-tight line-clamp-2 leading-snug group-hover:text-[#96968B] transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="text-[12px] font-semibold text-[#333330] tracking-tight">
                    ${p.price}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[8px] font-black text-[#333330]/30 uppercase tracking-[0.2em]">
                    Pro Series
                  </span>
                  
                  {/* Plus Icon Action */}
                  <button 
                    onClick={(e) => handleAddToCart(e, p)}
                    className="h-8 w-8 bg-[#333330] text-white rounded-full flex items-center justify-center hover:bg-[#4A4A45] hover:scale-110 transition-all shadow-md active:scale-90"
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
