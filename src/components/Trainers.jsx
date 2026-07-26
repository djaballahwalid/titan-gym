import React from 'react';
import { motion } from 'framer-motion';
import { Camera, User, Globe } from 'lucide-react';

export default function Trainers() {
  const trainers = [
    {
      name: "Yacine Benali",
      role: "Head Strength Coach",
      img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Sofia Mansouri",
      role: "Yoga & Mobility Expert",
      img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Karim Haddad",
      role: "CrossFit Specialist",
      img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2000&auto=format&fit=crop"
    },
    {
      name: "Lina Cherif",
      role: "Boxing Champion",
      img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="trainers" className="section-padding">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-gold uppercase tracking-[0.3em] mb-4 text-sm">Meet The Team</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Elite <span className="text-gold-gradient">Trainers</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our certified trainers are dedicated to pushing you beyond your limits and helping you achieve greatness.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainers.map((trainer, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Image */}
            <img 
              src={trainer.img} 
              alt={trainer.name} 
              className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/40 to-transparent"></div>
            
            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h3 className="text-2xl font-display font-bold text-white mb-1">{trainer.name}</h3>
              <p className="text-gold uppercase text-xs tracking-wider mb-4">{trainer.role}</p>
              
              {/* Social Icons (Appear on Hover) */}
              <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <a href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-gold hover:text-charcoal-dark transition-colors">
                  <Camera size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-gold hover:text-charcoal-dark transition-colors">
                  <Globe size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-gold hover:text-charcoal-dark transition-colors">
                  <User size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}