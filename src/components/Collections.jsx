import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import printerCat from "@/assets/category/printer_cat.jpg";

export default function Collections() {
  return (
    <section className="bg-white py-12 md:py-16 font-jakarta overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-20">
        <div className="relative flex flex-col lg:flex-row items-stretch bg-[#FBFBFA] rounded-[40px] md:rounded-[60px] overflow-hidden border border-[#333330]/10 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
          
          {/* --- CONTENT LAYER (LEFT) --- */}
          <div className="relative z-20 w-full lg:w-[45%] p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <span className="w-8 h-[1px] bg-[#96968B]"></span>
                <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-black/40">Sustainable Future</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-6xl font-light text-black tracking-tight uppercase leading-[1.1]"
              >
                Eco <span className="font-medium italic text-[#96968B]">Innovation</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-sm md:text-base text-[#333330] font-light leading-relaxed max-w-sm"
              >
                High-performance printing that respects the environment. Engineered for maximum efficiency with minimal footprint.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-2"
            >
              <Link 
                to="/shop" 
                className="group relative inline-flex items-center gap-4 bg-[#333330] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#4A4A45] rounded-full overflow-hidden shadow-md"
              >
                <span className="relative z-10">Explore Range</span>
                <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* --- IMMERSIVE IMAGE LAYER (RIGHT) --- */}
          <div className="w-full lg:w-[55%] min-h-[300px] lg:min-h-[450px] relative group overflow-hidden">
            <motion.div 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <img 
                src={printerCat} 
                alt="Professional Collection" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
              />
              {/* Subtle Overlay to blend with the text area */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FBFBFA] via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBFA] via-transparent to-transparent lg:hidden" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
