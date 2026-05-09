import { Phone, Mail } from "lucide-react"
import { DEFAULT_EMAIL_HREF } from "@/lib/site-config"

export function CtaBanner({ cms }: { cms?: { text?: Record<string, string> } }) {
  const text = cms?.text ?? {}
  return (
    <section id="contact" className="bg-primary py-6">
      <div id="quote-form" className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Phone className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-lg font-bold uppercase text-primary-foreground">{text.cta_title || "Ready to Start Your Project?"}</p>
              <p className="text-sm text-primary-foreground/80">{text.cta_subtitle || "Call or email us today for your free estimate!"}</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-6 lg:gap-8">
            <a
              href={text.phone_tel_link || "tel:+13432609276"}
              className="flex w-full items-center gap-3 text-primary-foreground transition-opacity hover:opacity-80 sm:w-auto"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Phone className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold">{text.phone_display || "(343) 260-9276"}</p>
                <p className="text-xs text-primary-foreground/80">{text.cta_phone_helper || "Call or Text"}</p>
              </div>
            </a>
            <a
              href={DEFAULT_EMAIL_HREF}
              className="flex w-full items-center gap-3 text-primary-foreground transition-opacity hover:opacity-80 sm:w-auto"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="break-all font-semibold">{text.email_address || "sealthedeal1994@gmail.com"}</p>
                <p className="text-xs text-primary-foreground/80">{text.cta_email_helper || "Email Us"}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
