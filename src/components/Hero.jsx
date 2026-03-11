import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Precision",
    highlight: "Laser Printers.",
    desc: "Experience unmatched speed and crystal-clear text with our professional-grade laser printing solutions. Built for heavy-duty office performance.",
    image: "/category/laser-printers.jpg",
    btnPrimary: "Shop Laser",
    btnSecondary: "View All"
  },
  {
    id: 2,
    title: "All-In-One",
    highlight: "Solutions.",
    desc: "Print, scan, copy, and fax with a single powerful machine. Versatile hardware designed to streamline your entire business workflow.",
    image: "/category/all-in-one-printers.jpg",
    btnPrimary: "Browse All-In-One",
    btnSecondary: "Elite Models"
  },
  {
    id: 3,
    title: "Professional",
    highlight: "Inkjet Tech.",
    desc: "Vibrant colors and photo-quality precision. Perfect for marketing materials, creative projects, and high-impact visual communication.",
    image: "/category/inkjet-printers.jpg",
    btnPrimary: "Explore Inkjet",
    btnSecondary: "Shop Supplies"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full overflow-hidden font-urbanist bg-white py-6">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        {/* MAIN SLIDER CONTAINER */}
        <div className="relative min-h-[550px] lg:min-h-[650px] w-full bg-[#1e1b4b] rounded-[2.5rem] overflow-hidden flex items-center shadow-sm">
          
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <AnimatePresence mode='wait'>
            <motion.div 
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full z-10 grid lg:grid-cols-12 items-center gap-8 px-8 lg:px-24 py-12"
            >
              {/* LEFT CONTENT */}
              <div className="lg:col-span-7 flex flex-col space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9]">
                    {slides[current].title} <br />
                    <span className="text-amber-400">{slides[current].highlight}</span>
                  </h1>
                  <p className="max-w-lg text-lg lg:text-xl text-indigo-100/70 font-medium leading-relaxed">
                    {slides[current].desc}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Link 
                    to="/shop" 
                    className="px-10 py-5 bg-amber-500 text-indigo-950 font-black text-sm uppercase tracking-widest rounded-2xl flex items-center gap-3 hover:bg-amber-400 transition-all active:scale-95 shadow-lg shadow-amber-500/20"
                  >
                    {slides[current].btnPrimary} <ArrowRight size={18} />
                  </Link>
                  <Link 
                    to="/shop" 
                    className="px-10 py-5 bg-white/10 text-white border border-white/10 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white hover:text-indigo-950 transition-all"
                  >
                    {slides[current].btnSecondary}
                  </Link>
                </motion.div>
              </div>

              {/* RIGHT VISUAL */}
              <div className="lg:col-span-5 relative hidden lg:block">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-[2rem] blur-2xl group-hover:bg-amber-500/20 transition-colors duration-700" />
                  <img 
                    src={slides[current].image} 
                    alt="Hardware" 
                    className="relative w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] object-cover aspect-[4/3] transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* SLIDER NAVIGATION */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
            <button onClick={prevSlide} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-indigo-950 transition-all">
              <ChevronLeft size={24} />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${current === i ? 'w-12 bg-amber-500' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>

            <button onClick={nextSlide} className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-indigo-950 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
