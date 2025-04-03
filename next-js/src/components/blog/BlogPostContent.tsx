"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';
import { PortableText } from '@portabletext/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';
import { FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaXTwitter } from "react-icons/fa6";

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch with syntax highlighting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Regex to detect markdown-style images: ![alt text](url)
  const processMarkdownImages = (text: string) => {
    if (!text) return text;
    
    const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
    const parts: (string | { type: string; alt: string; src: string })[] = [];
    let lastIndex = 0;
    let match;
    
    while ((match = imgRegex.exec(text)) !== null) {
      // Add text before the image
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const [fullMatch, alt, src] = match;
      // Push the image as a special object that we'll render separately
      parts.push({ type: 'markdown-image', alt, src });
      
      lastIndex = match.index + fullMatch.length;
    }
    
    // Add any remaining text after the last image
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts;
  };

  // Define components for PortableText
  const components = {
    types: {
      code: ({ value }: any) => {
        return (
          <div className="overflow-hidden rounded-xl my-6">
            <SyntaxHighlighter
              style={vscDarkPlus as any}
              language={value.language || 'text'}
              PreTag="div"
              customStyle={{ borderRadius: '1rem', margin: 0 }}
            >
              {value.code}
            </SyntaxHighlighter>
          </div>
        );
      },
      image: ({ value }: any) => {
        return (
          <div className="my-8">
            <img 
              src={value.url} 
              alt={value.alt || ''} 
              className="rounded-lg w-full" 
              loading="lazy"
            />
            {value.caption && (
              <p className="text-center text-neutral-400 mt-2 text-sm">{value.caption}</p>
            )}
          </div>
        );
      },
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-3xl font-bold mt-12 mb-6 text-primary">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-bold mt-8 mb-4 text-primary">{children}</h3>
      ),
      normal: ({ children }: any) => {
        // Special case: check if children contains any string that might have markdown images
        if (Array.isArray(children)) {
          const processedChildren = children.map((child, index) => {
            if (typeof child === 'string' && child.includes('![')) {
              const parts = processMarkdownImages(child);
              if (Array.isArray(parts)) {
                return parts.map((part: string | { type: string; alt: string; src: string }, i: number) => {
                  if (typeof part === 'string') {
                    return <span key={`${index}-${i}`}>{part}</span>;
                  } else {
                    // Render markdown image with standard HTML img tag
                    return (
                      <span key={`${index}-${i}`} className="inline-block my-8 w-full">
                        <img 
                          src={part.src} 
                          alt={part.alt || ''} 
                          className="rounded-xl w-full" 
                          loading="lazy"
                        />
                      </span>
                    );
                  }
                });
              }
            }
            return child;
          });
          
          return <p className="text-primary leading-relaxed mb-6">{processedChildren}</p>;
        }
        
        return <p className="text-primary leading-relaxed mb-6">{children}</p>;
      },
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-primary/30 pl-4 italic text-primary my-6">{children}</blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a href={value.href} className="text-primary hover:text-primary/80 underline transition-colors duration-300" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => <code className="bg-neutral-300 rounded px-1 py-0.5 font-calling-code">{children}</code>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 text-primary">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 text-primary">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="mb-2 text-primary">{children}</li>,
      number: ({ children }: any) => <li className="mb-2 text-primary">{children}</li>,
    },
  };

  if (!mounted) {
    return (
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-neutral-800/50 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-4 md:pt-8 pb-16 font-cardo text-[1.2rem] leading-[1.8] tracking-[0.01rem]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="">
            <PortableText
              value={post.content}
              components={components}
            />
          </div>
          
          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-neutral-800/50">
            <h3 className="text-md font-medium mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Link 
                  key={index} 
                  href={`/?tag=${encodeURIComponent(tag)}`}
                  className="font-calling-code text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-orange hover:text-secondary transition-colors duration-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Share */}
          <div className="mt-12">
            <h3 className="text-md font-medium mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-accent hover:text-secondary transition-colors duration-300"
                aria-label="Share on Twitter"
              >
                <FaXTwitter />
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&hashtag=%23thelaundrymonster`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-accent hover:text-secondary transition-colors duration-300"
                aria-label="Share on Facebook"
              >
                <FiFacebook />
              </a>
              <a 
                href={`https://instagram.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-accent hover:text-secondary transition-colors duration-300"
                aria-label="Share on Instagram"
              >
                <FiInstagram />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPostContent; 