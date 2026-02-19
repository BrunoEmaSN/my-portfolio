import { useRef, useEffect } from "react"
import clsx from "clsx"
import { gsap } from "gsap"

export interface TransitionImageProps {
  /** URL de la imagen a mostrar */
  image: string
  /** Texto alternativo */
  imageAlt?: string
  /** Clase CSS adicional para el contenedor */
  className?: string
  /** Duración de la transición en segundos */
  duration?: number
}

const DEFAULT_DURATION = 0.4
const EASE = "power2.inOut"

const TransitionImage = ({
  image,
  imageAlt = "Image",
  className = "",
  duration = DEFAULT_DURATION,
}: TransitionImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const prevImageRef = useRef<string | null>(null)

  useEffect(() => {
    const imgEl = imgRef.current
    const container = containerRef.current
    if (!imgEl || !container) return

    const isFirstRender = prevImageRef.current === null
    prevImageRef.current = image

    if (isFirstRender) {
      gsap.set(imgEl, { opacity: 1 })
      return
    }

    // Transición: fade out y luego actualizar src y fade in
    gsap.to(imgEl, {
      opacity: 0,
      duration: duration / 2,
      ease: EASE,
      onComplete: () => {
        imgEl.src = image
        gsap.fromTo(imgEl, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: duration / 2, ease: EASE })
      },
    })
  }, [image, duration])

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative w-full h-full min-h-[200px] sm:min-h-[280px] md:min-h-[320px] overflow-hidden",
        className
      )}
      style={{ aspectRatio: "16/10" }}
    >
      <img
        ref={imgRef}
        src={image}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover border-4 border-gray-700/50"
      />
    </div>
  )
}

export default TransitionImage
