import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import aboutHero from "@/assets/bannerr/about.jpg";
import banner4 from "@/assets/bannerr/banner4.jpg";

const About = () => {
  return (
    <div className="bg-[#FBFBFA] min-h-screen font-jakarta text-[#333330] overflow-x-hidden">
      <SEO 
        title="Our Story | Yankee's Printer"
        description="Discover the philosophy behind Yankee's Printer. We combine luxury design with high-performance printing technology."
      />

      {/* --- MINIMALIST STORY HEADER --- */}
      <section className="relative pt-32 pb-16 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Image Area: Refined Arch */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-full max-w-[480px] bg-[#F1F1E9] rounded-t-[200px] rounded-b-[40px] overflow-hidden shadow-2xl border border-white/60"
            >
              <img src={aboutHero} alt="Story" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBFA]/20 via-transparent to-transparent" />
            </motion.div>

            {/* Content Area: Quiet Luxury Typography */}
            <div className="space-y-10">
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-8 h-[1px] bg-[#96968B]"></span>
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#333330]/40">The Narrative</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-light text-[#1A1A1A] uppercase tracking-tight leading-[1.1]"
                >
                  Crafting the <br />
                  <span className="font-medium italic text-[#96968B]">Perfect Impression</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-base text-[#666660] font-light leading-relaxed"
                >
                  We believe that printing is more than just ink on paper—it's the physical realization of your best ideas. At Yankee's Printer, we curate tools that make that process seamless and beautiful.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {[
                  { title: "Precision", desc: "Every model is tested for absolute clarity." },
                  { title: "Aesthetic", desc: "Designs that complement your space." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="space-y-2"
                  >
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#1A1A1A]">{item.title}</h4>
                    <p className="text-[13px] text-[#666660] font-light leading-snug">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- VALUES: REFINED COMPACT GRID --- */}
      <section className="py-20 bg-white border-y border-[#333330]/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Shield size={18} strokeWidth={1.2} />, title: "Secure Trust", desc: "Reliable transactions and guaranteed privacy." },
              { icon: <Zap size={18} strokeWidth={1.2} />, title: "Ease of Use", desc: "Simple setup for a frustration-free experience." },
              { icon: <Award size={18} strokeWidth={1.2} />, title: "Authenticity", desc: "Authorized source for global leading brands." }
            ].map((v, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4">
                <div className="text-[#96968B]">{v.icon}</div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">{v.title}</h3>
                <p className="text-[13px] text-[#666660] font-light leading-relaxed max-w-[240px]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: PERFORMANCE & QUALITY --- */}
      <section className="py-24 px-6 bg-[#FBFBFA]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#96968B]">Quality Engineering</span>
                <h2 className="text-3xl md:text-4xl font-light text-[#1A1A1A] uppercase tracking-tight leading-tight">
                  Designed for <br /> <span className="font-medium italic text-[#96968B]">Superior Reliability</span>
                </h2>
              </div>
              <p className="text-base text-[#666660] font-light leading-relaxed max-w-lg">
                Our selection process focuses on high-performance components and intuitive engineering. 
                Whether it's a high-volume office task or a detailed creative print, our hardware is 
                chosen to provide consistent, flawless results every single time.
              </p>
              <ul className="space-y-4 pt-2">
                {["Vibrant color reproduction", "Silent operational modes", "Energy-efficient standby"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-4 text-[13px] font-light text-[#333330]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#96968B]/40" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/3">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[3/4] rounded-t-full bg-white border border-[#333330]/5 shadow-lg overflow-hidden flex items-center justify-center"
              >
                <img src={banner4} alt="Printer Detail" className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110" />
                {/* Subtle gradient to blend at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 md:py-40 text-center relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#F1F1E9] rounded-full blur-[100px] opacity-50 -z-10" />
        
        <div className="max-w-2xl mx-auto space-y-12 relative z-10 px-6">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[9px] font-bold tracking-[0.5em] uppercase text-[#96968B] mb-2"
            >
              The Next Chapter
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tighter text-[#1A1A1A] leading-tight">
              Ready to find your <br /> <span className="font-medium italic text-[#96968B]">Perfect Match?</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link 
              to="/shop" 
              className="bg-[#1A1A1A] text-white px-12 h-14 flex items-center justify-center rounded-full font-bold text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-[#333330] shadow-xl hover:shadow-2xl active:scale-95 w-full sm:w-auto"
            >
              Shop Collection
            </Link>
            <Link 
              to="/contact" 
              className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#333330] hover:text-[#96968B] transition-colors"
            >
              <span>Speak with us</span>
              <div className="w-8 h-[1px] bg-[#333330]/20 group-hover:bg-[#96968B] group-hover:w-12 transition-all duration-500" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
