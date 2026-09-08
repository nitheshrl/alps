import * as THREE from 'three'

export function createWoodTexture(repeatX = 4, repeatY = 4) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#3d2817'
  ctx.fillRect(0, 0, 512, 512)

  for (let i = 0; i < 40; i++) {
    const y = (i / 40) * 512
    const hue = 22 + Math.random() * 8
    const light = 18 + Math.random() * 12
    ctx.strokeStyle = `hsl(${hue}, 45%, ${light}%)`
    ctx.lineWidth = 2 + Math.random() * 4
    ctx.beginPath()
    ctx.moveTo(0, y)
    for (let x = 0; x <= 512; x += 20) {
      ctx.lineTo(x, y + Math.sin(x * 0.05 + i) * 3 + Math.random() * 2)
    }
    ctx.stroke()
  }

  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.08})`
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 1 + Math.random() * 3, 1)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(repeatX, repeatY)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function createWoodNormalMap(repeatX = 4, repeatY = 4) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#8080ff'
  ctx.fillRect(0, 0, 256, 256)

  for (let i = 0; i < 30; i++) {
    const y = (i / 30) * 256
    ctx.strokeStyle = `rgba(${100 + Math.random() * 40},${100 + Math.random() * 40},255,0.3)`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, y)
    for (let x = 0; x <= 256; x += 10) {
      ctx.lineTo(x, y + Math.sin(x * 0.08 + i) * 2)
    }
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(repeatX, repeatY)
  return texture
}

export function createConcreteTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#2a2a2a'
  ctx.fillRect(0, 0, 256, 256)

  for (let i = 0; i < 800; i++) {
    const g = 30 + Math.random() * 25
    ctx.fillStyle = `rgb(${g},${g},${g})`
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 1 + Math.random() * 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function createMountainGradientTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  const grad = ctx.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, '#1a1520')
  grad.addColorStop(0.4, '#2d1f28')
  grad.addColorStop(0.7, '#3d2a1a')
  grad.addColorStop(1, '#1a1208')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 256)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function createNightSkyTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  const grad = ctx.createLinearGradient(0, 0, 0, 512)
  grad.addColorStop(0, '#050810')
  grad.addColorStop(0.3, '#0a0f1a')
  grad.addColorStop(0.6, '#121820')
  grad.addColorStop(0.85, '#1a1520')
  grad.addColorStop(1, '#2a1a10')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 512)

  for (let i = 0; i < 300; i++) {
    const x = Math.random() * 1024
    const y = Math.random() * 200
    const r = Math.random() * 1.2
    ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.7})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}
