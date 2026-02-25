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
    <div ref={containerRef} className={clsx("cmp-transition-image", className)} style={{ aspectRatio: "16/10" }}>
      {image ? (
        <img ref={imgRef} src={image} alt={imageAlt} />
      ) : (
        <div className="cmp-transition-image__placeholder">
          <p className="cmp-transition-image__placeholder-text">IMAGE NOT FOUND</p>
        </div>
      )}
    </div>
  )
}

export default TransitionImage
