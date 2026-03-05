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
  ArrowRight
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
          
          let fetchUrl = `${API_BASE_URL}/products?limit=6`;
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-6" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h2 className="text-4xl font-black text-slate-900 uppercase mb-4">Not Found</h2>
        <Link to="/shop" className="px-10 py-4 bg-slate-900 text-white rounded-none text-[10px] font-black uppercase tracking-widest">Return to Shop</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen pt-40 pb-24 font-urbanist overflow-hidden">
      <SEO title={product.name} description={product.description?.substring(0, 160)} />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-12">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-blue-600 transition-colors">Catalog</Link>
          <ChevronRight size={10} />
          <span className="text-slate-900 truncate max-w-[200px]">{product.name.toLowerCase()}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* --- LEFT: GALLERY --- */}
          <div className="lg:col-span-7 space-y-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="aspect-square bg-slate-50 border border-slate-100 flex items-center justify-center p-12 relative overflow-hidden group"
            >
              <img 
                src={mainImage} 
                alt={product.name} 
                className="max-w-[85%] max-h-[85%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
              />
              <button 
                onClick={() => toggleWishlist(product)}
                className={cn(
                  "absolute top-8 right-8 h-12 w-12 border transition-all flex items-center justify-center",
                  isInWishlist(product.id) ? "bg-red-500 border-red-500 text-white" : "bg-white border-slate-100 text-slate-300 hover:text-red-500"
                )}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </motion.div>

            {images.length > 1 && (
              <div className="grid grid-cols-6 gap-4">
                {images.map((img, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={cn(
                      "aspect-square border transition-all flex items-center justify-center p-2",
                      activeImage === idx ? "border-blue-600 bg-white" : "border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300"
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
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-10 w-10 flex items-center justify-center p-2 bg-slate-50 border border-slate-100">
                    <img src="/brands/hp.png" alt="" className="w-full h-full object-contain grayscale opacity-50" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                   {product.brand_name || 'AUTHENTIC HARDWARE'}
                 </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[0.9] tracking-tight flex flex-col mb-10">
                <span className="capitalize">{product.name.split(' ').slice(0, -1).join(' ') || product.name}</span>
                <span className="italic text-blue-600 capitalize">{product.name.split(' ').slice(-1)}</span>
              </h1>

              <div className="flex items-center gap-6 mb-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-2 border border-emerald-100 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-emerald-500 animate-pulse" />
                  In Stock & Ready
                </span>
              </div>

              <div className="flex items-baseline gap-4 mb-12">
                <span className="text-5xl font-black text-slate-950 tracking-tighter">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-2xl font-bold text-slate-300 line-through tracking-tighter">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Details</p>
                <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed border-l-2 border-slate-100 pl-6">
                  {product.description || "High-quality professional printing solution designed for reliability and perfect clarity in every workplace environment."}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-6 mt-auto pt-12 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-16 bg-slate-50 border border-slate-100 flex items-center">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-full w-12 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all border-r border-slate-100"><Minus size={16} /></button>
                  <span className="text-base font-black w-16 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-full w-12 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all border-l border-slate-100"><Plus size={16} /></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "flex-1 h-16 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all",
                    isAdded ? "bg-emerald-500 text-white shadow-emerald-500/20 shadow-lg" : "bg-slate-900 text-white hover:bg-blue-600 shadow-xl"
                  )}
                >
                  {isAdded ? <CheckCircle size={20} /> : <ShoppingBag size={20} />}
                  {isAdded ? "ADDED" : "ADD TO CART"}
                </button>
                
                <button className="h-16 w-16 bg-white border border-slate-100 text-slate-900 hover:bg-slate-950 hover:text-white transition-all flex items-center justify-center">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-1 pt-6">
                {[
                  { icon: <Truck size={16} />, label: "Express Delivery" },
                  { icon: <ShieldCheck size={16} />, label: "Official Warranty" },
                  { icon: <RefreshCcw size={16} />, label: "7-Day Returns" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3 p-4 bg-slate-50">
                    <div className="text-blue-600">{item.icon}</div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-slate-100 pt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-[1px] w-4 bg-blue-600 animate-pulse" />
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">Hand-Picked</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex flex-col">
                  <span className="capitalize">Related</span>
                  <span className="italic text-blue-600 capitalize">Discoveries.</span>
                </h2>
              </div>
              <Link to="/shop" className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all pb-2 group">
                Explore Full Catalog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border-t border-l border-slate-100">
              {relatedProducts.map((p) => (
                <Link to={`/product/${p.slug}`} key={p.id} className="group relative bg-white border-r border-b border-slate-100 p-8 flex flex-col transition-all duration-300 hover:bg-slate-50 overflow-hidden" onClick={() => window.scrollTo(0, 0)}>
                  <div className="aspect-square mb-10 flex items-center justify-center p-4 relative">
                    <img src={getImagePath(p.images)} alt={p.name} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{p.brand_name}</span>
                    <h4 className="text-[13px] font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase truncate tracking-tight mb-4">{p.name.toLowerCase()}</h4>
                    <div className="mt-auto flex items-center justify-between">
                       <span className="text-xl font-black text-slate-950 tracking-tighter">${parseFloat(p.price).toLocaleString()}</span>
                       <div className="h-8 w-8 bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors"><ArrowRight size={14} /></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
