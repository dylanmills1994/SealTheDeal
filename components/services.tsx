import Image from "next/image"
import { Paintbrush, Wrench, Building, HardHat } from "lucide-react"

const services = [
  {
    id: "sealcoating",
    title: "Sealcoating",
    description: "Protect and extend the life of your driveway with premium sealcoating that resists weather and wear.",
    icon: Paintbrush,
    image: "/images/Gallery/20.jpg",
    position: "top-right",
  },
  {
    id: "crack-filling",
    title: "Crack Filling",
    description: "Prevent water damage and deterioration with professional crack filling.",
    icon: Wrench,
    image: "/images/Gallery/23.jpg",
    position: "top-left",
  },
  {
    id: "masonry",
    title: "Masonry Work",
    description: "Brick, stone, and block work for steps, patios, walls, and more. Built strong and built to last.",
    icon: Building,
    image: "/images/Gallery/30.jpg",
    position: "bottom-right",
  },
  {
    id: "concrete",
    title: "Concrete Work",
    description: "Sidewalks, steps, pads, and more. Strong, smooth, and built to last.",
    icon: HardHat,
    image: "/images/Gallery/25.jpg",
    position: "bottom-left",
  },
]

export function Services() {
  return (
    <section id="services" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Our Services
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Complete Solutions for Your Property
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Sealcoating - Large Card */}
          <div className="relative overflow-hidden rounded-xl lg:col-span-2 lg:row-span-1">
            <div className="relative h-64 lg:h-80">
              <Image
                src={services[0].image}
                alt={services[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 right-0 m-6 flex max-w-sm items-start gap-4 rounded-lg bg-background/95 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Paintbrush className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{services[0].title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{services[0].description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Crack Filling */}
          <div className="relative overflow-hidden rounded-xl">
            <div className="relative h-64 lg:h-80">
              <Image
                src={services[1].image}
                alt={services[1].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 m-4 flex items-start gap-3 rounded-lg bg-background/95 p-3 backdrop-blur-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Wrench className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{services[1].title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{services[1].description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Concrete Work */}
          <div className="relative overflow-hidden rounded-xl">
            <div className="relative h-64 lg:h-80">
              <Image
                src={services[3].image}
                alt={services[3].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 m-4 flex items-start gap-3 rounded-lg bg-background/95 p-3 backdrop-blur-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <HardHat className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{services[3].title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{services[3].description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Masonry Work - Large Card */}
          <div className="relative overflow-hidden rounded-xl lg:col-span-2">
            <div className="relative h-64 lg:h-80">
              <Image
                src={services[2].image}
                alt={services[2].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 right-0 m-6 flex max-w-sm items-start gap-4 rounded-lg bg-background/95 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{services[2].title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{services[2].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
