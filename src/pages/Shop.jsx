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
    
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          setBrands(d.data);
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

  // Dynamically calculate which brands have products in the current inventory
  // (ignoring current brand filter to allow selection)
  const availableBrands = brands.filter(b => {
    const brandName = b.name.toLowerCase().trim();
    // Special handling for the core printer brands the user mentioned
    const coreBrands = ['brother', 'canon', 'epson', 'hp', 'lexmark', 'xerox'];
    
    // Hide if it's one of the known technical/computer brands
    const computerBrands = ['acer', 'asus', 'dell', 'lenovo'];
    if (computerBrands.includes(brandName)) return false;

    // Show if it has at least one matching product in our entire filtered set
    return products.some(p => 
      p.brand_id === b.id || 
      p.brand_name?.toLowerCase().trim() === brandName
    );
  });

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
        title="Store | PrinterPrime
 
 " 
        description="Browse our selection of professional printing solutions."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="py-20 px-6 md:px-10 lg:px-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1920px] mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-amber-500" />
              <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">Inventory Hub</span>
              <div className="h-[1px] w-12 bg-amber-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-indigo-950 leading-none ">
              Browse Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">Inventory.</span>
            </h1>
          </div>

          <div className="w-full max-w-2xl relative group px-6">
             <input 
               type="text" 
               placeholder="Search for printers, ink, or accessories..."
               value={search}
               onChange={(e) => updateFilter('search', e.target.value)}
               className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm"
             />
             <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={20} />
          </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* --- LEFT SIDEBAR: FILTERS --- */}
          <aside className="hidden lg:block w-80 shrink-0 space-y-12">
            
            {/* Categories */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                <h4 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.3em]">Collections</h4>
              </div>
              <div className="space-y-1">
                <button 
                  onClick={() => updateFilter('category', '')}
                  className={cn(
                    "w-full text-left px-6 py-3 text-[13px] font-black uppercase transition-all rounded-xl flex items-center justify-between",
                    !category ? "text-white bg-indigo-950 shadow-lg shadow-indigo-950/20" : "text-slate-400 hover:text-indigo-950 hover:bg-slate-50"
                  )}
                >
                  All Products
                  {!category && <ChevronRight size={14} />}
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id} onClick={() => updateFilter('category', cat.slug)}
                    className={cn(
                      "w-full text-left px-6 py-3 text-[13px] font-black uppercase transition-all rounded-xl flex items-center justify-between",
                      category === cat.slug ? "text-white bg-indigo-950 shadow-lg shadow-indigo-950/20" : "text-slate-400 hover:text-indigo-950 hover:bg-slate-50"
                    )}
                  >
                    {cat.name}
                    {category === cat.slug && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                <h4 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.3em]">Partner Brands</h4>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {availableBrands.map(b => (
                  <button 
                    key={b.id} onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                    className={cn(
                      "w-full text-left px-6 py-3 text-[13px] font-black uppercase transition-all rounded-xl flex items-center justify-between",
                      brand === b.name ? "text-white bg-indigo-950 shadow-lg shadow-indigo-950/20" : "text-slate-400 hover:text-indigo-950 hover:bg-slate-50"
                    )}
                  >
                    {b.name}
                    {brand === b.name && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(category || brand || search) && (
              <button 
                onClick={() => navigate('/shop')}
                className="w-full py-4 bg-white border-2 border-indigo-950 text-indigo-950 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-950 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <X size={14} /> Clear All Filters
              </button>
            )}
          </aside>

          {/* --- RIGHT AREA: PRODUCTS --- */}
          <div className="flex-1">
            
            {/* Top Bar: Sort & Mobile Filter Toggle */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-3 h-14 px-8 bg-indigo-950 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-950/20"
                >
                  <Filter size={18} /> Filters
                </button>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <select 
                  value={sort} onChange={(e) => updateFilter('sort', e.target.value)}
                  className="w-full md:w-64 h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] font-black uppercase focus:outline-none focus:ring-4 focus:ring-indigo-50 cursor-pointer text-indigo-950 transition-all"
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
                <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mb-6" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Synchronizing Stock...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-48 text-center bg-slate-50 border border-slate-100 rounded-[3rem]">
                <Box size={48} className="text-slate-200 mb-6" />
                <h2 className="text-3xl font-black text-indigo-950 uppercase tracking-tight mb-2">No matching units</h2>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">Try a different search or refine your filters</p>
                <button onClick={() => navigate('/shop')} className="px-12 py-5 bg-indigo-950 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-amber-500 transition-all shadow-xl shadow-indigo-950/10">Clear Refinement</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {products.map((p, i) => (
                  <div 
                    key={p.id}
                    className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-5 transition-all duration-500 flex flex-col hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/5 h-full overflow-hidden"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-square rounded-[2rem] bg-white border border-slate-50 flex items-center justify-center p-6 mb-6 overflow-hidden transition-all duration-500 group-hover:bg-slate-50/50">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-3 right-3 z-20 h-9 w-9 bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-50",
                          isInWishlist(p.id) ? "text-red-500 scale-110" : "text-slate-300 hover:text-red-500 hover:scale-110"
                        )}
                      >
                        <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Hardware"; }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col px-2">
                      <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2 px-2.5 py-1 bg-indigo-50 self-start rounded-full">
                        {p.brand_name || 'AUTHENTIC'}
                      </span>
                      
                      <Link to={`/product/${p.slug}`} className="flex-1">
                        <h3 className="text-base md:text-lg font-black text-indigo-950 capitalize tracking-tight line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
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
                              : "bg-indigo-950 text-white hover:bg-amber-500 hover:text-indigo-950 shadow-indigo-950/20 hover:shadow-amber-500/30"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                        </button>
                      </div>
                    </div>

                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-full z-0 rounded-[2.5rem]" />
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
                <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tighter">Refine Selection.</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="h-10 w-10 bg-slate-50 flex items-center justify-center rounded-xl border border-slate-100">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-10">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Collections</h4>
                  <div className="space-y-1">
                    {categories.map(cat => (
                      <button 
                        key={cat.id} onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-4 py-3 text-[11px] font-black uppercase transition-all rounded-xl", category === cat.slug ? "bg-indigo-950 text-white" : "text-slate-400 hover:bg-slate-50")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Brands</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {availableBrands.map(b => (
                      <button 
                        key={b.id} onClick={() => { updateFilter('brand', b.name); setIsMobileFilterOpen(false); }}
                        className={cn("px-4 py-3 text-[10px] font-black uppercase border transition-all rounded-xl", brand === b.name ? "bg-indigo-950 text-white border-indigo-950" : "bg-white border-slate-100 text-slate-400")}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { navigate('/shop'); setIsMobileFilterOpen(false); }}
                className="w-full py-4 bg-amber-500 text-indigo-950 text-[10px] font-black uppercase tracking-widest mt-auto rounded-2xl shadow-xl shadow-amber-500/20"
              >
                Reset All Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
