import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const filteredCategories = categories.filter(cat => {
    const name = cat.name.toLowerCase();
    const slug = cat.slug.toLowerCase();
    return !name.includes('laptop') && 
           !slug.includes('laptop') && 
           !name.includes('computer') && 
           !name.includes('pc') &&
           !name.includes('chromebook') &&
           !name.includes('notebook');
  });

  const subcategories = filteredCategories
    .flatMap(parent => parent.children || [])
    .filter(sub => {
      const name = sub.name.toLowerCase();
      const slug = sub.slug.toLowerCase();
      return !name.includes('laptop') && 
             !slug.includes('laptop') && 
             !name.includes('computer') && 
             !name.includes('pc');
    });

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="px-6 md:px-10 lg:px-16 py-20 lg:py-24 bg-white font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* --- CENTERED MINIMAL AMBER HEADER --- */}
        <div className="flex flex-col items-center text-center mb-20 relative">
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tighter uppercase inline-block relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
                Shop By Category
              </span>
            </h2>
          </div>
          <p className="mt-6 text-slate-500 text-sm md:text-base font-medium max-w-xl leading-relaxed mx-auto px-6">
            Explore our high-performance hardware across specialized professional departments.
          </p>
        </div>

        {/* --- LARGER CIRCULAR CAROUSEL --- */}
        <div className="relative group/carousel px-4">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={40}
            slidesPerView={1.8}
            navigation={{
              prevEl: '.circle-prev',
              nextEl: '.circle-next',
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4.5 },
              1440: { slidesPerView: 5.5 },
              1600: { slidesPerView: 6.5 },
            }}
            className="!overflow-visible"
          >
            {subcategories.map((item, i) => (
              <SwiperSlide key={item.id}>
                <Link to={`/shop?category=${item.slug}`} className="group flex flex-col items-center">
                  {/* Larger Circular Node */}
                  <div className="relative mb-8">
                    <div className="h-40 w-40 md:h-48 md:w-48 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-8 relative z-10 transition-all duration-500 group-hover:scale-105 group-hover:border-indigo-600 group-hover:bg-white shadow-sm overflow-hidden">
                      <img 
                        src={getImagePath(item.image)} 
                        alt={item.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                    </div>
                    {/* Pulsing Background Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400/0 group-hover:border-amber-400 group-hover:animate-ping-slow -m-3 transition-all duration-700" />
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-400/0 group-hover:border-indigo-400/40 group-hover:animate-spin-slow -m-3 transition-all duration-700" />
                  </div>

                  {/* Label */}
                  <div className="text-center space-y-2">
                    <h3 className="text-sm md:text-base font-black text-indigo-950 uppercase tracking-tight transition-colors group-hover:text-amber-600">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Explore Shop</span>
                       <ArrowUpRight size={14} className="text-amber-500" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Stronger Side Controls */}
          <div className="absolute top-1/3 left-0 -translate-x-1/2 z-30 pointer-events-none hidden lg:block transition-all duration-500 opacity-0 group-hover/carousel:opacity-100">
             <button className="circle-prev h-16 w-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white hover:border-indigo-950 transition-all duration-300 pointer-events-auto shadow-xl cursor-pointer active:scale-90">
                <ChevronLeft size={32} />
             </button>
          </div>
          <div className="absolute top-1/3 right-0 translate-x-1/2 z-30 pointer-events-none hidden lg:block transition-all duration-500 opacity-0 group-hover/carousel:opacity-100">
             <button className="circle-next h-16 w-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white hover:border-indigo-950 transition-all duration-300 pointer-events-auto shadow-xl cursor-pointer active:scale-90">
                <ChevronRight size={32} />
             </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.1); opacity: 0; }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}
