"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#0a0a0c] text-white">
      
      {/* Animated Background Stars */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-6"
      >
        <motion.h1 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500"
        >
          404
        </motion.h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-light text-gray-300">
          Lost in the digital void.
        </h2>
        
        <p className="mt-2 text-gray-500 max-w-md mx-auto">
          The page you’re looking for has been moved or doesn’t exist anymore.
        </p>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10"
        >
          <Link 
            href="/" 
            className="px-8 py-3 text-sm font-medium tracking-wide text-black bg-white rounded-full transition-shadow hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            Return to Reality
          </Link>
        </motion.div>
      </motion.div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full" />
    </div>
  );
}