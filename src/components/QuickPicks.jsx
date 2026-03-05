import { motion } from "framer-motion";
import { Plus, ArrowRight, Check, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import 'swiper/css';

export default function QuickPicks({ products = [] }) {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  
  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-6 md:px-10 lg:px-16 py-24 lg:py-32 bg-slate-50 font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-4 bg-blue-600 animate-pulse" />
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Essential Helpers</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
              <span className="capitalize">Quick</span>
              <span className="italic text-blue-600 capitalize">Picks.</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
             <button className="qp-prev h-12 w-12 bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group shadow-sm cursor-pointer">
                <ChevronLeft size={20} />
             </button>
             <button className="qp-next h-12 w-12 bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group shadow-sm cursor-pointer">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1.2}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{ prevEl: '.qp-prev', nextEl: '.qp-next' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
              1600: { slidesPerView: 5 },
            }}
            className="!overflow-visible border-t border-l border-slate-200"
          >
            {products.map((p, i) => (
              <SwiperSlide key={p.id}>
                <div 
                  onClick={() => navigate(`/product/${p.slug || p.id}`)}
                  className="flex flex-col p-8 bg-white border-r border-b border-slate-200 transition-all duration-300 hover:bg-slate-50 group cursor-pointer h-[480px]"
                >
                  <div className="relative h-[240px] flex items-center justify-center p-10 mb-6">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name} 
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{p.brand_name || 'Authorized'}</span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 capitalize tracking-tight line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight mb-4">{p.name.toLowerCase()}</h4>
                    
                    <div className="mt-auto flex items-center justify-between">
                       <p className="text-2xl font-black text-slate-900 tracking-tighter">${p.price}</p>
                       <button 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          addToCart(p);
                        }}
                        className={cn(
                          "h-12 w-12 flex items-center justify-center transition-all duration-300",
                          cart.find(i => i.id === p.id) 
                            ? "bg-emerald-500 text-white" 
                            : "bg-slate-900 text-white hover:bg-blue-600"
                        )}
                      >
                        {cart.find(i => i.id === p.id) ? <Check size={18} strokeWidth={3} /> : <Plus size={22} />}
                      </button>
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
