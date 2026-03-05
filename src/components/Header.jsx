import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Heart, 
  ChevronDown,  X,
  Smartphone,
  Cpu,
  Monitor,
  Headphones,
  Gamepad,
  LogOut,
  Settings,
  Package,
  ArrowRight,
  ChevronRight,
  Loader2,
  Clock,
  Mail,
  Phone,
  LayoutGrid,
  Zap,
  ShieldCheck,
  MousePointer2,
  Sparkles,
  Layers,
  ShoppingBasket,
  Terminal,
  Activity,
  Box,
  Home,
  HelpCircle,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, cart, openCartDrawer, isSearchOpen, openSearch, closeSearch } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveSearch = (query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=6`);
          const pData = await pRes.json();
          
          const filteredProds = (pData.status === 'success' ? pData.data : []).filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );

          const matchedCats = categories.flatMap(parent => [parent, ...(parent.children || [])])
            .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 4);

          setSuggestions({
            products: filteredProds,
            categories: matchedCats
          });
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ products: [], categories: [] });
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, categories]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery.trim());
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      closeSearch();
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          const filtered = data.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
          if (filtered.length > 0) setHoveredParent(filtered[0].id);
        }
      });

    const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          setBrands(data.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase())));
        }
      });

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const activeParent = categories.find(c => String(c.id) === String(hoveredParent));
  const subCategoriesToDisplay = activeParent?.children || [];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-300 font-urbanist bg-white border-b border-slate-200 shadow-sm"
        )}
      >
        {/* --- TOP ROW: LOGO, SEARCH, ACTIONS --- */}
        <div className="border-b border-slate-100 py-3">
          <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between gap-8">
            
            {/* LOGO & SUBSIDIARY - HORIZONTAL */}
            <div className="flex items-center gap-6">
              <Link to="/" className="block">
                <img src="/logo/MYPRINTERMAN.png" alt="MYPRINTERMAN" className="h-14 w-auto object-contain" />
              </Link>
              <div className="hidden sm:flex flex-col justify-center border-l border-slate-200 pl-6 h-12">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight mt-0.5">PrimeFix Solutions</span>
              </div>
            </div>

            {/* CENTER SEARCH WITH SUGGESTIONS */}
            <div className="hidden lg:flex flex-1 max-w-2xl relative group/search">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/search:text-blue-600 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="Search premium inventory..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                 className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all"
               />

               {/* INLINE SUGGESTIONS DROPDOWN */}
               <AnimatePresence>
                 {searchQuery.trim().length > 0 && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden z-[110]"
                   >
                     {isSearching ? (
                       <div className="p-8 flex flex-col items-center gap-3">
                          <Loader2 size={24} className="animate-spin text-blue-600" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Searching Inventory...</span>
                       </div>
                     ) : (
                       <div className="max-h-[450px] overflow-y-auto custom-scrollbar p-2">
                         {suggestions.categories.length > 0 && (
                           <div className="mb-4">
                             <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] px-4 py-3 border-b border-slate-50">Departments</p>
                             <div className="grid grid-cols-2 gap-1 p-1">
                               {suggestions.categories.map(cat => (
                                 <Link 
                                   key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setSearchQuery('')}
                                   className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all group"
                                 >
                                   <span className="text-[11px] font-black text-slate-900 uppercase">{cat.name}</span>
                                   <ChevronRight size={12} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                 </Link>
                               ))}
                             </div>
                           </div>
                         )}

                         <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] px-4 py-3 border-b border-slate-50">Products</p>
                           <div className="space-y-1 p-1">
                             {suggestions.products.length > 0 ? suggestions.products.map((p) => (
                               <Link 
                                 key={p.id} to={`/product/${p.slug}`} onClick={() => { setSearchQuery(''); saveSearch(searchQuery); }}
                                 className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all group"
                               >
                                 <div className="h-10 w-10 bg-white border border-slate-100 rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                                   <img src={p.images ? `${(typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0])}` : ''} className="max-w-full max-h-full object-contain" alt="" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                   <p className="text-[11px] font-black text-slate-900 uppercase truncate group-hover:text-blue-600">{p.name}</p>
                                   <p className="text-[10px] font-bold text-blue-600 mt-0.5">${p.price}</p>
                                 </div>
                                 <ArrowRight size={14} className="text-slate-200 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                               </Link>
                             )) : (
                               <div className="p-8 text-center">
                                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">No matches found</p>
                               </div>
                             )}
                           </div>
                         </div>
                         
                         {suggestions.products.length > 0 && (
                           <button 
                             onClick={handleSearch} 
                             className="w-full mt-2 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all rounded-xl"
                           >
                             View All Results
                           </button>
                         )}
                       </div>
                     )}
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* ACTIONS & HP BADGE */}
            <div className="flex items-center gap-3">
              <div className="hidden min-[1200px]:flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-none mr-2">
                 <div className="h-10 w-10 flex items-center justify-center p-2 bg-white border border-slate-100">
                    <img src="/brands/hp.png" alt="HP" className="w-full h-full object-contain" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-900 uppercase leading-none">Authorized HP Partner</span>
                 </div>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <Link to="/wishlist" className="h-10 w-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-red-500 hover:shadow-sm transition-all relative">
                  <Heart size={20} strokeWidth={2.5} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">{wishlistCount}</span>
                  )}
                </Link>

                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={openCartDrawer}
                  className="h-10 w-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all relative"
                >
                  <ShoppingBag size={20} strokeWidth={2.5} />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-slate-900 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
                </motion.button>

                <div className="h-6 w-px bg-slate-300 mx-1" />

                <div className="relative" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                  {user ? (
                     <div className="h-10 w-10 bg-slate-900 text-white flex items-center justify-center text-xs font-black cursor-pointer rounded-lg shadow-md uppercase">
                       {(user.name || 'U').charAt(0)}
                     </div>
                  ) : (
                    <Link to="/login" className="h-10 w-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                      <User size={20} strokeWidth={2.5} />
                    </Link>
                  )}

                  <AnimatePresence>
                    {isProfileOpen && user && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 p-2 z-[110] rounded-2xl shadow-xl"
                      >
                        <div className="px-4 py-3 bg-slate-50 rounded-xl mb-1">
                          <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                        </div>
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><User size={14} /> Profile</Link>
                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Package size={14} /> Orders</Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all mt-1 border-t border-slate-100 pt-2"><LogOut size={14} /> Logout</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden h-10 w-10 flex items-center justify-center bg-slate-900 text-white rounded-lg active:scale-95 transition-transform"
              >
                <LayoutGrid size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* --- BOTTOM ROW: DEPARTMENTS & NAV LINKS --- */}
        <div className="bg-slate-50/80 backdrop-blur-md">
          <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12 flex items-center gap-12 h-14">
            
            {/* DEPARTMENTS TOGGLE */}
            <button 
              onMouseEnter={() => setActiveDropdown('categories')}
              className={cn(
                "flex items-center gap-3 px-6 h-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-x border-slate-200 group/dept",
                activeDropdown === 'categories' ? "bg-white text-blue-600" : "text-slate-900 hover:bg-white"
              )}
            >
               <LayoutGrid size={16} className={cn("transition-transform", activeDropdown === 'categories' && "rotate-90")} />
               <span>Shop By Departments</span>
               <ChevronDown size={14} className={cn("ml-2 transition-transform", activeDropdown === 'categories' && "rotate-180")} />
            </button>

            {/* NAVIGATION LINKS */}
            <nav className="hidden lg:flex items-center gap-1 h-full">
              {[
                { name: 'Home', path: '/' },
                { name: 'Store', path: '/shop' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' }
              ].map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={cn(
                      "px-6 h-full flex items-center text-[11px] font-black uppercase tracking-widest transition-all relative group",
                      isActive ? "text-blue-600 bg-white" : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                    )}
                  >
                    {link.name}
                    {isActive && <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600" />}
                  </Link>
                );
              })}
            </nav>

            {/* QUICK CONTACT REMOVED */}
            <div className="hidden xl:flex items-center gap-6 ml-auto">
            </div>
          </div>
        </div>

        {/* --- COMPACT FULL-WIDTH MEGA MENU --- */}
        <AnimatePresence>
          {activeDropdown === 'categories' && (
            <motion.div 
              ref={dropdownRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onMouseLeave={() => setActiveDropdown(null)}
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden z-[90] shadow-2xl"
            >
              <div className="max-w-[1920px] mx-auto flex min-h-[400px]">
                
                {/* 01: CATEGORY NAVIGATION (LEFT SIDEBAR) */}
                <div className="w-[300px] border-r border-slate-100 p-6 bg-slate-50/50">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-2">Categories</p>
                  
                  <div className="space-y-1">
                    {categories.map(parent => (
                      <motion.div 
                        key={parent.id}
                        onMouseEnter={() => setHoveredParent(parent.id)}
                        className={cn(
                          "group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300",
                          String(hoveredParent) === String(parent.id) 
                            ? "bg-white shadow-sm text-blue-600 ring-1 ring-slate-200" 
                            : "text-slate-500 hover:text-slate-900 hover:bg-white/60"
                        )}
                      >
                        <div className="flex items-center gap-4">
                           <div className={cn(
                             "h-9 w-9 rounded-lg flex items-center justify-center transition-all duration-300",
                             String(hoveredParent) === String(parent.id) 
                               ? "bg-slate-900 text-white" 
                               : "bg-slate-100 text-slate-400"
                           )}>
                              {parent.name.toLowerCase().includes('printer') ? <Monitor size={16} /> : <Cpu size={16} />}
                           </div>
                           <span className="text-[12px] font-black uppercase tracking-tight">{parent.name}</span>
                        </div>
                        <ChevronRight size={14} className={cn("transition-all", String(hoveredParent) === String(parent.id) ? "opacity-100" : "opacity-0")} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 02: SUBCATEGORY GRID (CENTER CONTENT) */}
                <div className="flex-1 p-10 bg-white">
                  <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                     <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                       {activeParent?.name || 'Selection'}
                     </h4>
                     <Link 
                       to={`/shop?category=${activeParent?.slug}`} 
                       onClick={() => setActiveDropdown(null)}
                       className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                     >
                       Browse All Products
                     </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {subCategoriesToDisplay.length > 0 ? subCategoriesToDisplay.map((sub) => (
                      <Link 
                        key={sub.id}
                        to={`/shop?category=${sub.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="group p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300 flex items-center gap-4"
                      >
                        <div className="h-10 w-10 rounded-lg bg-white text-slate-400 flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                           <ShoppingBasket size={18} />
                        </div>
                        <span className="text-[13px] font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600">{sub.name}</span>
                      </Link>
                    )) : (
                      <div className="col-span-full flex flex-col items-center justify-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Sub-departments found</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 03: BRAND SPOTLIGHT (RIGHT SECTION) */}
                <div className="w-[300px] p-10 bg-slate-50 border-l border-slate-100">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Partner Ecosystem</p>
                   <div className="grid grid-cols-2 gap-2">
                     {brands.slice(0, 8).map(brand => (
                       <Link 
                         key={brand.id} 
                         to={`/shop?brand=${encodeURIComponent(brand.name)}`} 
                         onClick={() => setActiveDropdown(null)}
                         className="p-3 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-all rounded-xl text-center"
                       >
                         <span className="text-[9px] font-black uppercase tracking-tight">{brand.name}</span>
                       </Link>
                     ))}
                   </div>

                   <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white">
                      <p className="text-[8px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Pro Solutions</p>
                      <h4 className="text-lg font-black uppercase tracking-tighter mb-4">Need Advice?</h4>
                      <Link 
                        to="/contact" 
                        onClick={() => setActiveDropdown(null)}
                        className="block w-full text-center py-2.5 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
                      >
                        Contact Experts
                      </Link>
                   </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- PREMIUM COMPACT SEARCH COMMAND CENTER --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeSearch}
              className="fixed inset-0 z-[200] bg-slate-950/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl z-[210] px-6"
            >
              <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden">
                <form onSubmit={handleSearch} className="relative group p-4">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search premium inventory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 pl-12 pr-12 bg-slate-50 border border-transparent rounded-[1.5rem] text-sm font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:border-blue-600 transition-all duration-500 shadow-inner placeholder:text-slate-300"
                  />
                  <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400" size={20} strokeWidth={2.5} />
                  <button onClick={closeSearch} className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors">
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </form>

                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-8 pt-0">
                  <AnimatePresence mode="wait">
                    {searchQuery.trim().length > 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 py-4">
                        {/* Categories Segment */}
                        {suggestions.categories.length > 0 && (
                          <div className="space-y-4">
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] px-4">Departments</p>
                            <div className="grid grid-cols-2 gap-2">
                              {suggestions.categories.map(cat => (
                                <Link 
                                  key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => { closeSearch(); setSearchQuery(''); }}
                                  className="flex items-center justify-between p-4 bg-slate-50 border border-transparent hover:border-blue-100 hover:bg-white transition-all rounded-2xl group"
                                >
                                  <span className="text-xs font-black text-slate-900 uppercase">{cat.name}</span>
                                  <ArrowRight size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Products Segment */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-4">Inventory Units</p>
                          <div className="space-y-2">
                            {suggestions.products.map((p) => (
                              <Link 
                                key={p.id} to={`/product/${p.slug}`} onClick={() => { closeSearch(); setSearchQuery(''); saveSearch(searchQuery); }}
                                className="flex items-center gap-6 p-4 border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all rounded-2xl group"
                              >
                                <div className="h-14 w-14 bg-white rounded-xl flex items-center justify-center p-3 shadow-sm group-hover:scale-105 transition-transform">
                                  <img src={p.images ? `${(typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0])}` : ''} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-black text-slate-900 uppercase truncate leading-tight group-hover:text-blue-600 transition-colors">{p.name}</p>
                                  <p className="text-[10px] font-bold text-blue-600 mt-1">${p.price}</p>
                                </div>
                                <ArrowRight size={16} className="text-slate-200 group-hover:text-blue-600 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </div>
                        
                        <button onClick={handleSearch} className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-xl">Execute Exhaustive Search</button>
                      </motion.div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-6">
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] border-b border-slate-50 pb-4">Recent Access</h4>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.length > 0 ? (
                              recentSearches.map(t => (
                                <button 
                                  key={t} onClick={() => setSearchQuery(t)} 
                                  className="px-4 py-3 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest flex items-center gap-2"
                                >
                                  <Clock size={12} className="opacity-40" /> {t}
                                </button>
                              ))
                            ) : (
                              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">No log entries found</p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] border-b border-slate-50 pb-4">Quick Nodes</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {categories.slice(0, 4).map(cat => (
                              <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={closeSearch} className="group flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-blue-600 transition-all">
                                 <span className="text-[10px] font-black text-slate-900 group-hover:text-white uppercase truncate">{cat.name}</span>
                                 <ChevronRight size={14} className="text-slate-300 group-hover:text-white" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* --- MOBILE NAVIGATION SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[200] bg-slate-950/20 backdrop-blur-md xl:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[320px] bg-white z-[210] shadow-2xl xl:hidden flex flex-col font-urbanist"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4">
                  <img src="/logo/MYPRINTERMAN.png" alt="MYPRINTERMAN" className="h-9 w-auto object-contain" />
                  <div className="h-6 w-px bg-slate-200" />
                  <div className="flex flex-col justify-center leading-none">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">A Subsidiary of</span>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight mt-1">PrimeFix Solutions</span>
                  </div>
                </Link>
                <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-900 border border-slate-100 shadow-sm">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] px-2">Navigation</p>
                  <nav className="flex flex-col gap-1">
                    {[
                      { name: 'Home', path: '/', icon: <Home size={18} /> },
                      { name: 'Store', path: '/shop', icon: <ShoppingBag size={18} /> },
                      { name: 'About', path: '/about', icon: <Activity size={18} /> },
                      { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
                      { name: 'FAQ', path: '/faq', icon: <HelpCircle size={18} /> }
                    ].map((link) => (
                      <Link 
                        key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                          location.pathname === link.path ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {link.icon} {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="space-y-4 pt-10 border-t border-slate-50">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] px-2">Account Node</p>
                   {user ? (
                     <div className="space-y-1">
                        <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 rounded-xl"><User size={18} /> Profile Dashboard</Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl"><LogOut size={18} /> Terminate Session</button>
                     </div>
                   ) : (
                     <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-4 bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20"><User size={18} /> Authorized Login</Link>
                   )}
                </div>
              </div>

              <div className="p-8 border-t border-slate-50 bg-slate-50/30">
                 <div className="flex items-center gap-3">
                    <ShieldCheck size={16} className="text-blue-600" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Node Active</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
