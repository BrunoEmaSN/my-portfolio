import { useState, useCallback, useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { playP3RMenuSound } from "../helpers/audioContext"
import { ANIMATION_CONFIG } from "../../constants"

export interface SelectorPersonaItem {
  id: string
  label?: string
  /** URL de imagen para la silueta central, o dejar vacío para silueta por defecto */
  silhouette?: string
}

interface SelectorPersonaProps {
  items: SelectorPersonaItem[]
  defaultIndex?: number
  onChange?: (index: number, item: SelectorPersonaItem) => void
  className?: string
}

/** 0 = izquierda, 1 = centro, 2 = derecha. Por defecto la selección empieza a la izquierda. */
const SELECTED_SLOT_DEFAULT = 0

const PANEL_STYLE = {
  transform: "skewX(-30deg)",
  background:
    "linear-gradient(165deg, #0c1929 0%, #0f2744 25%, #1e3a5f 50%, #2563eb 75%, #38bdf8 90%, rgba(255,255,255,0.4) 100%)",
  boxShadow: "inset 0 0 40px rgba(56, 189, 248, 0.2), 0 0 20px rgba(0,0,0,0.3)",
} as const

const SCALE_UNSELECTED = 0.8
const SCALE_SELECTED = 1

function getItemAtIndex(items: SelectorPersonaItem[], index: number): SelectorPersonaItem {
  const n = items.length
  if (n === 0) return { id: "none", label: "" }
  const i = ((index % n) + n) % n
  return items[i]
}

const SelectorPersona = ({
  items,
  defaultIndex = 0,
  onChange,
  className = "",
}: SelectorPersonaProps) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  const [selectedSlot, setSelectedSlot] = useState(SELECTED_SLOT_DEFAULT)
  const cardsWrapRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const borderRefs = useRef<(HTMLDivElement | null)[]>([])
  const isAnimatingRef = useRef(false)

  const applySelectionState = useCallback((slot: number, selected: boolean) => {
    const card = cardRefs.current[slot]
    const border = borderRefs.current[slot]
    if (!card || !border) return
    const scale = selected ? SCALE_SELECTED : SCALE_UNSELECTED
    gsap.set(card, { scale })
    gsap.set(border, { opacity: selected ? 1 : 0 })
  }, [])

  useGSAP(
    () => {
      cardRefs.current.forEach((_, slot) => {
        applySelectionState(slot, slot === selectedSlot)
      })
    },
    { scope: cardsWrapRef, dependencies: [selectedSlot, applySelectionState] }
  )

  const goTo = useCallback(
    (direction: 1 | -1) => {
      if (items.length === 0 || isAnimatingRef.current) return
      isAnimatingRef.current = true
      playP3RMenuSound()

      const fromSlot = selectedSlot
      const nextSlot = (fromSlot + direction + 3) % 3
      const nextIndex = (currentIndex + direction + items.length) % items.length

      const fromCard = cardRefs.current[fromSlot]
      const fromBorder = borderRefs.current[fromSlot]
      const toCard = cardRefs.current[nextSlot]
      const toBorder = borderRefs.current[nextSlot]

      if (!fromCard || !fromBorder || !toCard || !toBorder) {
        setSelectedSlot(nextSlot)
        setCurrentIndex(nextIndex)
        onChange?.(nextIndex, getItemAtIndex(items, nextIndex))
        isAnimatingRef.current = false
        return
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setSelectedSlot(nextSlot)
          setCurrentIndex(nextIndex)
          onChange?.(nextIndex, getItemAtIndex(items, nextIndex))
          isAnimatingRef.current = false
        },
      })

      tl.to(fromCard, {
        scale: SCALE_UNSELECTED,
        duration: ANIMATION_CONFIG.fast,
        ease: ANIMATION_CONFIG.ease,
      })
        .to(
          fromBorder,
          { opacity: 0, duration: ANIMATION_CONFIG.fast, ease: ANIMATION_CONFIG.ease },
          "<"
        )
        .to(
          toCard,
          { scale: SCALE_SELECTED, duration: ANIMATION_CONFIG.fast, ease: ANIMATION_CONFIG.ease },
          "<"
        )
        .to(
          toBorder,
          { opacity: 1, duration: ANIMATION_CONFIG.fast, ease: ANIMATION_CONFIG.ease },
          "<"
        )
    },
    [items, currentIndex, selectedSlot, onChange]
  )

  useEffect(() => {
    if (items.length === 0) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goTo(-1)
      }
      if (e.key === "ArrowRight") {
        e.preventDefault()
        goTo(1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [items.length, goTo])

  if (items.length === 0) return null

  const leftItem = getItemAtIndex(items, currentIndex - selectedSlot)
  const centerItem = getItemAtIndex(items, currentIndex - selectedSlot + 1)
  const rightItem = getItemAtIndex(items, currentIndex - selectedSlot + 2)
  const slotItems = [leftItem, centerItem, rightItem]

  return (
    <div
      className={`relative -rotate-5 flex items-center justify-center ${className}`}
      role="listbox"
      aria-label="Selector de elemento"
    >
      <button
        type="button"
        onClick={() => goTo(-1)}
        className="-skew-x-30 relative z-10 flex h-14 w-10 shrink-0 items-center justify-center transition-transform hover:scale-110 md:h-16 md:w-12"
        aria-label="Anterior"
      >
        <svg viewBox="0 0 24 48" className="h-full w-full">
          <path
            d="M18 4 L6 24 L18 44"
            fill="#2563eb"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div ref={cardsWrapRef} className="flex items-center justify-center gap-2 min-h-[140px] mr-20">
        {slotItems.map((item, slot) => {
          const isSelected = slot === selectedSlot
          return (
            <div
              key={`slot-${slot}`}
              className="relative flex flex-col items-center justify-center"
              style={{ transformOrigin: "center bottom" }}
            >
              <div
                ref={(el) => {
                  cardRefs.current[slot] = el
                }}
                className="relative flex flex-col shadow-xl"
                style={{
                  ...PANEL_STYLE,
                  height: 120,
                  width: 72,
                  transformOrigin: "center bottom",
                  scale: isSelected ? SCALE_SELECTED : SCALE_UNSELECTED,
                }}
              >
                <div
                  ref={(el) => {
                    borderRefs.current[slot] = el
                  }}
                  className="absolute inset-0 border-white rounded-sm pointer-events-none"
                  style={{
                    opacity: isSelected ? 1 : 0,
                    boxSizing: "content-box",
                  }}
                />
                {isSelected && (
                  <div
                    className="z-50 absolute top-0 left-0 -translate-x-4 -translate-y-5 border-2 border-white h-40 w-26"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => goTo(1)}
        className="-skew-x-30 relative z-10 flex h-14 w-10 shrink-0 items-center justify-center transition-transform hover:scale-110 md:h-16 md:w-12"
        aria-label="Siguiente"
      >
        <svg viewBox="0 0 24 48" className="h-full w-full">
          <path
            d="M6 4 L18 24 L6 44"
            fill="#2563eb"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default SelectorPersona
