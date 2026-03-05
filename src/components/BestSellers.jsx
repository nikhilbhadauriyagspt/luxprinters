import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Check, ShoppingBag, ArrowRight, ArrowUpRight } from "lucide-react";
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-4 bg-blue-600 animate-pulse" />
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Most Popular</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
              <span className="capitalize">Best</span>
              <span className="italic text-blue-600 capitalize">Sellers.</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
             <button className="bs-prev h-12 w-12 bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group shadow-sm cursor-pointer">
                <ChevronLeft size={20} />
             </button>
             <button className="bs-next h-12 w-12 bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group shadow-sm cursor-pointer">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1.2}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
              1600: { slidesPerView: 5 },
            }}
            className="!overflow-visible border-t border-l border-slate-100"
          >
            {products.slice(0, 15).map((p) => (
                <SwiperSlide key={p.id} className="h-full">
                  <div 
                    className="relative bg-white border-r border-b border-slate-100 transition-all duration-300 h-[480px] flex flex-col group overflow-hidden hover:bg-slate-50"
                  >
                    {/* Image */}
                    <div className="relative h-[260px] flex items-center justify-center p-10">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-6 right-6 z-20 h-10 w-10 bg-white border border-slate-100 flex items-center justify-center transition-all duration-300 shadow-sm",
                          isInWishlist(p.id) ? "text-red-500" : "text-slate-300 hover:text-red-500"
                        )}
                      >
                        <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      <img 
                        src={getImagePath(p.images)} 
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                        alt={p.name} 
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 border-t border-slate-50 flex flex-col">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">
                        {p.brand_name || 'Authorized'}
                      </span>

                      <Link to={`/product/${p.slug}`} className="flex-1">
                        <h3 className="font-black text-slate-900 text-lg capitalize tracking-tight line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                          {p.name.toLowerCase()}
                        </h3>
                      </Link>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex flex-col">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Office Choice</span>
                           <span className="text-2xl font-black text-slate-900 tracking-tighter">${p.price}</span>
                        </div>

                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          disabled={addedItems[p.id]}
                          className={cn(
                            "h-12 w-12 flex items-center justify-center transition-all duration-300",
                            addedItems[p.id] 
                              ? "bg-emerald-500 text-white" 
                              : "bg-slate-900 text-white hover:bg-blue-600"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={20} strokeWidth={3} /> : <ShoppingBag size={20} />}
                        </button>
                      </div>
                    </div>

                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
