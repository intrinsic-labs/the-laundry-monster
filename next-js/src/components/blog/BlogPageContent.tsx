'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { type SanityDocument } from "next-sanity";
import BlogHero from './BlogHero';
import BlogPosts from './BlogPosts';
import FeaturedPost from './FeaturedPost';
import { useTheme } from '../../components/ThemeProvider';
import Image from 'next/image';
import { urlForImage } from '../../sanity/image';

interface BlogPageContentProps {
  posts: SanityDocument[];
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  const { setDarkTheme } = useTheme();

  // Set light theme when component mounts
  useEffect(() => {
    setDarkTheme(false);
    // No need for cleanup as default is already false
  }, [setDarkTheme]);

  return (
    <motion.main
      className="min-h-screen bg-background text-primary relative" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BlogHero />
      <FeaturedPost />
      <BlogPosts />
    </motion.main>
  );
} 