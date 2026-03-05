import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Zap
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Official Support",
    desc: "We are here to help you with anything you need for your printing tools.",
    accent: "blue"
  },
  {
    icon: <Truck size={28} />,
    title: "Fast Delivery",
    desc: "We make sure your order reaches you as quickly as possible, everywhere.",
    accent: "indigo"
  },
  {
    icon: <RotateCcw size={28} />,
    title: "Simple Returns",
    desc: "Not happy? No problem. Returning items is easy and stress-free with us.",
    accent: "slate"
  },
  {
    icon: <Zap size={28} />,
    title: "Quick Setup",
    desc: "Our products are designed to be ready to use in just a few simple steps.",
    accent: "blue"
  }
];

export default function Features() {
  return (
    <section className="bg-white font-urbanist py-16">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-100">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-10 border-r border-b border-slate-100 flex flex-col group hover:bg-slate-50 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="mb-8 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                {item.icon}
              </div>

              {/* Text */}
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Decoration */}
              <div className="mt-8 h-1 w-12 bg-slate-100 group-hover:bg-blue-600 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
