import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getCmsContent, upsertContent } from "@/lib/cms"

const COOKIE_NAME = "seal_admin_session"
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_BYTES = 8 * 1024 * 1024

async function isAuthed() {
  const store = await cookies()
  return store.get(COOKIE_NAME)?.value === "1"
}

async function login(formData: FormData) {
  "use server"
  const pass = String(formData.get("password") || "")
  if (!process.env.SEAL_ADMIN_PASSWORD || pass !== process.env.SEAL_ADMIN_PASSWORD) return redirect("/admin?error=Invalid+password")
  const store = await cookies()
  store.set(COOKIE_NAME, "1", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" })
  redirect("/admin")
}

async function logout() {
  "use server"
  const store = await cookies()
  store.delete(COOKIE_NAME)
  redirect("/admin")
}

async function saveText(formData: FormData) {
  "use server"
  if (!(await isAuthed())) redirect("/admin")
  const entries = Object.fromEntries(formData.entries())
  for (const [id, value] of Object.entries(entries)) await upsertContent(id, String(value))
  revalidatePath("/")
  redirect("/admin?success=Text+saved")
}

async function uploadImage(formData: FormData) {
  "use server"
  if (!(await isAuthed())) redirect("/admin")
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) redirect("/admin?error=Missing+Supabase+env")
  revalidatePath("/")
  redirect("/admin?success=Image+updated")
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const authed = await isAuthed()
  const { text, images } = await getCmsContent()
  const params = await searchParams

  if (!authed) {
    return <main className="mx-auto max-w-md p-6"><h1 className="mb-4 text-2xl font-bold">Admin Login</h1><form action={login} className="space-y-3"><input name="password" type="password" className="w-full rounded border p-2" placeholder="Owner password" required /><button className="w-full rounded bg-black px-4 py-2 text-white">Login</button>{params.error && <p className="text-sm text-red-600">{params.error}</p>}</form></main>
  }

  return <main className="mx-auto max-w-4xl space-y-6 p-4 md:p-8"><div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Website Admin</h1><form action={logout}><button className="rounded border px-3 py-2">Logout</button></form></div>{params.success && <p className="text-green-600">{params.success}</p>}{params.error && <p className="text-red-600">{params.error}</p>}<section className="rounded border p-4"><h2 className="mb-3 font-semibold">Text Content</h2><form action={saveText} className="grid gap-3 md:grid-cols-2">{Object.entries(text).map(([k,v]) => <label key={k} className="text-sm">{k.replaceAll("_"," ")}<textarea name={k} defaultValue={v} className="mt-1 min-h-20 w-full rounded border p-2"/></label>)}<button className="md:col-span-2 rounded bg-black px-4 py-2 text-white">Save text</button></form></section><section className="rounded border p-4"><h2 className="mb-3 font-semibold">Images</h2><div className="grid gap-4 md:grid-cols-2">{Object.entries(images).map(([id,img]) => <form key={id} action={uploadImage} className="rounded border p-3"><p className="mb-2 text-sm font-medium">{id}</p><img src={img.url} alt={img.alt} className="mb-2 h-28 w-full rounded object-cover"/><input type="hidden" name="id" value={id}/><input required name="file" type="file" accept=".jpg,.jpeg,.png,.webp" className="mb-2 text-sm"/><button className="w-full rounded bg-black px-3 py-2 text-white">Replace image</button></form>)}</div></section></main>
}
