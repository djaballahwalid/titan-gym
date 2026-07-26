import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown } from 'lucide-react';

export default function Membership() {
  const plans = [
    {
      name: "Basic",
      price: "5,000",
      features: [
        "Access to gym floor & cardio",
        "Locker room access",
        "2 Group classes per week",
        "Fitness assessment"
      ],
      highlighted: false
    },
    {
      name: "Premium",
      price: "9,000",
      features: [
        "Unlimited gym & cardio access",
        "Unlimited group classes",
        "1 Personal training session/mo",
        "Sauna & Spa access",
        "Nutrition consultation"
      ],
      highlighted: true
    },
    {
      name: "Elite",
      price: "15,000",
      features: [
        "24/7 Gym Access",
        "Unlimited PT sessions",
        "Private locker",
        "Massage therapy included",
        "Guest passes (2 per month)"
      ],
      highlighted: false
    }
  ];

  return (
    <section id="membership" className="bg-charcoal py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Background Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full filter blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full filter blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.3em] mb-4 text-sm">Pricing Plans</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your <span className="text-gold-gradient">Membership</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Invest in your health and future. Flexible plans designed to fit your lifestyle and goals. Prices in DZD.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted 
                  ? 'bg-gradient-to-b from-gold/20 to-charcoal border-2 border-gold lg:scale-105 shadow-2xl' 
                  : 'glass'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-charcoal-dark px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Crown size={14} /> Best Value
                </div>
              )}
              
              <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-400 ml-2">DZD/mo</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className="text-gold mt-1 shrink-0" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#contact" 
                className={`block text-center py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                  plan.highlighted 
                    ? 'btn-gold w-full' 
                    : 'border border-white/30 hover:bg-white hover:text-charcoal-dark'
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}