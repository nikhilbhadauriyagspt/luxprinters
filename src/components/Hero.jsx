import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Search, ShieldCheck, Zap, Monitor, Cpu, Activity, Layout, Terminal, Box, Sparkles, Shield, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

// Import local assets
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner2 from "@/assets/bannerr/banner2.jpg";
import banner3 from "@/assets/bannerr/banner3.jpg";
import banner4 from "@/assets/bannerr/banner4.jpg";

const slides = [
  {
    id: "NXT-01",
    title: "Always Reliable",
    highlight: "Workplace Printing.",
    desc: "Stay focused on your big goals while we handle the heavy lifting. Our equipment is built to be your most trusted partner, working perfectly every single day without any hassle.",
    image: banner1,
    link: "/shop",
    specs: ["STURDY BUILT", "WORRY-FREE", "TRUSTED GEAR"],
    accent: "#2563eb"
  },
  {
    id: "VIS-02",
    title: "Professional High",
    highlight: "Quality Prints.",
    desc: "Make every project stand out with colors that are bright and lines that are always sharp. We help you create work that looks professional and impressive every time you hit print.",
    image: banner2,
    link: "/shop",
    specs: ["BRIGHT COLORS", "SHARP LINES", "ELITE FINISH"],
    accent: "#4f46e5"
  },
  {
    id: "SMR-03",
    title: "Simple Easy",
    highlight: "Mobile Printing.",
    desc: "Work the way you want, from anywhere you are. We make it simple to get your ideas from your screen onto paper, keeping all your important files organized and safe.",
    image: banner3,
    link: "/shop",
    specs: ["EASY ACCESS", "SIMPLE SETUP", "STAY ORGANIZED"],
    accent: "#64748b"
  }
];

export default function Hero() {
  const { openSearch } = useCart();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="bg-white font-urbanist relative overflow-hidden pt-20 lg:pt-24">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- MAIN GRID (NO BLUR, NO HOVER SCALE) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px] lg:h-[70vh]">
          
          {/* LEFT: PRIMARY DISPLAY */}
          <div className="lg:col-span-8 relative rounded-none overflow-hidden bg-slate-900 shadow-lg">
             
             <AnimatePresence initial={false} custom={direction} mode="popLayout">
               <motion.div
                 key={current}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5 }}
                 className="absolute inset-0 w-full h-full"
               >
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                 <img 
                   src={slides[current].image} 
                   alt="" 
                   className="w-full h-full object-cover"
                 />
               </motion.div>
             </AnimatePresence>

             {/* CONTENT OVERLAY */}
             <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-14">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                   <div className="mb-8">
                      <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight flex flex-col">
                        <span className="capitalize">
                          {slides[current].title.toLowerCase()}
                        </span>
                        <span 
                          className="italic capitalize"
                          style={{ color: slides[current].accent }}
                        >
                          {slides[current].highlight.toLowerCase()}
                        </span>
                      </h1>
                   </div>

                   <div className="max-w-xl mb-10">
                      <p className="text-white text-lg md:text-xl font-bold leading-tight mb-2 tracking-tight">
                         Better results for your business.
                      </p>
                      <p className="text-white/70 text-sm md:text-base font-medium leading-relaxed border-l-2 border-white/20 pl-6">
                         {slides[current].desc}
                      </p>
                   </div>

                   <div className="flex flex-wrap items-center gap-4">
                      <Link to={slides[current].link}>
                         <button className="h-16 px-12 bg-white text-slate-900 font-black text-[11px] uppercase tracking-[0.3em] rounded-none hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-4">
                           VIEW PRODUCTS
                           <ArrowRight size={18} />
                         </button>
                      </Link>

                      <div className="flex items-center gap-4 px-6 h-16 bg-white/10 border border-white/20 rounded-none">
                         <div className="h-10 w-10 flex items-center justify-center p-2 bg-white rounded-none">
                            <img src="/brands/hp.png" alt="HP" className="w-full h-full object-contain" />
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[11px] font-black text-white uppercase tracking-tight">Authorized HP Partner</span>
                         </div>
                      </div>
                   </div>
                </motion.div>
             </div>

             {/* NAVIGATION ARROWS */}
             <div className="absolute top-1/2 -translate-y-1/2 right-6 z-30 flex flex-col gap-3">
                <button onClick={prevSlide} className="h-12 w-12 bg-slate-900/50 text-white rounded-none flex items-center justify-center hover:bg-blue-600 transition-colors">
                   <ChevronLeft size={20} />
                </button>
                <button onClick={nextSlide} className="h-12 w-12 bg-slate-900/50 text-white rounded-none flex items-center justify-center hover:bg-blue-600 transition-colors">
                   <ChevronRight size={20} />
                </button>
             </div>
          </div>

          {/* RIGHT: SECONDARY PROMO BANNER */}
          <div className="lg:col-span-4 relative group rounded-none overflow-hidden bg-white shadow-lg border border-slate-50">
             {/* Soft Purple Gradient & Tech Light Effect */}
             <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-purple-50/40" />
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-200/20 blur-[100px] rounded-full" />
             
             <img 
               src={banner4} 
               alt="Modern Office Printers" 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 mix-blend-multiply opacity-90"
             />
             
             {/* Left-Aligned Content Overlay */}
             <div className="absolute inset-0 z-20 flex flex-col justify-center pl-6 pr-12">
                <div className="w-[90%] space-y-6">
                   <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.1] tracking-tight flex flex-col gap-1">
                      <span className="capitalize">Upgrade Your</span>
                      <span className="italic text-[#533DF6] capitalize">Office Printing.</span>
                   </h4>
                   <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] border-l-2 border-purple-200 pl-4 leading-relaxed">
                      High-Performance Printers <br/> for Home & Business
                   </p>
                   <div className="pt-8">
                      <Link to="/shop" className="inline-block px-10 py-4 bg-[#533DF6] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl shadow-purple-500/30 transition-all hover:bg-slate-900 hover:shadow-none">
                         Shop Now
                      </Link>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .stroke-text-white {
          -webkit-text-stroke: 1.5px white;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
