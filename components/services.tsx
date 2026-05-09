import Image from "next/image"
import { Paintbrush, Wrench, Building, HardHat } from "lucide-react"

export function Services({ cms }: { cms: { text: Record<string, string>; images: Record<string, { url: string; alt: string }> } }) {
  const services = [
    { title: "Sealcoating", tag: "Sealcoating", description: "Protect and extend the life of your driveway with premium sealcoating that resists weather and wear.", icon: Paintbrush, image: cms.images.services_sealcoating.url },
    { title: "Crack Filling", tag: "Crack Filling", description: "Prevent water damage and deterioration with professional crack filling.", icon: Wrench, image: cms.images.services_crack_filling.url },
    { title: "Masonry Work", tag: "Masonry", description: "Brick, stone, and block work for steps, patios, walls, and more. Built strong and built to last.", icon: Building, image: cms.images.services_masonry.url },
    { title: "Concrete Work", tag: "Concrete", description: "Sidewalks, steps, pads, and more. Strong, smooth, and built to last.", icon: HardHat, image: cms.images.services_concrete.url },
  ]

  return <section id="services" className="bg-background py-16 lg:py-24"><div className="mx-auto max-w-7xl px-4"><div className="mb-12 text-center"><p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Our Services</p><h2 className="text-3xl font-bold text-foreground md:text-4xl">{cms.text.services_heading}</h2></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map((s,idx)=><div key={s.title} className={`${idx===0||idx===3?'lg:col-span-2':''} relative overflow-hidden rounded-xl`}><div className="relative h-64 lg:h-80"><Image src={s.image} alt={s.title} fill className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"/><div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">{s.tag}</div><div className="absolute bottom-0 w-full p-4 lg:p-6"><h3 className="text-xl font-bold text-white">{s.title}</h3><p className="mt-1 max-w-xl text-sm text-white/90">{s.description}</p></div></div></div>)}</div></div></section>
}
