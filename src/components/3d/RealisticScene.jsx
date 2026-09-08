import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  createWoodTexture,
  createWoodNormalMap,
  createConcreteTexture,
  createNightSkyTexture,
} from '../../utils/textures'

function useWoodMaterial(repeatX = 6, repeatY = 6) {
  return useMemo(() => {
    const map = createWoodTexture(repeatX, repeatY)
    const normalMap = createWoodNormalMap(repeatX, repeatY)
    return new THREE.MeshStandardMaterial({
      map,
      normalMap,
      normalScale: new THREE.Vector2(0.4, 0.4),
      roughness: 0.75,
      metalness: 0.05,
      color: '#8b6914',
    })
  }, [repeatX, repeatY])
}

export function NightSky({ scrollProgress = 0 }) {
  const texture = useMemo(() => createNightSkyTexture(), [])
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = scrollProgress * 2
    }
  })

  return (
    <mesh ref={ref} position={[0, 5, -45]} scale={[120, 60, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

export function RealisticMountains({ scrollProgress = 0 }) {
  const group = useRef()

  const layers = useMemo(() => [
    {
      z: -35,
      peaks: [
        { x: -25, h: 12, w: 18, color: '#0f0a12' },
        { x: -8, h: 18, w: 22, color: '#120d15' },
        { x: 12, h: 22, w: 28, color: '#0d0810' },
        { x: 30, h: 15, w: 20, color: '#100c14' },
      ],
      opacity: 0.95,
    },
    {
      z: -28,
      peaks: [
        { x: -20, h: 10, w: 16, color: '#1a1220' },
        { x: 0, h: 16, w: 24, color: '#1e1525' },
        { x: 22, h: 12, w: 18, color: '#181020' },
      ],
      opacity: 0.9,
    },
    {
      z: -20,
      peaks: [
        { x: -15, h: 8, w: 14, color: '#2a1a22' },
        { x: 5, h: 14, w: 20, color: '#2d1c24' },
        { x: 25, h: 10, w: 16, color: '#281820' },
      ],
      opacity: 0.85,
    },
    {
      z: -14,
      peaks: [
        { x: -10, h: 6, w: 12, color: '#3d2520' },
        { x: 8, h: 10, w: 16, color: '#422820' },
        { x: 28, h: 7, w: 13, color: '#382218' },
      ],
      opacity: 0.8,
    },
  ], [])

  useFrame(() => {
    if (group.current) {
      group.current.position.y = -1 + scrollProgress * 0.8
      group.current.children.forEach((layer, i) => {
        layer.position.x = scrollProgress * (i + 1) * 0.3
      })
    }
  })

  return (
    <group ref={group}>
      {layers.map((layer, li) => (
        <group key={li} position={[0, -2, layer.z]}>
          {layer.peaks.map((peak, pi) => (
            <group key={pi} position={[peak.x, 0, 0]}>
              <mesh position={[0, peak.h / 2 - 2, 0]}>
                <coneGeometry args={[peak.w / 2, peak.h, 32, 1, false]} />
                <meshStandardMaterial
                  color={peak.color}
                  roughness={0.95}
                  metalness={0}
                  flatShading={false}
                />
              </mesh>
              {peak.h > 12 && (
                <mesh position={[0, peak.h - 2.5, 0]}>
                  <coneGeometry args={[peak.w / 4, peak.h * 0.15, 16]} />
                  <meshStandardMaterial color="#e8e4dc" roughness={0.9} metalness={0.1} />
                </mesh>
              )}
            </group>
          ))}
        </group>
      ))}
      <mesh position={[0, -3.5, -15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 40]} />
        <meshStandardMaterial color="#0a0806" roughness={1} />
      </mesh>
    </group>
  )
}

export function CitySkyline({ scrollProgress = 0 }) {
  const group = useRef()
  const buildings = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      x: (i - 20) * 2.2 + (Math.random() - 0.5) * 1.5,
      w: 1.2 + Math.random() * 2,
      h: 2 + Math.random() * 8,
      windows: Math.floor(2 + Math.random() * 6),
      lit: Math.random() > 0.4,
    })), [])

  useFrame(() => {
    if (group.current) {
      group.current.position.y = scrollProgress * 0.5
    }
  })

  return (
    <group ref={group} position={[0, -1, -22]}>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2 - 2, 0]}>
          <mesh>
            <boxGeometry args={[b.w, b.h, 1.5]} />
            <meshStandardMaterial color="#0a0a0f" roughness={0.9} metalness={0.1} />
          </mesh>
          {b.lit && Array.from({ length: b.windows }).map((_, wi) => (
            <mesh key={wi} position={[(wi % 2 - 0.5) * b.w * 0.4, (Math.floor(wi / 2) - b.windows / 4) * 0.8, 0.76]}>
              <planeGeometry args={[0.25, 0.35]} />
              <meshStandardMaterial
                color="#ffb84d"
                emissive="#ffb84d"
                emissiveIntensity={0.8 + Math.random() * 0.5}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

export function RooftopDeck() {
  const woodMat = useWoodMaterial(8, 8)
  const concreteMat = useMemo(() => {
    const map = createConcreteTexture()
    return new THREE.MeshStandardMaterial({ map, roughness: 0.9, metalness: 0.05, color: '#333' })
  }, [])

  return (
    <group position={[0, -2.2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={woodMat}>
        <planeGeometry args={[30, 20]} />
      </mesh>

      {/* Perimeter railing */}
      {[
        { pos: [0, 0.6, -10], rot: [0, 0, 0], size: [30, 0.08, 0.08] },
        { pos: [-15, 0.6, 0], rot: [0, Math.PI / 2, 0], size: [20, 0.08, 0.08] },
        { pos: [15, 0.6, 0], rot: [0, Math.PI / 2, 0], size: [20, 0.08, 0.08] },
      ].map((rail, i) => (
        <group key={i} position={rail.pos} rotation={rail.rot}>
          <mesh castShadow>
            <boxGeometry args={rail.size} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.7} />
          </mesh>
          {Array.from({ length: 12 }).map((_, j) => (
            <mesh key={j} position={[(j - 5.5) * (rail.size[0] / 12), -0.5, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.7} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Tables */}
      {[
        { x: -6, z: -3 },
        { x: 4, z: -5 },
        { x: -2, z: 2 },
        { x: 8, z: 0 },
      ].map((t, i) => (
        <CafeTable key={i} position={[t.x, 0, t.z]} woodMat={woodMat} />
      ))}

      {/* Planters */}
      {[
        { x: -12, z: -6 },
        { x: 12, z: -6 },
        { x: -12, z: 6 },
      ].map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          <mesh position={[0, 0.3, 0]} castShadow material={concreteMat}>
            <cylinderGeometry args={[0.5, 0.4, 0.6, 12]} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshStandardMaterial color="#1a3d1a" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function CafeTable({ position, woodMat }) {
  const tableMat = useMemo(() => woodMat.clone(), [woodMat])
  const seatMat = useMemo(() => {
    const m = woodMat.clone()
    m.color.set('#5c3d1e')
    return m
  }, [woodMat])

  return (
    <group position={position}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow material={seatMat}>
        <cylinderGeometry args={[0.7, 0.7, 0.06, 24]} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.7, 12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.6} />
      </mesh>
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        return (
          <group key={i} position={[Math.cos(angle) * 0.55, 0, Math.sin(angle) * 0.55]} rotation={[0, -angle, 0]}>
            <mesh position={[0, 0.25, 0]} castShadow material={tableMat}>
              <boxGeometry args={[0.35, 0.04, 0.35]} />
            </mesh>
            {[[-0.12, 0.12], [0.12, 0.12], [-0.12, -0.12], [0.12, -0.12]].map(([lx, lz], li) => (
              <mesh key={li} position={[lx, 0.1, lz]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.2, 6]} />
                <meshStandardMaterial color="#3d2817" roughness={0.8} />
              </mesh>
            ))}
          </group>
        )
      })}
    </group>
  )
}

export function StringLights({ scrollProgress = 0 }) {
  const group = useRef()
  const strands = useMemo(() => [
    { start: [-14, 3.5, -8], end: [14, 3.2, -8], bulbs: 18 },
    { start: [-14, 3.8, -2], end: [14, 3.5, -2], bulbs: 20 },
    { start: [-14, 3.2, 4], end: [14, 3.6, 4], bulbs: 16 },
    { start: [-12, 3.5, -8], end: [-12, 3.5, 4], bulbs: 10 },
    { start: [12, 3.5, -8], end: [12, 3.5, 4], bulbs: 10 },
  ], [])

  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        if (child.userData.isBulb && child.material) {
          const flicker = 0.7 + Math.sin(state.clock.elapsedTime * 3 + i * 0.7) * 0.15
          child.material.emissiveIntensity = flicker * 2.5
        }
      })
    }
  })

  return (
    <group ref={group} position={[0, -2.2 + scrollProgress * 0.3, 0]}>
      {strands.map((strand, si) => {
        const bulbs = []
        for (let i = 0; i <= strand.bulbs; i++) {
          const t = i / strand.bulbs
          const sag = Math.sin(t * Math.PI) * 0.4
          const x = THREE.MathUtils.lerp(strand.start[0], strand.end[0], t)
          const y = THREE.MathUtils.lerp(strand.start[1], strand.end[1], t) - sag
          const z = THREE.MathUtils.lerp(strand.start[2], strand.end[2], t)
          const warm = Math.random() > 0.15
          bulbs.push(
            <mesh key={`${si}-${i}`} position={[x, y, z]} userData={{ isBulb: true }}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial
                color={warm ? '#ffb84d' : '#fff5e0'}
                emissive={warm ? '#ff9500' : '#ffcc66'}
                emissiveIntensity={2}
                roughness={0.2}
                metalness={0}
              />
            </mesh>
          )
        }
        const points = []
        for (let i = 0; i <= 30; i++) {
          const t = i / 30
          const sag = Math.sin(t * Math.PI) * 0.4
          points.push(new THREE.Vector3(
            THREE.MathUtils.lerp(strand.start[0], strand.end[0], t),
            THREE.MathUtils.lerp(strand.start[1], strand.end[1], t) - sag,
            THREE.MathUtils.lerp(strand.start[2], strand.end[2], t)
          ))
        }
        const curve = new THREE.CatmullRomCurve3(points)
        return (
          <group key={si}>
            <mesh>
              <tubeGeometry args={[curve, 30, 0.008, 4, false]} />
              <meshStandardMaterial color="#111" roughness={0.8} />
            </mesh>
            {bulbs}
            <pointLight
              position={[
                (strand.start[0] + strand.end[0]) / 2,
                (strand.start[1] + strand.end[1]) / 2 - 0.2,
                (strand.start[2] + strand.end[2]) / 2,
              ]}
              color="#ffb84d"
              intensity={0.4}
              distance={8}
              decay={2}
            />
          </group>
        )
      })}
    </group>
  )
}

export function Moon() {
  return (
    <group position={[18, 12, -30]}>
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#f0ece4"
          emissive="#fff8e7"
          emissiveIntensity={0.3}
          roughness={0.9}
        />
      </mesh>
      <pointLight color="#b8cce8" intensity={0.6} distance={60} decay={1.5} />
    </group>
  )
}

export function AtmosphericFog() {
  return (
    <>
      <fog attach="fog" args={['#0a0a12', 12, 45]} />
      <mesh position={[0, 0, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 30]} />
        <meshBasicMaterial color="#1a1520" transparent opacity={0.15} />
      </mesh>
    </>
  )
}

export function AmbientParticles({ count = 40 }) {
  const ref = useRef()
  const particles = useMemo(() =>
    Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 6 + 1,
      z: (Math.random() - 0.5) * 15 - 3,
      speed: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    })), [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const p = particles[i]
        child.position.y = p.y + Math.sin(state.clock.elapsedTime * p.speed + p.offset) * 0.3
        child.position.x = p.x + Math.sin(state.clock.elapsedTime * 0.1 + p.offset) * 0.2
      })
    }
  })

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.015, 4, 4]} />
          <meshBasicMaterial color="#ffb84d" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value))
}

