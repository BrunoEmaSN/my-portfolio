import { useRef } from "react"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import MailPanel from "../components/MailPanel"
import SectionTitle from "../components/SectionTitle"
import SocialItem from "../components/SocialItem"

const socialItems = [
  {
    logoSrc: "/images/social-network/linkedin-color.png",
    logoAlt: "linkedin",
    name: "LinkedIn",
    description: "@BrunoSanchez",
    icon: <Linkedin />,
  },
  {
    logoSrc: "/images/social-network/github-color.png",
    logoAlt: "github",
    name: "Github",
    description: "@BrunoSanchez",
    icon: <Github />,
  },
  {
    logoSrc: "/images/social-network/twitter-color.png",
    logoAlt: "twitter",
    name: "Twitter",
    description: "@BrunoSanchez",
    icon: <Twitter />,
  },
  {
    logoSrc: "/images/social-network/instagram-color.png",
    logoAlt: "instagram",
    name: "Instagram",
    description: "@BrunoSanchez",
    icon: <Instagram />,
  },
]

const ContactScreen = () => {
  const socialListRef = useRef<HTMLDivElement>(null)
  const size = {
    sm: 100,
    md: 120,
    lg: 200,
    xl: 400,
  }

  useGSAP(() => {
    if (!socialListRef.current?.children?.length) return
    const children = Array.from(socialListRef.current.children)
    gsap.fromTo(
      children,
      { x: 60, opacity: 0, skewX: -10 },
      { x: 0, opacity: 1, skewX: -10, duration: 0.5, stagger: 0.2, ease: "power2.out" }
    )
  }, { scope: socialListRef, dependencies: [] })

  return (
    <section id="contact" className="overflow-y-auto h-full w-full overflow-x-hidden z-10">
      <SectionTitle label="FORGE BONDS" textSize={size} className="text-5xl xs:text-9xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-full">
        <MailPanel
          backgroundImage="/images/testimonials/fake-image-1.png"
          onAction={() => {
            console.log("Send email")
          }}
          actionLabel="SEND EMAIL"
        />
        <div
          ref={socialListRef}
          className="flex flex-col items-center justify-center h-full w-full p-8 gap-5"
        >
          {socialItems.map((item) => (
            <SocialItem
              key={item.name}
              logoSrc={item.logoSrc}
              name={item.name}
              description={item.description}
              icon={item.icon}
              onClick={() => {
                console.log("Click on", item.name)
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactScreen
