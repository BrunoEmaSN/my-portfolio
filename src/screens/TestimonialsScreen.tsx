import { useState, useRef } from "react"
import SocialLink from "../components/SocialLink"
import { ANIMATION_CONFIG, socialLinksData } from "../../constants"
import SocialDescription from "../components/SocialDescription"
import ListMenu from "../components/ListMenu"
import TransitionImage from "../components/TransitionImage"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useScreenScroll } from "../hooks/useScreenScroll"

const TestimonialsScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useScreenScroll(sectionRef)

  useGSAP(() => {
    if (!sectionRef.current) return
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: ANIMATION_CONFIG.fast, ease: "power2.out" })
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section ref={sectionRef} id="testimonials" className="cmp-testimonials">
      <div className="cmp-testimonials__content">
        <div className="cmp-testimonials__grid">
          <div className="cmp-testimonials__left">
            <h3 className="cmp-testimonials__title">SOCIAL LINKS</h3>
            <div className="cmp-testimonials__desc-wrap">
              <SocialLink {...socialLinksData[selectedIndex]} />
            </div>
          </div>
          <div className="cmp-testimonials__right">
            <TransitionImage image={socialLinksData[selectedIndex].image} imageAlt={socialLinksData[selectedIndex].bannerText} />
          </div>
        </div>
        <div className="cmp-testimonials__bottom">
          <div className="cmp-testimonials__list-wrap">
            <ListMenu items={socialLinksData.map((item) => item.bannerText)} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
          </div>
          <SocialDescription
            name={socialLinksData[selectedIndex ?? 0].bannerText}
            description={socialLinksData[selectedIndex ?? 0].description}
          />
        </div>
      </div>
    </section>
  )
}

export default TestimonialsScreen
