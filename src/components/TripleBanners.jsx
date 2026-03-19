import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

import banner1 from '@/assets/bannerr/banner1.jpg';
import banner2 from '@/assets/bannerr/banner2.jpg';
import banner3 from '@/assets/bannerr/banner3.jpg';

const TripleBanners = () => {
  const banners = [
    {
      title: "Business",
      highlight: "Excellence",
      description: "Fast and reliable laser printers built for everyday professional use.",
      image: banner1,
      link: "/shop?category=laser-printers",
      tag: "FEATURED SERIES",
      bgColor: "bg-[#F1F1E9]"
    },
    {
      title: "Creative",
      highlight: "Precision",
      description: "Brilliant color quality and sharp details for all your creative projects.",
      image: banner2,
      link: "/shop?category=inkjet-printers",
      tag: "EXCLUSIVE COLLECTION",
      bgColor: "bg-[#F8F8F6]"
    },
    {
      title: "Smart",
      highlight: "Solutions",
      description: "All-in-one printers designed to streamline your modern workspace.",
      image: banner3,
      link: "/shop",
      tag: "INNOVATION 2026",
      bgColor: "bg-[#F5F5F0]"
    }
  ];

  return (
    <section className="bg-white py-12 md:py-20 font-jakarta">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {banners.map((banner, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-[450px] md:h-[550px] overflow-hidden rounded-[40px] border border-[#333330]/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col"
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Content Layer */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-white/40"></span>
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/70">
                      {banner.tag}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight uppercase leading-tight">
                    {banner.title} <br />
                    <span className="font-medium italic text-white/90">{banner.highlight}</span>
                  </h3>
                </div>

                <div className="pt-2 transition-all duration-500">
                  <Link 
                    to={banner.link} 
                    className="inline-flex items-center gap-4 text-white text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/30 pb-1 hover:border-white transition-all"
                  >
                    View Collection <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripleBanners;
