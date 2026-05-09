import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCmsContent } from "@/lib/cms"

const slots = [
  ["gallery_01", "Sealcoating"], ["gallery_02", "Crack Filling"], ["gallery_03", "Masonry"], ["gallery_04", "Concrete"], ["gallery_05", "Residential"],
  ["gallery_06", "Before & After"], ["gallery_07", "Stonework"], ["gallery_08", "Driveways"], ["gallery_09", "Sealcoating"], ["gallery_10", "Masonry"],
] as const

export default async function GalleryPage() {
  const cms = await getCmsContent()
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-secondary py-14 text-secondary-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-4xl font-black uppercase md:text-5xl">{cms.text.gallery_heading || "Project Gallery"}</h1>
            <p className="mt-3 max-w-2xl text-secondary-foreground/80">{cms.text.gallery_intro || "Real results from Seal The Deal Asphalt Care & Masonry projects"}</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {slots.map(([slot, fallback]) => {
              const img = cms.images[slot]
              return <article key={slot} className="overflow-hidden rounded-lg border bg-card shadow-sm"><div className="relative aspect-[4/3]"><Image src={img?.url || "/images/Gallery/1.jpg"} alt={img?.alt || fallback} fill className="object-cover" /></div><div className="border-t px-4 py-3"><p className="text-sm font-semibold uppercase tracking-wide">{img?.alt || fallback}</p></div></article>
            })}
          </div>
        </section>
      </main>
      <Footer cms={cms} />
    </div>
  )
}
