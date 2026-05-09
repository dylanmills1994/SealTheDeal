"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, type FormEvent } from "react"
import { CONTACT_MODAL_EVENT } from "@/lib/site-config"

const navLinks = [
  { label: "Home", href: "/", section: "" },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Work", href: "/#work", section: "work" },
  { label: "Contact", href: "/#contact", section: "contact", opensModal: true },
]

const extraLinks = [{ label: "Gallery", href: "/gallery" }]


export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const openContactModal = () => setIsContactModalOpen(true)
  const closeContactModal = () => {
    setIsContactModalOpen(false)
    setSubmitMessage(null)
  }

  useEffect(() => {
    if (pathname !== "/") return

    const sectionIds = navLinks.map((l) => l.section).filter(Boolean)
    const getCurrentSection = () => {
      if (window.scrollY < 140) return ""
      let candidate = ""
      let bestTop = Number.NEGATIVE_INFINITY
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= 140 && top > bestTop) {
          bestTop = top
          candidate = id
        }
      }
      return candidate || ""
    }

    const syncActive = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash && sectionIds.includes(hash)) setActiveSection(hash)
      else setActiveSection(getCurrentSection())
    }

    syncActive()
    window.addEventListener("scroll", syncActive, { passive: true })
    window.addEventListener("resize", syncActive)
    window.addEventListener("hashchange", syncActive)
    return () => {
      window.removeEventListener("scroll", syncActive)
      window.removeEventListener("resize", syncActive)
      window.removeEventListener("hashchange", syncActive)
    }
  }, [pathname])

  useEffect(() => {
    const onOpen = () => setIsContactModalOpen(true)
    window.addEventListener(CONTACT_MODAL_EVENT, onOpen)
    return () => window.removeEventListener(CONTACT_MODAL_EVENT, onOpen)
  }, [])

  useEffect(() => {
    if (!isContactModalOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContactModal()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isContactModalOpen])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: window.location.pathname }),
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send quote request")
      }

      setSubmitMessage({ type: "success", text: "Thanks! Your quote request was sent successfully." })
      setFormData({ name: "", phone: "", email: "", message: "" })
    } catch {
      setSubmitMessage({ type: "error", text: "We couldn't send your request right now. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
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
                const isActive = pathname === "/" ? activeSection === link.section : pathname === link.href
                if (link.opensModal) {
                  return (
                    <button
                      key={link.label}
                      type="button"
                      onClick={openContactModal}
                      className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary border-b-2 border-primary pb-1" : "text-foreground"}`}
                    >
                      {link.label}
                    </button>
                  )
                }
                return <Link key={link.label} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary border-b-2 border-primary pb-1" : "text-foreground"}`}>{link.label}</Link>
              })}
              {extraLinks.map((link) => (
                <Link key={link.label} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-foreground"}`}>{link.label}</Link>
              ))}
            </nav>

            <Button asChild size="lg" className="hidden lg:flex"><a href="tel:+13432609276"><Phone className="mr-2 h-4 w-4" /><div className="flex flex-col items-start text-left"><span className="text-xs opacity-90">(343) 260-9276</span><span className="text-sm font-bold">CALL NOW</span></div></a></Button>
            <Button size="lg" variant="outline" className="hidden lg:flex" onClick={openContactModal}>Request Quote</Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-b border-border bg-background lg:hidden"><div className="mx-auto max-w-7xl px-4 py-4"><nav className="flex flex-col gap-4">{navLinks.map((link) => link.opensModal ? <button key={link.label} type="button" onClick={() => { openContactModal(); setMobileMenuOpen(false) }} className={`text-left text-sm font-medium transition-colors ${pathname === "/" ? activeSection === link.section ? "text-primary" : "text-foreground" : pathname === link.href ? "text-primary" : "text-foreground"}`}>{link.label}</button> : <Link key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`text-sm font-medium transition-colors ${pathname === "/" ? activeSection === link.section ? "text-primary" : "text-foreground" : pathname === link.href ? "text-primary" : "text-foreground"}`}>{link.label}</Link>)}{extraLinks.map((link) => <Link key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`text-sm font-medium transition-colors ${pathname === link.href ? "text-primary" : "text-foreground"}`}>{link.label}</Link>)}<Button asChild className="mt-4 w-full"><a href="tel:+13432609276"><Phone className="mr-2 h-4 w-4" />Call (343) 260-9276</a></Button><Button variant="outline" className="w-full" onClick={() => { openContactModal(); setMobileMenuOpen(false) }}>Request Quote</Button></nav></div></div>
        )}
      </header>

      {isContactModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={closeContactModal}>
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Request a Quote</h2><button type="button" onClick={closeContactModal} className="rounded p-1 text-muted-foreground hover:text-foreground" aria-label="Close contact form"><X className="h-5 w-5" /></button></div>
            <form onSubmit={handleSubmit} className="space-y-3"><input required placeholder="Name" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className="w-full rounded border border-border px-3 py-2 text-sm" /><input required placeholder="Phone" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className="w-full rounded border border-border px-3 py-2 text-sm" /><input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className="w-full rounded border border-border px-3 py-2 text-sm" /><textarea required placeholder="Message / job details" value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} className="min-h-28 w-full rounded border border-border px-3 py-2 text-sm" />{submitMessage && <p className={`text-sm ${submitMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>{submitMessage.text}</p>}<Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Submit"}</Button></form>
          </div>
        </div>
      )}
    </>
  )
}
