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
  LogOut,
  Package,
  ChevronRight,
  Loader2,
  LayoutGrid,
  ShoppingBasket,
  Box,
  Menu,
  Printer,
  ShieldCheck,
  Headset,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, cart, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery('');
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
          const pData = await pRes.json();
          const filteredProds = (pData.status === 'success' ? pData.data : []);
          setSuggestions({ products: filteredProds, categories: [] });
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
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          // Filter out Laptops/Computers
          const filtered = data.data.filter(cat => {
            const name = cat.name.toLowerCase();
            const slug = cat.slug.toLowerCase();
            return !name.includes('laptop') && !slug.includes('laptop') && !name.includes('computer') && !name.includes('pc');
          });
          setCategories(filtered);
          if (filtered.length > 0) setHoveredParent(filtered[0].id);
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  const activeParent = categories.find(c => String(c.id) === String(hoveredParent));
  const subCategoriesToDisplay = activeParent?.children || [];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] font-urbanist">
        
        {/* --- ROW 1: PREMIUM INDIGO TOP BAR --- */}
        <div className="bg-indigo-950 py-3 md:py-4 border-b border-white/5">
          <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 flex items-center justify-between gap-6 md:gap-12">
            
            {/* Brand Logo */}
            <Link to="/" className="shrink-0">
              <img src="/logo/MYPRINTERMANNN.png" alt="PrinterPrime" className="h-8 md:h-9 w-auto object-contain brightness-140" />
            </Link>

            {/* Expansive Search Bar with Amber Action */}
            <div className="hidden lg:flex flex-1 max-w-3xl relative group" ref={searchRef}>
              <form onSubmit={handleSearch} className="w-full relative">
                <input 
                  type="text" 
                  placeholder="Search for premium printers, inks and supplies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-5 pr-32 bg-white border-none rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-amber-500/20 transition-all placeholder:text-gray-400"
                />
                <button type="submit" className="absolute right-1 top-1 bottom-1 px-6 bg-amber-500 text-indigo-950 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all">
                  Search
                </button>
              </form>

              {/* Quick Suggestions */}
              <AnimatePresence>
                {searchQuery.trim().length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl overflow-hidden z-[110] shadow-2xl border border-gray-100">
                    <div className="p-2">
                      {isSearching ? (
                        <div className="p-6 text-center text-xs text-gray-400 font-bold uppercase tracking-widest animate-pulse">Searching Inventory...</div>
                      ) : (
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                          {suggestions.products.map(p => (
                            <Link key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')} className="flex items-center gap-4 p-2.5 hover:bg-indigo-50 rounded-lg group transition-colors">
                              <div className="h-10 w-10 bg-white border border-gray-100 rounded flex items-center justify-center p-1">
                                <img src={p.images ? `${(typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0])}` : ''} className="max-w-full max-h-full object-contain" alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-gray-800 uppercase truncate group-hover:text-indigo-600">{p.name}</p>
                                <p className="text-[10px] font-black text-indigo-600">${p.price}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Center - Extreme Right Order: Wishlist, Cart, Account */}
            <div className="flex items-center gap-4 md:gap-8">
              
              {/* My Wishlist */}
              <Link to="/wishlist" className="flex items-center gap-2.5 group text-white/90 hover:text-white transition-colors">
                <div className="relative">
                  <Heart size={22} className="group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
                  {wishlistCount > 0 && <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-amber-500 text-indigo-950 text-[8px] font-black rounded-full flex items-center justify-center border border-indigo-900">{wishlistCount}</span>}
                </div>
                <div className="hidden xl:flex flex-col ">
                   <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">My</span>
                   <span className="text-[11px] font-black uppercase">Wishlist</span>
                </div>
              </Link>

              {/* My Cart */}
              <button onClick={openCartDrawer} className="flex items-center gap-2.5 group text-white/90 hover:text-white transition-colors">
                <div className="relative h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-amber-500 transition-all">
                  <ShoppingCart size={20} className="group-hover:text-indigo-950 transition-all" />
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-amber-500 text-indigo-950 text-[8px] font-black rounded-full flex items-center justify-center group-hover:bg-white transition-all">{cartCount}</span>
                </div>
                <div className="hidden xl:flex flex-col  text-left">
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">My Cart</span>
                  <span className="text-[11px] font-black uppercase">${cartTotal}</span>
                </div>
              </button>

              {/* Account / Sign In (Extreme Right) */}
              <div className="relative" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                <Link to={user ? "/profile" : "/login"} className="flex items-center gap-3 group text-white/90 hover:text-white transition-colors">
                  <div className="h-10 w-10 bg-amber-500 text-indigo-950 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-all shadow-lg">
                    {user ? <span className="text-xs font-black uppercase">{user.name.charAt(0)}</span> : <User size={20} />}
                  </div>
                  <div className="hidden xl:flex flex-col  text-left">
                    <span className="text-[9px] font-bold text-white/40 uppercase ">Account</span>
                    <span className="text-[11px] font-black uppercase">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
                  </div>
                </Link>

                <AnimatePresence>
                  {isProfileOpen && user && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl z-[110] p-2 shadow-2xl">
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-black text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all uppercase">Dashboard</Link>
                      <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-black text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all uppercase">My Orders</Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black text-red-600 hover:bg-red-50 rounded-lg transition-all mt-1 border-t border-gray-50 pt-2 uppercase">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Trigger */}
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden h-10 w-10 bg-white/10 text-white rounded-xl flex items-center justify-center active:scale-95 transition-all">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* --- ROW 2: CLEAN NAVIGATION & DEPARTMENTS --- */}
        <div className="hidden lg:block h-12 bg-white border-b border-gray-200">
          <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 flex items-center h-full">
            
            {/* Departments Dropdown */}
            <div className="relative h-full" onMouseEnter={() => setActiveDropdown('categories')} onMouseLeave={() => setActiveDropdown(null)} ref={dropdownRef}>
              <button className={cn(
                "flex items-center gap-3 px-6 h-full text-[11px] font-black text-gray-900 uppercase tracking-widest border-x border-gray-100 transition-all",
                activeDropdown === 'categories' ? "bg-indigo-600 text-white border-transparent" : "hover:bg-gray-50"
              )}>
                <LayoutGrid size={16} />
                Departments
                <ChevronDown size={14} className={cn("transition-transform duration-300", activeDropdown === 'categories' && "rotate-180")} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'categories' && (
                  <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 0 }} className="absolute top-full left-0 w-[900px] bg-white border border-gray-200 z-[90] flex shadow-2xl rounded-b-xl overflow-hidden">
                    <div className="w-[280px] bg-gray-50/50 p-4 border-r border-gray-100 space-y-1">
                      {categories.map(cat => (
                        <div key={cat.id} onMouseEnter={() => setHoveredParent(cat.id)} className={cn("flex items-center justify-between p-3.5 rounded-lg cursor-pointer transition-all", hoveredParent === cat.id ? "bg-white text-indigo-600 border border-gray-100 shadow-sm" : "text-gray-600 hover:text-gray-900")}>
                          <div className="flex items-center gap-3">
                             <Printer size={14} />
                             <span className="text-[11px] font-black uppercase tracking-tight">{cat.name}</span>
                          </div>
                          <ChevronRight size={14} className={hoveredParent === cat.id ? "opacity-100" : "opacity-0"} />
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 p-8 bg-white">
                      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter">{activeParent?.name}</h4>
                        <Link to={`/shop?category=${activeParent?.slug}`} onClick={() => setActiveDropdown(null)} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Explore Category</Link>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {subCategoriesToDisplay.map(sub => (
                          <Link key={sub.id} to={`/shop?category=${sub.slug}`} onClick={() => setActiveDropdown(null)} className="flex items-center gap-3 p-4 rounded-xl border border-gray-50 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group">
                            <div className="h-9 w-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                              <ShoppingBasket size={18} />
                            </div>
                            <span className="text-[11px] font-black text-gray-700 uppercase group-hover:text-indigo-600">{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Horizontal Nav Links */}
            <nav className="flex items-center ml-4 h-full">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className={cn("px-5 h-full flex items-center text-[11px] font-black uppercase tracking-widest transition-all relative group", location.pathname === link.path ? "text-indigo-600" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50")}>
                  {link.name}
                  {location.pathname === link.path && <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-indigo-600" />}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Dynamic Spacer */}
      <div className="h-[64px] md:h-[76px] lg:h-[116px]"></div>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 left-0 h-full w-[300px] bg-white z-[210] flex flex-col shadow-2xl">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-900">
                <img src="/logo/PrinterPrime.png" alt="PrinterPrime" className="h-8 w-auto object-contain brightness-0 invert" />
                <button onClick={() => setIsSidebarOpen(false)} className="h-9 w-9 flex items-center justify-center text-white/60 hover:text-white bg-white/10 rounded-lg"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                <form onSubmit={handleSearch} className="relative">
                  <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-11 pl-10 pr-4 bg-gray-100 rounded-lg text-sm font-bold border-none focus:ring-2 focus:ring-indigo-600" />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </form>
                <nav className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Quick Menu</p>
                  {navLinks.map(link => (
                    <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className={cn("flex items-center gap-4 px-4 py-3.5 rounded-xl text-[12px] font-black uppercase transition-all", location.pathname === link.path ? "bg-indigo-900 text-white" : "text-gray-600 hover:bg-gray-50")}>
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="pt-8 border-t border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Categories</p>
                  <div className="space-y-1">
                     {categories.map(cat => (
                       <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between p-4 text-[11px] font-black uppercase text-gray-500 hover:text-indigo-600 rounded-lg transition-all">
                         {cat.name} <ChevronRight size={14} />
                       </Link>
                     ))}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
                 <ShieldCheck size={18} className="text-indigo-600" />
                 <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Secured Printer Hub</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
