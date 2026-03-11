import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Check, ShoppingBag, ArrowUpRight, Plus } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

import 'swiper/css';

export default function BestSellers({ products = [] }) {
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
    <section className="px-6 md:px-10 lg:px-16 py-20 lg:py-24 bg-white font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-20 relative">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tighter uppercase inline-block relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
                Top Rated Best Sellers
              </span>
            </h2>
          </div>
          <p className="mt-6 text-slate-500 text-sm md:text-base font-medium max-w-xl leading-relaxed mx-auto px-6">
            Discover our most trusted printers and supplies as rated by industry professionals.
          </p>
        </div>

        <div className="relative group/carousel">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
              1600: { slidesPerView: 5 },
            }}
            className="!overflow-visible"
          >
            {products.slice(0, 15).map((p) => (
                <SwiperSlide key={p.id}>
                  <div 
                    className="relative bg-white border border-slate-100 rounded-[2.5rem] p-6 transition-all duration-500 flex flex-col group hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/5 h-[520px]"
                  >
                    {/* Image Area with Pure White Background */}
                    <div className="relative aspect-square rounded-[2rem] bg-white border border-slate-50 flex items-center justify-center p-8 overflow-hidden mb-8 transition-all duration-500 group-hover:border-indigo-100 group-hover:bg-slate-50/30">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-4 right-4 z-20 h-10 w-10 bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-50",
                          isInWishlist(p.id) ? "text-red-500 scale-110" : "text-slate-300 hover:text-red-500 hover:scale-110"
                        )}
                      >
                        <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      <img 
                        src={getImagePath(p.images)} 
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                        alt={p.name} 
                      />
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full">
                          {p.brand_name || 'AUTHENTIC'}
                        </span>
                      </div>

                      <Link to={`/product/${p.slug}`} className="flex-1">
                        <h3 className="font-black text-indigo-950 text-lg md:text-xl capitalize tracking-tight line-clamp-2 leading-[1.1] group-hover:text-indigo-600 transition-colors">
                          {p.name.toLowerCase()}
                        </h3>
                      </Link>

                      <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Price</span>
                           <span className="text-2xl font-black text-indigo-950 tracking-tighter">${p.price}</span>
                        </div>

                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          disabled={addedItems[p.id]}
                          className={cn(
                            "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg active:scale-90 z-30 relative",
                            addedItems[p.id] 
                              ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                              : "bg-indigo-950 text-white hover:bg-amber-500 hover:text-indigo-950 shadow-indigo-950/20 hover:shadow-amber-500/30"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                        </button>
                      </div>
                    </div>

                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0 rounded-[2.5rem]" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

          {/* Controls */}
          <div className="absolute top-1/2 -left-8 -translate-y-1/2 z-30 pointer-events-none hidden xl:block transition-all duration-500 opacity-0 group-hover/carousel:opacity-100">
             <button className="bs-prev h-16 w-16 bg-white border border-slate-100 rounded-full flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white transition-all duration-300 pointer-events-auto shadow-xl cursor-pointer active:scale-90">
                <ChevronLeft size={32} />
             </button>
          </div>
          <div className="absolute top-1/2 -right-8 -translate-y-1/2 z-30 pointer-events-none hidden xl:block transition-all duration-500 opacity-0 group-hover/carousel:opacity-100">
             <button className="bs-next h-16 w-16 bg-white border border-slate-100 rounded-full flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white transition-all duration-300 pointer-events-auto shadow-xl cursor-pointer active:scale-90">
                <ChevronRight size={32} />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}
