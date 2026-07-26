import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, Trophy, Users, Sparkles } from 'lucide-react';

// Custom hook for premium animated counting
const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (val) => setDisplay(Math.floor(val))
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
};

export default function About() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-200px" });

  const features = [
    "Ultra-modern strength & conditioning equipment",
    "Luxurious locker rooms & spa facilities",
    "Personalized nutrition & wellness plans",
    "Exclusive member-only fitness events"
  ];

  const stats = [
    { icon: Users, value: 1500, suffix: "+", label: "Elite Members" },
    { icon: Trophy, value: 25, suffix: "", label: "Expert Coaches" },
    { icon: Sparkles, value: 10, suffix: "Y", label: "Excellence" }
  ];

  // Framer Motion variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="about" className="relative py-24 md:py-32 bg-charcoal-dark overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/10 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Premium Image Composition */}
          <motion.div 
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px] hidden md:block"
          >
            {/* Main Image with Gold Border Glow */}
            <div className="absolute top-0 left-0 w-4/5 h-[500px] rounded-2xl overflow-hidden z-10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" 
                alt="Titan Gym premium training area" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/50 to-transparent"></div>
            </div>

            {/* Secondary Image Floating */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute bottom-0 right-0 w-3/5 h-[300px] rounded-2xl overflow-hidden border-4 border-charcoal-dark shadow-2xl z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" 
                alt="Titan Gym luxury interior" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating Glassmorphism Stat Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute top-1/2 -left-8 z-30 glass p-6 rounded-xl shadow-xl flex items-center gap-4 hover:border-gold/40 transition-colors duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10">
                <Trophy className="text-gold" size={24} />
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-white">
                  <AnimatedCounter value={10} suffix="+" />
                </p>
                <p className="text-xs uppercase tracking-widest text-gray-400">Years Elite</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Content & Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gold"></div>
              <span className="text-xs font-sans font-medium uppercase tracking-[0.35em] text-gold">
                Discover Titan Gym
              </span>
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]"
            >
              Where Luxury Meets <br />
              <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark">
                Peak Performance
              </span>
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="text-gray-400 mb-10 leading-relaxed text-lg font-light max-w-xl"
            >
              Located in the vibrant city of Oran, Titan Gym is more than just a fitness center—it's a sanctuary for those who demand the best. We blend world-class architecture with cutting-edge fitness technology to create an environment where champions are made.
            </motion.p>

            {/* Features List */}
            <motion.ul variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300 group">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold/10 transition-colors duration-300 group-hover:bg-gold">
                    <CheckCircle2 className="text-gold transition-colors duration-300 group-hover:text-charcoal-dark" size={16} />
                  </span>
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </motion.ul>

            {/* Premium Statistics Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 mb-12 border-t border-b border-white/10 py-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-left group cursor-default">
                  <stat.icon className="text-gold/70 mb-3 transition-transform duration-300 group-hover:scale-110" size={24} />
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Refined CTA */}
            <motion.div variants={itemVariants}>
              <a 
                href="#contact" 
                className="group relative inline-flex items-center gap-3 overflow-hidden px-8 py-4 border border-white/20 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-gold"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold/20 to-gold/0 transition-transform duration-500 group-hover:translate-x-0"></span>
                <span className="relative z-10">Schedule a Tour</span>
                <ArrowUpRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-2px] group-hover:text-gold" />
              </a>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}