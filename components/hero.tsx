import Image from "next/image"
import { Phone, Mail, MapPin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-[600px] lg:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-4 py-12 lg:px-8 lg:py-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Local. Professional. Trusted.
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Driveways.
              <br />
              Stonework.
              <br />
              Concrete.
              <br />
              <span className="relative text-primary">
                Done Right.
                <span className="absolute bottom-0 left-0 h-1 w-full bg-primary" />
              </span>
            </h1>
            <p className="mb-6 max-w-md text-muted-foreground leading-relaxed">
              Quality asphalt care, masonry, and concrete work for homes and businesses in Prescott, ON and surrounding communities.
            </p>

            {/* Features List */}
            <ul className="mb-8 flex flex-col gap-2">
              <li className="flex items-center gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-primary" />
                Fully Insured
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-primary" />
                Free Quotes
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground">
                <Check className="h-4 w-4 text-primary" />
                References Available Upon Request
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="tel:+13432609276">
                  <Phone className="mr-2 h-4 w-4" />
                  Call (343) 260-9276
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Request a Quote
                </a>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative min-h-[400px] lg:min-h-full">
            <Image
              src="/images/Gallery/Logo.jpg"
              alt="Professional driveway sealcoating and masonry work"
              fill
              className="object-contain"
              priority
            />
            {/* Badge */}
            <div className="absolute bottom-8 right-8 flex items-center gap-3 rounded-lg bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Proudly Serving</p>
                <p className="text-sm font-medium text-foreground">
                  Prescott, ON &<br />
                  Surrounding Areas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
