import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Book } from 'lucide-react';

const Hero = ({ libraryCount = 0, nearestLibrary = null }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full" />

      <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-glass border border-glass-border px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <span className="bg-accent w-2 h-2 rounded-full animate-pulse" />
            New for 2024: Premium AI Recommendations
          </div>
          <h1 className="text-6xl md:text-7xl mb-6 leading-[1.1]">
            Read More, <br />
            <span className="gradient-text">Spend Less.</span>
          </h1>
          <p className="text-text-secondary text-lg mb-8 max-w-lg">
            Discover your next favorite book and choose the path that fits your life. 
            Rent from nearby libraries in India or buy from top retailers.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">
              Start Discovering <ChevronRight className="w-5 h-5" />
            </button>
            <button className="btn-secondary flex items-center gap-2 border-accent/30">
              <div className="bg-accent/10 p-1.5 rounded-full">
                <Play className="w-4 h-4 fill-accent text-accent" />
              </div>
              How it Works
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-glass-border">
            <img 
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" 
              alt="Featured Book"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
              <div>
                <span className="text-accent font-semibold mb-2 block uppercase tracking-widest text-sm">Featured Today</span>
                <h3 className="text-3xl serif mb-1">The Alchemist</h3>
                <p className="text-white/70">Paulo Coelho</p>
              </div>
            </div>
          </div>
          {/* Decorative Floating Card */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 glass p-6 rounded-xl border border-glass-border shadow-2xl z-20 hidden lg:block"
          >
            <div className="flex items-center gap-4">
              <div className="bg-accent/20 p-3 rounded-lg">
                <Book className="text-accent w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-widest font-bold">Nearby Availability</p>
                <p className="font-bold">{libraryCount > 0 ? `${libraryCount} Libraries Found` : 'Give Location Access'}</p>
                {nearestLibrary && <p className="text-xs text-text-secondary">Closest: {nearestLibrary.name}</p>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
