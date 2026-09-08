import { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import {
  StringLights,
  FoodTransformation,
} from './3d/RealisticScene'

function CameraRig({ scrollProgress }) {
  useFrame((state) => {
    const cam = state.camera
    const t = scrollProgress
    cam.position.x = Math.sin(t * Math.PI * 0.5) * 1.5
    cam.position.y = 1.8 + t * 2.5
    cam.position.z = 6 - t * 3
    cam.lookAt(0, 0.5 + t * 1.5, -5 - t * 3)
  })
  return null
}

function SceneContent({ scrollProgress }) {
  return (
    <>
      <CameraRig scrollProgress={scrollProgress} />
      <color attach="background" args={['#07090f']} />

      <Environment preset="night" environmentIntensity={0.4} />
      <ambientLight intensity={0.18} color="#fff1dd" />
      <hemisphereLight args={['#17233d', '#07090f', 0.35]} />

      <directionalLight
        position={[4, 8, 5]}
        intensity={0.3}
        color="#fff0d5"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      <StringLights scrollProgress={scrollProgress} />
      <FoodTransformation scrollProgress={scrollProgress} />

      <EffectComposer multisampling={4}>
        <Bloom
          intensity={0.35}
          luminanceThreshold={0.45}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette offset={0.25} darkness={0.5} />
      </EffectComposer>
    </>
  )
}

export default function Scene3D({ scrollProgress }) {
  return (
    <div className="scene-canvas">
      <Canvas
        camera={{ position: [0, 1.8, 6], fov: 55, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMappingExposure: 1.1,
        }}
        shadows
      >
        <Suspense fallback={null}>
          <SceneContent scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
