import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import bg1 from '@/assets/bannerr/bg-1.jpg';
import png1 from '@/assets/bannerr/png-1.png';
import png2 from '@/assets/bannerr/png-2.png';
import png3 from '@/assets/bannerr/png-3.png';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: "New Collection 2026",
      title: "Better Printing",
      subtitle: "Made Simple",
      desc: "Discover the easiest way to print everything you need. Quality work, every single time.",
      image: png1,
      btnText: "Start Printing"
    },
    {
      id: 2,
      tag: "Home Essentials",
      title: "Quality Prints",
      subtitle: "For Your Home",
      desc: "Simple, reliable, and ready when you are. Perfect results for your daily needs.",
      image: png2,
      btnText: "Explore More"
    },
    {
      id: 3,
      tag: "Office Series",
      title: "Effortless Work",
      subtitle: "Just Works",
      desc: "Make your workday smoother with printing that just works. Fast, clean, and elegant.",
      image: png3,
      btnText: "Shop Now"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[#F8F8F6] font-jakarta pt-20">
      
      {/* --- REFINED LUXURY BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Architectural Circle (Centered exactly at Top-Left Corner) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-[600px] -left-[600px] md:-top-[800px] md:-left-[800px] w-[1200px] h-[1200px] md:w-[1600px] md:h-[1600px] bg-[#F1F1E9] rounded-full border border-[#1A1A1A]/[0.03] shadow-[inset_0_0_120px_rgba(0,0,0,0.01)]"
        />

        {/* Oversized Faded Organic Shape (Deep Background) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute top-[10%] -left-[10%] w-[70%] h-[90%] bg-gradient-to-br from-white/60 to-transparent rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-[1920px] mx-auto w-full px-6 lg:px-20 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            
            {/* Left Side: Simple Content */}
            <div className="flex flex-col justify-center py-12 lg:py-0">
              <div className="max-w-xl space-y-8">
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-8 h-[1px] bg-[#333330]"></span>
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#333330]/40">{slides[currentSlide].tag}</span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl md:text-6xl lg:text-7xl font-light text-[#333330] leading-[1.1] tracking-tight"
                  >
                    {slides[currentSlide].title} <br />
                    <span className="font-medium italic text-[#96968B]">{slides[currentSlide].subtitle}</span>
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base md:text-lg text-[#666660] font-light leading-relaxed max-w-sm"
                  >
                    {slides[currentSlide].desc}
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex items-center gap-8 pt-4"
                >
                  <Link 
                    to="/shop" 
                    className="group relative inline-flex items-center gap-4 bg-[#333330] text-white px-9 py-4.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#4A4A45] rounded-full overflow-hidden"
                  >
                    <span className="relative z-10">{slides[currentSlide].btnText}</span>
                    <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#333330] hover:text-[#96968B] transition-colors border-b border-[#333330]/10 pb-1"
                  >
                    Our Story
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right Side: Arched Image Area with Pop-out Effect */}
            <div className="relative flex justify-center lg:justify-end lg:-translate-x-12">
              <div className="relative w-full max-w-[600px] aspect-[4/5] md:aspect-[5/6] flex items-end justify-center">
                
                {/* Background Arch Layer (Clipped) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 overflow-hidden rounded-t-[300px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.08)] border-x border-t border-white/60 z-0"
                >
                  <img src={bg1} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-white/5" />
                </motion.div>

                {/* Main Product Image - POP-OUT EFFECT */}
                <div className="relative w-full h-full flex items-end justify-center z-10 pointer-events-none">
                  {slides[currentSlide].image ? (
                    <motion.img 
                      key={`image-${currentSlide}`}
                      initial={{ scale: 1, opacity: 0, y: 120 }}
                      animate={{ 
                        scale: currentSlide === 0 ? 1.4 : currentSlide === 1 ? 1.25 : 1.3, 
                        opacity: 1, 
                        y: currentSlide === 0 ? 40 : currentSlide === 1 ? 60 : 50 
                      }}
                      transition={{ delay: 0.6, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                      src={slides[currentSlide].image} 
                      alt="Premium Product" 
                      className="w-full h-auto max-h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] drop-shadow-[0_50px_100px_rgba(0,0,0,0.3)] origin-bottom"
                    />
                  ) : (
                    <div className="text-center p-12 mb-20 border-2 border-dashed border-[#333330]/10 rounded-3xl">
                      <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#333330]/30 leading-loose">
                        Architectural<br />Product Showcase
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Slide Indicators inside Hero Area */}
              <div className="absolute -bottom-8 lg:bottom-10 right-0 lg:-right-12 flex lg:flex-col gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className="group py-2"
                  >
                    <div className={cn(
                      "h-[2px] transition-all duration-700 rounded-full bg-[#333330]",
                      currentSlide === i ? "w-12 lg:w-16" : "w-6 lg:w-8 opacity-20 group-hover:opacity-50"
                    )} />
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side Decoration Label */}
      <div className="absolute left-10 bottom-24 hidden 2xl:block overflow-hidden h-32">
        <div className="flex flex-col gap-4 text-[#1A1A1A]/10">
          <div className="w-[1px] h-12 bg-[#1A1A1A]/10 mx-auto"></div>
          <p className="text-[9px] font-bold tracking-[0.8em] uppercase origin-bottom-left -rotate-90">Reliable Quality</p>
        </div>
      </div>

    </section>
  );
};

export default Hero;
