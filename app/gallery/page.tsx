"use client"

import Image from "next/image"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Grid3X3, Shield, Building, HardHat, Paintbrush, ArrowLeftRight, Check, Users } from "lucide-react"

const categories = [
  { id: "all", label: "All Work", icon: Grid3X3 },
  { id: "foundation", label: "Foundation Repair", icon: Shield },
  { id: "masonry", label: "Masonry", icon: Building },
  { id: "concrete", label: "Concrete", icon: HardHat },
  { id: "asphalt", label: "Asphalt Care", icon: Paintbrush },
  { id: "before-after", label: "Before & After", icon: ArrowLeftRight },
]

const galleryItems = [
  {
    id: 1,
    image: "/images/gallery/foundation-repair.jpg",
    title: "Foundation Repair",
    category: "foundation",
  },
  {
    id: 2,
    image: "/images/gallery/masonry-restoration.jpg",
    title: "Masonry Restoration",
    category: "masonry",
  },
  {
    id: 3,
    image: "/images/gallery/concrete-pad.jpg",
    title: "Concrete Pad Prep",
    category: "concrete",
  },
  {
    id: 4,
    image: "/images/gallery/sealcoating-asphalt.jpg",
    title: "Sealcoating & Asphalt Care",
    category: "asphalt",
  },
  {
    id: 5,
    image: "/images/gallery/exterior-foundation.jpg",
    title: "Exterior Foundation Repair",
    category: "foundation",
  },
  {
    id: 6,
    image: "/images/gallery/basement-wall.jpg",
    title: "Basement Wall Repair",
    category: "foundation",
  },
  {
    id: 7,
    image: "/images/gallery/crawlspace-wall.jpg",
    title: "Crawlspace Wall Work",
    category: "foundation",
  },
  {
    id: 8,
    image: "/images/gallery/parging.jpg",
    title: "Parging & Resurfacing",
    category: "masonry",
  },
]

const beforeAfterItems = [
  {
    id: 1,
    before: "/images/gallery/before-foundation.jpg",
    after: "/images/gallery/after-foundation.jpg",
    title: "Foundation Parging & Resurfacing",
  },
  {
    id: 2,
    before: "/images/gallery/before-basement.jpg",
    after: "/images/gallery/after-basement.jpg",
    title: "Basement Wall Repair",
  },
  {
    id: 3,
    before: "/images/gallery/before-exterior.jpg",
    after: "/images/gallery/after-exterior.jpg",
    title: "Exterior Foundation Repair",
  },
]

const features = [
  {
    icon: Check,
    title: "Quality Workmanship",
    description: "Top-grade materials and detail you can see and trust.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "We're fully insured for your peace of mind.",
  },
  {
    icon: Users,
    title: "References Available",
    description: "Trusted by homeowners throughout our area.",
  },
  {
    icon: Building,
    title: "Local & Reliable",
    description: "Proudly serving Prescott, ON and the surrounding areas.",
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : activeCategory === "before-after"
      ? []
      : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-secondary/95" />
        <div className="relative mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-16 lg:py-24">
            <h1 className="text-4xl font-black uppercase text-secondary-foreground md:text-5xl lg:text-6xl">
              Real Work.
              <br />
              <span className="text-primary">Real Results.</span>
            </h1>
            <p className="mt-4 max-w-md text-secondary-foreground/80 leading-relaxed">
              Masonry, foundation, concrete & asphalt services built to last in Prescott, ON and surrounding areas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="tel:3432609276">
                  <Phone className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">CALL NOW</span>
                    <span className="text-sm font-bold">(343) 260-9276</span>
                  </div>
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
                <Mail className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">GET A FREE QUOTE</span>
                  <span className="text-sm">Fast. Free. No Obligation.</span>
                </div>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute left-0 top-0 h-full w-8 bg-primary" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
            <Image
              src="/images/gallery-hero.jpg"
              alt="Gallery Hero"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      {activeCategory !== "before-after" && (
        <section className="bg-background pb-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-lg ${
                    index === 2 || index === 3 ? "sm:col-span-1 lg:row-span-2" : ""
                  }`}
                >
                  <div className={`relative ${index === 2 || index === 3 ? "h-[400px] lg:h-full" : "h-[200px]"}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-sm font-bold uppercase text-white">
                        {item.title}
                      </h3>
                      <div className="mt-1 h-0.5 w-12 bg-primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Before & After Section */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-secondary-foreground/20" />
            <h2 className="text-center text-2xl font-black uppercase text-secondary-foreground md:text-3xl">
              Before & After: <span className="text-primary">Built to Last</span>
            </h2>
            <div className="h-px flex-1 bg-secondary-foreground/20" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {beforeAfterItems.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-lg bg-secondary">
                <div className="grid grid-cols-2">
                  <div className="relative h-48">
                    <Image
                      src={item.before}
                      alt={`Before - ${item.title}`}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute left-2 top-2 rounded bg-primary px-2 py-1 text-xs font-bold uppercase text-primary-foreground">
                      Before
                    </span>
                  </div>
                  <div className="relative h-48">
                    <Image
                      src={item.after}
                      alt={`After - ${item.title}`}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute right-2 top-2 rounded bg-green-600 px-2 py-1 text-xs font-bold uppercase text-white">
                      After
                    </span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold uppercase text-secondary-foreground">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </div>
  )
}
