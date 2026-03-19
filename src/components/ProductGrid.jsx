import { motion } from "framer-motion";
import { Heart, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function ProductGrid({ products = [] }) {
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

  return (
    <section className="bg-white py-12 md:py-16 w-full font-jakarta">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-20">
        
        {/* --- REFINED MINIMAL HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-[1px] bg-[#333330]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#333330]/40">Just Dropped</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-[#333330] tracking-tight uppercase"
            >
              New <span className="font-medium italic text-[#96968B]">Arrivals</span>
            </motion.h2>
          </div>
          
          <Link to="/shop" className="hidden md:flex items-center gap-2 group/link border-b border-[#333330]/10 pb-1 hover:border-[#333330] transition-all">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#333330]">View All</span>
            <ArrowRight size={14} className="text-[#333330] group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- COMPACT PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
          {products.slice(0, 18).map((p, idx) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.05 }}
              className="group relative flex flex-col"
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Area: Small & Clean */}
              <Link to={`/product/${p.slug}`} className="relative aspect-square w-full bg-[#F8F8F6] rounded-[24px] flex items-center justify-center p-6 overflow-hidden transition-all duration-700 group-hover:bg-[#E5E5E0] group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)]">
                <motion.img 
                  src={getImagePath(p.images)} 
                  alt={p.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                  animate={hoveredId === p.id ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Top Actions: Floating Icons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 transition-all",
                      isInWishlist(p.id) ? "text-red-500" : "text-[#333330] hover:bg-[#333330] hover:text-white"
                    )}
                  >
                    <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Bottom Quick Add: Plus Circle */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button 
                    onClick={(e) => handleAddToCart(e, p)}
                    className="h-9 w-9 bg-[#333330] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4A4A45] active:scale-90 transition-all"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </Link>

              {/* Minimal Text Details */}
              <div className="pt-4 px-1 space-y-1 text-center">
                <Link to={`/product/${p.slug}`} className="block text-center">
                  <h3 className="text-[12px] font-medium text-[#333330] uppercase tracking-tight line-clamp-1 group-hover:text-[#96968B] transition-colors">
                    {p.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-center pt-1">
                  <span className="text-[12px] font-semibold text-[#333330]">${p.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- MOBILE VIEW ALL --- */}
        <div className="mt-16 md:hidden text-center">
          <Link to="/shop" className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#333330] border-b border-[#333330]/10 pb-1">
            Browse All Arrivals <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
