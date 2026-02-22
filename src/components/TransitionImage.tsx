import { useRef, useEffect } from "react"
import clsx from "clsx"
import { gsap } from "gsap"
import { ANIMATION_CONFIG } from "../../constants"

export interface TransitionImageProps {
  image: string | null
  imageAlt?: string
  className?: string
  duration?: number
}
const EASE = "power1.inOut"

const TransitionImage = ({
  image,
  imageAlt = "Image",
  className = "",
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

    gsap.fromTo(imgEl, { opacity: 0, x: 10 }, {
      x: 0,
      opacity: 1,
      duration: ANIMATION_CONFIG.fast,
      ease: EASE,
    })
  }, [image])

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative w-full h-full min-h-[200px] sm:min-h-[280px] md:min-h-[320px] overflow-hidden",
        className
      )}
      style={{ aspectRatio: "16/10" }}
    >
      {image ? (
        <img
          ref={imgRef}
          src={image}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover border-4 border-gray-700/50"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gray-700/50 flex items-center justify-center">
          <p className="text-white text-7xl font-bold -rotate-15 -skew-x-15">
            IMAGE NOT FOUND
          </p>
        </div>
      )}
    </div>
  )
}

export default TransitionImage
