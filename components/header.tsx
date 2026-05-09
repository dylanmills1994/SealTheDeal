"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, type FormEvent } from "react"

const navLinks = [
  { label: "Services", section: "services" },
  { label: "Work", section: "work" },
]

const extraLinks = [{ label: "Gallery", href: "/gallery" }]

const quoteEmail = "sealthedeal1994@gmail.com"
const quoteSubject = "Seal The Deal Quote Request"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("services")
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" })

  const openContactModal = () => setIsContactModalOpen(true)
  const closeContactModal = () => setIsContactModalOpen(false)

  useEffect(() => {
    if (pathname !== "/") return

    const sectionIds = navLinks.map((link) => link.section)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (!sections.length) return

    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (sectionIds.includes(hash)) {
        setActiveSection(hash)
      }
    }

    updateFromHash()

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { threshold: [0.35, 0.6], rootMargin: "-20% 0px -55% 0px" },
    )

    sections.forEach((section) => observer.observe(section))
    window.addEventListener("hashchange", updateFromHash)

    return () => {
      observer.disconnect()
      window.removeEventListener("hashchange", updateFromHash)
    }
  }, [pathname])

  useEffect(() => {
    if (!isContactModalOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeContactModal()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isContactModalOpen])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const body = [
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      "",
      "Message:",
      formData.message,
    ].join("\n")

    const mailtoHref = `mailto:${quoteEmail}?subject=${encodeURIComponent(quoteSubject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoHref
    closeContactModal()
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
        <div className="border-b border-border bg-background">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/Gallery/LOGOIMG.png" alt="Seal The Deal Logo" width={50} height={50} className="h-12 w-12 object-contain" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-tight">Seal The Deal</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Asphalt Care & Masonry</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => {
                const href = `/#${link.section}`
                const isActive = pathname === "/" && activeSection === link.section
                return (
                  <Link
                    key={link.label}
                    href={href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary border-b-2 border-primary pb-1" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <button
                type="button"
                onClick={openContactModal}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                Contact
              </button>
              {extraLinks.map((link) => (
                <Link key={link.label} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-foreground"}`}>{link.label}</Link>
              ))}
            </nav>

            <Button asChild size="lg" className="hidden lg:flex">
              <a href="tel:+13432609276">
                <Phone className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs opacity-90">(343) 260-9276</span>
                  <span className="text-sm font-bold">CALL NOW</span>
                </div>
              </a>
            </Button>

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-b border-border bg-background lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={`/#${link.section}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      pathname === "/" && activeSection === link.section ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    openContactModal()
                  }}
                  className="text-left text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  Contact
                </button>
                {extraLinks.map((link) => (
                  <Link key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`text-sm font-medium transition-colors ${pathname === link.href ? "text-primary" : "text-foreground"}`}>{link.label}</Link>
                ))}
                <Button asChild className="mt-4 w-full">
                  <a href="tel:+13432609276">
                    <Phone className="mr-2 h-4 w-4" />
                    Call (343) 260-9276
                  </a>
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {isContactModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={closeContactModal}>
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Request a Quote</h2>
              <button type="button" onClick={closeContactModal} className="rounded p-1 text-muted-foreground hover:text-foreground" aria-label="Close contact form">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input required placeholder="Name" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className="w-full rounded border border-border px-3 py-2 text-sm" />
              <input required placeholder="Phone" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className="w-full rounded border border-border px-3 py-2 text-sm" />
              <input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className="w-full rounded border border-border px-3 py-2 text-sm" />
              <textarea required placeholder="Message / job details" value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} className="min-h-28 w-full rounded border border-border px-3 py-2 text-sm" />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
