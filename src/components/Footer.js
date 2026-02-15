import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-4xl">🌱</span>
              <span className="text-2xl font-bold text-primary">Plantree</span>
            </div>
            <p className="text-gray-300 mb-4">
              Bring Nature Into Your Home
            </p>
            <p className="text-sm text-gray-400">
              Quality plants delivered to your doorstep with love and care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-primary transition-all">
                Home
              </Link>
              <Link to="/plants" className="block text-gray-300 hover:text-primary transition-all">
                Browse Plants
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-primary transition-all">
                Contact Us
              </Link>
              <Link to="/admin-login" className="block text-gray-300 hover:text-primary transition-all">
                Admin Login
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <a href="mailto:saikumarkaluri0@gmail.com" className="text-gray-300 hover:text-primary transition-all">
                  saikumarkaluri0@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <a href="tel:+917093206757" className="text-gray-300 hover:text-primary transition-all">
                  +91 7093206757
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary" />
                <span className="text-gray-300">Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 mb-2">
            © 2024 Plantree. All rights reserved. 🌱
          </p>
          <p className="text-gray-500 text-sm flex items-center justify-center space-x-1">
            <span>Made with</span>
            <FaHeart className="text-primary animate-pulse" />
            <span>by Kaluri Sai Kumar</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
