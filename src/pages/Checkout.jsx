import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, User, Mail, Phone, Box, CheckCircle2, Loader2, ShoppingBag, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; 
  const finalTotal = total + shipping;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (From: ${window.location.hostname})`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-urbanist bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center relative z-10">
          <div className="h-32 w-32 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 mx-auto shadow-sm">
             <ShoppingCart size={48} className="text-slate-200" />
          </div>
          <h2 className="text-4xl font-black text-indigo-950 uppercase tracking-tighter mb-4">Your Cart is Empty.</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-12 max-w-xs mx-auto leading-relaxed">Please add professional hardware before initiating checkout.</p>
          <Link to="/shop" className="h-16 px-12 bg-indigo-950 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-xl shadow-indigo-950/10 flex items-center gap-4 mx-auto w-fit active:scale-95 group">
            RETURN TO SHOP <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-urbanist bg-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative mb-12">
          <div className="h-32 w-32 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-xl border border-emerald-100 relative z-10 mx-auto">
            <CheckCircle2 size={56} strokeWidth={1.5} />
          </div>
          <div className="absolute -inset-4 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black text-indigo-950 uppercase tracking-tighter mb-4 leading-none">ORDER <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">CONFIRMED.</span></h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-12">Your hardware deployment is being prepared.</p>
        
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 mb-12 max-w-md w-full relative shadow-2xl shadow-indigo-500/5">
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-3">Order Reference</p>
          <p className="text-3xl font-black text-indigo-950 uppercase tracking-tight">#{orderId || 'PROCESS'}</p>
        </div>

        <Link to="/" className="h-16 px-14 bg-indigo-950 text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-xl shadow-indigo-950/10 active:scale-95">
          BACK TO DASHBOARD
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- CHECKOUT HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 pb-12 relative">
          <div className="flex flex-col items-start">
            <Link to="/cart" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors mb-8 group">
              <div className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50">
                 <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              BACK TO CART
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-indigo-950 tracking-tighter uppercase leading-none">
              SECURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">CHECKOUT.</span>
            </h1>
          </div>

          <div className="flex items-center gap-6 bg-indigo-50/50 p-5 rounded-[2rem] border border-indigo-100/50">
            <div className="flex items-center gap-4">
               <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-500", step >= 1 ? "bg-indigo-950 text-white shadow-lg" : "bg-white text-slate-300")}>01</div>
               <span className={cn("text-[10px] font-black uppercase tracking-widest", step >= 1 ? "text-indigo-950" : "text-slate-300")}>Information</span>
            </div>
            <div className="h-px w-12 bg-indigo-100" />
            <div className="flex items-center gap-4">
               <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-500", step >= 2 ? "bg-indigo-950 text-white shadow-lg" : "bg-white text-slate-300")}>02</div>
               <span className={cn("text-[10px] font-black uppercase tracking-widest", step >= 2 ? "text-indigo-950" : "text-slate-300")}>Payment</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-8 space-y-16">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl border border-indigo-100"><Mail size={20} strokeWidth={2.5} /></div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-950">IDENTITY HUB</h3>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">Email Address</label>
                       <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="email@domain.com" className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all shadow-sm" />
                    </div>
                  </div>

                  <div className="space-y-8 pt-12 border-t border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-indigo-950 text-white flex items-center justify-center rounded-2xl shadow-xl shadow-indigo-950/20"><MapPin size={20} strokeWidth={2.5} /></div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-950">SHIPPING PARAMETERS</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">First Name</label>
                         <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all shadow-sm" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">Last Name</label>
                         <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all shadow-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">Street Address</label>
                       <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Complete Street Address" className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all shadow-sm" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">City</label>
                         <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all shadow-sm" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">Zip Code</label>
                         <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Zip Code" className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all shadow-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">Phone Number</label>
                       <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+1 (000) 000-0000" className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all shadow-sm" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  <div className="space-y-10">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-amber-500 text-indigo-950 flex items-center justify-center rounded-2xl shadow-xl shadow-amber-500/20"><CreditCard size={20} strokeWidth={2.5} /></div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-950">SELECT ACQUISITION</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* COD */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                        className={cn(
                          "p-10 rounded-[3rem] border-2 cursor-pointer transition-all duration-500 group relative overflow-hidden",
                          formData.paymentMethod === 'cod' ? "border-indigo-600 bg-white shadow-2xl shadow-indigo-500/5" : "border-slate-100 bg-slate-50/50 hover:border-indigo-200"
                        )}
                      >
                        <div className="flex items-center justify-between mb-12 relative z-10">
                          <div className={cn("h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all duration-500", formData.paymentMethod === 'cod' ? "border-indigo-600" : "border-slate-200")}>
                            {formData.paymentMethod === 'cod' && <motion.div layoutId="payDot" className="h-3.5 w-3.5 rounded-full bg-indigo-600" />}
                          </div>
                          <Truck size={40} className={cn("transition-colors duration-500", formData.paymentMethod === 'cod' ? "text-indigo-600" : "text-slate-200")} />
                        </div>
                        <div className="relative z-10">
                           <h4 className="text-xl font-black text-indigo-950 uppercase tracking-tighter">Cash on Delivery</h4>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Settle upon hardware arrival</p>
                        </div>
                      </div>

                      {/* PayPal */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                        className={cn(
                          "p-10 rounded-[3rem] border-2 cursor-pointer transition-all duration-500 group relative overflow-hidden",
                          formData.paymentMethod === 'paypal' ? "border-indigo-600 bg-white shadow-2xl shadow-indigo-500/5" : "border-slate-100 bg-slate-50/50 hover:border-indigo-200"
                        )}
                      >
                        <div className="flex items-center justify-between mb-12 relative z-10">
                          <div className={cn("h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all duration-500", formData.paymentMethod === 'paypal' ? "border-indigo-600" : "border-slate-200")}>
                            {formData.paymentMethod === 'paypal' && <motion.div layoutId="payDot" className="h-3.5 w-3.5 rounded-full bg-indigo-600" />}
                          </div>
                          <div className={cn("italic font-black text-3xl transition-colors duration-500", formData.paymentMethod === 'paypal' ? "text-indigo-600" : "text-slate-200")}>PayPal</div>
                        </div>
                        <div className="relative z-10">
                           <h4 className="text-xl font-black text-indigo-950 uppercase tracking-tighter">PayPal Gateway</h4>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Secure digital asset settlement</p>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.paymentMethod === 'paypal' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-10 pt-12">
                          <div className="p-12 bg-indigo-950 rounded-[3rem] text-white text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5"><ShieldCheck size={120} /></div>
                            <p className="text-sm font-medium uppercase tracking-[0.2em] mb-8 opacity-60 relative z-10">End-to-End SSL Link Active</p>
                            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white text-indigo-950 rounded-full text-[11px] font-black uppercase tracking-[0.3em] relative z-10 shadow-2xl">
                              <Lock size={16} /> Operational Security Verified
                            </div>
                          </div>
                          <div className="relative z-0 max-w-lg mx-auto">
                            <PayPalButtons 
                              style={{ layout: "vertical", shape: "pill", label: "pay" }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  purchase_units: [{ amount: { value: finalTotal.toString() }, description: `PrinterPrime
 
  - ${cartCount} Professional Units` }],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                try {
                                  const details = await actions.order.capture();
                                  await handleOrderSuccess(details);
                                } catch (err) { alert("Failed to synchronize payment node."); }
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-16 flex flex-col items-center gap-8">
              {(formData.paymentMethod === 'cod' || step === 1) && (
                <button 
                  type="submit" disabled={loading}
                  className="h-20 px-20 bg-amber-500 text-indigo-950 hover:bg-indigo-950 hover:text-white rounded-[2rem] flex items-center justify-center gap-6 text-[12px] font-black uppercase tracking-[0.4em] transition-all shadow-[0_20px_50px_rgba(245,158,11,0.3)] disabled:opacity-50 group active:scale-95"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : (
                    <>
                      {step === 1 ? 'NEXT LOGISTICS STEP' : 'FINALIZE DEPLOYMENT'}
                      <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              )}
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-[11px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-[0.3em] transition-all flex items-center gap-3">
                   <ChevronLeft size={18} /> BACK TO INFORMATION
                </button>
              )}
            </div>
          </div>

          {/* --- SUMMARY SIDEBAR --- */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 border border-slate-100 p-10 lg:p-12 rounded-[3rem] sticky top-32 shadow-xl shadow-indigo-500/5">
              <div className="flex items-center gap-4 mb-12">
                 <Box size={22} className="text-indigo-600" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-950">MANIFEST</h3>
              </div>
              
              <div className="space-y-8 mb-12 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="h-24 w-24 bg-white rounded-[2rem] p-4 flex items-center justify-center border border-slate-100 shrink-0 shadow-sm transition-all duration-500 group-hover:bg-indigo-50/30">
                      <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-full max-h-full object-contain transition-transform group-hover:scale-110" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-1.5">{item.brand_name || 'AUTHENTIC'}</span>
                      <h4 className="text-[13px] font-black text-indigo-950 uppercase truncate leading-tight group-hover:text-indigo-600 transition-colors mb-2">{item.name}</h4>
                      <div className="flex items-center justify-between">
                         <p className="text-[11px] font-bold text-slate-400">Qty: {item.quantity}</p>
                         <p className="text-[12px] font-black text-indigo-950">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5 border-t border-slate-200 pt-12">
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  <span>Unit Total</span>
                  <span className="text-indigo-950">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  <span>Logistics</span>
                  <span className="text-emerald-500 font-black">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center pt-10 border-t border-slate-200 mt-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">FINAL VALUATION</span>
                  <span className="text-5xl font-black text-indigo-950 tracking-tighter">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-3 p-5 bg-white rounded-[1.5rem] border border-slate-100 opacity-60">
                  <ShieldCheck size={18} className="text-indigo-600" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-950">AUTHENTIC PARTNER HUB</span>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
