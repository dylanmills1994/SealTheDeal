"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function AdminImageUploadCard({
  id,
  label,
  imageUrl,
  alt,
  buttonLabel,
}: {
  id: string
  label: string
  imageUrl: string
  alt: string
  buttonLabel: string
}) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  async function onSubmit(formData: FormData) {
    setPending(true)
    setStatus(null)
    try {
      const response = await fetch("/api/admin/images", { method: "POST", body: formData })
      const result = await response.json()
      if (!response.ok) {
        setStatus(result.error || "Upload failed")
        return
      }
      setStatus("Image updated successfully")
      router.refresh()
    } catch {
      setStatus("Unexpected upload error")
    } finally {
      setPending(false)
    }
  }

  return (
    <form action={onSubmit} className="rounded-md border p-3">
      <p className="mb-2 text-sm font-semibold">{label}</p>
      <Image src={imageUrl} alt={alt} width={600} height={300} className="mb-2 h-40 w-full rounded-md object-cover" />
      <input type="hidden" name="id" value={id} />
      <input name="alt" defaultValue={alt} className="mb-2 w-full rounded-md border border-border px-3 py-2 text-sm" />
      <input required name="file" type="file" accept=".jpg,.jpeg,.png,.webp" className="mb-2 w-full text-sm" disabled={pending} />
      <button className="w-full rounded-md bg-primary px-3 py-2 text-primary-foreground disabled:opacity-60" disabled={pending}>
        {pending ? "Uploading..." : buttonLabel}
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  )
}
