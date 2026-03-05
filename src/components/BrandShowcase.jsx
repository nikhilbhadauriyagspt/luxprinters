import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Globe, ShieldCheck, Zap } from "lucide-react";
import { cn } from "../lib/utils";

export default function BrandShowcase({ brands = [] }) {
  const getBrandLogo = (brand) => {
    if (brand.logo) return brand.logo;
    return `https://ui-avatars.com/api/?name=${brand.name}&background=f8fafc&color=0f172a&bold=true`;
  };

  if (brands.length === 0) return null;

  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-24 lg:py-32 bg-white font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[1px] w-4 bg-blue-600 animate-pulse" />
            <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Official Partners</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col items-center">
            <span className="capitalize">Trusted</span>
            <span className="italic text-blue-600 capitalize">Partnerships.</span>
          </h2>
          <p className="mt-8 text-slate-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            We work with the biggest names in the industry to bring you the highest quality printing tools and reliable equipment.
          </p>
        </div>

        {/* --- BRAND MARQUEE --- */}
        <div className="relative w-full overflow-hidden border-t border-b border-slate-100 py-16">
          <div className="animate-marquee-slow flex items-center gap-0 whitespace-nowrap">
            {marqueeBrands.map((brand, i) => (
              <Link 
                key={`${brand.id}-${i}`}
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="group border-r border-slate-100 px-16 first:border-l last:border-r"
              >
                <div className="flex flex-col items-center gap-6 transition-all duration-300 group-hover:translate-y-[-5px]">
                  <div className="h-16 w-32 flex items-center justify-center">
                    <img 
                      src={getBrandLogo(brand)} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .animate-marquee-slow {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
