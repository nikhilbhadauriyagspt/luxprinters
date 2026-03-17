import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, ArrowRight, ShieldCheck, Clock, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values())
            .filter(cat => 
              !cat.name.toLowerCase().includes('laptop') && 
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('chromebook')
            )
            .slice(0, 6);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-zinc-600 pt-24 pb-12 font-jakarta border-t border-zinc-100">
      <div className="max-w-full mx-auto px-6 md:px-10">
        
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/">
              <img src="/logo/MYPRINTERMANNN.png" alt="LucyPrinters" className="h-12 w-auto object-contain " />
            </Link>
            <p className="text-zinc-500 text-md font-medium leading-relaxed max-w-sm mt-5">
Your one-stop shop for high-quality printers and reliable printing solutions. Perfect for all your home and office needs            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-900">Collections</h4>
              <ul className="space-y-3">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/shop?category=${cat.slug}`} className="text-zinc-500 hover:text-[#0e12e9] transition-all text-[13px] font-bold">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-900">Support</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'Track Orders', path: '/orders' },
                  { name: 'FAQs', path: '/faq' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-zinc-500 hover:text-[#0e12e9] transition-all text-[13px] font-bold">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-900">Policies</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Privacy Policy', path: '/privacy-policy' },
                  { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                  { name: 'Return Policy', path: '/return-policy' },
                  { name: 'Shipping Policy', path: '/shipping-policy' },
                  { name: 'Cookie Policy', path: '/cookie-policy' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-zinc-500 hover:text-[#0e12e9] transition-all text-[13px] font-bold">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="lg:col-span-3 space-y-10">
            <div className="space-y-4">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-900">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3.5 px-5 text-sm text-zinc-900 focus:outline-none focus:border-[#0e12e9] transition-all font-bold placeholder:text-zinc-300"
                />
                <button
                  disabled={loading}
                  className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-zinc-900 text-white rounded-lg transition-all font-black text-[10px] uppercase hover:bg-[#0e12e9] active:scale-95 flex items-center justify-center"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={18} strokeWidth={3} />}
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-50 flex items-center justify-center text-[#0e12e9] group-hover:bg-[#0e12e9] group-hover:text-white transition-all border border-zinc-100"><MapPin size={18} /></div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Location</p>
                  <p className="text-[12px] font-bold text-zinc-600 leading-tight">2453 Hennepin Ave, Minneapolis, MN 55405, USA</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-50 flex items-center justify-center text-[#0e12e9] group-hover:bg-[#0e12e9] group-hover:text-white transition-all border border-zinc-100"><Mail size={18} /></div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Us</p>
                  <p className="text-[13px] font-bold text-zinc-600 leading-tight">info@lucyprinters.shop</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-400">
              © 2026 LucyPrinters | All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          </div>
        </div>
  {/* --- DISCLAIMER --- */}
        <div className="mt-12 pt-8 text-center border-t border-slate-100">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            Disclaimer - For Informational only. No software installation or distribution.
          </p>
        </div>
      </div>
    </footer>
  );
}
