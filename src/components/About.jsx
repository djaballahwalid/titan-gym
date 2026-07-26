import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const features = [
    "Ultra-modern strength and conditioning equipment",
    "Luxurious locker rooms and spa facilities",
    "Personalized nutrition and wellness plans",
    "Exclusive member-only fitness events"
  ];

  return (
    <section id="about" className="section-padding">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" 
              alt="Titan Gym Training Area" 
              className="w-full h-[500px] object-cover"
            />
          </div>
          {/* Decorative Gold Border */}
          <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-gold rounded-2xl -z-0"></div>
        </motion.div>

        {/* Text Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold uppercase tracking-[0.3em] mb-4 text-sm">Discover Titan Gym</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Where Luxury Meets <br /> <span className="text-gold-gradient">Peak Performance</span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Located in the vibrant city of Oran, Titan Gym is more than just a fitness center—it's a sanctuary for those who demand the best. We blend world-class architecture with cutting-edge fitness technology to create an environment where champions are made.
          </p>

          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-gold" size={20} />
                {feature}
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-outline">Learn More</a>
        </motion.div>
      </div>
    </section>
  );
}