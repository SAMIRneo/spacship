'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import SpaceshipScene from './SpaceshipScene'
import CodeOverlay from './CodeOverlay'

export default function Scene3D() {
  return (
    <>
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

      {/* Overlays UI */}
      <CodeOverlay />
    </>
  )
}