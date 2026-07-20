import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  { slot: "project_01", title: "Driveway Sealcoating" },
  { slot: "project_02", title: "Masonry Steps & Walls" },
  { slot: "project_03", title: "Concrete Walkways" },
  { slot: "project_04", title: "Asphalt Driveway Refresh" },
] as const

export function Projects({ cms }: { cms: { text: Record<string, string>; images: Record<string, { url: string; alt: string }> } }) {
  return (
    <section id="work" className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Recent Projects
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            {cms.text.projects_heading || "Built with Pride. Backed by Quality."}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => {
            const image = cms.images[project.slot]
            return (
              <div
                key={project.slot}
                className="group relative overflow-hidden rounded-xl bg-background shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.url}
                    alt={image.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-semibold text-white">{image.alt || project.title}</h3>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <a href="/gallery">
              {cms.text.projects_button_label || "See All Projects"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
