import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function BrandShowcase({ brands = [] }) {
  const getBrandLogo = (brand) => {
    if (brand.logo) return brand.logo;
    return `https://ui-avatars.com/api/?name=${brand.name}&background=f8fafc&color=312e81&bold=true`;
  };

  if (brands.length === 0) return null;

  // Duplicate brands for seamless infinite loop
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-20 lg:py-24 bg-white font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* --- MATCHING CENTERED AMBER HEADER --- */}
        <div className="flex flex-col items-center text-center mb-20 relative px-6">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tighter uppercase inline-block relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
                Official Partners
              </span>
            </h2>
          </div>
          <p className="mt-6 text-slate-500 text-sm md:text-base font-medium max-w-xl leading-relaxed mx-auto px-6">
            We directly collaborate with global leaders to provide authentic hardware and genuine supplies.
          </p>
        </div>

        {/* --- INFINITE CIRCULAR MARQUEE --- */}
        <div className="relative w-full overflow-hidden py-10 group/marquee">
          <div className="flex animate-marquee-brands whitespace-nowrap gap-12 md:gap-20 items-center hover:[animation-play-state:paused]">
            {marqueeBrands.map((brand, i) => (
              <Link 
                key={`${brand.id}-${i}`}
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="inline-flex flex-col items-center shrink-0 group transition-transform duration-500 hover:scale-110"
              >
                {/* Circular Node */}
                <div className="relative mb-4">
                  <div className="h-28 w-28 md:h-36 md:w-36 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-6 md:p-8 transition-all duration-500 group-hover:border-indigo-600 group-hover:bg-white shadow-sm overflow-hidden">
                    <img 
                      src={getBrandLogo(brand)} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                    />
                  </div>
                  
                  {/* Small Hover Badge */}
                  <div className="absolute -top-1 -right-1 h-8 w-8 bg-indigo-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                     <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Brand Name */}
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-indigo-950 transition-colors">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Fade Overlays for cinematic feel */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>

      </div>

      <style>{`
        .animate-marquee-brands {
          animation: marquee-scroll 60s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
