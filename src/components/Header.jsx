import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  Loader2,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=6`);
          const pData = await pRes.json();
          if (pData.status === 'success') {
            setSuggestions({ products: pData.data || [] });
          }
        } catch (err) { 
          console.error('Search Error:', err); 
        } finally { 
          setIsSearching(false); 
        }
      } else {
        setSuggestions({ products: [] });
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
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  const subNavCategories = [
    { name: 'All-in-One', img: '/category/all-in-one-printers.jpg', slug: 'all-in-one-printers' },
    { name: 'Laser', img: '/category/laser-printers.jpg', slug: 'laser-printers' },
    { name: 'Inkjet', img: '/category/inkjet-printers.jpg', slug: 'inkjet-printers' },
    { name: 'Thermal', img: '/category/thermal-printers.jpg', slug: 'thermal-printers' },
    { name: 'Dot Matrix', img: '/category/dot-matrix-printers.jpg', slug: 'dot-matrix-printers' },
    { name: 'Large Format', img: '/category/large-format-printers.jpg', slug: 'large-format-printers' },
    { name: 'Photo', img: '/category/photo-printers.jpg', slug: 'photo-printers' },
    { name: 'LED', img: '/category/led-printers.jpg', slug: 'led-printers' },
    { name: 'Accessories', img: '/category/printer-accessories.jpg', slug: 'printer-accessories' },
    { name: 'Supertank', img: '/category/supertank-printers.jpg', slug: 'supertank-printers' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 w-full z-[101] bg-[#F5F5F0] py-3 border-b border-[#E5E5E0]/50 transition-transform duration-500" style={{ transform: (scrolled && isHomePage) ? 'translateY(-100%)' : 'translateY(0)' }}>
        <div className="max-w-[1920px] mx-auto px-6 lg:px-16 flex justify-center items-center text-center">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888880]">
            Welcome to Yankee's Printer • Discover Quality Printing for Every Need
          </p>
        </div>
      </div>

      {/* Integrated Header */}
      <header 
        className={cn(
          "fixed left-0 w-full z-[100] font-jakarta transition-all duration-500",
          (scrolled && isHomePage) ? "top-0 bg-white/95 backdrop-blur-md py-4 shadow-sm" : 
          (!isHomePage) ? "top-[37px] bg-white border-b border-gray-100 py-4" : 
          "top-[37px] bg-transparent py-6"
        )}
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between">
            
            {/* Left: Logo */}
            <div className="flex-1 flex justify-start">
              <Link to="/" className="transition-opacity hover:opacity-80 duration-300">
                <img src="/logo/logo.png" alt="Yankee's Printer" className="h-10 md:h-12 w-auto object-contain" />
              </Link>
            </div>

            {/* Center: Navigation Links OR Search Input */}
            <div className="hidden lg:flex items-center justify-center flex-[2] relative px-12">
              <AnimatePresence mode="wait">
                {!isSearchOpen ? (
                  <motion.nav 
                    key="nav"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-center gap-10 xl:gap-14 w-full"
                  >
                    {navLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        to={link.path} 
                        className={cn(
                          "text-[12px] font-medium tracking-[0.15em] uppercase transition-all duration-300 relative group py-2",
                          location.pathname === link.path ? "text-[#1A1A1A]" : "text-[#666666] hover:text-[#1A1A1A]"
                        )}
                      >
                        {link.name}
                        <span className={cn(
                          "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#1A1A1A] transition-all duration-300 group-hover:w-full",
                          location.pathname === link.path && "w-full"
                        )} />
                      </Link>
                    ))}
                  </motion.nav>
                ) : (
                  <motion.div 
                    key="search"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full max-w-2xl relative"
                  >
                    <form onSubmit={handleSearch} className="w-full flex items-center gap-4">
                      <input 
                        type="text" autoFocus
                        placeholder="What are you looking for?" 
                        className="w-full bg-transparent border-b border-[#1A1A1A]/10 py-2 text-[14px] uppercase tracking-wider outline-none placeholder:text-gray-300 focus:border-[#1A1A1A] transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button type="button" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="text-[#1A1A1A]/40 hover:text-black transition-colors">
                        <X size={18} strokeWidth={1.5} />
                      </button>
                    </form>

                    {/* SUGGESTIONS DROPDOWN */}
                    <AnimatePresence>
                      {searchQuery.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 w-full bg-white mt-4 shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-gray-100 rounded-2xl overflow-hidden z-[110]"
                        >
                          <div className="p-4 space-y-2">
                            {isSearching ? (
                              <div className="flex items-center justify-center py-8">
                                <Loader2 size={20} className="animate-spin text-gray-300" />
                              </div>
                            ) : suggestions.products.length > 0 ? (
                              <>
                                {suggestions.products.map(p => {
                                  const rawImg = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                                  const imageSrc = rawImg && !rawImg.startsWith('http') && !rawImg.startsWith('/') ? `/${rawImg}` : rawImg;
                                  return (
                                    <Link 
                                      key={p.id} to={`/product/${p.slug}`} onClick={() => setIsSearchOpen(false)}
                                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                                    >
                                      <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center p-2 shrink-0">
                                        <img src={imageSrc} className="max-h-full max-w-full object-contain mix-blend-multiply" alt="" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-[12px] font-medium uppercase tracking-tight text-[#1A1A1A] line-clamp-1">{p.name}</h4>
                                        <p className="text-[11px] text-[#96968B] tracking-wide">${p.price}</p>
                                      </div>
                                      <ArrowRight size={14} className="text-gray-200 group-hover:text-[#1A1A1A] transition-colors" />
                                    </Link>
                                  );
                                })}
                                <button onClick={handleSearch} className="w-full py-3 mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] border-t border-gray-50 hover:bg-gray-50 transition-colors">
                                  View all results
                                </button>
                              </>
                            ) : (
                              <div className="py-8 text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 text-center">No results found</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Minimal Icons */}
            <div className="flex items-center justify-end gap-6 md:gap-8 flex-1">
              {!isSearchOpen && (
                <button onClick={() => setIsSearchOpen(true)} className="text-[#1A1A1A] hover:text-[#666666] transition-colors">
                  <Search size={19} strokeWidth={1.2} />
                </button>
              )}

              <Link to={user ? "/profile" : "/login"} className="text-[#1A1A1A] hover:text-[#666666] transition-colors">
                <User size={19} strokeWidth={1.2} />
              </Link>

              <Link to="/wishlist" className="text-[#1A1A1A] hover:text-[#666660] transition-colors relative group">
                <Heart size={19} strokeWidth={1.2} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E11D48] text-white text-[9px] font-bold h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full border-2 border-white shadow-sm antialiased transition-transform group-hover:scale-110">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button onClick={openCartDrawer} className="text-[#1A1A1A] hover:text-[#666660] transition-colors relative group">
                <ShoppingCart size={19} strokeWidth={1.2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E11D48] text-white text-[9px] font-bold h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full border-2 border-white shadow-sm antialiased transition-transform group-hover:scale-110">
                    {cartCount}
                  </span>
                )}
              </button>


              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-[#1A1A1A] p-1"><Menu size={24} strokeWidth={1.2} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Subtle spacer for non-home pages */}
      {!isHomePage && <div className="h-24 md:h-26" />}


      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 z-[200] bg-black/10 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center p-8 border-b border-gray-50">
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Menu</span>
                <button onClick={() => setIsSidebarOpen(false)} className="text-black"><X size={24} strokeWidth={1.2} /></button>
              </div>
              <nav className="flex flex-col p-8 gap-8">
                {navLinks.map(link => (
                  <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className="text-[14px] font-semibold tracking-[0.2em] uppercase text-black hover:text-gray-400 transition-colors">{link.name}</Link>
                ))}
              </nav>
              <div className="mt-auto p-8 border-t border-gray-50 grid gap-4">
                <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="text-[12px] font-bold tracking-widest uppercase py-2">My Account</Link>
                <Link to="/wishlist" onClick={() => setIsSidebarOpen(false)} className="text-[12px] font-bold tracking-widest uppercase py-2">Wishlist</Link>
                <Link to="/contact" onClick={() => setIsSidebarOpen(false)} className="text-[12px] font-bold tracking-widest uppercase py-2">Support</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
