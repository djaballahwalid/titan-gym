import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Amine Ouali",
      role: "Member since 2020",
      content: "Titan Gym changed my life. The facilities are immaculate, and the trainers push you to be your best. It's truly the luxury experience of Oran.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      name: "Nadia Belkacem",
      role: "Fitness Enthusiast",
      content: "The ambiance, the equipment, the spa... everything is 5 stars. I never thought I'd look forward to going to the gym until I joined Titan.",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop"
    },
    {
      name: "Rachid Meziane",
      role: "Elite Member",
      content: "As a busy professional, the 24/7 access and personal training sessions fit perfectly into my schedule. Best investment I've made in myself.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="testimonials" className="section-padding">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-gold uppercase tracking-[0.3em] mb-4 text-sm">Client Success</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our <span className="text-gold-gradient">Members Say</span></h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="glass p-8 rounded-2xl relative"
          >
            <Quote className="absolute top-6 right-6 text-gold/20" size={48} />
            
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-gold fill-gold" size={18} />
              ))}
            </div>

            <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
            
            <div className="flex items-center gap-4 mt-4">
              <img 
                src={testimonial.img} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-gold"
              />
              <div>
                <h4 className="font-bold text-white">{testimonial.name}</h4>
                <p className="text-xs text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}