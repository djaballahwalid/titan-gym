import React from 'react';
import { Dumbbell, Camera, Globe, User, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-dark border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Desc */}
          <div>
            <a href="#home" className="flex items-center gap-2 text-2xl font-display font-bold text-white mb-4">
              <Dumbbell className="text-gold" size={28} />
              TITAN<span className="text-gold">GYM</span>
            </a>
            <p className="text-gray-400 text-sm">
              Oran's premier luxury fitness club. Forge your titan physique with elite equipment and world-class trainers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#programs" className="hover:text-gold transition-colors">Programs</a></li>
              <li><a href="#trainers" className="hover:text-gold transition-colors">Trainers</a></li>
              <li><a href="#membership" className="hover:text-gold transition-colors">Membership</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Oran, Algeria</li>
              <li>+213 555 123 456</li>
              <li>contact@titangym-oran.dz</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for fitness tips and exclusive offers.</p>
            <div className="flex">
              <input type="email" placeholder="Email" className="bg-charcoal border border-white/10 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:border-gold w-full" />
              <button className="bg-gold text-charcoal-dark px-4 rounded-r-lg hover:bg-gold-light transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Titan Gym Oran. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-charcoal-dark hover:border-gold transition-all">
              <Camera size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-charcoal-dark hover:border-gold transition-all">
              <Globe size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-charcoal-dark hover:border-gold transition-all">
              <User size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}