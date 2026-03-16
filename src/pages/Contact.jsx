import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, CheckCircle2, Loader2, ArrowRight, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
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
        setFormData({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
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
    <div className="bg-white min-h-screen font-sans text-zinc-900 overflow-x-hidden">
      <SEO 
        title="Contact Us | DashPrinterShop" 
        description="Get in touch with DashPrinterShop for help with your printer or order. Our friendly team is here to help."
      />
      
      {/* --- HERO SECTION --- */}
      <section className="pt-20 pb-24 px-6 md:px-10 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0ea5e9]">Support Center</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 leading-[1.1] tracking-tighter uppercase italic">
                Get In <br />
                <span className="text-[#0ea5e9]">Touch.</span>
              </h1>
              <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                Have a question about a printer or your order? Our friendly team is ready to help you find the right solution.
              </p>
            </div>
            <div className="hidden lg:block relative">
               <div className="absolute inset-0 bg-[#0ea5e9]/5 rounded-[3rem] rotate-3 scale-105" />
               <div className="relative bg-white p-12 rounded-[2.5rem] border border-zinc-100 shadow-xl space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0ea5e9] shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Email Us</p>
                      <p className="text-lg font-bold text-zinc-900">info@dashprintershop.shop</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0ea5e9] shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Our Location</p>
                      <p className="text-lg font-bold text-zinc-900 leading-snug">414 SW Adams St, <br/> Peoria, IL 61602, USA</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- INFO FOR MOBILE --- */}
          <div className="lg:hidden space-y-6">
            <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0ea5e9] shadow-sm">
                <Mail size={20} />
              </div>
              <p className="font-bold text-zinc-900">info@dashprintershop.shop</p>
            </div>
            <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0ea5e9] shadow-sm">
                <MapPin size={20} />
              </div>
              <p className="font-bold text-zinc-900 leading-snug">Reston, VA 20191, USA</p>
            </div>
          </div>

          {/* --- CONTACT FORM --- */}
          <div className="lg:col-span-12 max-w-4xl mx-auto w-full">
            <div className="bg-white rounded-[3rem] border border-zinc-100 p-8 md:p-16 shadow-2xl shadow-zinc-100">
              
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <div className="h-20 w-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-4xl font-bold text-zinc-900 tracking-tighter mb-4 uppercase italic">Message Sent!</h2>
                  <p className="text-zinc-500 text-lg font-medium mb-10 max-w-sm mx-auto">We've received your message. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setStatus(null)} className="px-10 py-4 bg-zinc-900 text-white rounded-xl text-[13px] font-bold transition-all hover:bg-[#0ea5e9] shadow-lg">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-3">
                     <h3 className="text-3xl font-bold text-zinc-900 tracking-tighter uppercase italic">Send a Message</h3>
                     <p className="text-zinc-500 font-medium">Fill out the form below and we'll get back to you as soon as possible.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Your Name</label>
                      <input 
                        required type="text" placeholder="Full Name" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        required type="email" placeholder="example@email.com" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" placeholder="(000) 000-0000" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Subject</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all appearance-none cursor-pointer pr-12"
                        >
                          <option>General Question</option>
                          <option>Printer Help</option>
                          <option>Order Status</option>
                          <option>Ink & Supplies</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#0ea5e9] pointer-events-none" size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">How can we help?</label>
                    <textarea 
                      required rows="6" placeholder="Tell us more about what you need..." value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-6 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-[#0ea5e9] outline-none text-[15px] font-bold transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button 
                      disabled={loading}
                      className="w-full md:w-auto h-16 px-12 bg-zinc-900 text-white flex items-center justify-center gap-3 rounded-2xl text-[14px] font-bold transition-all hover:bg-[#0ea5e9] disabled:opacity-50 shadow-xl shadow-zinc-200"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>Send Message <ArrowRight size={20} /></>
                      )}
                    </button>
                  </div>
                  {status === 'error' && <p className="text-red-500 text-xs font-bold mt-4">Something went wrong. Please try again later.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
