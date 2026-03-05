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
    <section className={cn("px-6 md:px-10 lg:px-16 py-24 lg:py-32 font-urbanist overflow-hidden relative", bgColor)}>
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        <div className="relative group/carousel">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-[1px] w-4 bg-blue-600 animate-pulse" />
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">{subtitle}</span>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
                  <span className="capitalize">{title.split(' ')[0]}</span>
                  <span className="italic text-blue-600 capitalize">{title.split(' ').slice(1).join(' ')}.</span>
                </h2>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                 <div className="flex gap-2">
                    <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm" />
                    <CarouselNext className="static translate-y-0 h-12 w-12 bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm" />
                 </div>
              </div>
            </div>

            <CarouselContent className="-ml-0 border-t border-l border-slate-100">
              {products.map((p, i) => (
                <CarouselItem key={p.id} className="pl-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div 
                    className="relative bg-white border-r border-b border-slate-100 transition-all duration-300 h-[480px] flex flex-col group overflow-hidden hover:bg-slate-50"
                  >
                    {/* Image */}
                    <div className="relative h-[260px] flex items-center justify-center p-10">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-6 right-6 z-20 h-10 w-10 bg-white border border-slate-100 flex items-center justify-center transition-all duration-300 shadow-sm",
                          isInWishlist(p.id) ? "text-red-500" : "text-slate-300 hover:text-red-500"
                        )}
                      >
                        <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      <img 
                        src={getImagePath(p.images)} 
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                        alt={p.name} 
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 border-t border-slate-50 flex flex-col">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">
                        {p.brand_name || 'Authorized'}
                      </span>

                      <Link to={`/product/${p.slug}`} className="flex-1">
                        <h3 className="font-black text-slate-900 text-lg capitalize tracking-tight line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                          {p.name.toLowerCase()}
                        </h3>
                      </Link>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex flex-col">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Office Choice</span>
                           <span className="text-2xl font-black text-slate-900 tracking-tighter">${p.price}</span>
                        </div>

                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          disabled={addedItems[p.id]}
                          className={cn(
                            "h-12 w-12 flex items-center justify-center transition-all duration-300",
                            addedItems[p.id] 
                              ? "bg-emerald-500 text-white" 
                              : "bg-slate-900 text-white hover:bg-blue-600"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={20} strokeWidth={3} /> : <ShoppingBag size={20} />}
                        </button>
                      </div>
                    </div>

                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
