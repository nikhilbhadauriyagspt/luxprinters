import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Heart, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  CheckCircle,
  ShoppingBag,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
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
    openCartDrawer();
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
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F8F6] font-jakarta">
        <Loader2 className="animate-spin h-8 w-8 text-[#96968B] mb-6" strokeWidth={1.5} />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#333330]/30">Retrieving Pieces...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-[#F8F8F6] font-jakarta text-[#333330]">
        <div className="h-24 w-24 bg-white rounded-full border border-[#333330]/5 flex items-center justify-center mb-8 shadow-sm">
           <ShoppingBag size={32} className="text-[#96968B]/30" strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-light uppercase tracking-widest mb-4">Piece Not Found</h2>
        <Link to="/shop" className="group relative inline-flex items-center gap-4 bg-[#1A1A1A] text-white h-12 px-10 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95">
          <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em]">Return to Catalog</span>
          <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-[#F8F8F6] min-h-screen pt-24 pb-24 font-jakarta text-[#333330] overflow-x-hidden">
      <SEO title={`${product.name} | Yankee's Printer`} description={product.description?.substring(0, 160)} />
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-[400px] -left-[400px] md:-top-[500px] md:-left-[500px] w-[1000px] h-[1000px] bg-[#F1F1E9] rounded-full border border-[#333330]/[0.03] shadow-[inset_0_0_80px_rgba(0,0,0,0.01)]"
        />
      </div>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-20 relative z-10">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#333330]/30 mb-12">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight size={12} strokeWidth={1.5} className="text-[#96968B]/40" />
          <Link to="/shop" className="hover:text-black transition-colors">Catalog</Link>
          <ChevronRight size={12} strokeWidth={1.5} className="text-[#96968B]/40" />
          <span className="text-black truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* --- LEFT: GALLERY CANVAS --- */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-square bg-white rounded-[40px] md:rounded-[60px] flex items-center justify-center p-12 md:p-20 overflow-hidden border border-[#333330]/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F8F8F6] via-transparent to-transparent pointer-events-none opacity-50" />
              
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                src={mainImage} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10 transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute top-8 right-8 z-20">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "h-12 w-12 rounded-full transition-all duration-500 flex items-center justify-center active:scale-90 shadow-sm border border-white/50 backdrop-blur-md",
                    isInWishlist(product.id) ? "bg-[#96968B] text-white shadow-md" : "bg-white/80 text-[#333330] hover:bg-[#333330] hover:text-white hover:shadow-md"
                  )}
                >
                  <Heart size={20} strokeWidth={1.5} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="absolute bottom-10 left-10 z-20">
                 <div className="bg-[#F1F1E9] text-[#96968B] border border-[#333330]/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm">
                    {product.brand_name || 'Enterprise Series'}
                 </div>
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4">
                {images.map((img, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={cn(
                      "h-24 w-24 shrink-0 border transition-all duration-500 flex items-center justify-center p-4 bg-white rounded-2xl group overflow-hidden",
                      activeImage === idx ? "border-[#96968B] shadow-lg ring-1 ring-[#96968B]/20" : "border-[#333330]/5 hover:border-[#333330]/20"
                    )}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: INFORMATION STACK --- */}
          <div className="lg:col-span-5 space-y-12 lg:pt-10">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                 <span className="w-10 h-[1px] bg-[#96968B]/30"></span>
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#333330]/40">Hardware Detail</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-light text-black leading-tight uppercase tracking-tight">
                {product.name.split(' ').slice(0, -1).join(' ')} <br/>
                <span className="font-medium italic text-[#96968B]">{product.name.split(' ').pop()}</span>
              </h1>

              <div className="flex items-baseline gap-6 pt-4">
                <span className="text-4xl font-light text-black tracking-tighter">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-xl font-medium text-[#333330]/30 line-through tracking-tight">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <Info size={16} className="text-[#96968B]" strokeWidth={1.5} />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Piece Description</h4>
               </div>
               <p className="text-[#666660] text-base leading-relaxed font-light">
                 {product.description || "A high-performance printing solution engineered for professional workstations. Delivers consistent precision and reliability across all business environments."}
               </p>
            </div>

            <div className="space-y-10 pt-10 border-t border-[#333330]/5">
              <div className="flex flex-col sm:flex-row items-stretch gap-6">
                {/* Minimalist Counter */}
                <div className="h-14 bg-white border border-[#333330]/5 rounded-full flex items-center justify-between px-2 w-full sm:w-[160px] shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 flex items-center justify-center rounded-full text-[#333330]/40 hover:text-black transition-all hover:bg-[#FBFBFA]"><Minus size={14} strokeWidth={1.5} /></button>
                  <span className="text-[13px] font-bold text-black">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 flex items-center justify-center rounded-full text-[#333330]/40 hover:text-black transition-all hover:bg-[#FBFBFA]"><Plus size={14} strokeWidth={1.5} /></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "group relative flex-1 h-14 rounded-full overflow-hidden transition-all duration-500 active:scale-95 shadow-xl",
                    isAdded ? "bg-[#96968B] text-white" : "bg-black text-white"
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em]">
                    {isAdded ? <CheckCircle size={18} strokeWidth={1.5} /> : <ShoppingBag size={18} strokeWidth={1.5} />}
                    {isAdded ? "Secured to Bag" : "Secure to Cart"}
                  </span>
                  {!isAdded && <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />}
                </button>
              </div>

              {/* Minimal Trust Grid */}
              <div className="grid grid-cols-3 gap-8">
                {[
                  { icon: <Truck size={20} strokeWidth={1.2} />, label: "Express" },
                  { icon: <ShieldCheck size={20} strokeWidth={1.2} />, label: "Secure" },
                  { icon: <RefreshCcw size={20} strokeWidth={1.2} />, label: "Refunds" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group">
                    <div className="text-[#96968B]/60 group-hover:text-black transition-colors duration-500 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#333330]/30">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS: COMPACT GRID --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-20 border-t border-[#333330]/5">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#333330]/40">Curated Pairing</span>
              <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tight text-black">You Might <span className="font-medium italic text-[#96968B]">Also Need</span></h2>
              <div className="w-12 h-[1.5px] bg-[#96968B]/30 mt-4" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12">
              {relatedProducts.slice(0, 5).map((p) => (
                <div key={p.id} className="group relative flex flex-col h-full">
                  <div className="relative aspect-square w-full bg-white rounded-[24px] border border-[#333330]/5 flex items-center justify-center p-6 overflow-hidden transition-all duration-700 group-hover:bg-[#E5E5E0] group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)]">
                    <img src={getImagePath(p.images)} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" alt={p.name} />
                    <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  </div>

                  <div className="pt-4 px-1 text-center space-y-1">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[12px] font-medium text-black uppercase tracking-tight line-clamp-1 group-hover:text-[#96968B] transition-colors">{p.name}</h3>
                    </Link>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[12px] font-semibold text-[#333330]">${parseFloat(p.price).toLocaleString()}</span>
                      <div className="w-6 h-[1px] bg-[#333330]/10 mt-1 transition-all duration-500 group-hover:w-12 group-hover:bg-[#96968B]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
