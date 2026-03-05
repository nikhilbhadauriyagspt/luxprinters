import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-white min-h-screen font-urbanist pb-20">
      {/* --- PREMIUM PAGE HEADER --- */}
      <header className="pt-48 pb-20 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Breadcrumb Tag */}
            <div className="flex items-center gap-2 mb-8">
              <span className="h-[1px] w-6 bg-blue-600 animate-pulse" />
              <nav className="flex items-center gap-3 text-blue-600 text-[10px] font-black uppercase tracking-[0.4em]">
                <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
                <ChevronRight size={10} strokeWidth={3} />
                <span className="opacity-50">Document</span>
              </nav>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tight flex flex-col mb-10">
              <span className="capitalize">{title.split(' ').slice(0, -1).join(' ') || title}</span>
              <span className="italic text-blue-600 capitalize">{title.split(' ').slice(-1)}</span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-t border-slate-100 pt-10">
              {subtitle && (
                <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed capitalize tracking-tight">
                  {subtitle}
                </p>
              )}
              
              <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-none border border-slate-100 shrink-0">
                <Clock size={14} className="text-blue-600" />
                <span className="text-slate-900 text-[10px] font-black uppercase tracking-widest">Revised: {lastUpdated}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <article className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-4xl prose prose-slate prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-slate-900 prose-h2:flex prose-h2:items-center prose-h2:gap-4 prose-h2:before:content-[''] prose-h2:before:h-8 prose-h2:before:w-1 prose-h2:before:bg-blue-600 prose-h2:before:rounded-full prose-p:text-slate-600 prose-p:text-lg prose-p:font-medium prose-p:leading-relaxed prose-li:text-slate-600 prose-li:font-medium prose-strong:text-slate-900 prose-a:text-blue-600 prose-a:font-black prose-a:no-underline hover:prose-a:underline"
        >
          {children}
        </motion.div>
      </article>

      <style>{`
        .stroke-text-light {
          -webkit-text-stroke: 2px #0f172a;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
