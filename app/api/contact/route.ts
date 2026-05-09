import { NextResponse } from "next/server"

const destinationEmail = "sealthedeal1994@gmail.com"
const subject = "Seal The Deal Quote Request"

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    return NextResponse.json({ success: false, error: "Missing WEB3FORMS_ACCESS_KEY" }, { status: 500 })
  }

  try {
    const { name, email, phone, message, source } = await request.json()
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const payload = {
      access_key: accessKey,
      subject,
      from_name: "Seal The Deal Website",
      to: destinationEmail,
      name,
      email,
      phone: phone || "N/A",
      message,
      source: source || "unknown",
    }

    const web3Response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const result = await web3Response.json()
    if (!web3Response.ok || !result.success) {
      return NextResponse.json({ success: false, error: result.message || "Web3Forms request failed" }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: "Unexpected server error" }, { status: 500 })
  }
}
