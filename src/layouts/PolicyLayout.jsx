import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-[#F8F8F6] min-h-screen font-jakarta pb-24 text-[#333330]">
      {/* --- REFINED LUXURY BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Architectural Circle (Scaled down) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-[400px] -left-[400px] md:-top-[500px] md:-left-[500px] w-[1000px] h-[1000px] bg-[#F1F1E9] rounded-full border border-[#333330]/[0.03] shadow-[inset_0_0_80px_rgba(0,0,0,0.01)]"
        />
      </div>

      {/* --- PREMIUM POLICY HEADER --- */}
      <section className="relative pt-32 pb-16 px-6 lg:px-20">
        <div className="max-w-[1920px] mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#333330]/30">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <ChevronRight size={12} strokeWidth={1.5} className="text-[#96968B]/40" />
              <span>Legal Center</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-black leading-[1.1]">
              {title.split(' ').slice(0, -1).join(' ')} <span className="font-medium italic text-[#96968B]">{title.split(' ').pop()}</span>
            </h1>

            {subtitle && (
              <p className="text-[#666660] text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}

            <div className="pt-4 flex flex-col items-center gap-4">
              <div className="w-12 h-[1px] bg-[#96968B]/30" />
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#333330]/40">
                <Clock size={14} strokeWidth={1.5} />
                <span>Last Revised: {lastUpdated}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- POLICY CONTENT --- */}
      <article className="max-w-[1920px] mx-auto px-6 lg:px-20 py-12 md:py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto prose prose-zinc prose-headings:font-light prose-headings:uppercase prose-headings:text-black prose-h2:text-2xl prose-h2:pt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-[#333330]/5 prose-h2:pb-4 prose-p:text-[#666660] prose-p:text-base prose-p:leading-relaxed prose-li:text-[#666660] prose-li:text-base prose-strong:text-black prose-strong:font-semibold prose-a:text-black prose-a:underline hover:prose-a:text-[#96968B] transition-colors"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}
