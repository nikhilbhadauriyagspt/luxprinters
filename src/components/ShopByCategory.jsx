import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Box } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const subcategories = categories
    .filter(parent => 
      !parent.name.toLowerCase().includes('laptop') && 
      !parent.slug.toLowerCase().includes('laptop') &&
      !parent.name.toLowerCase().includes('chromebook')
    )
    .flatMap(parent => parent.children || [])
    .filter(sub => 
      !sub.name.toLowerCase().includes('laptop') && 
      !sub.slug.toLowerCase().includes('laptop') &&
      !sub.name.toLowerCase().includes('chromebook')
    );

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="px-6 md:px-10 lg:px-16 py-16 lg:py-24 bg-white font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-4 bg-blue-600 animate-pulse" />
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Browse Selection</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
              <span className="capitalize">Shop By</span>
              <span className="italic text-blue-600 capitalize">Category.</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
             <button className="swiper-prev-btn h-12 w-12 bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group shadow-sm">
                <ChevronLeft size={20} />
             </button>
             <button className="swiper-next-btn h-12 w-12 bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group shadow-sm">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.swiper-prev-btn',
              nextEl: '.swiper-next-btn',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
              1600: { slidesPerView: 5 },
            }}
            className="!overflow-visible border-t border-l border-slate-100"
          >
            {subcategories.map((item, i) => (
              <SwiperSlide key={item.id} className="h-full">
                <Link to={`/shop?category=${item.slug}`} className="block h-full group">
                  <div
                    className="relative flex flex-col bg-white border-r border-b border-slate-100 transition-all duration-300 h-[420px] overflow-hidden hover:bg-slate-50"
                  >
                    {/* Image Area */}
                    <div className="relative flex-1 flex items-center justify-center p-10">
                      <img 
                        src={getImagePath(item.image)} 
                        alt={item.name}
                        className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                    </div>

                    {/* Info */}
                    <div className="p-8 border-t border-slate-50 bg-white group-hover:bg-slate-50 transition-colors">
                      <h3 className="text-xl font-black text-slate-900 capitalize tracking-tight truncate mb-2">
                        {item.name.toLowerCase()}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                          Explore Series
                        </span>
                        <ArrowUpRight size={14} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style>{`
          .stroke-text-light {
            -webkit-text-stroke: 1.5px #0f172a;
            color: transparent;
          }
        `}</style>
      </div>
    </section>
  );
}
