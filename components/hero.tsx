import Image from "next/image"
import { Phone, Mail, MapPin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DEFAULT_EMAIL_HREF, DEFAULT_PHONE_HREF } from "@/lib/site-config"

export function Hero({ cms }: { cms: { text: Record<string, string>; images: Record<string, { url: string; alt: string }> } }) {
  const lines = (cms.text.hero_headline || "").split("\n")
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl"><div className="grid min-h-[600px] lg:grid-cols-2"><div className="flex flex-col justify-center px-4 py-12 lg:px-8 lg:py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">{cms.text.hero_eyebrow}</p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">{lines.slice(0,-1).map((l)=> <span key={l}>{l}<br/></span>)}<span className="relative text-primary">{lines.at(-1)}<span className="absolute bottom-0 left-0 h-1 w-full bg-primary" /></span></h1>
        <p className="mb-6 max-w-md text-muted-foreground leading-relaxed">{cms.text.hero_subheadline}</p>
        <ul className="mb-8 flex flex-col gap-2"><li className="flex items-center gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-primary" />Fully Insured</li><li className="flex items-center gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-primary" />Free Quotes</li><li className="flex items-center gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-primary" />References Available Upon Request</li></ul>
        <div className="flex flex-wrap gap-4"><Button size="lg" asChild><a href={DEFAULT_PHONE_HREF}><Phone className="mr-2 h-4 w-4" />Call {cms.text.phone_display}</a></Button><Button size="lg" variant="outline" asChild><a href={DEFAULT_EMAIL_HREF}><Mail className="mr-2 h-4 w-4" />Request a Quote</a></Button></div>
      </div><div className="relative min-h-[400px] lg:min-h-full"><Image src={cms.images.hero_logo.url} alt={cms.images.hero_logo.alt} fill className="object-contain" priority /><div className="absolute bottom-8 right-8 flex items-center gap-3 rounded-lg bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm"><div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary"><MapPin className="h-5 w-5 text-primary" /></div><div><p className="text-xs font-semibold uppercase text-muted-foreground">Proudly Serving</p><p className="text-sm font-medium text-foreground">Prescott, ON &<br />Surrounding Areas</p></div></div></div></div></div>
    </section>
  )
}
