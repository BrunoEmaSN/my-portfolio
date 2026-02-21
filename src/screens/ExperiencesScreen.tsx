import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SectionTitle from "../components/SectionTitle"
import ExperienceTimeline from "../components/ExperienceTimeline"
import Card from "../components/Card"
import { ANIMATION_CONFIG, experiencesData, projectsData } from "../../constants"

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
    <section ref={sectionRef} id="experiences" className="overflow-y-auto h-full">
      <SectionTitle label="WORK EXPERIENCES" textSize={size} className="text-5xl xs:text-9xl" />
      <div className="relative z-10 flex flex-col gap-12 w-full h-full pt-50 gap-y-60">
        <div className="flex flex-col gap-4">
          <h3
            ref={titleFeatured}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-bold skew-x-[-20deg] border-b-2 border-red-600 pb-2 w-fit pl-20 pr-5 text-black md:text-white lg:text-white"
          >
            FEATURED PROJECTS
          </h3>
          <div className="w-full items-center justify-center flex p-4">
            <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-5/6">
              {projectsData.map((project) => (
                <div key={project.windowTitle} className="hover:-translate-y-2 transition-all duration-100">
                  <Card {...project} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-20 h-full">
          <h3
            ref={titleJourney}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-bold skew-x-[-20deg] border-b-2 border-red-600 pb-2 w-fit pl-20 pr-5 text-black md:text-white lg:text-white"
          >
            PROFESSIONAL JOURNEY
          </h3>
          <div className="flex items-center justify-center w-full h-full py-8 px-4">
            <ExperienceTimeline experiences={experiencesData} sectionRef={sectionRef} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperiencesScreen
