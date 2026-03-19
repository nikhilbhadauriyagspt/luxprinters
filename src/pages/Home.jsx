import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import TripleBanners from "@/components/TripleBanners";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import bannerImg from "../assets/bannerr/banner6.jpg";

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
        title="Yankee's Printer | Quality Printers & Hardware"
        description="Your trusted source for high-quality printers and printing hardware. Delivering excellence across the USA."
      />

      
      <Hero />


      <Features />      
     

      <ShopByCategory categories={data.categories} />
      <TripleBanners />
      <BestSellers products={data.all} />
      
      
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />
       <Collections />
      <CategorySlider 
        title="Professional Printers"  
        products={data.printers} 
      />
       
     {/* --- PREMIUM CONTACT CTA SECTION --- */}
<section className="py-10 md:py-12 bg-white font-jakarta">
  <div className="max-w-[1920px] mx-auto px-6 lg:px-20">
    <div className="relative rounded-[30px] md:rounded-[40px] p-8 md:p-12 text-center overflow-hidden bg-[#FBFBFA] border border-[#333330]/5 shadow-sm group">
      
      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#96968B]">Help & Advice</span>
          </motion.div>
          
          <h2 className="text-2xl md:text-4xl font-light text-black leading-tight uppercase tracking-tight">
            Need the <span className="font-medium italic text-[#96968B]">Perfect Printer?</span>
          </h2>
          <p className="text-[#333330] text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
            We're here to help you find exactly what you need. Just reach out and we'll handle the rest.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/contact"
            className="bg-black text-white px-8 h-12 flex items-center justify-center rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#333330] active:scale-95"
          >
            Talk to us
          </Link>
          <Link
            to="/faq"
            className="bg-white border border-[#333330]/10 text-black px-8 h-12 flex items-center justify-center rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white active:scale-95 shadow-sm"
          >
            Find answers
          </Link>
        </div>
      </div>
      
      {/* Subtle Organic Background Accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -mr-24 -mt-24 blur-[60px] opacity-50" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F1F1E9] rounded-full -ml-16 -mb-16 blur-[40px] opacity-40" />
    </div>
  </div>
</section>
    </div>
    
  );
  
}
