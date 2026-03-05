import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { ShieldCheck, Zap, Heart, Globe, Award, Users, ChevronRight, Printer, Package, Wrench, Leaf, MapPin, Mail, Phone, ArrowUpRight, ArrowRight, Activity, Terminal, Layers, Box, Sparkles, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner1 from "@/assets/bannerr/about.jpg";
import { cn } from '../lib/utils';

export default function About() {
  return (
    <div className="bg-white min-h-screen font-urbanist overflow-hidden">
      <SEO 
        title="About Us | MyPrinterMan" 
        description="Learn about MyPrinterMan, our mission to provide the best printing solutions, and our commitment as an authorized HP partner."
      />

      {/* --- COMPACT HERO SECTION --- */}
      <section className="relative py-16 lg:py-20 px-6 md:px-10 lg:px-16 bg-white overflow-hidden border-b border-slate-50 pt-28 lg:pt-32 lg:min-h-[70vh] flex items-center">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white shadow-md">
                  <img src="/brands/hp.png" alt="HP" className="h-4 w-auto object-contain brightness-200" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Authorized Partner</span>
               </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-slate-950 leading-[0.9] tracking-tight flex flex-col">
              <span className="capitalize">Better Printing</span>
              <span className="italic text-blue-600 capitalize">Solutions.</span>
            </h1>

            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl border-l-2 border-slate-100 pl-6">
              We provide high-quality printers and professional hardware to make sure your office runs smoothly. MyPrinterMan makes finding the right tools simple.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link to="/shop">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-14 px-10 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-none shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-4 group"
                >
                  VIEW CATALOG <ArrowRight size={16} />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-5 relative flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative aspect-[16/10] lg:aspect-square overflow-hidden rounded-none shadow-xl bg-slate-900 w-full lg:max-w-[90%]"
            >
              <img src={banner1} alt="Professional Hardware" className="w-full h-full object-cover grayscale-[10%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- CORE VALUES (COMPACT) --- */}
      <section className="py-16 lg:py-24 px-6 md:px-10 lg:px-16 bg-slate-50 relative overflow-hidden">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
          
          <div className="lg:col-span-5 space-y-8">
             <div className="flex items-center gap-2">
                <span className="h-[1px] w-4 bg-blue-600 animate-pulse" />
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Our Core</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[0.9] flex flex-col">
               <span className="capitalize">Why Choose</span>
               <span className="italic text-blue-600 capitalize">Us.</span>
             </h2>
             <div className="space-y-4">
                <p className="text-base font-bold text-slate-900 leading-relaxed uppercase tracking-tight">
                  MyPrinterMan is dedicated to your business success.
                </p>
                <p className="text-sm font-medium text-slate-500 leading-relaxed border-l-2 border-slate-200 pl-6">
                  We believe in equipment that works perfectly. We partner with top brands to offer reliable products backed by expert support.
                </p>
             </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 border-t border-l border-slate-200">
             {[
               { icon: <ShieldCheck size={24} />, title: "Guaranteed Quality", desc: "Every product is 100% genuine and tested." },
               { icon: <Zap size={24} />, title: "Fast Delivery", desc: "We get your order to you quickly." },
               { icon: <Phone size={24} />, title: "Expert Support", desc: "Our team is always ready to help you." },
               { icon: <Globe size={24} />, title: "Nationwide Reach", desc: "We ship securely to offices everywhere." }
             ].map((item, i) => (
               <div 
                 key={i}
                 className="p-8 bg-white border-r border-b border-slate-200 hover:bg-slate-50 transition-colors group"
               >
                  <div className="h-12 w-12 bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- MISSION (SCREEN FIT) --- */}
      <section className="py-16 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-12 lg:p-16 bg-slate-900 text-white rounded-none relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Box size={120} strokeWidth={1} />
             </div>
             <div className="relative z-10 space-y-6">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-blue-400">Mission</span>
                <h3 className="text-4xl lg:text-5xl font-black tracking-tight leading-[0.9] flex flex-col">
                  <span className="capitalize">Make Work</span>
                  <span className="italic text-blue-400 capitalize">Simple.</span>
                </h3>
                <p className="text-white/70 font-medium text-base leading-relaxed max-w-xs border-l-2 border-white/20 pl-6">
                  Reliable and easy printing solutions for businesses of all sizes.
                </p>
             </div>
          </div>
          
          <div className="p-12 lg:p-16 bg-blue-600 text-white rounded-none relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe size={120} strokeWidth={1} />
             </div>
             <div className="relative z-10 space-y-6">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-blue-200">Vision</span>
                <h3 className="text-4xl lg:text-5xl font-black tracking-tight leading-[0.9] flex flex-col">
                  <span className="capitalize">Global</span>
                  <span className="italic text-blue-200 capitalize">Support.</span>
                </h3>
                <p className="text-white/80 font-medium text-base leading-relaxed max-w-xs border-l-2 border-white/30 pl-6">
                  The most trusted name in office hardware and exceptional service.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* --- COMPACT CTA --- */}
      <section className="px-6 md:px-10 lg:px-16 py-16 lg:py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1920px] mx-auto">
          <div className="p-12 lg:p-16 bg-slate-50 text-slate-900 border border-slate-200 text-center rounded-none group flex flex-col items-center">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-8 leading-[0.9] flex flex-col items-center">
              <span className="capitalize">Upgrade Your</span>
              <span className="italic text-blue-600 capitalize">Office.</span>
            </h2>
            <Link to="/shop" className="h-14 px-10 bg-slate-900 text-white hover:bg-blue-600 transition-colors font-black text-[10px] uppercase tracking-[0.3em] shadow-md inline-flex items-center gap-4">
              SHOP NOW <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .stroke-text-white {
          -webkit-text-stroke: 1.5px white;
          color: transparent;
        }
        .stroke-text-light {
          -webkit-text-stroke: 2px #0f172a;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
