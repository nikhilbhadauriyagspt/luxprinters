import { motion } from "framer-motion";
import { ShoppingBag, Heart, ArrowRight, Loader2, Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import API_BASE_URL from "../config";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { cn } from "../lib/utils";

export default function CategorySlider({ title, subtitle, products = [], bgColor = "bg-white" }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (products.length === 0) return null;

  return (
    <section className={cn("px-6 md:px-10 lg:px-16 py-20 lg:py-28 font-urbanist overflow-hidden relative", bgColor)}>
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* --- MATCHING CENTERED AMBER HEADER --- */}
        <div className="flex flex-col items-center text-center mb-20 relative px-6">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tighter uppercase inline-block relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
                {title}
              </span>
            </h2>
          
          </div>
          <p className="mt-6 text-slate-500 text-sm md:text-base font-medium max-w-xl leading-relaxed mx-auto">
            High-performance printing solutions engineered for professional clarity and speed.
          </p>
        </div>

        <div className="relative group/carousel">
          <Carousel
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {products.map((p, i) => (
                <CarouselItem key={p.id} className="pl-0 pr-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div 
                    className="relative bg-white border border-slate-100 rounded-[2.5rem] p-5 transition-all duration-500 flex flex-col group hover:border-indigo-600 h-[500px]"
                  >
                    {/* Image Area - Pure White */}
                    <div className="relative aspect-square rounded-[2rem] bg-white border border-slate-50 flex items-center justify-center p-6 mb-6 overflow-hidden transition-all duration-500 group-hover:bg-slate-50/50">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-3 right-3 z-20 h-9 w-9 bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-50",
                          isInWishlist(p.id) ? "text-red-500" : "text-slate-300 hover:text-red-500"
                        )}
                      >
                        <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      <img 
                        src={getImagePath(p.images)} 
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                        alt={p.name} 
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col px-2">
                      <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2 px-2.5 py-1 bg-indigo-50 self-start rounded-full">
                        {p.brand_name || 'AUTHENTIC'}
                      </span>

                      <Link to={`/product/${p.slug}`} className="flex-1">
                        <h3 className="font-black text-indigo-950 text-base md:text-lg capitalize tracking-tight line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                          {p.name.toLowerCase()}
                        </h3>
                      </Link>

                      <div className="mt-6 flex items-center justify-between pt-5 border-t border-slate-100">
                        <span className="text-2xl font-black text-indigo-950 tracking-tighter">${p.price}</span>

                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          disabled={addedItems[p.id]}
                          className={cn(
                            "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg active:scale-90 z-30 relative",
                            addedItems[p.id] 
                              ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                              : "bg-indigo-950 text-white hover:bg-amber-500 hover:text-indigo-950 shadow-indigo-950/20"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                        </button>
                      </div>
                    </div>

                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Side Controls */}
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 z-30 pointer-events-none hidden xl:block transition-all duration-500 opacity-0 group-hover/carousel:opacity-100">
               <CarouselPrevious className="static translate-y-0 h-16 w-16 bg-white border border-slate-200 flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white transition-all duration-300 pointer-events-auto shadow-xl" />
            </div>
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 z-30 pointer-events-none hidden xl:block transition-all duration-500 opacity-0 group-hover/carousel:opacity-100">
               <CarouselNext className="static translate-y-0 h-16 w-16 bg-white border border-slate-200 flex items-center justify-center text-indigo-950 hover:bg-indigo-950 hover:text-white transition-all duration-300 pointer-events-auto shadow-xl" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
