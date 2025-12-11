'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import SpaceshipScene from '@/components/SpaceshipScene'
import CodeOverlay from '@/components/CodeOverlay'
import LoadingScreen from '@/components/LoadingScreen'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="relative w-screen h-screen bg-cyber-navy overflow-hidden">
      {/* Canvas Three.js */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        performance={{ min: 0.5 }}
      >
        {/* Caméra */}
        <PerspectiveCamera makeDefault position={[5, 3, 8]} fov={60} />

        {/* Lumières */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00FFF0" castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#FF00FF" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#3366FF"
          castShadow
        />

        {/* Étoiles en arrière-plan */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Scene principale */}
        <Suspense fallback={null}>
          <SpaceshipScene />
        </Suspense>

        {/* Post-processing effects */}
        <EffectComposer multisampling={8}>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
          <ChromaticAberration offset={[0.002, 0.002]} blendFunction={BlendFunction.NORMAL} />
        </EffectComposer>
      </Canvas>

      {/* Loading screen */}
      <LoadingScreen />

      {/* Overlays UI */}
      <CodeOverlay />

      {/* Titre en bas */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center px-4 z-10"
      >
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold 
                     text-cyber-cyan tracking-wider
                     drop-shadow-[0_0_20px_rgba(0,255,240,0.8)]
                     drop-shadow-[0_0_40px_rgba(0,255,240,0.5)]"
        >
          THREE.JS SPACESHIP DEMO - RENDERED WITH WEBGL
        </h1>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-24 left-8 text-cyber-cyan/60 text-sm font-mono z-10 hidden md:block"
      >
        <p>Clic + glisser pour orbiter</p>
        <p>Molette pour zoomer</p>
        <p>Hover sur modules pour interactions</p>
      </motion.div>
    </div>
  )
}