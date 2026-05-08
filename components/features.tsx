import { Shield, MapPin, Users, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Insured Work",
    description: "Fully insured for your peace of mind.",
  },
  {
    icon: MapPin,
    title: "Local Service",
    description: "Proudly serving Prescott, ON & surrounding communities.",
  },
  {
    icon: Users,
    title: "References Available",
    description: "Ask us for references from local customers.",
  },
  {
    icon: Award,
    title: "Quality Results",
    description: "Top-quality materials and clean, reliable workmanship.",
  },
]

export function Features() {
  return (
    <section id="process" className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
