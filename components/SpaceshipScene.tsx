'use client'

import { OrbitControls } from '@react-three/drei'
import Spaceship from './Spaceship'
import CyberGrid from './CyberGrid'
import ParticleField from './ParticleField'

export default function SpaceshipScene() {
  return (
    <>
      {/* Contrôles orbite */}
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Grille cyberpunk */}
      <CyberGrid />

      {/* Champ de particules */}
      <ParticleField />

      {/* Vaisseau principal */}
      <Spaceship />

      {/* Fog atmosphérique */}
      <fog attach="fog" args={['#0A0E27', 10, 50]} />
    </>
  )
}