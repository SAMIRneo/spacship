'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CyberGrid() {
  const gridRef1 = useRef<THREE.GridHelper>(null!)
  const gridRef2 = useRef<THREE.Mesh>(null!)

  // Animation de défilement infini
  useFrame(() => {
    if (gridRef1.current) {
      gridRef1.current.position.z += 0.05
      if (gridRef1.current.position.z > 10) {
        gridRef1.current.position.z = 0
      }
    }
  })

  return (
    <>
      {/* Grille horizontale (sol) */}
      <gridHelper
        ref={gridRef1}
        args={[100, 50, '#00FFF0', '#00FFF0']}
        position={[0, -5, 0]}
        material-transparent
        material-opacity={0.3}
      />

      {/* Grille verticale (backdrop) */}
      <mesh ref={gridRef2} position={[0, 0, -20]} rotation={[0, 0, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshBasicMaterial color="#00FFF0" wireframe transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Grille latérale gauche */}
      <mesh position={[-20, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[100, 100, 30, 30]} />
        <meshBasicMaterial color="#FF00FF" wireframe transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>

      {/* Grille latérale droite */}
      <mesh position={[20, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[100, 100, 30, 30]} />
        <meshBasicMaterial color="#FF00FF" wireframe transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}