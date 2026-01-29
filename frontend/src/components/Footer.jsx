import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#46041F] text-[#FFD595] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-2xl jaro font-bold mb-6">Heritage Farm</h3>
            <p className="text-[#FFD595]/80 mb-6 leading-relaxed">
              Heritage Farm is a digital platform connecting travelers with
              authentic Tamil Nadu experiences. Discover heritage sites,
              traditional crafts, and cultural stories through verified local
              creators.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-[#FFD595]/60" />
                <span className="text-sm text-[#FFD595]/80">
                  Tamil Nadu, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-[#FFD595]/60" />
                <span className="text-sm text-[#FFD595]/80">
                  +91 XXX XXX XXXX
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-[#FFD595]/60" />
                <span className="text-sm text-[#FFD595]/80">
                  hello@heritagefarm.com
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Links</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/ar-explorer"
                  className="text-[#FFD595]/80 hover:text-[#FFD595] transition-colors"
                >
                  AR Explorer
                </Link>
              </li>
              <li>
                <Link
                  to="/planner"
                  className="text-[#FFD595]/80 hover:text-[#FFD595] transition-colors"
                >
                  AI Planner
                </Link>
              </li>
              <li>
                <Link
                  to="/discover"
                  className="text-[#FFD595]/80 hover:text-[#FFD595] transition-colors"
                >
                  Discover
                </Link>
              </li>
              <li>
                <Link
                  to="/signup?role=creator"
                  className="text-[#FFD595]/80 hover:text-[#FFD595] transition-colors"
                >
                  Become Creator
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#FFD595]/80 hover:text-[#FFD595] transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-6">Follow Us</h4>
            <p className="text-[#FFD595]/80 mb-6 text-sm leading-relaxed">
              Stay connected with Heritage Farm for the latest Tamil Nadu
              experiences, cultural stories, and travel inspiration.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#FFD595]/20 rounded-full flex items-center justify-center text-[#FFD595] hover:bg-[#FFD595]/30 transition-colors"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#FFD595]/20 rounded-full flex items-center justify-center text-[#FFD595] hover:bg-[#FFD595]/30 transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#FFD595]/20 rounded-full flex items-center justify-center text-[#FFD595] hover:bg-[#FFD595]/30 transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#FFD595]/20 rounded-full flex items-center justify-center text-[#FFD595] hover:bg-[#FFD595]/30 transition-colors"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Join a Newsletter</h4>
            <p className="text-[#FFD595]/80 mb-6 text-sm">Your Email</p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 bg-[#FFD595]/20 border border-[#FFD595]/30 rounded-lg text-[#FFD595] placeholder:text-[#FFD595]/60 focus:outline-none focus:border-[#FFD595] transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#FFD595] text-[#46041F] rounded-lg font-bold hover:bg-[#FFD595]/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-[#FFD595]/20 text-center">
          <p className="text-[#FFD595]/80 text-sm">
            Copyright © {new Date().getFullYear()} Heritage Farm. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
