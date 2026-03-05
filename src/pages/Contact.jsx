import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, ArrowRight, Loader2, CheckCircle2, Terminal, Activity, Globe, Headphones, ChevronDown } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-28 lg:pt-36 pb-20 font-urbanist overflow-hidden">
      <SEO 
        title="Contact Us | MyPrinterMan" 
        description="Get in touch with MyPrinterMan for help with your printers or order. Our team is here to assist you."
      />
      
      {/* --- HERO SECTION --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-6 bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Get Help</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
              <span className="capitalize">Get In</span>
              <span className="italic text-blue-600 capitalize">Touch.</span>
            </h1>
          </div>
          
          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl border-l-2 border-slate-100 pl-6 mb-2">
            Have a question? We're here to help. Reach out to our friendly team for any assistance with your order or our products.
          </p>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- CONTACT INFO --- */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-8 bg-slate-50 border border-slate-100 group transition-all duration-300 hover:bg-white hover:border-blue-200">
              <div className="h-12 w-12 bg-slate-900 text-white flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-600">
                <Mail size={20} />
              </div>
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Email Us</p>
              <h4 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">info@myprinterman.com</h4>
            </div>

            <div className="p-8 bg-slate-50 border border-slate-100 group transition-all duration-300 hover:bg-white hover:border-blue-200">
              <div className="h-12 w-12 bg-slate-900 text-white flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-600">
                <MapPin size={20} />
              </div>
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Visit Office</p>
              <h4 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">722 N West St, Raleigh <br/> NC 27603, USA</h4>
            </div>

            <div className="p-8 bg-slate-900 text-white relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                 <ShieldCheck size={80} strokeWidth={1} />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center py-4">
                <div className="h-16 w-16 bg-white rounded-none flex items-center justify-center mb-6">
                   <img src="/brands/hp.png" alt="HP" className="h-8 w-auto object-contain" />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tighter leading-none mb-2">
                  AUTHORIZED <span className="text-blue-400 italic">PARTNER.</span>
                </h4>
                <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-blue-400 bg-white/5 px-4 py-2 border border-white/10 mt-4">
                   <CheckCircle2 size={10} strokeWidth={3} /> Verified Merchant
                </div>
              </div>
            </div>
          </div>

          {/* --- CONTACT FORM --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 p-8 md:p-12 shadow-xl relative transition-all duration-300 hover:border-blue-100">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="h-16 w-16 bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8 border border-emerald-100">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Message Sent.</h2>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">We will get back to you within 24 hours.</p>
                  <button onClick={() => setStatus(null)} className="h-12 px-10 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">GO BACK</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Your Name</label>
                      <input 
                        required type="text" placeholder="FULL NAME" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-14 px-6 bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Email Address</label>
                      <input 
                        required type="email" placeholder="EMAIL@DOMAIN.COM" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-14 px-6 bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Phone Number</label>
                      <input 
                        type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-14 px-6 bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Subject</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all appearance-none cursor-pointer pr-12"
                        >
                          <option>General Inquiry</option>
                          <option>Product Support</option>
                          <option>Order Inquiries</option>
                          <option>Warranty Claim</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Your Message</label>
                    <textarea 
                      required rows="4" placeholder="HOW CAN WE HELP YOU?" value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-6 bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-600 outline-none text-xs font-bold uppercase transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button 
                      disabled={loading}
                      className="h-14 px-12 bg-slate-900 text-white flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>SEND MESSAGE <ArrowRight size={16} /></>
                      )}
                    </button>
                  </div>
                  {status === 'error' && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest mt-4">Failed to send. Please try again.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .stroke-text-light {
          -webkit-text-stroke: 1.5px #0f172a;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
