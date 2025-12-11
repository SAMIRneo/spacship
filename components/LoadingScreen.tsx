'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulation de chargement
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center
                     bg-cyber-navy"
        >
          {/* Logo/Title */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1
              className="text-5xl md:text-7xl font-mono font-bold text-cyber-cyan
                         drop-shadow-[0_0_30px_rgba(0,255,240,0.8)]"
            >
              SPACESHIP
            </h1>
            <p className="text-cyber-cyan/60 text-sm mt-2 tracking-widest">INITIALIZING WEBGL RENDERER</p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-80 max-w-[90vw]">
            <div className="relative h-1 bg-cyber-cyan/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyber-cyan to-cyber-magenta
                           shadow-[0_0_10px_currentColor]"
              />
            </div>

            {/* Progress text */}
            <div className="flex justify-between mt-3 text-xs font-mono text-cyber-cyan/60">
              <span>Loading assets...</span>
              <span>{Math.floor(progress)}%</span>
            </div>
          </div>

          {/* Scan line effect */}
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="w-full h-1 bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent
                         blur-sm"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}