import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SectionTitle from "../components/SectionTitle"
import ExperienceTimeline from "../components/ExperienceTimeline"
import Card from "../components/Card"
import { ANIMATION_CONFIG, experiencesData, projectsData } from "../../constants"
import { useScreenScroll } from "../hooks/useScreenScroll"

const size = {
  sm: 100,
  md: 120,
  lg: 150,
  xl: 200,
}

const ExperiencesScreen = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleFeatured = useRef<HTMLHeadingElement>(null)
  const titleJourney = useRef<HTMLHeadingElement>(null)
  const cardsGridRef = useRef<HTMLDivElement>(null)

  useScreenScroll(sectionRef)

  useGSAP(() => {
    if (!sectionRef.current || !titleFeatured.current || !titleJourney.current) return
    const from = { x: "-100%", opacity: 0 }
    const scroller = sectionRef.current

    gsap.fromTo(titleFeatured.current, from, {
      x: 0,
      opacity: 1,
      duration: ANIMATION_CONFIG.fast,
      ease: "power2.out",
      scrollTrigger: {
        trigger: titleFeatured.current,
        scroller,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    })

    gsap.fromTo(titleJourney.current, from, {
      x: 0,
      opacity: 1,
      duration: ANIMATION_CONFIG.fast,
      ease: "power2.out",
      scrollTrigger: {
        trigger: titleJourney.current,
        scroller,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    })

    const gridEl = cardsGridRef.current
    if (gridEl?.children?.length) {
      gsap.fromTo(
        Array.from(gridEl.children),
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION_CONFIG.fast,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridEl,
            scroller,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      )
    }
  }, [])

  return (
    <section ref={sectionRef} id="experiences" className="cmp-experiences">
      <SectionTitle label="WORK EXPERIENCES" textSize={size} className="text-5xl xs:text-9xl" />
      <div className="cmp-experiences__content">
        <div className="cmp-experiences__block">
          <h3 ref={titleFeatured} className="cmp-experiences__subtitle">FEATURED PROJECTS</h3>
          <div className="cmp-experiences__grid-wrap">
            <div ref={cardsGridRef} className="cmp-experiences__grid">
              {projectsData.map((project) => (
                <div key={project.windowTitle} className="cmp-experiences__card-wrap">
                  <Card {...project} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="cmp-experiences__journey">
          <h3 ref={titleJourney} className="cmp-experiences__subtitle">PROFESSIONAL JOURNEY</h3>
          <div className="cmp-experiences__timeline-wrap">
            <ExperienceTimeline experiences={experiencesData} sectionRef={sectionRef} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperiencesScreen
