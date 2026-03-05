import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, HelpCircle, Search, MessageCircle, Mail, Phone, Plus, Minus, Terminal, Activity, ShieldCheck, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const faqData = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on myprinterman?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on myprinterman secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & Availability",
    questions: [
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We are an Authorized HP Partner, but we also sell printers and accessories from other trusted brands." },
      { q: "How can I choose the right printer?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." },
      { q: "Can I compare products before buying?", a: "Yes. Use our Compare feature to check specs, features, and pricing side by side." }
    ]
  },
  {
    category: "Warranty & Support",
    questions: [
      { q: "Do your products come with a manufacturer's warranty?", a: "Yes. Every product includes full brand-backed warranty with repair/replacement coverage." },
      { q: "How do I claim warranty for HP products?", a: "You can contact HP Support directly or reach out to us for guidance and warranty assistance." },
      { q: "What if my printer arrives damaged?", a: "Contact us within 48 hours with photos/videos. We’ll arrange a replacement or initiate a claim." },
      { q: "Do you provide technical support?", a: "Yes. We offer setup help, troubleshooting, installation support, and product-related guidance." },
      { q: "How do I contact customer support?", a: "You can reach us via email, chat, or our contact form. Support is available 7 days a week." }
    ]
  },
  {
    category: "Returns, Refunds & Replacements",
    questions: [
      { q: "What is your return policy?", a: "We accept returns for eligible products within 7–14 days of delivery, depending on the item category." },
      { q: "How do I request a return or replacement?", a: "Submit a request through your My Orders section or contact our support team." },
      { q: "How long does a refund take?", a: "Refunds are processed within 5–7 business days after inspection." },
      { q: "What products are eligible for return?", a: "Products must be unused, in original condition, and returned with complete accessories and packaging." },
      { q: "What if my item is defective or missing parts?", a: "Report the issue within 48 hours, and we will arrange a replacement or resolve the issue immediately." }
    ]
  },
  {
    category: "Account & Profile",
    questions: [
      { q: "How do I create an account?", a: "Click Sign Up, enter your details, and verify your email." },
      { q: "I forgot my password — what should I do?", a: "Use the Forgot Password option to reset it instantly via email." },
      { q: "How can I update my profile details?", a: "Go to My Account → Profile Info to edit your name, address, phone number, etc." },
      { q: "Can I view my past orders?", a: "Yes. All previous orders are listed in your Order History." }
    ]
  },
  {
    category: "Printer & Ink FAQs",
    questions: [
      { q: "How do I choose the right printer?", a: "Consider your usage — home, office, photos, or bulk printing — and our team can recommend the best match." },
      { q: "Do you sell original HP ink and toner?", a: "Yes. We sell 100% original HP ink and toner, plus compatible options for other brands." },
      { q: "Why is my printer showing “Offline”?", a: "This usually indicates a driver issue or Wi-Fi interruption. Our support team can fix this quickly." },
      { q: "How do I improve print quality?", a: "Try cleaning printheads, using genuine supplies, adjusting paper settings, or contacting support." }
    ]
  },
  {
    category: "Payment, Billing & Security",
    questions: [
      { q: "Is my payment information secure?", a: "Yes. All payments are encrypted and processed through secure, trusted gateways." },
      { q: "Why was my payment declined?", a: "This could be due to bank restrictions, incorrect details, or insufficient balance. Try again or check with your bank." },
      { q: "Do you store my billing information?", a: "No. Sensitive information is never stored — it’s processed securely by our payment partners." },
      { q: "Can I get a tax/GST invoice?", a: "Yes. You can download your invoice directly from the My Orders section." }
    ]
  },
  {
    category: "Business & Bulk Orders",
    questions: [
      { q: "Do you offer corporate or bulk discounts?", a: "Yes. Contact us for custom pricing on large orders." },
      { q: "Can businesses request custom quotes?", a: "Absolutely. Our team provides quotes for offices, institutions, and resellers." },
      { q: "Do you offer managed printing or device solutions?", a: "Yes. We support businesses with printer fleet management and bulk supply programs." }
    ]
  },
  {
    category: "General & Contact Information",
    questions: [
      { q: "Are all products brand new and sealed?", a: "Yes. Every product is brand new, sealed, and delivered with full warranty." },
      { q: "Do you offer customer support on weekends?", a: "Yes. Our support team is available 7 days a week." },
      { q: "How can I contact myprinterman?", a: "You can reach us through email, live chat, or the contact form on our website." },
      { q: "Do you offer discount codes or promotions?", a: "Yes. Keep an eye on our homepage banners and newsletter for active offers." }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-white pt-28 lg:pt-36 pb-20 font-urbanist overflow-hidden">
      <SEO 
        title="FAQ | MyPrinterMan Help Center" 
        description="Find simple answers to common questions about orders, shipping, and our products."
      />
      
      {/* --- HERO SECTION --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-50/50 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-6 bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Help Center</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.85] tracking-tight flex flex-col">
              <span className="capitalize">Common</span>
              <span className="italic text-blue-600 capitalize">Questions.</span>
            </h1>
          </div>
          
          <div className="w-full max-w-md relative group">
             <input 
               type="text" 
               placeholder="SEARCH FOR HELP..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full h-16 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-none text-xs font-black uppercase tracking-widest focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-inner"
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- NAVIGATION SIDEBAR --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="space-y-1">
                {faqData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => { setActiveCategory(cat.category); setOpenIndex(0); }}
                    className={cn(
                      "w-full text-left px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-between group",
                      activeCategory === cat.category 
                      ? "bg-slate-900 text-white" 
                      : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {cat.category}
                    <ChevronRight size={14} className={cn("transition-transform", activeCategory === cat.category ? "translate-x-0" : "-translate-x-2 opacity-0")} />
                  </button>
                ))}
              </div>

              {/* Support Card */}
              <div className="p-8 bg-blue-600 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                   <ShieldCheck size={80} strokeWidth={1} />
                </div>
                <div className="relative z-10 space-y-4">
                  <h4 className="text-[9px] font-black text-blue-100 uppercase tracking-[0.4em]">Expert Support</h4>
                  <p className="text-lg font-black tracking-tight">Need more help?</p>
                  <p className="text-sm font-medium text-blue-50 leading-relaxed">Our team is ready to answer any specific questions you have.</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pt-4 border-t border-white/20 w-full hover:gap-4 transition-all">
                    Contact Us <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* --- ACCORDION SYSTEM --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }} className="space-y-4"
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">
                     {activeCategory}.
                   </h3>
                   <Activity size={20} className="text-slate-200" />
                </div>
                
                <div className="space-y-2">
                  {filteredData.find(c => c.category === activeCategory)?.questions.map((faq, idx) => (
                    <div 
                      key={idx}
                      className={cn(
                        "bg-white border transition-all duration-300 overflow-hidden",
                        openIndex === idx ? "border-blue-600 shadow-lg" : "border-slate-100 hover:border-blue-200"
                      )}
                    >
                      <button
                        onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                        className="w-full px-8 py-8 flex items-center justify-between text-left group"
                      >
                        <span className={cn(
                          "text-lg font-black uppercase tracking-tight leading-tight pr-8 transition-colors",
                          openIndex === idx ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"
                        )}>
                          {faq.q}
                        </span>
                        <div className={cn(
                          "h-10 w-10 flex items-center justify-center shrink-0 transition-all",
                          openIndex === idx ? "bg-slate-900 text-white rotate-180" : "bg-slate-50 text-slate-300 group-hover:bg-blue-600 group-hover:text-white"
                        )}>
                          {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {openIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-8 pb-8">
                              <div className="bg-slate-50 p-8 border-l-2 border-blue-600">
                                <p className="text-slate-600 text-base font-medium leading-relaxed">
                                  {faq.a}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {filteredData.length === 0 && (
                  <div className="py-24 text-center bg-slate-50 border border-slate-100">
                    <Search size={32} className="text-slate-200 mx-auto mb-4" />
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">No results found</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Try searching for something else</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
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
