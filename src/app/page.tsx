'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full"
      >
        <div className="space-y-6 mb-16">
          <h1 className="text-7xl font-bold tracking-tight">
            README
            <span className="block mt-2">Builder</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-xl">
            Create beautiful GitHub README files with our intuitive drag-and-drop builder
          </p>
        </div>
        
        <Link
          href="/builder"
          className="group inline-flex items-center gap-3 text-lg font-medium"
        >
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out group-hover:after:origin-bottom-left group-hover:after:scale-x-100">
            Start Building
          </span>
          <svg 
            className="w-5 h-5 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}
