import Link from "next/link"
import { Phone, Mail, MapPin, Facebook } from "lucide-react"

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold">Seal The Deal</h3>
              <p className="text-sm text-secondary-foreground/70">Sealcoating & Masonry Services</p>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/70">
              About Us
            </h4>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              We offer asphalt care such as sealcoating and crack filling. We also provide masonry work and concrete work of any kind. Insured. Trusted. Local.
            </p>
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
                    className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary-foreground/70">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:3432609276"
                  className="flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  (343) 260-9276
                </a>
              </li>
              <li>
                <a
                  href="mailto:sealthedeal1994@gmail.com"
                  className="flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  sealthedeal1994@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                <MapPin className="h-4 w-4" />
                Prescott, ON, Canada
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  Message us on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-secondary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <p className="text-center text-xs text-secondary-foreground/60">
            &copy; {new Date().getFullYear()} Seal The Deal Sealcoating & Masonry Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
