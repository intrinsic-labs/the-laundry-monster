"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isMobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/misselaineouspope', icon: <FiInstagram size={20} /> },
  ];

  // Apply different background styles based on isDarkTheme
  const headerClass = isDarkTheme
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-ls-background py-4 text-white`
    : `fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background py-4`;

  // Apply different mobile menu styles based on isDarkTheme
  const mobileMenuClass = isDarkTheme
    ? "md:hidden bg-ls-background backdrop-blur-md fixed left-0 right-0 z-50 overflow-y-auto"
    : "md:hidden bg-background backdrop-blur-md fixed left-0 right-0 z-50 overflow-y-auto";

  // Text colors for links based on theme
  const linkClass = isDarkTheme
    ? "text-md hover:text-accent hover:font-medium transition-colors duration-300 tracking-wide text-white"
    : "text-md hover:text-accent hover:font-medium transition-colors duration-300 tracking-wide";

  return (
    <header className={headerClass}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-cardo overflow-hidden relative pl-2"
          >
            <AnimatePresence mode="wait">
              {isScrolled ? (
                <motion.span
                  key="short-logo"
                  initial={{ opacity: 0, position: "absolute" }}
                  animate={{ opacity: 1, position: "relative" }}
                  exit={{ opacity: 0, position: "absolute" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  EP
                </motion.span>
              ) : (
                <motion.span
                  key="full-logo"
                  initial={{ opacity: 0, position: "absolute" }}
                  animate={{ opacity: 1, position: "relative" }}
                  exit={{ opacity: 0, position: "absolute" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  Elaine Pope
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="font-light"
            >
              <Link
                href={link.href}
                className={linkClass}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-secondary-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={mobileMenuClass}
          >
            <div className="container-custom flex-col justify-between h-full">
              <div className="flex flex-col pt-8">
                {navLinks.map((link, index) => (
                  <div key={link.name} className="group">
                    <Link
                      href={link.href}
                      className={isDarkTheme
                        ? "text-3xl font-light hover:text-accent hover:font-medium transition-colors duration-300 py-4 pl-4 block text-white"
                        : "text-3xl font-light hover:text-accent hover:font-medium transition-colors duration-300 py-4 pl-4 block"
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {index !== navLinks.length - 1 && (
                      <div className="border-b border-neutral-800/20 hover:border-primary/30 transition-colors duration-300 mx-4"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <div className="flex justify-center space-x-6 py-8">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isDarkTheme
                        ? "w-10 h-10 rounded-full bg-primary/10 hover:bg-accent hover:text-secondary transition-colors duration-300 flex items-center justify-center text-white"
                        : "w-10 h-10 rounded-full bg-primary/10 hover:bg-accent hover:text-secondary transition-colors duration-300 flex items-center justify-center text-neutral-800"
                      }
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation; 