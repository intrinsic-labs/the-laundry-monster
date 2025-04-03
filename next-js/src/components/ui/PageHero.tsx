"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  description?: string;
  terminalContent?: string;
  children?: React.ReactNode;
  className?: string;
  bottomPadding?: boolean;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  description,
  terminalContent,
  children,
  className = '',
  bottomPadding = true
}) => {
  // Process title to handle newlines - handling both actual newlines and escaped \n characters
  const titleParts = title
    .replace(/\\n/g, '\n') // Replace escaped newlines with actual newlines
    .split('\n')
    .map((part, index, array) => (
      <React.Fragment key={index}>
        {part}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <section className={`relative pt-24 md:pt-28 lg:pt-48 overflow-hidden bg-background ${className} ${bottomPadding ? 'pb-32' : ''}`}>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight mb-8">
            {titleParts}
          </h1>
        </motion.div>
        
        {description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-lg md:text-xl text-neutral-800 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}

        {/* Optional additional content (buttons, etc.) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-8 text-center"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PageHero; 