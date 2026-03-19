import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Buying",
    questions: [
      { q: "How do I buy a printer?", a: "It's easy! Just pick the printer you like, add it to your cart, and follow the steps at checkout to pay." },     
      { q: "Do I need an account to shop?", a: "No, you can check out as a guest. But having an account helps you see your order history later." },
      { q: "Where can I see my order?", a: "We'll send you an email as soon as you buy something. You can also check 'Track Order' at the top of the page." },
      { q: "Can I change my mind after buying?", a: "If we haven't sent your printer yet, we can change or cancel your order. Just message us as soon as possible!" },
      { q: "What ways can I pay?", a: "We take all major bank cards and PayPal. Everything is kept safe and private." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "Where do you deliver?", a: "We deliver to all homes and offices across the country." },
      { q: "How long will it take to get my printer?", a: "Most orders arrive in 3 to 7 days. We'll let you know exactly when it's on its way." },
      { q: "How much is the delivery fee?", a: "The fee depends on where you live and how heavy the printer is. You'll see the total before you pay." },
      { q: "How do I know where my package is?", a: "We'll email you a tracking number. You can use this to see where your printer is at any time." },
      { q: "What if I'm not home when it arrives?", a: "The delivery person will usually leave a note or try again the next day." }
    ]
  },
  {
    category: "About the Printers",
    questions: [
      { q: "Are the printers brand new?", a: "Yes, 100%. We only sell brand new, original printers in their original boxes." },
      { q: "Will I get a warranty?", a: "Yes, all printers come with a full warranty from the brand, so you're always protected." },
      { q: "Do you help with setting it up?", a: "Yes! If you find it hard to get your printer working, just reach out. We can guide you through it." },
      { q: "Do you sell ink and toner too?", a: "Yes, we have all the original ink and toner you'll need to keep printing." },
      { q: "How do I know which printer is best for me?", a: "Just think about what you print most. For letters and documents, a laser printer is great. For photos, go with inkjet. Still not sure? Ask us!" }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "Can I return a printer?", a: "Yes, if the printer is still in its box and hasn't been used, you can return it within 14 days." },
      { q: "How do I get my money back?", a: "Once we get the printer back and check it, we'll send your money back to your card within a few days." },
      { q: "What if the printer is broken?", a: "If there's any problem when it arrives, let us know right away. We will fix it or send you a new one." }
    ]
  },
  {
    category: "Support & Help",
    questions: [
      { q: "How can I contact you?", a: "You can send us an email or use the form on our Contact page. We're here to help every day." },
      { q: "When are you open?", a: "Our website is always open! Our team answers messages throughout the day, usually within 24 hours." },
      { q: "Can you help me find the right ink?", a: "Of course! Just tell us the name of your printer and we'll show you exactly what ink you need." }
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
    <div className="bg-[#F8F8F6] min-h-screen font-jakarta text-[#333330] overflow-x-hidden">
      <SEO 
        title="FAQ | Yankee's Printer" 
        description="Find simple answers to your questions about printers, delivery, and support."
      />

      {/* --- REFINED HERO HEADER --- */}
      <section className="relative pt-24 pb-16 px-6 lg:px-20 text-center">
        <div className="max-w-[1920px] mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#333330]/40">Help Center</span>
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-black uppercase tracking-tight leading-[1.1]"
          >
            How can we <span className="font-medium italic text-[#96968B]">Help?</span>
          </motion.h1>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- CATEGORY NAVIGATION --- */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#96968B] border-b border-[#333330]/5 pb-4">Collections</h4>
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
              {faqs.map((f) => (
                <button
                  key={f.category}
                  onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                  className={cn(
                    "px-6 py-3.5 text-[12px] font-bold transition-all whitespace-nowrap text-left rounded-xl uppercase tracking-wider",
                    activeCategory === f.category 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white text-[#333330]/40 hover:bg-white hover:text-black border border-[#333330]/5"
                  )}
                >
                  {f.category}
                </button>
              ))}
            </div>
          </div>

          {/* --- ACCORDION PANEL --- */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <div 
                  key={i}
                  className={cn(
                    "bg-white rounded-2xl transition-all duration-500 overflow-hidden border border-[#333330]/5 shadow-sm",
                    activeIdx === i ? "shadow-md" : "hover:border-[#333330]/10"
                  )}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <span className={cn(
                      "text-[15px] font-medium transition-colors leading-snug pr-8",
                      activeIdx === i ? "text-black" : "text-[#333330] group-hover:text-black"
                    )}>
                      {faq.q}
                    </span>
                    <div className={cn(
                      "h-8 w-8 rounded-full border border-[#333330]/5 flex items-center justify-center transition-all duration-500 shrink-0",
                      activeIdx === i ? "bg-[#333330] text-white rotate-180" : "bg-[#FBFBFA] text-[#333330]/40 group-hover:border-[#333330]/20"
                    )}>
                      <ChevronDown size={16} strokeWidth={1.5} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIdx === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 border-t border-[#333330]/5 pt-6">
                          <p className="text-[#666660] text-sm md:text-base font-light leading-relaxed">
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
      </div>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tight text-black">
              Still Need <span className="font-medium italic text-[#96968B]">Answers?</span>
            </h2>
            <p className="text-[#666660] text-base font-light">Our team is always available to provide the clarity you need.</p>
          </div>
          <div className="flex justify-center gap-6">
            <Link to="/contact" className="bg-black text-white px-10 h-14 flex items-center justify-center rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-[#333330] shadow-xl active:scale-95">
              Speak with us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
