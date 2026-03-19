import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, Mail, Box, CheckCircle2, Loader2, ShoppingCart, Zap, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

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

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-jakarta bg-[#F8F8F6] text-[#333330]">
        <SEO title="Empty Checkout | Yankee's Printer" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-24 w-24 bg-white rounded-full border border-[#333330]/5 flex items-center justify-center mb-8 shadow-sm">
             <ShoppingCart size={32} className="text-[#96968B]/30" strokeWidth={1} />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tight mb-4 text-center">Your bag is <span className="font-medium italic text-[#96968B]">empty</span></h2>
        <p className="text-[#666660] text-sm font-light mb-10 text-center max-w-xs leading-relaxed">Please add some printers to your selection before proceeding to checkout.</p>
        <Link to="/shop" className="group relative inline-flex items-center gap-6 bg-[#1A1A1A] text-white h-14 px-10 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95">
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em]">Browse Catalog</span>
          <ArrowRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-jakarta bg-[#F8F8F6] text-center text-[#333330]">
        <SEO title="Order Confirmed | Yankee's Printer" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative mb-8">
          <div className="h-24 w-24 bg-white text-[#96968B] flex items-center justify-center shadow-xl border border-[#333330]/5 rounded-full mx-auto">
            <CheckCircle2 size={40} strokeWidth={1} />
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tight mb-4 text-black">Order <span className="font-medium italic text-[#96968B]">Confirmed</span></h1>
        <p className="text-[#666660] font-light text-sm mb-12 uppercase tracking-widest">Your hardware is being prepared for dispatch.</p>
        
        <div className="bg-white p-12 border border-[#333330]/5 mb-12 max-w-sm w-full rounded-[40px] shadow-sm">
          <p className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.3em] mb-3">Order Reference</p>
          <p className="text-3xl font-light text-black tracking-tighter">#{orderId || 'PROCESS'}</p>
        </div>

        <Link to="/" className="group relative inline-flex items-center justify-center gap-6 bg-[#1A1A1A] text-white h-16 px-14 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95">
          <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">Back to Home</span>
          <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] pt-24 pb-24 font-jakarta text-[#333330] overflow-x-hidden">
      <SEO title="Secure Checkout | Yankee's Printer" />
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-[400px] -left-[400px] md:-top-[500px] md:-left-[500px] w-[1000px] h-[1000px] bg-[#F1F1E9] rounded-full border border-[#333330]/[0.03] shadow-[inset_0_0_80px_rgba(0,0,0,0.01)]"
        />
      </div>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-20 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 border-b border-[#333330]/5 pb-16">
          <div className="flex flex-col items-start space-y-8">
            <Link to="/cart" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#333330]/40 hover:text-black transition-all group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform text-[#96968B]/40" />
              Return to Bag
            </Link>
            <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-black leading-none">
              Secure <span className="font-medium italic text-[#96968B]">Checkout</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className={cn("px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-700 border", step >= 1 ? "bg-black text-white border-black shadow-lg" : "bg-white text-[#333330]/20 border-[#333330]/5")}>
               01 Logistics
            </div>
            <div className="h-px w-8 bg-[#333330]/10" />
            <div className={cn("px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-700 border", step >= 2 ? "bg-black text-white border-black shadow-lg" : "bg-white text-[#333330]/20 border-[#333330]/5")}>
               02 Settlement
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-20 xl:gap-32 items-start">
          
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
                  {/* Section 1: Email */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#333330]/40">Personal Information</span>
                      <div className="flex-1 h-px bg-[#333330]/5" />
                    </div>
                    <div className="space-y-2 group">
                       <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Email Address</label>
                       <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="ENTER EMAIL ADDRESS" className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest" />
                    </div>
                  </div>

                  {/* Section 2: Address */}
                  <div className="space-y-12 pt-16 border-t border-[#333330]/5">
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#333330]/40">Shipping Logistics</span>
                      <div className="flex-1 h-px bg-[#333330]/5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2 group">
                         <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">First name</label>
                         <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="FIRST NAME" className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest" />
                      </div>
                      <div className="space-y-2 group">
                         <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Last name</label>
                         <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="LAST NAME" className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest" />
                      </div>
                    </div>
                    <div className="space-y-2 group">
                       <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Street Address</label>
                       <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="FULL DESTINATION ADDRESS" className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2 group">
                         <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">City</label>
                         <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="CITY" className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest" />
                      </div>
                      <div className="space-y-2 group">
                         <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Zip Code</label>
                         <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="ZIP CODE" className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest" />
                      </div>
                    </div>
                    <div className="space-y-2 group">
                       <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Phone Number</label>
                       <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="CONTACT NUMBER" className="w-full h-14 bg-white border border-[#333330]/5 rounded-2xl px-6 focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
                  <div className="space-y-12">
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#333330]/40">Payment Selection</span>
                      <div className="flex-1 h-px bg-[#333330]/5" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* COD */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                        className={cn(
                          "p-10 border rounded-[40px] cursor-pointer transition-all duration-700 flex flex-col justify-between h-56 relative overflow-hidden",
                          formData.paymentMethod === 'cod' ? "border-[#333330] bg-white shadow-xl" : "border-[#333330]/5 bg-white hover:border-[#333330]/20 shadow-sm"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center transition-all", formData.paymentMethod === 'cod' ? "border-[#333330] bg-[#333330]" : "border-[#333330]/10")}>
                            {formData.paymentMethod === 'cod' && <div className="h-2 w-2 rounded-full bg-white" />}
                          </div>
                          <Truck size={32} strokeWidth={1} className={cn("transition-colors", formData.paymentMethod === 'cod' ? "text-[#96968B]" : "text-[#333330]/10")} />
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-xl font-medium text-black uppercase tracking-tight leading-none">Pay on Delivery</h4>
                           <p className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em]">Flexible settlement upon hardware arrival</p>
                        </div>
                      </div>

                      {/* PayPal */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                        className={cn(
                          "p-10 border rounded-[40px] cursor-pointer transition-all duration-700 flex flex-col justify-between h-56 relative overflow-hidden",
                          formData.paymentMethod === 'paypal' ? "border-[#333330] bg-white shadow-xl" : "border-[#333330]/5 bg-white hover:border-[#333330]/20 shadow-sm"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center transition-all", formData.paymentMethod === 'paypal' ? "border-[#333330] bg-[#333330]" : "border-[#333330]/10")}>
                            {formData.paymentMethod === 'paypal' && <div className="h-2 w-2 rounded-full bg-white" />}
                          </div>
                          <div className={cn("transition-colors", formData.paymentMethod === 'paypal' ? "opacity-100" : "opacity-20 grayscale")}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-xl font-medium text-black uppercase tracking-tight leading-none">Secure Digital</h4>
                           <p className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em]">Instant encrypted gateway transaction</p>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.paymentMethod === 'paypal' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-10 pt-10">
                          <div className="p-12 bg-white border border-[#333330]/5 rounded-[40px] text-center space-y-6 shadow-sm">
                            <ShieldCheck className="mx-auto text-[#96968B]" size={40} strokeWidth={1} />
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#333330]/40">High-Security Gateway Active</p>
                            <div className="max-w-xs mx-auto">
                              <PayPalButtons 
                                style={{ layout: "vertical", shape: "pill", label: "pay" }}
                                createOrder={(data, actions) => {
                                  return actions.order.create({
                                    purchase_units: [{ amount: { value: finalTotal.toString() }, description: `Yankee's Printer - Order Checkout` }],
                                  });
                                }}
                                onApprove={async (data, actions) => {
                                  try {
                                    const details = await actions.order.capture();
                                    await handleOrderSuccess(details);
                                  } catch (err) { alert("Payment failed. Please try again."); }
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-16 flex flex-col items-center gap-8 border-t border-[#333330]/5 mt-16">
              {(formData.paymentMethod === 'cod' || step === 1) && (
                <button 
                  type="submit" disabled={loading}
                  className="group relative h-16 px-24 bg-black text-white rounded-full flex items-center justify-center gap-6 text-[12px] font-bold uppercase tracking-[0.3em] transition-all shadow-2xl active:scale-95 disabled:opacity-50 w-full md:w-auto overflow-hidden"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <span className="relative z-10 flex items-center gap-4">
                      {step === 1 ? 'Confirm Logistics' : 'Finalize Settlement'}
                      <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-2" />
                    </span>
                  )}
                  <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              )}
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-[10px] font-bold text-[#333330]/40 hover:text-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 group/back">
                   <ChevronLeft size={16} className="group-hover/back:-translate-x-1 transition-transform text-[#96968B]/40" /> Back to Logistics
                </button>
              )}
            </div>
          </div>

          {/* --- SUMMARY SIDEBAR: GLASS CANVAS --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-[120px]">
            <div className="bg-white border border-[#333330]/5 p-10 rounded-[40px] space-y-12 shadow-[0_30px_60px_rgba(0,0,0,0.03)] backdrop-blur-md bg-white/95">
              <div className="space-y-10">
                 <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#96968B] border-b border-[#333330]/5 pb-4 inline-block">Order Manifest</h3>
                 <div className="space-y-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-6 group/item">
                        <div className="h-20 w-20 bg-[#FBFBFA] flex items-center justify-center p-4 shrink-0 border border-[#333330]/5 rounded-2xl overflow-hidden relative group-hover/item:bg-[#E5E5E0] transition-colors">
                          <img src={getImagePath(item.images)} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/item:scale-110" alt="" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center space-y-1">
                          <h4 className="text-[13px] font-medium text-black uppercase tracking-tight truncate leading-tight">{item.name}</h4>
                          <p className="text-[11px] font-bold text-[#333330]/30 uppercase tracking-[0.2em]">Qty: {item.quantity} â€¢ ${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6 border-t border-[#333330]/5 pt-10">
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#333330]/40">
                  <span>Subtotal</span>
                  <span className="text-black">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#333330]/40">
                  <span>Logistics</span>
                  <span className="text-[#96968B] font-black">Complimentary</span>
                </div>
                <div className="flex flex-col pt-10 border-t border-[#333330]/5 mt-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#333330]/40 mb-3">Settlement Total</span>
                  <span className="text-5xl font-light text-black leading-none tracking-tighter">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6 opacity-30 grayscale border-t border-[#333330]/5 pt-8">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
