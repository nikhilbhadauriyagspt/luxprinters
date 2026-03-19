import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  X,
  Loader2,
  ShoppingCart,
  SlidersHorizontal,
  Package,
  Plus,
  Heart,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [hoveredId, setHoveredId] = useState(null);
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
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
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const availableBrands = brands.filter(b => {
    const brandName = b.name.toLowerCase().trim();
    const computerBrands = ['acer', 'asus', 'dell', 'lenovo'];
    if (computerBrands.includes(brandName)) return false;
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
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-[#F8F8F6] min-h-screen font-jakarta text-[#333330] overflow-x-hidden">
      <SEO 
        title="Shop Collections | Yankee's Printer" 
        description="Browse our curated selection of high-performance printers and professional hardware."
      />

      {/* --- REFINED LUXURY BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Architectural Circle (Scaled down) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-[400px] -left-[400px] md:-top-[500px] md:-left-[500px] w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] bg-[#F1F1E9] rounded-full border border-[#333330]/[0.03] shadow-[inset_0_0_80px_rgba(0,0,0,0.01)]"
        />
      </div>
      
      {/* --- HERO HEADER --- */}
      <section className="relative pt-24 pb-12 px-6 lg:px-20">
        <div className="max-w-[1920px] mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#333330]/40">Product Catalog</span>
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-black uppercase tracking-tight leading-[1.1]"
          >
            Printers & <span className="font-medium italic text-[#96968B]">Hardware</span>
          </motion.h1>
        </div>
      </section>

      {/* --- MINIMALIST TOOLBAR --- */}
      <div className="sticky top-[80px] md:top-[90px] z-40 bg-white/80 backdrop-blur-md border-y border-[#333330]/5 px-6 lg:px-20">
         <div className="max-w-[1920px] mx-auto flex items-center justify-between h-14 md:h-16">
            {/* Search */}
            <div className="hidden md:flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-[240px] group">
                <input 
                  type="text" 
                  placeholder="SEARCH..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full h-8 pl-0 pr-8 bg-transparent border-b border-[#333330]/10 text-[10px] font-bold tracking-widest focus:outline-none focus:border-black transition-all placeholder:text-gray-300"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={12} strokeWidth={1.5} />
              </div>
            </div>

            {/* Item Count */}
            <div className="flex-1 flex justify-center">
               <span className="text-[9px] font-bold tracking-[0.2em] text-[#333330]/40 uppercase">
                 Displaying <span className="text-black">{products.length}</span> Pieces
               </span>
            </div>

            {/* Sort/Filter */}
            <div className="flex-1 flex items-center justify-end gap-6">
               <button 
                 onClick={() => setIsMobileFilterOpen(true)}
                 className="lg:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
               >
                 <SlidersHorizontal size={14} strokeWidth={1.5} />
               </button>

               <div className="relative group">
                 <select 
                   value={sort} 
                   onChange={(e) => updateFilter('sort', e.target.value)}
                   className="appearance-none h-8 pl-3 pr-8 bg-transparent text-[10px] font-bold uppercase tracking-widest cursor-pointer focus:outline-none border border-[#333330]/5 rounded-lg hover:border-black transition-colors"
                 >
                   <option value="newest">Latest Arrivals</option>
                   <option value="price_low">Price: Low to High</option>
                   <option value="price_high">Price: High to Low</option>
                   <option value="name_asc">A - Z</option>
                 </select>
                 <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#96968B]" />
               </div>
            </div>
         </div>
      </div>

      {/* --- MAIN SHOP CONTENT --- */}
      <section className="py-12 px-6 lg:px-20 relative z-10">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
            
            {/* CLEAN SIDEBAR */}
            <aside className="hidden lg:block w-48 shrink-0 space-y-12 pt-2">
              <div className="space-y-6">
                <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#96968B]">Collections</h4>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      "w-full text-left text-[11px] font-medium transition-all uppercase tracking-wide",
                      !category ? "text-black pl-2 border-l-2 border-[#96968B]" : "text-[#333330]/40 hover:text-black"
                    )}
                  >
                    All Items
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "w-full text-left text-[11px] font-medium transition-all uppercase tracking-wide",
                        category === cat.slug ? "text-black pl-2 border-l-2 border-[#96968B]" : "text-[#333330]/40 hover:text-black"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#96968B]">Manufacturers</h4>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => updateFilter('brand', '')}
                    className={cn(
                      "w-full text-left text-[11px] font-medium transition-all uppercase tracking-wide",
                      !brand ? "text-black pl-2 border-l-2 border-[#96968B]" : "text-[#333330]/40 hover:text-black"
                    )}
                  >
                    All Brands
                  </button>
                  {availableBrands.map(b => (
                    <button 
                      key={b.id} 
                      onClick={() => updateFilter('brand', b.name)}
                      className={cn(
                        "w-full text-left text-[11px] font-medium transition-all uppercase tracking-wide",
                        brand === b.name ? "text-black pl-2 border-l-2 border-[#96968B]" : "text-[#333330]/40 hover:text-black"
                      )}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-40">
                  <Loader2 className="animate-spin h-6 w-6 text-[#96968B] mb-4" strokeWidth={1.5} />
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#333330]/30">Curating Catalog...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[32px] border border-[#333330]/5">
                  <Package size={32} strokeWidth={1} className="mx-auto text-[#96968B]/20 mb-4" />
                  <h2 className="text-sm font-light uppercase tracking-widest text-black">No matching pieces</h2>
                  <button 
                    onClick={() => navigate('/shop')} 
                    className="mt-6 bg-black text-white px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#333330]"
                  >
                    Clear Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
                  {products.map((p) => (
                    <motion.div 
                      key={p.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative flex flex-col h-full"
                      onMouseEnter={() => setHoveredId(p.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Image Platform */}
                      <div className="relative aspect-[4/5] w-full bg-white rounded-[24px] border border-[#333330]/5 flex items-center justify-center p-6 overflow-hidden transition-all duration-700 group-hover:bg-[#E5E5E0] group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)]">
                        <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                        <motion.img 
                          src={getImagePath(p.images)} 
                          alt={p.name} 
                          className="max-h-full max-w-full object-contain mix-blend-multiply"
                          animate={hoveredId === p.id ? { scale: 1.05, y: -5 } : { scale: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        />

                        {/* Minimalist Top Actions */}
                        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                          <button 
                            onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                            className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/50 shadow-sm",
                              isInWishlist(p.id) ? "bg-[#96968B] text-white" : "bg-white/80 text-black hover:bg-black hover:text-white"
                            )}
                          >
                            <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* Bottom Quick Add Action */}
                        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <button 
                            onClick={(e) => handleAddToCart(e, p)}
                            className="h-8 w-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#333330] active:scale-90 transition-all"
                          >
                            <Plus size={16} strokeWidth={2} />
                          </button>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="pt-4 px-1 text-center space-y-1">
                        <Link to={`/product/${p.slug}`}>
                          <h3 className="text-[12px] font-medium text-black uppercase tracking-tight line-clamp-1 group-hover:text-[#96968B] transition-colors">
                            {p.name}
                          </h3>
                        </Link>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[12px] font-semibold text-[#333330]">${p.price}</span>
                          <div className="w-6 h-[1px] bg-[#333330]/10 mt-1 transition-all duration-500 group-hover:w-12 group-hover:bg-[#96968B]" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-[350px] bg-white z-[110] lg:hidden flex flex-col p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-[14px] font-bold uppercase tracking-[0.3em]">Filter</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} strokeWidth={1.2} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-12">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#96968B]">Collections</h4>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { updateFilter('category', ''); setIsMobileFilterOpen(false); }}
                      className={cn("w-full text-left px-4 py-3 text-[12px] font-bold uppercase tracking-widest rounded-xl transition-all", !category ? "bg-black text-white shadow-lg" : "bg-gray-50 text-[#333330]")}
                    >
                      All Items
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat.id} 
                        onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-4 py-3 text-[12px] font-bold uppercase tracking-widest rounded-xl transition-all", category === cat.slug ? "bg-black text-white shadow-lg" : "bg-gray-50 text-[#333330]")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
