import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, CheckCircle2, Loader2, ArrowRight, ChevronDown } from 'lucide-react';
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
    <div className="bg-[#F8F8F6] min-h-screen font-jakarta text-[#333330] overflow-x-hidden">
      <SEO 
        title="Contact Us | Yankee's Printer" 
        description="Connect with Yankee's Printer. Our dedicated team is here to provide expert assistance for all your printing needs."
      />

      {/* --- BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Organic Shape (Subtle) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 4 }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[60%] bg-[#EFEFE9] rounded-full blur-[180px]"
        />
      </div>
      
      {/* --- HERO HEADER --- */}
      <section className="relative pt-24 pb-16 px-6 lg:px-20">
        <div className="max-w-[1920px] mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#333330]/40">Connect With Us</span>
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-black uppercase tracking-tight leading-[1.1]"
          >
            Get In <span className="font-medium italic text-[#96968B]">Touch</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-[#666660] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Our dedicated specialists are available to provide tailored solutions for your printing requirements.
          </motion.p>
        </div>
      </section>

      {/* --- MAIN CONTACT CONTENT --- */}
      <section className="py-20 md:py-32 px-6 lg:px-20 relative z-10">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 xl:gap-32">
            
            {/* --- CONTACT INFO --- */}
            <div className="lg:col-span-4 space-y-16">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Direct Assistance</h3>
                  <div className="w-12 h-[1.5px] bg-[#96968B]/30" />
                </div>

                <div className="space-y-12">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group flex items-start gap-6"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-[#333330]/5 group-hover:bg-[#333330] group-hover:text-white transition-all duration-500 shadow-sm">
                      <Mail size={18} strokeWidth={1.2} />
                    </div>
                    <div className="space-y-1 pt-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#96968B]">Email Us</p>
                      <p className="text-base font-medium text-black">info@yankeesprinter.shop</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group flex items-start gap-6"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-[#333330]/5 group-hover:bg-[#333330] group-hover:text-white transition-all duration-500 shadow-sm">
                      <MapPin size={18} strokeWidth={1.2} />
                    </div>
                    <div className="space-y-1 pt-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#96968B]">Location</p>
                      <p className="text-base font-medium text-black leading-relaxed">
                        
                        Saint Anthony Main Minneapolis, MN, USA
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* --- CONTACT FORM: GLASS CANVAS --- */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-white/50 backdrop-blur-md rounded-[40px] md:rounded-[60px] p-8 md:p-16 lg:p-20 border border-[#333330]/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)]"
              >
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="h-20 w-20 bg-white text-[#96968B] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border border-[#333330]/5">
                      <CheckCircle2 size={32} strokeWidth={1} />
                    </div>
                    <h2 className="text-3xl font-light uppercase tracking-tight mb-4 text-black">Message Received</h2>
                    <p className="text-[#666660] mb-10 max-w-sm mx-auto font-light leading-relaxed">Thank you for connecting. A specialist will review your request and respond shortly.</p>
                    <button 
                      onClick={() => setStatus(null)} 
                      className="text-[11px] font-bold uppercase tracking-[0.3em] text-black border-b border-black pb-1 hover:text-[#96968B] hover:border-[#96968B] transition-all"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Full Name</label>
                        <input 
                          required type="text" placeholder="ENTER YOUR NAME" value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Email Address</label>
                        <input 
                          required type="email" placeholder="ENTER YOUR EMAIL" value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Phone Number</label>
                        <input 
                          type="tel" placeholder="OPTIONAL" value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Inquiry Type</label>
                        <div className="relative">
                          <select 
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all appearance-none cursor-pointer pr-12 uppercase tracking-widest"
                          >
                            <option>General Question</option>
                            <option>Printer Help</option>
                            <option>Order Status</option>
                            <option>Support</option>
                          </select>
                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#96968B] pointer-events-none" size={16} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Message Details</label>
                      <textarea 
                        required rows="4" placeholder="HOW CAN WE ASSIST YOU?" value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full py-6 bg-white border border-[#333330]/5 rounded-[32px] px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all resize-none placeholder:text-[#333330]/10 uppercase tracking-widest"
                      ></textarea>
                    </div>

                    <div className="pt-6">
                      <button 
                        disabled={loading}
                        className="group relative inline-flex items-center gap-8 bg-black text-white h-16 px-12 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl active:scale-95 disabled:opacity-50"
                      >
                        <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">
                          {loading ? "Processing..." : "Send Message"}
                        </span>
                        {!loading && <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />}
                        <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </button>
                    </div>
                    {status === 'error' && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-6">Transmission failure. Please try again.</p>}
                  </form>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
