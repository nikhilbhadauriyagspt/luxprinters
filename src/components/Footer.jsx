import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
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
    <footer className="bg-white text-indigo-950 pt-20 pb-12 font-urbanist relative overflow-hidden border-t border-slate-100">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- TOP ROW: BRAND & NEWSLETTER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-center">
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block">
              <img src="/logo/MYPRINTERMANNN.png" alt="PrinterPrime" className="h-10 md:h-9 w-auto object-contain brightness-120" />
            </Link>
            
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md border-l-4 border-amber-500 pl-8">
              Premium destination for high-performance laser printers, precision scanners, and essential office supplies.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative bg-indigo-950 rounded-[2.5rem] p-8 lg:p-12 overflow-hidden">
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Stay Informed</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase tracking-tighter">
                      Join Our <br />
                      <span className="text-amber-500">Updates.</span>
                    </h3>
                  </div>
                  
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <input
                      required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 text-sm text-white focus:outline-none focus:bg-white focus:text-indigo-950 transition-all font-bold placeholder:text-white/20"
                    />
                    <button
                      disabled={loading}
                      className="w-full py-3.5 bg-amber-500 text-indigo-950 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em] hover:bg-amber-400 active:scale-95 flex items-center justify-center gap-3"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : (
                        <>Subscribe <ArrowRight size={16} /></>
                      )}
                    </button>
                  </form>
               </div>
            </div>
          </div>
        </div>

        {/* --- LINKS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 mb-20 py-16 border-t border-slate-100">
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.3em]">Collections</h4>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-indigo-600 transition-all text-sm font-bold capitalize flex items-center gap-3">
                    <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-amber-500" />
                    {cat.name.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.3em]">Support</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Track Orders', path: '/orders' },
                { name: 'FAQs', path: '/faq' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-indigo-600 transition-all text-sm font-bold capitalize flex items-center gap-3">
                    <div className="h-1 w-1 rounded-full bg-slate-200" />
                    {item.name.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.3em]">Policies</h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Return Policy', path: '/return-policy' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Cookie Policy', path: '/cookie-policy' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-indigo-600 transition-all text-sm font-bold capitalize flex items-center gap-3">
                    <div className="h-1 w-1 rounded-full bg-slate-200" />
                    {item.name.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.3em]">Office Hub</h4>
            <div className="space-y-6">
               <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-indigo-600" />
                  </div>
                  <p className="text-sm font-bold text-slate-500 leading-relaxed">
                    256 NE Elm St <br /> Billings, MO 65610, USA
                  </p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-indigo-600" />
                  </div>
                 <p className="text-sm font-bold text-slate-500">info@printerprime.shop</p>
               </div>            </div>
          </div>
        </div>

        {/* --- MAP --- */}
        <div className="w-full h-[300px] mb-16 grayscale border border-slate-100 rounded-[2rem] overflow-hidden opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
           <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3055.6728464654876!2d-82.952952423455!3d40.051515971499895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8838890252554e8b%3A0xe75868c2217c2a7e!2s4664%20Cleveland%20Ave%2C%20Columbus%2C%20OH%2043231%2C%20USA!5e0!3m2!1sen!2sin!4v1709664000000!5m2!1sen!2sin" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 text-center md:text-left">
            © 2026 PrinterPrime | ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all">
                <ShieldCheck size={18} className="text-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Verified Partner</span>
             </div>
             <div className="text-indigo-600/40 italic font-black text-2xl hover:text-indigo-600 transition-colors">PayPal</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
