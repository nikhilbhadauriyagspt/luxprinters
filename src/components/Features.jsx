import { Truck, RotateCcw, Headset, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={22} strokeWidth={1.2} />,
    title: "Global Delivery",
    desc: "Seamless shipping to your doorstep"
  },
  {
    icon: <RotateCcw size={22} strokeWidth={1.2} />,
    title: "Extended Returns",
    desc: "Confident 30-day trial period"
  },
  {
    icon: <Headset size={22} strokeWidth={1.2} />,
    title: "Expert Assistance",
    desc: "24/7 dedicated support team"
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={1.2} />,
    title: "Secure Purchase",
    desc: "Verified encrypted transactions"
  }
];

export default function Features() {
  return (
    <section className="relative z-30 -mt-8 md:-mt-10 pb-16 font-jakarta">
      <div className="w-full">
        <div className="bg-white border-y border-[#333330]/5 shadow-[0_20px_50px_rgba(0,0,0,0.02)] rounded-none overflow-hidden backdrop-blur-md bg-white/95">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#333330]/5">
            {features.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center gap-6 p-10 lg:p-14 group hover:bg-[#F1F1E9]/30 transition-all duration-500"
              >
                {/* Icon Container */}
                <div className="h-14 w-14 border border-[#333330]/10 flex items-center justify-center rounded-xl bg-white group-hover:bg-[#333330] group-hover:text-white transition-all duration-500 shrink-0">
                  <div className="group-hover:scale-110 transition-transform duration-500 text-[#333330] group-hover:text-white">
                    {item.icon}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <h4 className="text-[12px] font-bold text-[#333330] tracking-wide uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#666660] font-light whitespace-nowrap">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
