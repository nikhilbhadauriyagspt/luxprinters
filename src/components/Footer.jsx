import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';
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
    <footer className="bg-white text-[#333330] pt-24 pb-12 font-jakarta border-t border-[#333330]/5">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-20">
        
        {/* --- MAIN LAYOUT --- */}
        <div className="flex flex-col lg:flex-row justify-between gap-20 mb-24">
          
          {/* Brand & Mission Section */}
          <div className="max-w-md space-y-10">
            <Link to="/" className="inline-block transition-opacity hover:opacity-80">
              <img src="/logo/logo.png" alt="Yankee's Printer" className="h-10 md:h-12 w-auto object-contain" />
            </Link>
            <p className="text-[#666660] text-[15px] font-light leading-relaxed">
              We specialize in providing high-performance printing hardware tailored for both creative professionals and home offices. Quality and reliability are at the core of everything we do.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 group cursor-default">
                <MapPin size={18} className="text-[#96968B] shrink-0" strokeWidth={1.2} />
                <p className="text-[13px] font-medium text-[#333330] leading-tight">Saint Anthony Main Minneapolis, MN, USA</p>
              </div>
              <div className="flex items-center gap-4 group cursor-default">
                <Mail size={18} className="text-[#96968B] shrink-0" strokeWidth={1.2} />
                <p className="text-[13px] font-medium text-[#333330]">info@yankeesprinter.shop</p>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-20">
            <div className="space-y-8">
              <h4 className="text-[13px] font-bold text-[#1A1A1A]">Shop Collections</h4>
              <ul className="space-y-4">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/shop?category=${cat.slug}`} className="text-[#666660] hover:text-[#96968B] transition-colors text-[14px] font-light">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[13px] font-bold text-[#1A1A1A]">Company</h4>
              <ul className="space-y-4">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'FAQs', path: '/faq' },
                  { name: 'Track Orders', path: '/orders' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-[#666660] hover:text-[#96968B] transition-colors text-[14px] font-light">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[13px] font-bold text-[#1A1A1A]">Legal Policies</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Privacy Policy', path: '/privacy-policy' },
                  { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                  { name: 'Return Policy', path: '/return-policy' },
                  { name: 'Shipping Policy', path: '/shipping-policy' },
                  { name: 'Cookie Policy', path: '/cookie-policy' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-[#666660] hover:text-[#96968B] transition-colors text-[14px] font-light">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* --- NEWSLETTER BAR --- */}
        <div className="bg-[#FBFBFA] rounded-[30px] p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#333330]/5">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-medium text-[#1A1A1A]">Subscribe to our newsletter</h3>
            <p className="text-sm text-[#666660] font-light">Stay updated with our latest releases and exclusive offers.</p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-4">
            <input
              required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full md:w-80 bg-white border border-[#333330]/10 rounded-full px-6 py-3.5 text-sm outline-none focus:border-[#96968B] transition-all"
            />
            <button
              disabled={loading}
              className="h-12 w-12 bg-[#333330] text-white rounded-full flex items-center justify-center hover:bg-black transition-all shadow-lg shrink-0"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={20} strokeWidth={1.5} />}
            </button>
          </form>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-10 border-t border-[#333330]/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[13px] text-[#666660] font-light">
            © 2026 Yankee's Printer. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8 grayscale opacity-40">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          </div>
        </div>

        {/* --- DISCLAIMER --- */}
        <div className="mt-12 text-center opacity-30">
          <p className="text-gray-600 text-[9px] font-bold uppercase tracking-[0.3em] leading-loose">
            Disclaimer - For Informational only. No software installation or distribution.
          </p>
        </div>
      </div>
    </footer>
  );
}
