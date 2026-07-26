import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What are the operating hours of Titan Gym Oran?",
      a: "We are open Monday to Friday from 6:00 AM to 11:00 PM, and weekends from 8:00 AM to 9:00 PM. Elite members enjoy 24/7 access to the facility."
    },
    {
      q: "Do you offer personal training sessions?",
      a: "Yes, we have a team of certified elite trainers. Personal training sessions can be purchased individually or are included in our Premium and Elite membership plans."
    },
    {
      q: "Is there a dress code?",
      a: "While we don't have a strict dress code, we require proper athletic wear and closed-toe gym shoes to ensure safety and hygiene on the gym floor."
    },
    {
      q: "Can I freeze my membership if I travel?",
      a: "Yes, members can freeze their membership for up to 30 days per calendar year due to travel or medical reasons, free of charge."
    }
  ];

  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.3em] mb-4 text-sm">Need Help?</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked <span className="text-gold-gradient">Questions</span></h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-bold text-lg text-white">{faq.q}</span>
                <Plus 
                  className={`text-gold transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                  size={24}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-400">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}