import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import MailPanel, { type MailFormData } from "../components/MailPanel"
import SectionTitle from "../components/SectionTitle"
import SocialItem from "../components/SocialItem"
import { ANIMATION_CONFIG, CONTACT_EMAIL } from "../../constants"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import { useScreenScroll } from "../hooks/useScreenScroll"

function buildMailtoLink(to: string, data: MailFormData): string {
  const subject = encodeURIComponent(data.subject || "Contacto desde portfolio")
  const body = [
    data.message,
    "",
    "---",
    `Enviado por: ${data.fromName || "Anónimo"}`,
    `Email: ${data.fromEmail}`,
  ].join("\n")
  const bodyEncoded = encodeURIComponent(body)
  return `mailto:${encodeURIComponent(to)}?subject=${subject}&body=${bodyEncoded}`
}

const socialItems = [
  {
    logoSrc: "/images/social-network/linkedin-color.png",
    logoAlt: "linkedin",
    name: "LinkedIn",
    description: `@${import.meta.env.VITE_LINKEDIN_USERNAME}`,
    icon: <FaLinkedin size={30} />,
    url: import.meta.env.VITE_LINKEDIN_URL,
  },
  {
    logoSrc: "/images/social-network/github-color.png",
    logoAlt: "github",
    name: "Github",
    description: `@${import.meta.env.VITE_GITHUB_USERNAME}`,
    icon: <FaGithub size={30} />,
    url: import.meta.env.VITE_GITHUB_URL,
  },
  {
    logoSrc: "/images/social-network/instagram-color.png",
    logoAlt: "instagram",
    name: "Instagram",
    description: `@${import.meta.env.VITE_INSTAGRAM_USERNAME}`,
    icon: <FaInstagram size={30} />,
    url: import.meta.env.VITE_INSTAGRAM_URL,
  },
]

const size = {
  sm: 100,
  md: 120,
  lg: 200,
  xl: 400,
}

const ContactScreen = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const socialListRef = useRef<HTMLDivElement>(null)

  useScreenScroll(sectionRef)

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

  const handleSendMail = (data: MailFormData) => {
    const link = buildMailtoLink(CONTACT_EMAIL, data)
    window.location.href = link
  }

  return (
    <section ref={sectionRef} id="contact" className="overflow-y-auto h-full w-full overflow-x-hidden z-10">
      <SectionTitle label="FORGE BONDS" textSize={size} className="text-5xl xs:text-9xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-full">
        <MailPanel
          backgroundImage="/images/photo.png"
          onSend={handleSendMail}
          actionLabel="SEND EMAIL"
        />
        <div
          ref={socialListRef}
          className="flex flex-col items-center justify-center h-full w-full p-8 mb-20 gap-5"
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
