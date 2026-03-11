import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { HelpCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on PrinterPrime?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },     
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },   
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on PrinterPrime secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }      
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
      { q: "Do you sell only HP products or other brands too?", a: "We specialize in a wide range of premium printing solutions, including printers and accessories from various trusted brands." },
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
    category: "Returns & Refunds",
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
    category: "Printer & Ink",
    questions: [
      { q: "How do I choose the right printer?", a: "Consider your usage — home, office, photos, or bulk printing — and our team can recommend the best match." },
      { q: "Do you sell original HP ink and toner?", a: "Yes. We sell 100% original HP ink and toner, plus compatible options for other brands." },
      { q: "Why is my printer showing “Offline”?", a: "This usually indicates a driver issue or Wi-Fi interruption. Our support team can fix this quickly." },
      { q: "How do I improve print quality?", a: "Try cleaning printheads, using genuine supplies, adjusting paper settings, or contacting support." }
    ]
  },
  {
    category: "Payment & Security",
    questions: [
      { q: "Is my payment information secure?", a: "Yes. All payments are encrypted and processed through secure, trusted gateways." },
      { q: "Why was my payment declined?", a: "This could be due to bank restrictions, incorrect details, or insufficient balance. Try again or check with your bank." },
      { q: "Do you store my billing information?", a: "No. Sensitive information is never stored — it’s processed securely by our payment partners." },
      { q: "Can I get a tax/GST invoice?", a: "Yes. You can download your invoice directly from the My Orders section." }
    ]
  },
  {
    category: "Business Orders",
    questions: [
      { q: "Do you offer corporate or bulk discounts?", a: "Yes. Contact us for custom pricing on large orders." },
      { q: "Can businesses request custom quotes?", a: "Absolutely. Our team provides quotes for offices, institutions, and resellers." },
      { q: "Do you offer managed printing or device solutions?", a: "Yes. We support businesses with printer fleet management and bulk supply programs." }
    ]
  },
  {
    category: "General Info",
    questions: [
      { q: "Are all products brand new and sealed?", a: "Yes. Every product is brand new, sealed, and delivered with full warranty." },
      { q: "Do you offer customer support on weekends?", a: "Yes. Our support team is available 7 days a week." },
      { q: "How can I contact PrinterPrime?", a: "You can reach us through email, live chat, or the contact form on our website." },
      { q: "Do you offer discount codes or promotions?", a: "Yes. Keep an eye on our homepage banners and newsletter for active offers." }
    ]
  }
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const filteredFaqs = faqs.find(f => f.category === activeCategory)?.questions || [];

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 font-urbanist overflow-hidden">
      <SEO 
        title="FAQ | PrinterPrime" 
        description="Find answers to common questions about ordering, shipping, and returns at PrinterPrime."
      />

      {/* --- PAGE HEADER --- */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 mb-20 relative z-10">
        <div className="flex flex-col items-center text-center relative">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-amber-500" />
            <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">Help Center</span>
            <div className="h-[1px] w-12 bg-amber-500" />
          </div>
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-black leading-none  inline-block relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
                Common Questions
              </span>
            </h1>
          </div>
          <p className="mt-6 text-slate-500 text-lg font-medium max-w-xl leading-relaxed mx-auto">
            Everything you need to know about our products, shipping, and how we help you print better.
          </p>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- CATEGORY TABS --- */}
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {faqs.map((f) => (
              <button
                key={f.category}
                onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                className={cn(
                  "px-8 py-5 text-sm font-black transition-all rounded-2xl whitespace-nowrap text-left flex items-center justify-between group",
                  activeCategory === f.category 
                    ? "bg-indigo-950 text-white shadow-xl shadow-indigo-950/20" 
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-indigo-950"
                )}
              >
                {f.category}
                <ArrowRight size={16} className={cn("transition-transform duration-300", activeCategory === f.category ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")} />
              </button>
            ))}
          </div>

          {/* --- ACCORDION CONTENT --- */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.map((faq, i) => (
              <div 
                key={i}
                className={cn(
                  "border rounded-[2rem] transition-all duration-500 overflow-hidden",
                  activeIdx === i ? "border-indigo-600 bg-white shadow-2xl shadow-indigo-500/5" : "border-slate-100 bg-slate-50 hover:border-indigo-200"
                )}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-8 md:p-10 text-left group"
                >
                  <span className={cn(
                    "text-lg md:text-xl font-bold transition-colors",
                    activeIdx === i ? "text-indigo-600" : "text-indigo-950"
                  )}>
                    {faq.q}
                  </span>
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ml-6",
                    activeIdx === i ? "bg-indigo-600 text-white rotate-180" : "bg-white text-indigo-950 border border-slate-100 group-hover:bg-indigo-950 group-hover:text-white"
                  )}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {activeIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-8 md:px-10 pb-10">
                        <div className="h-px w-full bg-slate-100 mb-8" />
                        <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-3xl">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* --- CONTACT CTA --- */}
      <section className="py-24 lg:py-32 bg-white text-center border-t border-slate-100 mx-6 md:mx-10 lg:mx-16 mt-12 rounded-[3rem] bg-slate-50">
         <div className="max-w-3xl mx-auto px-6 space-y-10">
            <h2 className="text-4xl font-black text-indigo-950">Still have a question?</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">If you can't find the answer you're looking for, please get in touch with our friendly support team.</p>
            <div className="flex justify-center pt-4">
               <Link to="/contact" className="group flex items-center gap-6 p-2 pr-10 bg-indigo-950 rounded-full hover:bg-amber-500 transition-all duration-500 shadow-xl shadow-indigo-950/10">
                  <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center group-hover:bg-indigo-950 transition-colors">
                     <ArrowRight size={24} className="text-indigo-950 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-black text-white group-hover:text-indigo-950 uppercase tracking-widest">Contact Us Now</span>
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
