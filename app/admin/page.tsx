import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getCmsContent, upsertContent } from "@/lib/cms"
import { AdminLoginForm } from "@/components/admin-login-form"
import { AdminImageUploadCard } from "@/components/admin-image-upload-card"

const COOKIE_NAME = "seal_admin_session"

const textLabels: Record<string, string> = {
  hero_eyebrow: "Small intro line", hero_headline: "Main homepage headline", hero_subheadline: "Homepage intro text", services_heading: "Services section heading", process_heading: "Process section heading", cta_heading: "Call-to-action heading", footer_tagline: "Footer tagline",
  projects_heading: "Projects section heading", projects_button_label: "Projects button label", cta_title: "CTA title", cta_subtitle: "CTA subtitle", cta_phone_helper: "CTA phone helper", cta_email_helper: "CTA email helper", footer_description: "Footer description", footer_facebook_label: "Footer Facebook label",
  gallery_heading: "Gallery heading", gallery_intro: "Gallery intro text", phone_display: "Phone display text", phone_tel_link: "Phone tel link", email_address: "Email address", email_mailto_link: "Email mailto link", facebook_url: "Facebook URL",
}

const imageLabels: Record<string, string> = { hero_logo: "Main logo", services_sealcoating: "Sealcoating image", services_crack_filling: "Crack filling image", services_masonry: "Masonry image", services_concrete: "Concrete image" }

async function isAuthed() { return (await cookies()).get(COOKIE_NAME)?.value === "1" }
async function login(formData: FormData) { "use server"; const pass = String(formData.get("password") || ""); if (!process.env.SEAL_ADMIN_PASSWORD || pass !== process.env.SEAL_ADMIN_PASSWORD) return redirect("/admin?error=Invalid+password"); (await cookies()).set(COOKIE_NAME, "1", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" }); redirect("/admin") }
async function logout() { "use server"; (await cookies()).delete(COOKIE_NAME); redirect("/admin") }

async function saveText(formData: FormData) { "use server"; if (!(await isAuthed())) redirect("/admin"); for (const [id, value] of Object.entries(Object.fromEntries(formData.entries()))) await upsertContent(id, String(value)); revalidatePath("/"); revalidatePath("/gallery"); redirect("/admin?success=Website+content+saved") }


export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const authed = await isAuthed(); const { text, images } = await getCmsContent(); const params = await searchParams
  if (!authed) return <main className="mx-auto min-h-screen max-w-md px-4 py-14"><div className="rounded-lg border bg-card p-6 shadow-sm"><h1 className="text-2xl font-black uppercase">Seal The Deal Admin</h1><p className="mt-2 text-sm text-muted-foreground">Update website text, images, and gallery content.</p><AdminLoginForm action={login} error={params.error} /></div></main>

  const galleryImages = Object.entries(images).filter(([slot]) => slot.startsWith("gallery_")).slice(0, 10)
  return <main className="mx-auto max-w-7xl space-y-6 px-4 py-8"><div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-3xl font-black uppercase">Seal The Deal Admin</h1><p className="text-muted-foreground">Update website text, images, and gallery content.</p></div><form action={logout}><button className="rounded-md border border-border px-4 py-2 text-sm font-semibold">Logout</button></form></div>{params.success && <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700">{params.success}</p>}{params.error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700">{decodeURIComponent(params.error)}</p>}
  <section className="rounded-lg border bg-card p-5"><h2 className="text-xl font-bold">Website Text & Settings</h2><form action={saveText} className="mt-4 grid gap-4 md:grid-cols-2">{Object.entries(text).map(([k,v]) => <label key={k} className="space-y-2 text-sm font-medium"><span>{textLabels[k] || k}</span><textarea name={k} defaultValue={v} className="min-h-24 w-full rounded-md border border-border bg-background px-3 py-2"/></label>)}<button className="md:col-span-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground">Save website content</button></form></section>
  <section className="rounded-lg border bg-card p-5"><h2 className="text-xl font-bold">Main Website Images</h2><div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Object.entries(images).filter(([slot]) => !slot.startsWith("gallery_")).map(([id,img]) => <AdminImageUploadCard key={id} id={id} label={imageLabels[id] || id} imageUrl={img.url} alt={img.alt} buttonLabel="Replace image" />)}</div></section>
  <section className="rounded-lg border bg-card p-5"><h2 className="text-xl font-bold">Gallery Images</h2><div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{galleryImages.map(([id,img]) => <AdminImageUploadCard key={id} id={id} label={id.toUpperCase()} imageUrl={img.url} alt={img.alt} buttonLabel="Upload / replace" />)}</div></section></main>
}
