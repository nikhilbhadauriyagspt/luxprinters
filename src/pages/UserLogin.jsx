import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F8F6] font-jakarta px-6 py-20 text-[#333330]">
      <SEO title="Sign In | Yankee's Printer" />
      
      <div className="max-w-[440px] w-full relative">
        {/* --- REFINED HEADER --- */}
        <div className="text-center mb-12 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#96968B] block"
          >
            Access Portal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light uppercase tracking-tight text-black"
          >
            Welcome <span className="font-medium italic text-[#96968B]">Back</span>
          </motion.h1>
        </div>

        {/* --- FORM PANEL: GLASS CANVAS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[40px] p-8 md:p-12 border border-[#333330]/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)]"
        >
          <form onSubmit={handleLogin} className="space-y-8">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest text-center border border-red-100 rounded-xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-8">
              <div className="space-y-3 group">
                <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#333330]/20 group-focus-within:text-[#96968B] transition-colors" size={16} strokeWidth={1.5} />
                  <input 
                    required type="email" placeholder="ENTER YOUR EMAIL" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-14 pr-4 bg-[#FBFBFA] border border-[#333330]/5 rounded-2xl focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-wider"
                  />
                </div>
              </div>

              <div className="space-y-3 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em]">Password</label>
                  <Link to="#" className="text-[9px] font-bold text-[#96968B] hover:text-black transition-colors uppercase tracking-widest">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#333330]/20 group-focus-within:text-[#96968B] transition-colors" size={16} strokeWidth={1.5} />
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-14 pr-12 bg-[#FBFBFA] border border-[#333330]/5 rounded-2xl focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-wider"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#333330]/20 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                disabled={loading}
                className="group relative w-full inline-flex items-center justify-center gap-4 bg-black text-white h-14 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">
                  {loading ? "Authenticating..." : "Sign In"}
                </span>
                {!loading && <ArrowRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />}
                <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-[#333330]/5 text-center">
            <p className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em]">
              New to Yankee's Printer?
              <Link to="/signup" className="text-black border-b border-black pb-0.5 ml-3 hover:text-[#96968B] hover:border-[#96968B] transition-colors">Create Account</Link>
            </p>
          </div>
        </motion.div>

        {/* Decorative Background Accent */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F1F1E9] rounded-full blur-[100px] opacity-50" />
      </div>
    </div>
  );
}
