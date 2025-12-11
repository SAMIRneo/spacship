'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Cylinder, Sphere, Box } from '@react-three/drei'

export default function Spaceship() {
  const groupRef = useRef<THREE.Group>(null!)

  // Animation rotation légère et hover vertical
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Module central principal */}
      <CentralModule position={[0, 0, 0]} />

      {/* Modules latéraux */}
      <SideModule position={[-1.5, 0, 0]} color="#FF00FF" />
      <SideModule position={[1.5, 0, 0]} color="#FF00FF" />

      {/* Panneaux solaires */}
      <SolarPanel position={[-2.5, 0, 0]} rotation={[0, 0, Math.PI / 6]} />
      <SolarPanel position={[2.5, 0, 0]} rotation={[0, 0, -Math.PI / 6]} />

      {/* Antennes paraboliques */}
      <ParabolicAntenna position={[0, 1.2, 0]} />
      <ParabolicAntenna position={[0, -1.2, 0]} scale={0.7} />

      {/* Propulseurs avec trails */}
      <Propulsor position={[-1.5, 0, -1]} />
      <Propulsor position={[1.5, 0, -1]} />
      <Propulsor position={[0, 0, -0.8]} scale={0.8} />
    </group>
  )
}

// Module central avec interaction
function CentralModule({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const intensity = hovered ? 3 : 1.5
      ;(meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = THREE.MathUtils.lerp(
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity,
        intensity,
        0.1
      )
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      scale={hovered ? 1.05 : 1}
    >
      <cylinderGeometry args={[0.6, 0.6, 2, 32]} />
      <meshStandardMaterial
        color={clicked ? '#FFD700' : '#00FFF0'}
        emissive={clicked ? '#FFD700' : '#00FFF0'}
        emissiveIntensity={1.5}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Modules latéraux
function SideModule({ position, color }: { position: [number, number, number]; color: string }) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 2.5 : 1.5}
        wireframe
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

// Panneaux solaires
function SolarPanel({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Panneau principal */}
      <mesh>
        <boxGeometry args={[3, 0.05, 1]} />
        <meshStandardMaterial
          color="#3366FF"
          metalness={0.9}
          roughness={0.1}
          emissive="#3366FF"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Grille wireframe sur le panneau */}
      <mesh>
        <boxGeometry args={[3, 0.06, 1]} />
        <meshBasicMaterial color="#00FFF0" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

// Antenne parabolique
function ParabolicAntenna({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[0.3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial
        color="#00FFF0"
        wireframe
        emissive="#00FFF0"
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Propulseur avec trail animé
function Propulsor({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const trailRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (trailRef.current) {
      const scaleZ = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.5
      trailRef.current.scale.z = scaleZ
      ;(trailRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 + Math.sin(state.clock.elapsedTime * 5) * 0.3
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Buse du propulseur */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.08, 0.3, 16]} />
        <meshStandardMaterial color="#FF00FF" emissive="#FF00FF" emissiveIntensity={2} metalness={0.8} />
      </mesh>

      {/* Trail énergétique */}
      <mesh ref={trailRef} position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.12, 1.5, 8]} />
        <meshBasicMaterial
          color="#FF00FF"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}