import { useState, useRef } from "react"
import SectionTitle from "../components/SectionTitle"
import SocialLink from "../components/SocialLink"
import { ANIMATION_CONFIG, socialLinksData } from "../../constants"
import SocialDescription from "../components/SocialDescription"
import ListMenu from "../components/ListMenu"
import TransitionImage from "../components/TransitionImage"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const personae = [
  "Mitsuru Kirijo",
  "Akihiko Sanada",
  "Shinjiro Aragaki",
  "Yukari Takeba",
  "Junpei Iori",
]

const personaeImages = [
  "/images/testimonials/fake-image-1.png",
  "/images/testimonials/fake-image-2.png",
  "/images/testimonials/fake-image-3.png",
  "/images/testimonials/fake-image-4.png",
  "/images/testimonials/fake-image-5.png",
]

const size = {
  sm: 100,
  md: 120,
  lg: 200,
  xl: 250,
}

const TestimonialsScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: ANIMATION_CONFIG.fast, ease: "power2.out" })
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section ref={sectionRef} id="testimonials" className="overflow-y-auto h-full w-full overflow-x-hidden">
      <SectionTitle label="HELP PROVIDED" textSize={size} className="text-5xl xs:text-9xl" />
      <div className="relative pointer-events-auto flex flex-col gap-12 w-full h-full pt-10 gap-5 items-between justify-center">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="pt-10 md:pt-120 xl:pt-0">
            <h3 className="text-white text-5xl md:text-7xl -skew-x-10 font-bold translate-y-2">
              SOCIAL LINKS
            </h3>
            <div className="max-w-xl">
              <SocialLink {...socialLinksData[selectedIndex ?? 0]} />
            </div>
          </div>
          <div className="h-[50vh] w-full p-8 hidden md:block">
            <TransitionImage image={personaeImages[selectedIndex]} imageAlt={personae[selectedIndex]} />
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between items-center pr-10 lg:pr-20 gap-5">
          <div className="w-full lg:translate-x-15 md:-translate-y-10">
            <ListMenu items={personae} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
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
