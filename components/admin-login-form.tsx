"use client"

import { useState } from "react"

export function AdminLoginForm({ action, error }: { action: (formData: FormData) => void; error?: string }) {
  const [show, setShow] = useState(false)
  return (
    <form action={action} className="mt-5 space-y-3">
      <input
        name="password"
        type={show ? "text" : "password"}
        className="w-full rounded-md border border-border bg-background px-3 py-2"
        placeholder="Owner password"
        required
      />
      <button type="button" onClick={() => setShow((v) => !v)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
        {show ? "Hide password" : "Show password"}
      </button>
      <button className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground">Login</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}
