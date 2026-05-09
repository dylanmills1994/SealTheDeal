import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const COOKIE_NAME = "seal_admin_session"
const BUCKET = "site-assets"
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_BYTES = 8 * 1024 * 1024

function getExtension(mimeType: string) {
  if (mimeType === "image/jpeg") return "jpg"
  if (mimeType === "image/png") return "png"
  if (mimeType === "image/webp") return "webp"
  if (mimeType === "image/gif") return "gif"
  return null
}

function toStoragePath(slot: string, ext: string) {
  const safeSlot = slot.toLowerCase().replace(/[^a-z0-9_-]/g, "_")
  return `${safeSlot}/${Date.now()}.${ext}`
}

function isValidSupabaseProjectUrl(url: string) {
  return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)
}

export async function POST(request: Request) {
  if ((await cookies()).get(COOKIE_NAME)?.value !== "1") {
    return NextResponse.json({ error: "Unauthorized admin session" }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    return NextResponse.json({ error: "Missing Supabase server environment" }, { status: 500 })
  }
  if (!isValidSupabaseProjectUrl(url)) {
    return NextResponse.json({ error: "NEXT_PUBLIC_SUPABASE_URL must be https://<project-ref>.supabase.co" }, { status: 500 })
  }

  try {
    const formData = await request.formData()
    const slot = String(formData.get("id") || "").trim()
    const file = formData.get("file")

    if (!slot || !(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Missing slot or file" }, { status: 400 })
    }
    if (!ALLOWED_TYPES.includes(file.type) || file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Upload must be jpg, jpeg, png, webp, or gif under 8MB" }, { status: 400 })
    }

    const ext = getExtension(file.type)
    if (!ext) return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })

    const storagePath = toStoragePath(slot, ext)
    const upload = await fetch(`${url}/storage/v1/object/${BUCKET}/${storagePath}`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": file.type,
        "x-upsert": "true",
      },
      body: Buffer.from(await file.arrayBuffer()),
    })
    if (!upload.ok) {
      return NextResponse.json({ error: `Storage upload failed: ${await upload.text()}` }, { status: 502 })
    }

    const imageUrl = `${url}/storage/v1/object/public/${BUCKET}/${storagePath}`
    const upsert = await fetch(`${url}/rest/v1/site_images?on_conflict=slot`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        slot,
        image_url: imageUrl,
        storage_path: storagePath,
        is_active: true,
        updated_at: new Date().toISOString(),
      }),
    })

    if (!upsert.ok) {
      return NextResponse.json({ error: `site_images upsert failed: ${await upsert.text()}` }, { status: 502 })
    }

    return NextResponse.json({ success: true, imageUrl, slot })
  } catch {
    return NextResponse.json({ error: "Unexpected upload error" }, { status: 500 })
  }
}
