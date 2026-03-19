import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Plus, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/navigation';

export default function BestSellers({ products = [] }) {
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
    <section className="bg-white py-12 md:py-16 w-full font-jakarta overflow-hidden">

      <div className="max-w-[1920px] mx-auto px-6 lg:px-20">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-[1px] bg-[#333330]"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#333330]/40">Top Performance</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-[#333330] tracking-tight uppercase"
            >
              Best <span className="font-medium italic text-[#96968B]">Sellers</span>
            </motion.h2>
          </div>
          
          <div className="hidden md:flex gap-4 border-l border-[#333330]/10 pl-12">
            <button className="bs-prev h-12 w-12 flex items-center justify-center rounded-full border border-[#333330]/10 hover:bg-[#333330] hover:text-white transition-all duration-500">
              <ChevronLeft size={20} strokeWidth={1.2} />
            </button>
            <button className="bs-next h-12 w-12 flex items-center justify-center rounded-full border border-[#333330]/10 hover:bg-[#333330] hover:text-white transition-all duration-500">
              <ChevronRight size={20} strokeWidth={1.2} />
            </button>
          </div>
        </div>

        {/* --- CLEAN PORTRAIT PRODUCT LIST --- */}
        <div className="relative group/carousel">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1.2}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1440: { slidesPerView: 4.2 },
              1600: { slidesPerView: 5.2 },
            }}
            className="!overflow-visible"
          >
            {products.slice(0, 15).map((p) => (
              <SwiperSlide key={p.id}>
                <div 
                  className="group relative flex flex-col h-full transition-all duration-500"
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image Card: Minimalist Box */}
                  <div className="relative aspect-[4/5] w-full bg-[#F8F8F6] rounded-[2rem] flex items-center justify-center p-10 overflow-hidden transition-all duration-700 group-hover:bg-[#E5E5E0] group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
                    <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                    <motion.img 
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                      animate={hoveredId === p.id ? { scale: 1.08, y: -10 } : { scale: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Quick Buttons Overlay */}
                    <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 flex flex-col gap-2">
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center border border-white/50 bg-white shadow-sm transition-all",
                          isInWishlist(p.id) ? "text-red-500" : "text-black hover:bg-black hover:text-white"
                        )}
                      >
                        <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Elegant Quick Add Bar */}
                    <button 
                      onClick={(e) => handleAddToCart(e, p)}
                      className="absolute bottom-0 left-0 w-full h-14 bg-[#333330] text-white text-[10px] font-bold uppercase tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 flex items-center justify-center gap-2"
                    >
                      Add to Cart <Plus size={14} />
                    </button>
                  </div>

                  {/* Details: Simple & Clear */}
                  <div className="pt-8 px-2 space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <Link to={`/product/${p.slug}`} className="flex-1">
                        <h3 className="text-[14px] font-medium text-[#333330] uppercase tracking-tight line-clamp-1 group-hover:text-[#96968B] transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      <span className="text-[14px] font-semibold text-[#333330]">${p.price}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
