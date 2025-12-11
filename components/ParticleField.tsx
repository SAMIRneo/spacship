'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)

  // Génération des particules
  const particles = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Positions en spirale + aléatoire
      const t = i / count
      const radius = 10 + Math.random() * 10
      const angle = t * Math.PI * 30 + Math.random() * Math.PI
      const height = (Math.random() - 0.5) * 30

      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 5
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 5

      // Couleurs cyan ou magenta
      const isCyan = Math.random() > 0.5
      colors[i * 3] = isCyan ? 0 : 1 // R
      colors[i * 3 + 1] = isCyan ? 1 : 0 // G
      colors[i * 3 + 2] = 1 // B

      // Tailles variables
      sizes[i] = Math.random() * 0.1 + 0.05
    }

    return { positions, colors, sizes }
  }, [])

  // Animation rotation et pulsation
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005

      // Pulsation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      pointsRef.current.scale.set(scale, scale, scale)

      // Animation des tailles de particules
      const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array
      for (let i = 0; i < sizes.length; i++) {
        sizes[i] = (Math.sin(state.clock.elapsedTime * 2 + i) * 0.02 + 0.05) * scale
      }
      pointsRef.current.geometry.attributes.size.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-size" count={particles.sizes.length} array={particles.sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}