import { motion } from "framer-motion";
import { Printer, ChevronRight, ArrowRight, ArrowUpRight, Settings, Box, Activity, ShieldCheck, Zap, Layers } from "lucide-react";
import { Link } from "react-router-dom";

// Import local assets
import printerCat from "@/assets/category/printer_cat.jpg";
import { cn } from "../lib/utils";

export default function Collections() {
  return (
    <section className="bg-white font-urbanist relative overflow-hidden py-24 lg:py-32">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT: CONTENT --- */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                   <span className="h-[1px] w-4 bg-blue-600 animate-pulse" />
                   <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Expert Selection</span>
                </div>

                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
                  <span className="capitalize text-slate-900">Premium</span>
                  <span className="italic text-blue-600 capitalize">Experience.</span>
                </h2>

                <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg border-l-2 border-slate-100 pl-8">
                  Get the best results for your office with tools that are built to last. We only pick equipment that we know will make your work look great and run perfectly.
                </p>
              </div>

              <div className="pt-4">
                <Link to="/shop?category=printers" className="inline-block">
                  <button className="h-16 px-12 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-none hover:bg-blue-600 transition-colors flex items-center gap-4 group">
                    EXPLORE COLLECTION
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: VISUAL --- */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[16/10] overflow-hidden rounded-none shadow-2xl bg-slate-900"
            >
              <img 
                src={printerCat} 
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700" 
                alt="Printer Excellence" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />

              {/* Minimal Badge */}
              <div className="absolute top-8 right-8 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-none hidden md:flex items-center gap-4">
                 <div className="h-8 w-8 bg-blue-600 text-white flex items-center justify-center">
                    <Printer size={18} />
                 </div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Office Ready</span>
              </div>

              {/* Simple Action Strip */}
              <Link to="/shop?category=printers" className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md hover:bg-white transition-all group">
                 <div className="flex items-center justify-between px-10 py-8 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                       <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                       <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Better Tools, Better Results</h4>
                    </div>
                    <div className="h-10 w-10 bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                       <ArrowRight size={18} />
                    </div>
                 </div>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
