import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, ArrowRight, ChevronDown } from 'lucide-react';
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
    <div className="bg-white min-h-screen pt-32 pb-24 font-urbanist overflow-hidden">
      <SEO 
        title="Contact Us | PrinterPrime
 
 " 
        description="Get in touch with PrinterPrime
 
  for help with your printers or order. Our team is here to assist you."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 mb-20 relative z-10">
        <div className="flex flex-col items-center text-center relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-amber-500" />
            <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">Get Help</span>
            <div className="h-[1px] w-12 bg-amber-500" />
          </div>
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-black   inline-block relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
                Contact Us
              </span>
            </h1>
          
          </div>
          <p className="mt-6 text-slate-500 text-lg font-medium max-w-xl leading-relaxed mx-auto">
            Have a question? We're here to help. Reach out to our friendly team for any assistance with your order or our products.
          </p>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- CONTACT INFO SIDEBAR --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group transition-all duration-500 hover:border-indigo-600 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5">
              <div className="h-14 w-14 bg-white rounded-2xl border border-slate-100 text-indigo-950 flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-indigo-950 group-hover:text-amber-500">
                <Mail size={24} />
              </div>
              <p className="text-[15px] font-black text-slate-400  mb-2">Email Us</p>
              <h4 className="text-lg font-black text-indigo-950 tracking-tight group-hover:text-indigo-600 transition-colors">info@printerprime.shop</h4>
            </div>

            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group transition-all duration-500 hover:border-indigo-600 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5">
              <div className="h-14 w-14 bg-white rounded-2xl border border-slate-100 text-indigo-950 flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-indigo-950 group-hover:text-amber-500">
                <MapPin size={24} />
              </div>
              <p className="text-[15px] font-black text-slate-400  mb-2">Visit Office</p>
              <h4 className="text-lg font-black text-indigo-950 leading-tight group-hover:text-indigo-600 transition-colors">256 NE Elm St, Billings <br/> MO 65610, USA</h4>
            </div>
          </div>

          {/* --- CONTACT FORM --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 rounded-[3rem] p-10 md:p-16 shadow-xl transition-all duration-500 hover:border-indigo-100">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                  <div className="h-20 w-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-4xl font-black text-indigo-950 uppercase tracking-tighter mb-4">Message Sent.</h2>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-10">We will get back to you within 24 hours.</p>
                  <button onClick={() => setStatus(null)} className="h-14 px-12 bg-indigo-950 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-indigo-950 transition-colors">SEND ANOTHER</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-indigo-950 uppercase tracking-[0.2em] ml-2">Your Name</label>
                      <input 
                        required type="text" placeholder="Full Name" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-indigo-950 uppercase tracking-[0.2em] ml-2">Email Address</label>
                      <input 
                        required type="email" placeholder="email@domain.com" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-indigo-950 uppercase tracking-[0.2em] ml-2">Phone Number</label>
                      <input 
                        type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-indigo-950 uppercase tracking-[0.2em] ml-2">Subject</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all appearance-none cursor-pointer pr-12"
                        >
                          <option>General Inquiry</option>
                          <option>Product Support</option>
                          <option>Order Inquiries</option>
                          <option>Warranty Claim</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-indigo-950 uppercase tracking-[0.2em] ml-2">Your Message</label>
                    <textarea 
                      required rows="6" placeholder="How can we help you?" value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button 
                      disabled={loading}
                      className="h-16 px-12 bg-amber-500 text-indigo-950 rounded-2xl flex items-center justify-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-indigo-950 hover:text-white transition-colors disabled:opacity-50 shadow-xl shadow-amber-500/20 active:scale-95"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>SEND MESSAGE <ArrowRight size={20} /></>
                      )}
                    </button>
                  </div>
                  {status === 'error' && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-4 ml-2">Failed to send. Please try again.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
