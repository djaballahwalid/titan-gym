import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Membership', href: '#membership' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  // Scroll progress bar setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Handle scroll state and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection logic
      const sections = navLinks.map(link => link.href.substring(1));
      const offset = window.innerHeight / 3;
      
      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.getBoundingClientRect().top;
          if (top <= offset) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold origin-left z-[60]" 
      />

      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-charcoal-dark/70 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 flex justify-between items-center">
          
          {/* Luxury Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-2.5 group relative z-50"
            aria-label="Titan Gym Home"
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <Dumbbell className="text-gold" size={24} strokeWidth={2.5} />
            </motion.div>
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              TITAN<span className="text-gold">GYM</span>
            </span>
            {/* Logo Glow */}
            <div className="absolute -inset-4 bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full"></div>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-10 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              const isHovered = hoveredLink === link.name;
              
              return (
                <li 
                  key={link.name}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <a 
                    href={link.href} 
                    className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 flex items-center py-2 ${
                      isActive || isHovered ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {/* Animated Underline / Active Indicator */}
                    {(isActive || isHovered) && (
                      <motion.div 
                        layoutId="navHighlight"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:block">
            <a 
              href="#membership" 
              className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark rounded-full"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gold/40 blur-md group-hover:blur-lg group-hover:bg-gold/60 transition-all duration-500 rounded-full"></div>
              {/* Button Content */}
              <div className="relative px-6 py-2.5 bg-gold text-charcoal-dark text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 group-hover:bg-gold-light group-hover:scale-105 flex items-center justify-center">
                Join Now
              </div>
            </a>
          </div>

          {/* Animated Mobile Hamburger */}
          <button 
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <motion.span 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`block h-0.5 w-6 rounded-full ${isOpen ? 'bg-gold' : 'bg-white'}`}
            ></motion.span>
            <motion.span 
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className={`block h-0.5 w-6 rounded-full ${isOpen ? 'bg-gold' : 'bg-white'}`}
            ></motion.span>
            <motion.span 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`block h-0.5 w-6 rounded-full ${isOpen ? 'bg-gold' : 'bg-white'}`}
            ></motion.span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 top-0 left-0 h-screen w-full bg-charcoal-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center z-40"
            >
              <ul className="flex flex-col items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className={`text-3xl font-display font-semibold tracking-wide transition-colors duration-300 ${
                        activeSection === link.href.substring(1) ? 'text-gold' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
              
              <motion.a 
                href="#membership" 
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-12 relative group"
              >
                <div className="absolute -inset-1 bg-gold/40 blur-md group-hover:blur-lg transition-all rounded-full"></div>
                <div className="relative px-10 py-3.5 bg-gold text-charcoal-dark text-sm font-bold uppercase tracking-widest rounded-full">
                  Join Now
                </div>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}