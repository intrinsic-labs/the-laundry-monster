'use client';

import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm as useFormspree } from '@formspree/react';
import { useState } from 'react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [formState, submitForm] = useFormspree('xwplrbev');
  const [submitted, setSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit,
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    await submitForm(data);
    reset();
    setSubmitted(true);
  };

  return (
    <motion.main
      className="min-h-screen bg-background text-primary relative py-32" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-12 text-center">Contact Me</h1>
        
        <div className="max-w-lg mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-8 bg-accent/10 rounded-2xl"
            >
              <h3 className="text-2xl font-medium mb-4">Thank you!</h3>
              <p className="mb-6">Your message has been sent. I'll get back to you as soon as possible.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-accent text-white py-2 px-6 rounded-lg hover:bg-accent-600 transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-orange">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-orange">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={6}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="What's on your mind?"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-orange">{errors.message.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || formState.submitting}
                className="w-full py-3 bg-accent text-white rounded-lg hover:bg-white hover:text-accent hover:border-accent border border-accent transition-colors duration-300 disabled:opacity-70"
              >
                {isSubmitting || formState.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.main>
  );
} 