import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  ChevronDown, 
  Filter, 
  LayoutGrid, 
  List, 
  ShoppingBag, 
  Heart,
  X,
  Loader2,
  Check,
  ArrowUpDown,
  SlidersHorizontal,
  ArrowRight,
  Plus,
  Box,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
        }
      });
    const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
    fetch(`${API_BASE_URL}/brands`).then(res => res.json()).then(d => {
      if (d.status === 'success') {
        setBrands(d.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase())));
      }
    });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <div className="bg-white min-h-screen font-urbanist">
      <SEO 
        title="Store | MyPrinterMan" 
        description="Browse our selection of professional printing solutions."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="pt-48 pb-20 px-6 md:px-10 lg:px-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1920px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-[1px] w-6 bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Official Store</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
                <span className="capitalize">Browse Our</span>
                <span className="italic text-blue-600 capitalize">Inventory.</span>
              </h1>
            </div>

            <div className="w-full max-w-md relative group">
               <input 
                 type="text" 
                 placeholder="Search stock..."
                 value={search}
                 onChange={(e) => updateFilter('search', e.target.value)}
                 className="w-full h-16 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-none text-xs font-black uppercase tracking-widest focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-inner"
               />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- LEFT SIDEBAR: FILTERS --- */}
          <aside className="hidden lg:block w-80 shrink-0 space-y-12">
            
            {/* Categories */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em]">Collections</h4>
              </div>
              <div className="space-y-1 border-l border-slate-100">
                <button 
                  onClick={() => updateFilter('category', '')}
                  className={cn(
                    "w-full text-left px-6 py-3 text-[11px] font-black uppercase transition-all flex items-center justify-between group",
                    !category ? "text-blue-600 border-l-2 border-blue-600 bg-blue-50/30" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  All Products
                  {!category && <ChevronRight size={14} />}
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id} onClick={() => updateFilter('category', cat.slug)}
                    className={cn(
                      "w-full text-left px-6 py-3 text-[11px] font-black uppercase transition-all flex items-center justify-between group",
                      category === cat.slug ? "text-blue-600 border-l-2 border-blue-600 bg-blue-50/30" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {cat.name.toLowerCase()}
                    {category === cat.slug && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em]">Partner Brands</h4>
              </div>
              <div className="grid grid-cols-1 gap-1 border-l border-slate-100">
                {brands.map(b => (
                  <button 
                    key={b.id} onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                    className={cn(
                      "w-full text-left px-6 py-3 text-[11px] font-black uppercase transition-all flex items-center justify-between group",
                      brand === b.name ? "text-blue-600 border-l-2 border-blue-600 bg-blue-50/30" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {b.name.toLowerCase()}
                    {brand === b.name && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(category || brand || search) && (
              <button 
                onClick={() => navigate('/shop')}
                className="w-full py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-colors flex items-center justify-center gap-3"
              >
                <X size={14} /> Clear All Filters
              </button>
            )}
          </aside>

          {/* --- RIGHT AREA: PRODUCTS --- */}
          <div className="flex-1">
            
            {/* Top Bar: Sort & Mobile Filter Toggle */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 h-12 px-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest"
                >
                  <Filter size={16} /> Filters
                </button>
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">{total} Units Available</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">Sort Results</span>
                <select 
                  value={sort} onChange={(e) => updateFilter('sort', e.target.value)}
                  className="h-12 px-6 bg-slate-50 border border-slate-200 text-[11px] font-black uppercase focus:outline-none cursor-pointer text-slate-900"
                >
                  <option value="newest">Recent Arrivals</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_asc">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-48">
                <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-6" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Accessing Database...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-48 text-center bg-slate-50 border border-slate-100">
                <Box size={40} className="text-slate-200 mb-6" />
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">No items found</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-10">Try a different search or filter</p>
                <button onClick={() => navigate('/shop')} className="px-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">Clear Refinement</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-slate-100">
                {products.map((p, i) => (
                  <div 
                    key={p.id}
                    className="group relative bg-white border-r border-b border-slate-100 p-8 flex flex-col transition-all duration-300 hover:bg-slate-50 h-full overflow-hidden"
                  >
                    {/* Wishlist */}
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                      className={cn(
                        "absolute top-6 right-6 z-20 h-10 w-10 bg-white border border-slate-100 flex items-center justify-center transition-all duration-300 shadow-sm",
                        isInWishlist(p.id) ? "text-red-500" : "text-slate-300 hover:text-red-500"
                      )}
                    >
                      <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>

                    <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col pt-4">
                      <div className="relative aspect-square mb-10 flex items-center justify-center p-4">
                        <img 
                          src={getImagePath(p.images)} 
                          alt={p.name}
                          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Not+Found"; }}
                        />
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                        <h3 className="text-lg font-black text-slate-900 capitalize tracking-tight line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                          {p.name.toLowerCase()}
                        </h3>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-black text-slate-950 tracking-tighter">${p.price}</span>
                        </div>
                      </div>
                    </Link>

                    <div className="mt-10">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                        disabled={addedItems[p.id]}
                        className={cn(
                          "w-full h-12 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
                          addedItems[p.id] 
                            ? "bg-emerald-500 text-white" 
                            : "bg-slate-900 text-white hover:bg-blue-600"
                        )}
                      >
                        {addedItems[p.id] ? <Check size={14} /> : <ShoppingBag size={14} />}
                        {addedItems[p.id] ? "ADDED" : "ADD TO CART"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MOBILE FILTER SIDEBAR --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-950/20 backdrop-blur-md lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[320px] bg-white z-[110] shadow-2xl lg:hidden flex flex-col p-8 space-y-10 overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center pb-6 border-b border-slate-100">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Refine Selection.</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="h-10 w-10 bg-slate-50 flex items-center justify-center rounded-none border border-slate-100">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-10">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Collections</h4>
                  <div className="space-y-1">
                    {categories.map(cat => (
                      <button 
                        key={cat.id} onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-4 py-3 text-[11px] font-black uppercase transition-all rounded-none", category === cat.slug ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-50")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Brands</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map(b => (
                      <button 
                        key={b.id} onClick={() => { updateFilter('brand', b.name); setIsMobileFilterOpen(false); }}
                        className={cn("px-4 py-3 text-[10px] font-black uppercase border transition-all rounded-none", brand === b.name ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-100 text-slate-400")}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { navigate('/shop'); setIsMobileFilterOpen(false); }}
                className="w-full py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mt-auto"
              >
                Reset All Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .stroke-text-light {
          -webkit-text-stroke: 1.5px #0f172a;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
