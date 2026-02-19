import { useMemo, useRef, useEffect, useLayoutEffect } from "react"
import clsx from "clsx"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ANIMATION_CONFIG } from "../../constants"
export interface ImageGalleryProps {
  /** Array de 1 a 5 URLs de imágenes */
  images: string[]
  /** Índice de la imagen que se muestra en color (el resto en escala de grises) */
  imageCurrent?: number
  /** Texto alternativo base para las imágenes */
  imageAlt?: string
  /** Clase CSS adicional para el contenedor */
  className?: string
}

const EASE = "power1.inOut"

const STAGGER_DURATION = 0.4
const STAGGER_DELAY = 0.12

const ImageGallery = ({
  images,
  imageCurrent = 0,
  imageAlt = "Gallery image",
  className = "",
}: ImageGalleryProps) => {
  const count = Math.min(5, Math.max(1, images.length))
  const currentIndex = Math.max(0, Math.min(imageCurrent, count - 1))
  const imgRefs = useRef<Record<number, HTMLImageElement | null>>({})
  const boxRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const gridRef = useRef<HTMLDivElement>(null)
  const prevIndexRef = useRef(currentIndex)
  const prevRectsRef = useRef<Record<number, DOMRect>>({})

  // Transición GSAP al cambiar la imagen actual (grayscale)
  useEffect(() => {
    const prev = prevIndexRef.current
    prevIndexRef.current = currentIndex
    if (prev === currentIndex) return

    const fromEl = imgRefs.current[prev]
    const toEl = imgRefs.current[currentIndex]
    if (fromEl) {
      gsap.to(fromEl, { filter: "grayscale(100%)", duration: ANIMATION_CONFIG.duration, ease: EASE })
    }
    if (toEl) {
      gsap.fromTo(toEl, { filter: "grayscale(100%)" }, { filter: "grayscale(0%)", duration: ANIMATION_CONFIG.duration, ease: EASE })
    }
  }, [currentIndex])

  // Estado inicial de filtros (para que GSAP no choque con el primer render)
  useEffect(() => {
    Object.entries(imgRefs.current).forEach(([i, el]) => {
      if (!el) return
      const idx = Number(i)
      gsap.set(el, { filter: idx === currentIndex ? "grayscale(0%)" : "grayscale(100%)" })
    })
  }, [])

  // Entrada con stagger
  useGSAP(() => {
    if (!gridRef.current) return
    const boxes = Array.from(gridRef.current.children) as HTMLDivElement[]
    if (boxes.length === 0) return
    gsap.set(boxes, { opacity: 0, y: 24 })
    gsap.to(boxes, {
      opacity: 1,
      y: 0,
      duration: STAGGER_DURATION,
      stagger: STAGGER_DELAY,
      ease: EASE,
    })
  }, { scope: gridRef, dependencies: [] })

  // FLIP: transición de cambio de lugares al reordenar (count 4 o 5)
  useLayoutEffect(() => {
    const boxRefsMap = boxRefs.current
    const newRects: Record<number, DOMRect> = {}
    const toAnimate: { el: HTMLDivElement; index: number; prevRect: DOMRect; newRect: DOMRect }[] = []

    for (const key of Object.keys(boxRefsMap)) {
      const index = Number(key)
      const el = boxRefsMap[index]
      if (!el) continue
      const newRect = el.getBoundingClientRect()
      newRects[index] = newRect
      const prevRect = prevRectsRef.current[index]
      if (prevRect && (count === 4 || count === 5)) {
        toAnimate.push({ el, index, prevRect, newRect })
      }
    }

    if (toAnimate.length > 0) {
      toAnimate.forEach(({ el, prevRect, newRect }) => {
        const dx = prevRect.left - newRect.left
        const dy = prevRect.top - newRect.top
        const scaleX = prevRect.width / newRect.width
        const scaleY = prevRect.height / newRect.height
        gsap.set(el, { x: dx, y: dy, scaleX, scaleY, transformOrigin: "50% 50%" })
        gsap.to(el, {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: ANIMATION_CONFIG.fast,
          ease: EASE,
          overwrite: true,
          onComplete: () => {
          gsap.set(el, { clearProps: "transform" })
        },
        })
      })
    }

    prevRectsRef.current = newRects
  }, [currentIndex, count])

  const gridClass = useMemo(() => {
    switch (count) {
      case 1:
        return "grid-cols-1 grid-rows-1"
      case 2:
        return "grid-cols-3 grid-rows-1"
      case 3:
        return "grid-cols-2 grid-rows-2 sm:grid-cols-3 sm:grid-rows-1"
      case 4:
      case 5:
        return "grid-cols-4 grid-rows-2"
      default:
        return "grid-cols-1 grid-rows-1"
    }
  }, [count])

  const getItemClass = (index: number, isFirstInFlow: boolean) => {
    const isCurrent = index === currentIndex
    if (count === 2) {
      return isCurrent ? "col-span-2" : "col-span-1"
    }
    if (count === 3) {
      return isCurrent ? "row-span-2 sm:row-span-1 sm:col-span-2" : ""
    }
    if (count === 4 || count === 5) {
      return isFirstInFlow ? "col-span-2 row-span-2" : ""
    }
    return ""
  }

  const orderedItems = useMemo(() => {
    const list = images.slice(0, count).map((src, index) => ({ src, index }))
    if (count === 4 || count === 5) {
      const current = list[currentIndex]
      const rest = list.filter((_, i) => i !== currentIndex)
      return [current, ...rest]
    }
    return list
  }, [images, count, currentIndex])

  return (
    <div
      ref={gridRef}
      className={clsx("grid gap-1 sm:gap-2 w-full h-full min-h-[200px] sm:min-h-[280px] md:min-h-[320px]", gridClass, className)}
      style={{ aspectRatio: count === 1 ? "16/10" : count <= 2 ? "16/9" : undefined }}
    >
      {orderedItems.map(({ src, index }, position) => (
        <div
          ref={(el) => { boxRefs.current[index] = el }}
          key={index}
          className={clsx("relative w-full h-full min-h-[120px] overflow-hidden border-4 border-gray-700/50", getItemClass(index, position === 0))}
        >
          <img
            ref={(el) => { imgRefs.current[index] = el }}
            src={src}
            alt={`${imageAlt} ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
