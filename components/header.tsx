"use client"

import Link from "next/link"
import { Phone, MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Top Bar */}
      <div className="border-b border-border bg-muted/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Prescott, ON & Surrounding Areas</span>
          </div>
          <a
            href="tel:3432609276"
            className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>(343) 260-9276</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-bold text-foreground">Seal The Deal</span>
            <span className="text-xs text-muted-foreground">Sealcoating & Masonry Services</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Services
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="#services">Sealcoating</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#services">Crack Filling</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#services">Masonry Work</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#services">Concrete Work</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="#projects"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Our Work
            </Link>
            <Link
              href="#process"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Process
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <Button asChild className="hidden md:flex">
            <a href="tel:3432609276">
              <Phone className="mr-2 h-4 w-4" />
              Call for Quote
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}
