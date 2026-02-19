import { useMemo } from "react"

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

const ImageGallery = ({
  images,
  imageCurrent = 0,
  imageAlt = "Gallery image",
  className = "",
}: ImageGalleryProps) => {
  const count = Math.min(5, Math.max(1, images.length))
  const currentIndex = Math.max(0, Math.min(imageCurrent, count - 1))

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
      className={`grid gap-1 sm:gap-2 w-full h-full min-h-[200px] sm:min-h-[280px] md:min-h-[320px] ${gridClass} ${className}`}
      style={{ aspectRatio: count === 1 ? "16/10" : count <= 2 ? "16/9" : undefined }}
    >
      {orderedItems.map(({ src, index }, position) => (
        <div
          key={index}
          className={`relative w-full h-full min-h-[120px] overflow-hidden border-4 border-gray-700/50 ${getItemClass(index, position === 0)}`}
        >
          <img
            src={src}
            alt={`${imageAlt} ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-500 ease-out ${
              index === currentIndex ? "grayscale-0" : "grayscale"
            }`}
            style={{
              filter: index === currentIndex ? "grayscale(0%)" : "grayscale(100%)",
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
