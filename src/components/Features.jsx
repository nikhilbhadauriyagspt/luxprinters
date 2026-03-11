import { motion } from "framer-motion";

const features = [
  {
    title: "Fast Shipping",
    desc: "We deliver your orders quickly and safely to your doorstep, every time.",
    accent: "indigo"
  },
  {
    title: "Best Prices",
    desc: "Get high-quality products at prices that fit your budget perfectly.",
    accent: "amber"
  },
  {
    title: "Great Quality",
    desc: "We only provide the best products that are built to last and work well.",
    accent: "indigo"
  },
  {
    title: "Helpful Support",
    desc: "Our friendly team is here to help you with any questions you have.",
    accent: "amber"
  }
];

export default function Features() {
  return (
    <section className="bg-white font-urbanist py-12 border-b border-slate-100">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-100">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-10 border-r border-b border-slate-100 flex flex-col group hover:bg-slate-50 transition-all duration-300"
            >
              {/* Text */}
              <div className="space-y-3">
                <h3 className="text-xl font-black text-indigo-950  group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Simple Bottom Accent */}
              <div className={`mt-8 h-1 w-10 transition-all duration-500 ${item.accent === 'amber' ? 'bg-amber-400 group-hover:w-16' : 'bg-indigo-600 group-hover:w-16'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
