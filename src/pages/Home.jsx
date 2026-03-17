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
        title="LucyPrinters | Quality Printers & Hardware"
        description="Your trusted source for high-quality printers and printing hardware. Delivering excellence across the USA."
      />

      
      <Hero />


      <Features />      <ShopByCategory categories={data.categories} />
      <TripleBanners />
      <BestSellers products={data.all} />
      
      
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />
       <Collections />
      <CategorySlider 
        title="Professional Printers"  
        products={data.printers} 
      />
       
     {/* --- MINIMAL CONTACT CTA SECTION --- */}
<section className="py-12 bg-white font-jakarta">
  <div className="max-w-[1600px] mx-auto px-4 md:px-10">
    <div className="relative rounded-sm p-10 md:p-16 text-center overflow-hidden min-h-[300px] flex items-center justify-center border border-gray-100 shadow-md">
      
      {/* Background Image with Overlay */}
      <img 
        src={bannerImg}
        alt="" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-white/90" />

      <div className="max-w-xl mx-auto space-y-6 relative z-10">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
            Need expert help for <br /> 
            <span className="text-blue-600 font-medium">your business?</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-normal max-w-sm mx-auto">
            Find the perfect printing setup with our professional advice. We are here to help you 24/7.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-black text-white px-8 py-3 rounded-sm font-bold text-sm transition-all duration-300"
          >
            Contact An Expert
          </Link>
          <Link
            to="/faq"
            className="bg-gray-100 hover:bg-gray-200 text-black px-8 py-3 rounded-sm font-bold text-sm transition-all duration-300"
          >
            View FAQ
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
    
  );
  
}