function BurgerAssembly({ opacity, separation }) {
  const pieces = [
    { y: 1.18, spread: 1.3, color: '#bc712c', geometry: <sphereGeometry args={[0.95, 32, 16]} />, scale: [1, 0.35, 1] },
    { y: 0.82, spread: 0.85, color: '#f0c340', geometry: <boxGeometry args={[1.72, 0.08, 1.45]} />, scale: [1, 1, 1] },
    { y: 0.56, spread: 0.55, color: '#4f2116', geometry: <boxGeometry args={[1.65, 0.3, 1.42]} />, scale: [1, 1, 1] },
    { y: 0.32, spread: 0.35, color: '#5a9b3d', geometry: <torusGeometry args={[0.68, 0.1, 12, 32]} />, scale: [1.15, 1, 0.95] },
    { y: 0.08, spread: 0.18, color: '#e3a52e', geometry: <boxGeometry args={[1.76, 0.1, 1.46]} />, scale: [1, 1, 1] },
    { y: -0.18, spread: 0, color: '#bc712c', geometry: <sphereGeometry args={[0.94, 32, 16]} />, scale: [1, 0.3, 1] },
  ]

  return (
    <group position={[2.9, 0.85, -1.1]}>
      {pieces.map((piece, index) => (
        <mesh
          key={index}
          position={[0, piece.y + piece.spread * separation, 0]}
          scale={piece.scale}
          castShadow
        >
          {piece.geometry}
          <meshStandardMaterial
            color={piece.color}
            roughness={0.42}
            metalness={0.02}
            transparent
            opacity={opacity}
          />
        </mesh>
      ))}
    </group>
  )
}

