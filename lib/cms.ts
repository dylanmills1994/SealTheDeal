import { CMS_IMAGE_DEFAULTS, CMS_TEXT_DEFAULTS } from "@/lib/site-config"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function rest(path: string, service = false, init?: RequestInit) {
  const key = service ? process.env.SUPABASE_SERVICE_ROLE_KEY : anon
  if (!url || !key) return null
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getCmsContent() {
  try {
    const [textRows, imageRows] = await Promise.all([rest("site_content?select=id,value"), rest("site_images?select=slot,image_url,alt_text")])
    const text = { ...CMS_TEXT_DEFAULTS }
    textRows?.forEach((r: any) => (text[r.id] = r.value))
    const images = { ...CMS_IMAGE_DEFAULTS }
    imageRows?.forEach((r: any) => (images[r.slot] = { url: r.image_url, alt: r.alt_text || r.slot }))
    return { text, images }
  } catch {
    return { text: CMS_TEXT_DEFAULTS, images: CMS_IMAGE_DEFAULTS }
  }
}

export async function upsertContent(id: string, value: string) {
  await rest("site_content?id=eq." + encodeURIComponent(id), true, { method: "POST", headers: { Prefer: "resolution=merge-duplicates" }, body: JSON.stringify({ id, value }) })
}
