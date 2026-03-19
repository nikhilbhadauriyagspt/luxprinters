import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X, CheckCircle2, Clock, MapPin, ArrowRight, Loader2, Truck, ChevronLeft, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'We have received your order.' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your printer is being prepared.' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Your order is on the way.' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Your printer will arrive today.' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully delivered to you.' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F6] pt-40 pb-20 font-jakarta px-6 flex flex-col items-center justify-center text-[#333330]">
        <SEO title="Track Order | Yankee's Printer" />
        <div className="max-w-[440px] w-full">
          <div className="text-center mb-12 space-y-4">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#96968B] block">Status Check</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-light uppercase tracking-tight text-black">Track <span className="font-medium italic text-[#96968B]">Order</span></motion.h1>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 md:p-12 border border-[#333330]/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] rounded-[40px]">
            <form onSubmit={handleGuestSearch} className="space-y-8">
              <div className="space-y-3 group">
                <label className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] pl-1">Email Address</label>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#333330]/20 group-focus-within:text-[#96968B] transition-colors" size={16} strokeWidth={1.5} />
                  <input 
                    type="email" required placeholder="ENTER EMAIL ADDRESS" value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full h-14 pl-14 pr-4 bg-[#FBFBFA] border border-[#333330]/5 rounded-2xl focus:border-[#96968B] outline-none text-[13px] font-medium transition-all placeholder:text-[#333330]/10 uppercase tracking-widest"
                  />
                </div>
              </div>
              <button className="group relative w-full inline-flex items-center justify-center gap-4 bg-black text-white h-14 rounded-full overflow-hidden transition-all duration-500 shadow-xl active:scale-95">
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">Find Order</span>
                <ArrowRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </form>
            <div className="mt-10 pt-8 border-t border-[#333330]/5 text-center">
              <Link to="/login" className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-[0.2em] hover:text-black transition-colors">Sign in for full history</Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] font-jakarta text-[#333330] overflow-x-hidden">
      <SEO title="Order History | Yankee's Printer" />
      
      {/* --- BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-[400px] -left-[400px] md:-top-[500px] md:-left-[500px] w-[1000px] h-[1000px] bg-[#F1F1E9] rounded-full border border-[#333330]/[0.03] shadow-[inset_0_0_80px_rgba(0,0,0,0.01)]"
        />
      </div>

      {/* --- PREMIUM HERO HEADER --- */}
      <section className="relative pt-32 pb-16 px-6 lg:px-20 text-center">
        <div className="max-w-[1920px] mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#333330]/40">Customer Portal</span>
            <span className="w-8 h-[1px] bg-[#96968B]"></span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-light uppercase tracking-tight text-black leading-none">
            My <span className="font-medium italic text-[#96968B]">Orders</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-20 py-12 md:py-20 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin h-8 w-8 text-[#96968B] mb-6" strokeWidth={1.5} />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#333330]/30">Syncing History...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[40px] border border-[#333330]/5">
            <Package size={48} strokeWidth={1} className="mx-auto text-[#96968B]/20 mb-6" />
            <h2 className="text-xl font-light uppercase tracking-widest text-black">No orders found</h2>
            <Link to="/shop" className="group relative inline-flex items-center gap-6 bg-black text-white h-14 px-10 rounded-full mt-10 overflow-hidden transition-all duration-500 shadow-xl">
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em]">Browse Catalog</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                key={order.id} className="bg-white border border-[#333330]/5 rounded-[40px] overflow-hidden group hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] transition-all duration-700"
              >
                {/* Meta Header */}
                <div className="p-8 md:p-12 border-b border-[#333330]/5 flex flex-wrap items-center justify-between gap-8 bg-[#FBFBFA]">
                  <div className="flex flex-wrap items-center gap-10 md:gap-20">
                    <div>
                      <p className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-widest mb-2">Order Ref</p>
                      <h3 className="text-[15px] font-bold text-black tracking-tight uppercase">#{order.order_code || order.id}</h3>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-widest mb-2">Date</p>
                      <p className="text-[15px] font-medium text-black">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#333330]/40 uppercase tracking-widest mb-2">Total</p>
                      <p className="text-2xl font-light text-black tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className={cn(
                    "px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border",
                    order.status === 'delivered' ? "bg-black text-white border-black" : "bg-white text-black border-[#333330]/10"
                  )}>
                    {order.status}
                  </div>
                </div>

                {/* Items & Track */}
                <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-16 items-center">
                  <div className="flex-1 w-full space-y-10">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-10 group/item">
                        <div className="h-24 w-24 bg-[#FBFBFA] rounded-[24px] border border-[#333330]/5 flex items-center justify-center p-5 shrink-0 group-hover/item:bg-[#E5E5E0] transition-all duration-700 overflow-hidden relative">
                          <img src={getImagePath(item.images)} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/item:scale-110" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[15px] font-medium text-black uppercase tracking-tight truncate mb-1.5">{item.product_name}</h4>
                          <p className="text-[11px] font-bold text-[#333330]/30 uppercase tracking-widest">Qty: {item.quantity} â€¢ ${parseFloat(item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[320px] shrink-0 w-full">
                    <button 
                      onClick={() => setSelectedOrder(order)} 
                      className="group relative w-full h-16 bg-black text-white rounded-full flex items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 shadow-xl active:scale-95"
                    >
                      <span className="relative z-10 flex items-center gap-4">
                        Live Tracking
                        <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-2" />
                      </span>
                      <div className="absolute inset-0 bg-[#333330] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- TRACKING MODAL: GLASS CANVAS --- */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[1000]" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }} 
                animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }} 
                exit={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }} 
                className="fixed top-1/2 left-1/2 w-full max-w-xl bg-white/95 backdrop-blur-md z-[1001] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.1)] rounded-[60px] p-10 md:p-20 font-jakarta border border-white/50"
              >
                <div className="flex items-center justify-between mb-16">
                  <div className="space-y-1">
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#96968B]">Order Journey</span>
                     <h2 className="text-3xl font-light uppercase tracking-tight text-black leading-none">Live <span className="font-medium italic text-[#96968B]">Status</span></h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-12 w-12 flex items-center justify-center bg-[#FBFBFA] rounded-full text-[#333330]/40 hover:text-black transition-all border border-[#333330]/5 group">
                    <X size={24} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
                  </button>
                </div>
                
                <div className="space-y-12 relative px-4">
                  <div className="absolute left-[35px] top-4 bottom-4 w-[1.5px] bg-[#333330]/5" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-12">
                        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center z-10 transition-all duration-1000 border-2", isCompleted ? 'bg-black text-white border-black shadow-xl' : 'bg-white text-[#333330]/10 border-[#333330]/5')}>
                          <Icon size={18} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 pt-1.5">
                          <h4 className={cn("text-[13px] font-bold uppercase tracking-widest transition-colors duration-1000", isCompleted ? 'text-black' : 'text-[#333330]/20')}>{step.label}</h4>
                          <p className={cn("text-[12px] font-light mt-1.5 leading-relaxed transition-colors duration-1000", isCompleted ? 'text-[#666660]' : 'text-[#333330]/10')}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => setSelectedOrder(null)} className="w-full mt-16 py-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#333330]/30 hover:text-black border-t border-[#333330]/5 transition-all">Dismiss Tracking</button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="mt-24 pt-12 border-t border-[#333330]/5 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#333330]/40 hover:text-black transition-all">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform text-[#96968B]/40" />
            Return to Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