function FriesAssembly({ opacity }) {
  const fries = [
    [-0.48, 0.2, 0.12, -0.08],
    [-0.32, 0.28, -0.08, 0.04],
    [-0.15, 0.36, 0.08, -0.04],
    [0.02, 0.42, -0.03, 0.06],
    [0.2, 0.34, 0.08, -0.04],
    [0.38, 0.25, -0.06, 0.04],
  ]

  return (
    <group position={[2.9, 0.65, -1.1]}>
      <mesh position={[0, -0.52, 0]} castShadow>
        <boxGeometry args={[1.55, 0.9, 1.25]} />
        <meshStandardMaterial color="#d8321c" roughness={0.38} transparent opacity={opacity} />
      </mesh>
      {fries.map(([x, height, z, tilt], index) => (
        <mesh key={index} position={[x, height - 0.05, z]} rotation={[tilt, tilt * 0.6, tilt]} castShadow>
          <boxGeometry args={[0.16, 1.25 + height, 0.16]} />
          <meshStandardMaterial color="#f5c44c" roughness={0.35} transparent opacity={opacity} />
        </mesh>
      ))}
    </group>
  )
}

function CheesecakeAssembly({ opacity }) {
  return (
    <group position={[2.9, 0.7, -1.1]} rotation={[0, -0.12, 0]}>
      <mesh position={[0, -0.42, 0]} castShadow>
        <cylinderGeometry args={[1.02, 1.02, 0.12, 32]} />
        <meshStandardMaterial color="#252027" roughness={0.3} metalness={0.3} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[1.75, 0.92, 1.25]} />
        <meshStandardMaterial color="#f4d7a7" roughness={0.62} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, 0.53, 0]} castShadow>
        <boxGeometry args={[1.82, 0.12, 1.3]} />
        <meshStandardMaterial color="#c98d4c" roughness={0.7} transparent opacity={opacity} />
      </mesh>
      {[-0.45, 0, 0.45].map((x, index) => (
        <mesh key={index} position={[x, 0.68 + (index % 2) * 0.05, 0.05]} castShadow>
          <sphereGeometry args={[0.16, 16, 12]} />
          <meshStandardMaterial color="#d84c4c" roughness={0.4} transparent opacity={opacity} />
        </mesh>
      ))}
    </group>
  )
}

export function FoodTransformation({ scrollProgress = 0 }) {
  const group = useRef()
  const burgerOpacity = 1 - clamp01((scrollProgress - 0.08) / 0.14)
  const friesOpacity = clamp01((scrollProgress - 0.1) / 0.12) * (1 - clamp01((scrollProgress - 0.32) / 0.12))
  const cheesecakeOpacity = clamp01((scrollProgress - 0.28) / 0.12)
  const separation = clamp01((scrollProgress - 0.02) / 0.16)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.08
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08
    }
  })

  return (
    <group ref={group}>
      <BurgerAssembly opacity={burgerOpacity} separation={separation} />
      <FriesAssembly opacity={friesOpacity} />
      <CheesecakeAssembly opacity={cheesecakeOpacity} />
    </group>
  )
}
