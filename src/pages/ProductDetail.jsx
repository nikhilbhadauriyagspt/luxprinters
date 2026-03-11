import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  Share2,
  CheckCircle,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
          
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;
          
          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;
          else if (brand) fetchUrl += `&brand=${brand}`;

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mb-6" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Synchronizing Data Node...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-white">
        <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
           <ShoppingCart size={40} className="text-slate-200" />
        </div>
        <h2 className="text-4xl font-black text-indigo-950 uppercase tracking-tighter mb-4">Hardware Not Found.</h2>
        <Link to="/shop" className="h-16 px-12 bg-indigo-950 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-xl">RETURN TO INVENTORY</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen pt-40 pb-24 font-urbanist overflow-hidden">
      <SEO title={product.name} description={product.description?.substring(0, 160)} />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-12 bg-slate-50/50 w-fit px-6 py-2.5 rounded-full border border-slate-100/50">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Hub</Link>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <Link to="/shop" className="hover:text-indigo-600 transition-colors">Inventory</Link>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-indigo-950 truncate max-w-[200px]">{product.name.toLowerCase()}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* --- LEFT: GALLERY --- */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-white border border-slate-100 rounded-[3rem] flex items-center justify-center p-12 relative overflow-hidden group shadow-2xl shadow-indigo-500/5"
            >
              <img 
                src={mainImage} 
                alt={product.name} 
                className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute top-8 right-8 flex flex-col gap-3">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "h-14 w-14 rounded-2xl transition-all duration-500 flex items-center justify-center shadow-xl",
                    isInWishlist(product.id) ? "bg-red-500 text-white shadow-red-500/20" : "bg-white border border-slate-100 text-slate-300 hover:text-red-500"
                  )}
                >
                  <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
                <button className="h-14 w-14 rounded-2xl bg-white border border-slate-100 text-indigo-950 hover:bg-indigo-950 hover:text-white transition-all shadow-xl flex items-center justify-center">
                  <Share2 size={24} />
                </button>
              </div>

              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(#1e1b4b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </motion.div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {images.map((img, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={cn(
                      "h-24 w-24 shrink-0 rounded-2xl border-2 transition-all duration-500 flex items-center justify-center p-3 overflow-hidden bg-white shadow-sm",
                      activeImage === idx ? "border-indigo-600 scale-95 shadow-indigo-500/10" : "border-slate-50 hover:border-indigo-200"
                    )}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: INFO --- */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                 <div className="px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                      {product.brand_name || 'AUTHENTIC HARDWARE'}
                    </span>
                 </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-indigo-950 leading-none tracking-tighter uppercase mb-10">
                {product.name.toLowerCase()}
              </h1>

              <div className="flex items-baseline gap-6 mb-12 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 w-fit pr-16 shadow-inner">
                <span className="text-6xl font-black text-indigo-950 tracking-tighter">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-2xl font-bold text-slate-300 line-through tracking-tighter">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3">
                   <div className="h-1 w-8 bg-amber-500 rounded-full" />
                   <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Hardware Specifications</p>
                </div>
                <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                  {product.description || "High-quality professional printing solution designed for reliability and perfect clarity in every workplace environment. Engineered for high-volume performance."}
                </p>
              </div>
            </div>

            {/* Actions Area */}
            <div className="space-y-8 mt-auto pt-12 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="h-20 bg-slate-50 rounded-2xl px-2 flex items-center border border-slate-100 shadow-inner">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-12 w-12 flex items-center justify-center bg-white rounded-xl text-indigo-950 shadow-sm transition-all active:scale-90 hover:bg-indigo-50"><Minus size={20} strokeWidth={3} /></button>
                  <span className="text-xl font-black w-20 text-center text-indigo-950">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-12 w-12 flex items-center justify-center bg-white rounded-xl text-indigo-950 shadow-sm transition-all active:scale-90 hover:bg-indigo-50"><Plus size={20} strokeWidth={3} /></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "flex-1 h-20 flex items-center justify-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] rounded-[1.5rem] transition-all duration-500 active:scale-95 shadow-2xl",
                    isAdded ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-indigo-950 text-white hover:bg-amber-500 hover:text-indigo-950 shadow-indigo-950/20"
                  )}
                >
                  {isAdded ? <CheckCircle size={24} /> : <ShoppingBag size={24} />}
                  {isAdded ? "ITEM ADDED" : "INITIALIZE ADD TO CART"}
                </button>
              </div>

              {/* Guaranteed Nodes */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: <Truck size={20} />, label: "Express Delivery" },
                  { icon: <ShieldCheck size={20} />, label: "Full Warranty" },
                  { icon: <RefreshCcw size={20} />, label: "Secure Returns" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-50/50 rounded-3xl border border-slate-100/50 group hover:bg-white hover:border-indigo-100 transition-all duration-500">
                    <div className="text-indigo-600 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-950">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED HARDWARE --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-40 border-t border-slate-100 pt-32 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 relative px-2">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[1px] w-6 bg-amber-500" />
                  <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Hardware Suggestions</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-indigo-950 tracking-tighter uppercase leading-none">
                  Related <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 italic">Discoveries.</span>
                </h2>
              </div>
              <Link to="/shop" className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-all pb-4">
                Explore Complete Catalog <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {relatedProducts.map((p) => (
                <div 
                  key={p.id}
                  className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-5 transition-all duration-500 flex flex-col hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/5 h-full overflow-hidden"
                >
                  <div className="relative aspect-square rounded-[2rem] bg-white border border-slate-50 flex items-center justify-center p-6 mb-6 overflow-hidden transition-all duration-500 group-hover:bg-slate-50/50">
                    <img src={getImagePath(p.images)} alt={p.name} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="space-y-2 px-2 flex-1 flex flex-col">
                    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-1.5 px-2 py-0.5 bg-indigo-50 self-start rounded-full">{p.brand_name}</span>
                    <h4 className="text-base font-black text-indigo-950 group-hover:text-indigo-600 transition-colors uppercase truncate mb-4">{p.name.toLowerCase()}</h4>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                       <span className="text-2xl font-black text-indigo-950 tracking-tighter">${parseFloat(p.price).toLocaleString()}</span>
                       <div className="h-10 w-10 bg-indigo-950 text-white rounded-xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-indigo-950 transition-all shadow-lg active:scale-90"><ArrowRight size={18} /></div>
                    </div>
                  </div>
                  <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0 rounded-[2.5rem]" onClick={() => window.scrollTo(0, 0)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
