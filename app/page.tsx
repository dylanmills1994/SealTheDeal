import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { CtaBanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"
import { getCmsContent } from "@/lib/cms"

export default async function Home() {
  const cms = await getCmsContent()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero cms={cms} />
        <Features />
        <Services cms={cms} />
        <Projects />
        <CtaBanner />
      </main>
      <Footer cms={cms} />
    </div>
  )
}
