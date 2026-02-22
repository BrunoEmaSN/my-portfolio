import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import MailPanel from "../components/MailPanel"
import SectionTitle from "../components/SectionTitle"
import SocialItem from "../components/SocialItem"
import { ANIMATION_CONFIG } from "../../constants"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

const socialItems = [
  {
    logoSrc: "/images/social-network/linkedin-color.png",
    logoAlt: "linkedin",
    name: "LinkedIn",
    description: "@BrunoSanchez",
    icon: <FaLinkedin size={30} />,
    url: "https://www.linkedin.com/in/bruno-s%C3%A1nchez-373a37173/",
  },
  {
    logoSrc: "/images/social-network/github-color.png",
    logoAlt: "github",
    name: "Github",
    description: "@BrunoSanchez",
    icon: <FaGithub size={30} />,
    url: "https://github.com/BrunoEmaSN",
  },
  {
    logoSrc: "/images/social-network/instagram-color.png",
    logoAlt: "instagram",
    name: "Instagram",
    description: "@BrunoSanchez",
    icon: <FaInstagram size={30} />,
    url: "https://www.instagram.com/the_penumbre/",
  },
]

const size = {
  sm: 100,
  md: 120,
  lg: 200,
  xl: 400,
}

const ContactScreen = () => {
  const socialListRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!socialListRef.current?.children?.length) return
    const children = Array.from(socialListRef.current.children)
    gsap.fromTo(
      children,
      { x: 60, opacity: 0, skewX: -10 },
      { x: 0, opacity: 1, skewX: -10, duration: ANIMATION_CONFIG.fast, stagger: 0.2, ease: ANIMATION_CONFIG.ease }
    )
  }, { scope: socialListRef, dependencies: [] })

  const handleClick = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <section id="contact" className="overflow-y-auto h-full w-full overflow-x-hidden z-10">
      <SectionTitle label="FORGE BONDS" textSize={size} className="text-5xl xs:text-9xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-full">
        <MailPanel
          backgroundImage="/images/photo.png"
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
              onClick={() =>  handleClick(item.url)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactScreen
