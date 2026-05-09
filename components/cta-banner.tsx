import { Phone, Mail } from "lucide-react"

export function CtaBanner() {
  return (
    <section id="contact" className="bg-primary py-6">
      <div id="quote-form" className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Phone className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-lg font-bold uppercase text-primary-foreground">Ready to Start Your Project?</p>
              <p className="text-sm text-primary-foreground/80">Call or email us today for your free estimate!</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
            <a href="tel:+13432609276" className="flex items-center gap-3 text-primary-foreground transition-opacity hover:opacity-80">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">(343) 260-9276</p>
                <p className="text-xs text-primary-foreground/80">Call or Text</p>
              </div>
            </a>
            <a
              href="mailto:sealthedeal1994@gmail.com?subject=Seal%20The%20Deal%20Quote%20Request"
              className="flex items-center gap-3 text-primary-foreground transition-opacity hover:opacity-80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">sealthedeal1994@gmail.com</p>
                <p className="text-xs text-primary-foreground/80">Email Us</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
