"use client"

import Image from "next/image"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Clock,
  Send,
  MessageSquare,
  User,
  Shield,
  Check,
  Users,
  Building,
  Lock,
} from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "(343) 260-9276",
    subtext: "Call or Text",
    href: "tel:+13432609276",
  },
  {
    icon: Mail,
    title: "Email",
    value: "sealthedeal1994@gmail.com",
    subtext: "We reply fast!",
    href: "mailto:sealthedeal1994@gmail.com?subject=Seal%20The%20Deal%20Quote%20Request",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Prescott, ON, Canada",
    subtext: "K0E 1T0",
    href: null,
  },
  {
    icon: Facebook,
    title: "Facebook / Messenger",
    value: "Seal The Deal Asphalt Care & Masonry",
    subtext: "Message us on Facebook",
    href: "https://facebook.com",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Monday - Saturday",
    subtext: "7:00 AM - 7:00 PM",
    href: null,
  },
]

const serviceAreas = [
  "Prescott, ON",
  "Brockville, ON",
  "Kemptville, ON",
  "Merrickville, ON",
  "South Mountain, ON",
  "Surrounding Areas",
]

const services = [
  "Foundation Repair",
  "Masonry Repair",
  "Concrete Work",
  "Sealcoating & Asphalt Care",
]

const features = [
  {
    icon: MessageSquare,
    title: "Free Estimates",
    description: "Honest quotes. No pressure. Just solid advice.",
  },
  {
    icon: Check,
    title: "Quality Work",
    description: "Top-grade materials and workmanship every time.",
  },
  {
    icon: Users,
    title: "Local Service",
    description: "Proudly serving Prescott, ON and the surrounding areas.",
  },
  {
    icon: Shield,
    title: "References Available",
    description: "Trusted by homeowners throughout our area.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    details: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent("Seal The Deal Quote Request")
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.service}\n\nProject Details:\n${formData.details}`)
    window.location.href = `mailto:sealthedeal1994@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-secondary/95" />
        <div className="relative mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-16 lg:py-24">
            <h1 className="text-4xl font-black uppercase text-secondary-foreground md:text-5xl lg:text-6xl">
              {"Let's Talk About"}
              <br />
              <span className="text-primary italic">Your Project.</span>
            </h1>
            <div className="mt-2 h-1 w-20 bg-primary" />
            <p className="mt-6 max-w-md text-secondary-foreground/80 leading-relaxed">
              Get in touch for expert masonry, foundation, concrete, and asphalt work in{" "}
              <span className="font-semibold text-primary">Prescott, ON</span> and surrounding areas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="tel:+13432609276">
                  <Phone className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">CALL NOW</span>
                    <span className="text-sm font-bold">(343) 260-9276</span>
                  </div>
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                asChild
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">MESSAGE US</span>
                    <span className="text-sm">on Facebook</span>
                  </div>
                </a>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div
              className="absolute left-0 top-0 h-full w-8 bg-primary"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />
            <Image
              src="/images/Gallery/39.jpg"
              alt="Contact Hero"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="rounded-xl bg-secondary p-6 lg:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <MessageSquare className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-bold uppercase text-secondary-foreground">Send Us A Message</h2>
                  <p className="text-sm text-primary">Request a Free Quote</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel className="text-secondary-foreground">
                      Full Name <span className="text-primary">*</span>
                    </FieldLabel>
                    <Input
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background"
                    />
                  </Field>

                  <Field>
                    <FieldLabel className="text-secondary-foreground">
                      Phone Number <span className="text-primary">*</span>
                    </FieldLabel>
                    <Input
                      type="tel"
                      placeholder="(343) 260-9276"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-background"
                    />
                  </Field>

                  <Field>
                    <FieldLabel className="text-secondary-foreground">
                      Email Address <span className="text-primary">*</span>
                    </FieldLabel>
                    <Input
                      type="email"
                      placeholder="youremail@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background"
                    />
                  </Field>

                  <Field>
                    <FieldLabel className="text-secondary-foreground">
                      Service Needed <span className="text-primary">*</span>
                    </FieldLabel>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel className="text-secondary-foreground">Project Details</FieldLabel>
                    <Textarea
                      placeholder="Tell us about your project, location, timeline, and any other details..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      rows={4}
                      className="bg-background resize-none"
                    />
                  </Field>
                </FieldGroup>

                <Button type="submit" size="lg" className="mt-6 w-full">
                  <Send className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="font-bold">Send Message / Request Quote</span>
                    <span className="text-xs opacity-80">{"We'll get back to you as soon as possible!"}</span>
                  </div>
                </Button>

                <p className="mt-4 flex items-center gap-2 text-xs text-secondary-foreground/60">
                  <Lock className="h-3 w-3" />
                  Your information is secure and will never be shared.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="rounded-xl bg-background p-6 shadow-sm lg:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <User className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h2 className="font-bold uppercase text-foreground">Get In Touch</h2>
                  <p className="text-sm text-muted-foreground">{"We're Here to Help"}</p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  const content = (
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                          {info.title}
                        </p>
                        <p className="font-medium text-foreground">{info.value}</p>
                        <p className="text-sm text-muted-foreground">{info.subtext}</p>
                      </div>
                    </div>
                  )

                  return info.href ? (
                    <a
                      key={info.title}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="transition-opacity hover:opacity-80"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={info.title}>{content}</div>
                  )
                })}
              </div>
            </div>

            {/* Service Area */}
            <div className="rounded-xl bg-background p-6 shadow-sm lg:p-8">
              <h2 className="mb-2 text-center font-bold uppercase text-foreground">
                Serving <span className="text-primary">Prescott, ON</span>
              </h2>
              <p className="mb-6 text-center text-sm text-muted-foreground">And Surrounding Areas</p>

              {/* Map placeholder */}
              <div className="relative mb-6 h-48 overflow-hidden rounded-lg bg-muted">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-primary" />
                    <p className="mt-2 text-sm text-muted-foreground">Prescott, ON Area</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="font-bold uppercase text-foreground">Service Area Includes:</h3>
              </div>

              <ul className="flex flex-col gap-2">
                {serviceAreas.map((area) => (
                  <li key={area} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {area}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-muted-foreground">
                Not sure if we service your area? Give us a call – {"we're"} happy to help!
              </p>
            </div>
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
