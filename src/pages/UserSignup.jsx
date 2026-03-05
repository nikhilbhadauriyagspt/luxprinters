import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, CheckCircle2, Terminal, Globe } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        alert('Account created! Please sign in.');
        navigate('/login');
      } else {
        setError(data.message || 'Check your details and try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-urbanist px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-50/50 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        
        <div className="text-center mb-12 flex flex-col items-center">
          <Link to="/" className="mb-12">
            <img src="/logo/MYPRINTERMAN.png" alt="MyPrinterMan" className="h-14 w-auto object-contain" />
          </Link>
          
          <div className="flex items-center justify-center gap-2 mb-6">
             <span className="h-[1px] w-6 bg-blue-600 animate-pulse" />
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Establish Account</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
            <span className="capitalize">Join Our</span>
            <span className="italic text-blue-600 capitalize">Network.</span>
          </h1>
        </div>

        <div className="bg-white border border-slate-100 p-10 rounded-none shadow-xl relative hover:border-blue-100 transition-all duration-300">
          <form onSubmit={handleSignup} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="p-4 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-100 text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    required type="text" placeholder="FULL NAME" value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-none focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    required type="email" placeholder="EMAIL@DOMAIN.COM" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-none focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    required type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-none focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full h-14 pl-14 pr-16 bg-slate-50 border border-slate-100 rounded-none focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all shadow-inner"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-14 bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-900 transition-all flex items-center justify-center gap-4 disabled:opacity-50 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>CREATE ACCOUNT <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Already have an account?
              <Link to="/login" className="text-blue-600 font-black hover:underline ml-2">Log In Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
