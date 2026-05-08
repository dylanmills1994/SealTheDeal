"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Phone, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
]

const serviceLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      {/* Main Navigation */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/Gallery/LOGOIMG.png"
              alt="Seal The Deal Logo"
              width={50}
              height={50}
              className="h-12 w-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-tight">Seal The Deal</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Sealcoating & Masonry Services
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" && link.href === "#services"
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Services
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {serviceLinks.map((service) => (
                  <DropdownMenuItem key={service.label} asChild>
                    <Link href={service.href}>{service.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* CTA Button */}
          <Button asChild size="lg" className="hidden lg:flex">
            <a href="tel:+13432609276">
              <Phone className="mr-2 h-4 w-4" />
              <div className="flex flex-col items-start text-left">
                <span className="text-xs opacity-90">(343) 260-9276</span>
                <span className="text-sm font-bold">CALL NOW</span>
              </div>
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border pt-4">
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                  Services
                </p>
                {serviceLinks.map((service) => (
                  <Link
                    key={service.label}
                    href={service.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm text-foreground hover:text-primary"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
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
  )
}
