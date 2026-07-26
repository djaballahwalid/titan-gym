import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Play, ChevronDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);
  
  // Scroll-driven animations for a premium, parallax feel
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const stats = [
    { value: '1.5K+', label: 'Active Members' },
    { value: '25', label: 'Elite Coaches' },
    { value: '10Y', label: 'Excellence' },
  ];

  // Staggered text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[700px] w-full overflow-hidden bg-charcoal-dark">
      
      {/* Cinematic Background Layer */}
      <motion.div 
        style={{ y, scale }} 
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=2670&auto=format&fit=crop" 
          alt="Titan Gym Athlete Training" 
          className="h-full w-full object-cover"
        />
        {/* Advanced Gradient Overlays for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/50 to-charcoal-dark/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/90 via-transparent to-charcoal-dark/40"></div>
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        style={{ opacity, y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-8 lg:px-16"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow / Pre-header */}
          <motion.div variants={wordVariants} className="mb-6 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gold"></div>
            <span className="text-xs font-sans font-medium uppercase tracking-[0.35em] text-gold">
              Oran's Premier Fitness Sanctuary
            </span>
          </motion.div>

          {/* Mixed Typography Headline */}
          <div className="mb-8 overflow-hidden">
            <motion.h1 
              variants={wordVariants}
              className="font-sans text-6xl font-extrabold uppercase leading-[0.85] tracking-tighter text-white sm:text-7xl md:text-8xl"
            >
              Forge Your
            </motion.h1>
            <motion.h1 
              variants={wordVariants}
              className="font-display text-7xl font-bold italic leading-[0.85] tracking-tighter text-transparent sm:text-8xl md:text-9xl bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark drop-shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
            >
              Titan Physique
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p 
            variants={wordVariants}
            className="mb-10 max-w-xl text-base font-light leading-relaxed text-gray-300 sm:text-lg md:text-xl"
          >
            Step into a world where luxury meets raw performance. State-of-the-art equipment, elite personal training, and an atmosphere built for champions.
          </motion.p>

          {/* Premium CTAs */}
          <motion.div 
            variants={wordVariants}
            className="flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          >
            <a 
              href="#membership" 
              className="group relative flex items-center gap-3 overflow-hidden bg-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-charcoal-dark transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0"></span>
              <span className="relative z-10">Start Your Journey</span>
              <ArrowUpRight size={18} className="relative z-10 transition-transform duration-300 group-hover:rotate-45" />
            </a>
            
            <a 
              href="#programs" 
              className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-gold"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 backdrop-blur-md transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10">
                <Play size={14} className="ml-0.5 fill-current" />
              </span>
              Explore Programs
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Stats & Scroll Cue Layer */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 z-10 mx-auto max-w-7xl px-6 pb-10 md:px-8 lg:px-16"
      >
        <div className="flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-end">
          
          {/* Stats Grid - Glassmorphism */}
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="font-display text-3xl font-bold text-white md:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 md:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Minimalist Scroll Indicator */}
          <div className="hidden flex-col items-center gap-2 text-gray-400 md:flex">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={16} className="text-gold" />
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Subtle Vignette Overlay for cinematic framing */}
      <div className="pointer-events-none absolute inset-0 z-[5] shadow-[inset_0_0_250px_rgba(0,0,0,0.9)]"></div>
    </section>
  );
}