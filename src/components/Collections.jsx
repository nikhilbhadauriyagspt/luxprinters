import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Layers, Box, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import printerCat from "@/assets/category/printer_cat.jpg";

export default function Collections() {
  return (
    <section className="bg-white font-urbanist py-24 lg:py-32 relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* --- MAIN ARCHITECTURAL CARD --- */}
        <div className="relative bg-[#1e1b4b] rounded-[3rem] overflow-hidden lg:min-h-[700px] flex items-center shadow-sm">
          
          

          <div className="relative z-10 w-full grid lg:grid-cols-12 items-center gap-12 lg:gap-0">
            
            {/* LEFT: CONTENT SIDE (7 Columns) */}
            <div className="lg:col-span-7 p-8 lg:p-24 space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] ">
                  Smooth <br />
                  <span className="text-amber-400">Experience.</span>
                </h2>

                <p className="max-w-xl text-lg text-indigo-100/60 font-medium leading-relaxed">
                  Get the best results for your office with tools that are built to last. We only pick equipment that we know will make your work look great and run perfectly.
                </p>
              </div>

              {/* TECHNICAL NODES */}
              <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                 {[
                   { label: "Built to Last", desc: "Heavy-duty chassis" },
                   { label: "Perfect Results", desc: "Precision output" },
                   { label: "Office Ready", desc: "Seamless setup" }
                 ].map((node, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                         <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                         <p className="text-[15px] font-black text-white ">{node.label}</p>
                      </div>
                    
                   </div>
                 ))}
              </div>

              <div className="pt-4">
                <Link to="/shop" className="group inline-flex items-center gap-6 p-2 pr-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-amber-500 transition-all duration-500">
                  <div className="h-14 w-14 bg-amber-500 group-hover:bg-indigo-950 rounded-xl flex items-center justify-center transition-colors">
                     <ArrowRight size={24} className="text-indigo-950 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-black text-white group-hover:text-indigo-950 uppercase tracking-widest">Explore Collection</span>
                </Link>
              </div>
            </div>

            {/* RIGHT: IMAGE SIDE (5 Columns) */}
            <div className="lg:col-span-5 h-full relative">
               <div className="lg:absolute inset-0 lg:left-[-10%] bg-white rounded-t-[3rem] lg:rounded-l-[3rem] overflow-hidden lg:shadow-[-20px_0_50px_rgba(0,0,0,0.2)]">
                  <img 
                    src={printerCat} 
                    alt="Premium Selection" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
                  />
                  
                

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 left-0 h-20 w-20 border-l-4 border-b-4 border-amber-500 m-8 rounded-bl-3xl opacity-50" />
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
