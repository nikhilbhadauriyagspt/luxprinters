import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { cn } from '../lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const [hoveredId, setHoveredId] = useState(null);

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
    <section className="bg-white py-12 md:py-16 w-full overflow-hidden font-jakarta">
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
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#333330]/40">Explore our lineup</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-[#333330] tracking-tight uppercase"
            >
              Shop by <span className="font-medium italic text-[#96968B]">Category</span>
            </motion.h2>
          </div>
          
          <div className="hidden md:flex gap-4 border-l border-[#333330]/10 pl-12">
            <button className="category-prev h-12 w-12 flex items-center justify-center rounded-full border border-[#333330]/10 hover:bg-[#333330] hover:text-white transition-all duration-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit">
              <ChevronLeft size={20} strokeWidth={1.2} />
            </button>
            <button className="category-next h-12 w-12 flex items-center justify-center rounded-full border border-[#333330]/10 hover:bg-[#333330] hover:text-white transition-all duration-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit">
              <ChevronRight size={20} strokeWidth={1.2} />
            </button>
          </div>
        </div>

        {/* --- CAROUSEL WITH OVERLAY LABELS --- */}
        <div className="relative group/carousel">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.category-prev',
              nextEl: '.category-next',
            }}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4 },
              1440: { slidesPerView: 5 },
            }}
            className="!overflow-visible"
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link 
                  to={`/shop?category=${item.slug}`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="block group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F8F6] rounded-[24px]">
                    {/* Category Image */}
                    <motion.img 
                      src={getImagePath(item.image)} 
                      alt={item.name} 
                      className="w-full h-full object-cover mix-blend-multiply opacity-90"
                      animate={hoveredId === item.id ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=" + item.name; }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Floating White Label (Bottom Positioned) */}
                    <div className="absolute bottom-6 left-0 w-full px-6 flex justify-center">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={hoveredId === item.id ? { opacity: 1, y: 0 } : { opacity: 1, y: 5 }}
                        className="bg-white px-6 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-full border border-white/50 text-center w-full"
                      >
                        <span className="text-[11px] font-bold text-[#333330] tracking-[0.15em] uppercase">
                          {item.name}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
