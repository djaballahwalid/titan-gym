import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Heart, Flame, Sword, UserRound, ArrowRight } from 'lucide-react';

export default function Programs() {
  const programs = [
    {
      icon: Dumbbell,
      title: "Strength Training",
      description: "Build raw power and muscle mass with our premium free weights and resistance machines."
    },
    {
      icon: Heart,
      title: "Cardio Fitness",
      description: "Boost your endurance on state-of-the-art treadmills, rowers, and elliptical machines."
    },
    {
      icon: Flame,
      title: "CrossFit",
      description: "High-intensity functional workouts designed to push your limits and forge elite fitness."
    },
    {
      icon: Sword,
      title: "Boxing",
      description: "Master the sweet science with professional boxing rings and elite combat coaches."
    },
    {
      icon: UserRound,
      title: "Personal Training",
      description: "1-on-1 customized coaching tailored to your specific physique and performance goals."
    }
  ];

  return (
    <section id="programs" className="bg-charcoal py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.3em] mb-4 text-sm">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Premium <span className="text-gold-gradient">Programs</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whatever your fitness goal, our world-class facilities and expert coaches have a program designed for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                <program.icon className="text-gold group-hover:text-charcoal-dark transition-colors duration-300" size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{program.title}</h3>
              <p className="text-gray-400 mb-6">{program.description}</p>
              <div className="flex items-center text-gold font-bold text-sm uppercase tracking-wider">
                Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
          
          {/* 6th Card for layout balance - CTA Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gold p-8 rounded-2xl flex flex-col justify-center items-center text-center text-charcoal-dark"
          >
            <h3 className="text-2xl font-display font-bold mb-4">Not sure where to start?</h3>
            <p className="mb-6">Book a free consultation with our fitness experts today.</p>
            <a href="#contact" className="bg-charcoal-dark text-gold py-3 px-8 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-charcoal transition-colors">
              Get Consultation
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}