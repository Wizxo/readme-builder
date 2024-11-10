'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, ArrowRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full"
      >
        {/* Hero Section */}
        <motion.div variants={item} className="space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Now in public beta
          </div>
          
          <h1 className="text-7xl font-bold tracking-tight">
            README
            <span className="block mt-2 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Builder
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-xl">
            Create beautiful GitHub README files with our intuitive drag-and-drop builder. 
            No markdown knowledge required.
          </p>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div variants={item} className="flex items-center gap-4">
          <Link
            href="/builder"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Start Building
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <a
            href="https://github.com/yourusername/readme-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-lg font-medium hover:bg-white/10 transition-colors"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={item} 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
        >
          {[
            { title: 'Drag & Drop', description: 'Intuitive interface for building READMEs' },
            { title: 'Live Preview', description: 'See changes in real-time as you build' },
            { title: 'Export Anywhere', description: 'Download or copy to clipboard instantly' }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors"
            >
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
