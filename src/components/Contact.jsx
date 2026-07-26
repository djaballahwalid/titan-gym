import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="bg-charcoal py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold uppercase tracking-[0.3em] mb-4 text-sm">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Visit <span className="text-gold-gradient">Titan Gym</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Located in Oran, Algeria. Book a tour or speak with our team today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side: Form & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">First Name</label>
                  <input type="text" className="w-full bg-charcoal-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-charcoal-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input type="email" className="w-full bg-charcoal-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea rows="4" className="w-full bg-charcoal-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors"></textarea>
              </div>
              <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
                Send Message <Send size={16} />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <MapPin className="text-gold" size={20} />
                <span>Boulevard de la Soummam, Oran, Algeria</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <Phone className="text-gold" size={20} />
                <span>+213 555 123 456</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <Mail className="text-gold" size={20} />
                <span>contact@titangym-oran.dz</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Map */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden min-h-[500px] border border-white/10"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6392.37808512456!2d-0.6410629250858865!3d35.69688977259469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7e54ecfae6f52f%3A0x7f4a1d6b5b2b8e2e!2sOran!5e0!3m2!1sfr!2sdz!4v1700000000000!5m2!1sfr!2sdz" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(1)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Titan Gym Location Oran"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}