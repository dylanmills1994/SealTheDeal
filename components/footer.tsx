import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Check } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/#services" },
  { label: "Gallery", href: "/#work" },
  { label: "Services", href: "/#process" },
  { label: "Contact", href: "/#contact" },
]

const services = [
  "Foundation Repair",
  "Masonry Repair",
  "Concrete Work",
  "Sealcoating & Asphalt Care",
]

export function Footer({ cms }: { cms?: { text: Record<string, string> } }) {
  const text = cms?.text || {}
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/Gallery/LOGOIMG.png"
                alt="Seal The Deal Logo"
                width={50}
                height={50}
                className="h-12 w-12 object-contain brightness-0 invert"
              />
              <div>
                <h3 className="text-lg font-bold">Seal The Deal</h3>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground/70">
                  Asphalt Care & Masonry
                </p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              {text.footer_description || "Asphalt care, masonry, concrete and foundation services you can count on. Insured. Trusted. Local."}
            </p>
            <a
              href={text.facebook_url || "https://www.facebook.com/profile.php?id=100091760627380"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
            >
              <Facebook className="h-4 w-4" />
              {text.footer_facebook_label || "Follow us on Facebook"}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/70">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/70">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                  <Check className="h-4 w-4 text-primary" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/70">
              Service Area
            </h4>
            <div className="flex items-start gap-2 text-sm text-secondary-foreground/80 mb-4">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-secondary-foreground">Prescott, ON, Canada</p>
                <p>and surrounding areas</p>
              </div>
            </div>
            <a
              href={text.phone_tel_link || "tel:+13432609276"}
              className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
            >
              <Phone className="h-4 w-4" />
              {text.phone_display || "(343) 260-9276"}
            </a>
            <a
              href={text.email_mailto_link || "mailto:sealthedeal1994@gmail.com?subject=Seal%20The%20Deal%20Quote%20Request"}
              className="mt-2 flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              {text.email_address || "sealthedeal1994@gmail.com"}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-secondary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <p className="text-xs text-secondary-foreground/60">
            &copy; {new Date().getFullYear()} Seal The Deal Asphalt Care & Masonry. All Rights Reserved.
          </p>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <p className="text-xs text-secondary-foreground/60">
              {text.footer_tagline || "Fully Insured | Trusted | Local"}
            </p>
            <a
              href="https://kintask.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm text-xs text-secondary-foreground/50 transition-colors hover:text-secondary-foreground/80"
              aria-label="Made by KinTask"
            >
              <Image
                src="/images/Gallery/logoK.png"
                alt="KinTask logo"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
              <span>Made by KinTask</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
