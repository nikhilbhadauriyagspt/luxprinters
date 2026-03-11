import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Star, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
import bannerImg from "@/assets/bannerr/banner2.jpg";

const About = () => {
  return (
    <div className="bg-white min-h-screen font-urbanist">
      <SEO 
        title="About Us | PrinterPrime" 
        description="Learn more about our mission to provide the best printing solutions."
      />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-black text-indigo-950 ">
                Helping You <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Print Better.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                We started with a simple goal to make finding the right printer and supplies easy for everyone. Whether you are working from home or running a busy office, we are here to help.
              </p>
              <div className="flex gap-4">
                 <Link to="/shop" className="px-8 py-4 bg-indigo-950 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-800 transition-all">
                    Browse Shop
                 </Link>
              </div>
            </div>
            <div className="relative">
               <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-xl border border-white">
                  <img 
                    src={bannerImg} 
                    alt="Our Office" 
                    className="w-full h-full object-cover"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR MISSION --- */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center text-center mb-20 relative">
            <h2 className="text-4xl md:text-5xl font-black leading-none  inline-block relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
                What We Believe In
              </span>
            </h2>
            
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Quality First",
                desc: "We only sell products we trust. Every printer and ink cartridge is checked to make sure it works perfectly for you.",
                color: "bg-blue-50",
                icon: <Star className="text-blue-600" />
              },
              {
                title: "Always Helpful",
                desc: "Our team is here to answer your questions in plain English. No confusing talk, just simple help when you need it.",
                color: "bg-amber-50",
                icon: <Users className="text-amber-600" />
              },
              {
                title: "Reliable Service",
                desc: "We know your work is important. That's why we focus on fast shipping and making sure your orders arrive safely.",
                color: "bg-indigo-50",
                icon: <Heart className="text-indigo-600" />
              }
            ].map((value, i) => (
              <div key={i} className={cn("p-12 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2", value.color)}>
                <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                   {value.icon}
                </div>
                <h3 className="text-2xl font-black text-indigo-950  mb-4">{value.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="py-24 lg:py-32 bg-indigo-950 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           
         </div>
         
         <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-10">
               <h2 className="text-4xl md:text-6xl font-black text-white">
                 A Local Business With <br />
                 <span className="text-amber-500">Big Dreams.</span>
               </h2>
               <p className="text-indigo-100/70 text-lg md:text-xl font-medium leading-relaxed">
                 PrinterPrime started as a small local shop. We realized that people were tired of complicated websites and poor support when buying office gear. We decided to change that by building a store that puts people first. Today, we are proud to serve thousands of customers with the same friendly service we started with.
               </p>
               <div className="pt-6">
                  <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full" />
               </div>
            </div>
         </div>
      </section>

      {/* --- SIMPLE CTA --- */}
      <section className="py-24 lg:py-32 bg-white text-center">
         <div className="max-w-3xl mx-auto px-6 space-y-10">
            <h2 className="text-4xl font-black text-indigo-950 ">Ready to find your perfect printer?</h2>
            <p className="text-slate-500 text-lg font-medium">Explore our collection of top-rated hardware today.</p>
            <div className="flex justify-center pt-4">
               <Link to="/shop" className="group flex items-center gap-6 p-2 pr-10 bg-indigo-950 rounded-full hover:bg-amber-500 transition-all duration-500">
                  <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center group-hover:bg-indigo-950 transition-colors">
                     <ArrowRight size={24} className="text-indigo-950 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-black text-white group-hover:text-indigo-950 uppercase tracking-widest">Go to Shop</span>
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
