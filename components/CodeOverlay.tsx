'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const codeSnippets = [
  'const renderer = new WebGLRenderer({ antialias: true });',
  'scene.add(spaceship);',
  'camera.position.set(5, 3, 8);',
  'material.emissiveIntensity = 2.0;',
  'particles.count = 2000;',
  'postprocessing.bloom.intensity = 1.5;',
  '// Rendering at 60fps...',
  'orbitControls.autoRotate = true;',
]

export default function CodeOverlay() {
  const [visibleLines, setVisibleLines] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => (prev < codeSnippets.length ? prev + 1 : prev))
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute top-8 right-8 font-mono text-xs text-cyber-cyan/70
                 bg-black/40 backdrop-blur-md p-4 rounded-lg border border-cyber-cyan/30
                 max-w-md z-20 hidden md:block
                 shadow-[0_0_20px_rgba(0,255,240,0.2)]"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-cyber-cyan/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-cyber-cyan/50 text-[10px]">spaceship.scene.ts</span>
      </div>

      {/* Code lines */}
      <div className="space-y-1">
        {codeSnippets.slice(0, visibleLines).map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + idx * 0.15 }}
            className="flex items-start gap-2"
          >
            <span className="text-cyber-magenta/70 select-none">{String(idx + 1).padStart(2, '0')}</span>
            <span className="text-cyber-cyan/70">
              <span className="text-cyber-magenta">{'>'}</span> {line}
            </span>
          </motion.div>
        ))}

        {/* Cursor clignotant */}
        {visibleLines < codeSnippets.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-cyber-cyan ml-8"
          />
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 pt-3 border-t border-cyber-cyan/20 flex justify-between text-[10px] text-cyber-cyan/40">
        <span>WebGL 2.0</span>
        <span>60 FPS</span>
        <span>~50k tris</span>
      </div>
    </motion.div>
  )
}