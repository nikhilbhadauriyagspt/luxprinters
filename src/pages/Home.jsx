import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import BrandShowcase from "@/components/BrandShowcase";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, Headphones, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";

export default function Home() {
  const [data, setData] = useState({
    all: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
          const filteredBrands = brandRes.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));
          
          const all = prodRes.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          const shuffled = [...all].sort(() => 0.5 - Math.random());

          setData({
            all,
            printers,
            accessories,
            mixedArrivals: shuffled,
            categories: catRes.data,
            brands: filteredBrands,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      <SEO 
        title="MyPrinterMan | Premium Printers & Hardware" 
        description="Premium destination for authorized HP printers, and essential accessories. Delivering excellence in tech solutions across the USA."
      />
      
      <Hero />
      <Features />
      <ShopByCategory categories={data.categories} />
      <Collections />
      <BestSellers products={data.all} />
      <BrandShowcase brands={data.brands} />
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />

      <CategorySlider 
        title="Office Printers" 
        subtitle="Laser & Inkjet" 
        products={data.printers} 
      />

      {/* 13. EXPERT ADVISORY - REDESIGNED */}
      <section className="py-24 lg:py-32 bg-white font-urbanist relative overflow-hidden border-t border-slate-100">
        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-[1px] w-4 bg-blue-600 animate-pulse" />
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Expert Help</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col mb-10">
                <span className="capitalize">Expert</span>
                <span className="italic text-blue-600 capitalize">Advisory.</span>
              </h2>
              
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-md border-l-2 border-slate-100 pl-8">
                Make your daily work easier with our expert help. We provide simple and reliable advice to help you pick the best tools for your office.
              </p>
              
              <Link to="/contact">
                <button className="h-16 px-12 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-none hover:bg-blue-600 transition-colors flex items-center gap-4 group">
                  TALK TO US
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Right Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 border-t border-l border-slate-100">
              {[
                { icon: <Shield size={24} />, title: "Help With Tools", desc: "We are here to help you keep everything working perfectly." },
                { icon: <Wrench size={24} />, title: "Easy Setup", desc: "We'll show you how to get your new gear ready in no time." },
                { icon: <Zap size={24} />, title: "Quick Help", desc: "Whenever you have a question, our team is ready to answer." },
                { icon: <Layers size={24} />, title: "Better Work", desc: "Make your daily work easier with the right tools for your team." }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="p-12 bg-white border-r border-b border-slate-100 flex flex-col group hover:bg-slate-50 transition-colors duration-300"
                >
                   <div className="h-12 w-12 bg-slate-900 text-white flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors">
                      {item.icon}
                   </div>
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">{item.title}</h4>
                   <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
