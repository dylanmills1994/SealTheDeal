import Image from "next/image"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getCmsContent, upsertContent } from "@/lib/cms"
import { AdminLoginForm } from "@/components/admin-login-form"

const COOKIE_NAME = "seal_admin_session"
const BUCKET = "seal-the-deal-images"
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_BYTES = 8 * 1024 * 1024

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

async function uploadImage(formData: FormData) {
  "use server"
  if (!(await isAuthed())) redirect("/admin")
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) redirect("/admin?error=Missing+Supabase+env")

  const slot = String(formData.get("id") || "")
  const file = formData.get("file") as File | null
  const alt = String(formData.get("alt") || slot)
  if (!slot || !file || !file.size) redirect("/admin?error=Please+choose+an+image+file")
  if (!ALLOWED_TYPES.includes(file.type) || file.size > MAX_BYTES) redirect("/admin?error=Upload+must+be+jpg%2C+jpeg%2C+png%2C+or+webp+under+8MB")

  const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1]
  const path = `${slot}/${Date.now()}.${ext}`
  const upload = await fetch(`${url}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": file.type, "x-upsert": "true" },
    body: Buffer.from(await file.arrayBuffer()),
  })
  if (!upload.ok) redirect(`/admin?error=Upload+failed%3A+${encodeURIComponent(await upload.text())}`)

  const save = await fetch(`${url}/rest/v1/site_images`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({ slot, label: slot, image_url: `${url}/storage/v1/object/public/${BUCKET}/${path}`, storage_path: path, alt_text: alt, sort_order: slot.startsWith("gallery_") ? 200 : 100, is_active: true }),
  })
  if (!save.ok) redirect(`/admin?error=Database+save+failed%3A+${encodeURIComponent(await save.text())}`)

  revalidatePath("/"); revalidatePath("/gallery"); revalidatePath("/admin")
  redirect("/admin?success=Image+updated+successfully")
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const authed = await isAuthed(); const { text, images } = await getCmsContent(); const params = await searchParams
  if (!authed) return <main className="mx-auto min-h-screen max-w-md px-4 py-14"><div className="rounded-lg border bg-card p-6 shadow-sm"><h1 className="text-2xl font-black uppercase">Seal The Deal Admin</h1><p className="mt-2 text-sm text-muted-foreground">Update website text, images, and gallery content.</p><AdminLoginForm action={login} error={params.error} /></div></main>

  const galleryImages = Object.entries(images).filter(([slot]) => slot.startsWith("gallery_")).slice(0, 10)
  return <main className="mx-auto max-w-7xl space-y-6 px-4 py-8"><div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-3xl font-black uppercase">Seal The Deal Admin</h1><p className="text-muted-foreground">Update website text, images, and gallery content.</p></div><form action={logout}><button className="rounded-md border border-border px-4 py-2 text-sm font-semibold">Logout</button></form></div>{params.success && <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700">{params.success}</p>}{params.error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700">{decodeURIComponent(params.error)}</p>}
  <section className="rounded-lg border bg-card p-5"><h2 className="text-xl font-bold">Website Text & Settings</h2><form action={saveText} className="mt-4 grid gap-4 md:grid-cols-2">{Object.entries(text).map(([k,v]) => <label key={k} className="space-y-2 text-sm font-medium"><span>{textLabels[k] || k}</span><textarea name={k} defaultValue={v} className="min-h-24 w-full rounded-md border border-border bg-background px-3 py-2"/></label>)}<button className="md:col-span-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground">Save website content</button></form></section>
  <section className="rounded-lg border bg-card p-5"><h2 className="text-xl font-bold">Main Website Images</h2><div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Object.entries(images).filter(([slot]) => !slot.startsWith("gallery_")).map(([id,img]) => <form key={id} action={uploadImage} className="rounded-md border p-3"><p className="mb-2 text-sm font-semibold">{imageLabels[id] || id}</p><Image src={img.url} alt={img.alt} width={600} height={300} className="mb-2 h-40 w-full rounded-md object-cover" /><input type="hidden" name="id" value={id}/><input name="alt" defaultValue={img.alt} className="mb-2 w-full rounded-md border border-border px-3 py-2 text-sm"/><input required name="file" type="file" accept=".jpg,.jpeg,.png,.webp" className="mb-2 w-full text-sm"/><button className="w-full rounded-md bg-primary px-3 py-2 text-primary-foreground">Replace image</button></form>)}</div></section>
  <section className="rounded-lg border bg-card p-5"><h2 className="text-xl font-bold">Gallery Images</h2><div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{galleryImages.map(([id,img]) => <form key={id} action={uploadImage} className="rounded-md border p-3"><p className="mb-2 text-sm font-semibold uppercase">{id}</p><Image src={img.url} alt={img.alt} width={600} height={300} className="mb-2 h-40 w-full rounded-md object-cover" /><input type="hidden" name="id" value={id}/><input name="alt" defaultValue={img.alt} className="mb-2 w-full rounded-md border border-border px-3 py-2 text-sm" placeholder="Caption (optional)"/><input required name="file" type="file" accept=".jpg,.jpeg,.png,.webp" className="mb-2 w-full text-sm"/><button className="w-full rounded-md bg-primary px-3 py-2 text-primary-foreground">Upload / replace</button></form>)}</div></section></main>
}
