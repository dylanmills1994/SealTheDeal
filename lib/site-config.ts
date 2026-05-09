export const DEFAULT_PHONE_DISPLAY = "(343) 260-9276"
export const DEFAULT_PHONE_HREF = "tel:+13432609276"
export const DEFAULT_EMAIL = "sealthedeal1994@gmail.com"
export const DEFAULT_EMAIL_HREF = "mailto:sealthedeal1994@gmail.com?subject=Seal%20The%20Deal%20Quote%20Request"
export const DEFAULT_FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100091760627380"

export const CMS_TEXT_DEFAULTS: Record<string, string> = {
  hero_eyebrow: "Local. Professional. Trusted.",
  hero_headline: "Driveways.\nStonework.\nConcrete.\nDone Right.",
  hero_subheadline:
    "Quality asphalt care, masonry, and concrete work for homes and businesses in Prescott, ON and surrounding communities.",
  services_heading: "Complete Solutions for Your Property",
  process_heading: "Our Process",
  cta_heading: "Ready to Get Started?",
  footer_tagline: "Fully Insured | Trusted | Local",
  phone_display: DEFAULT_PHONE_DISPLAY,
  email_address: DEFAULT_EMAIL,
}

export const CMS_IMAGE_DEFAULTS: Record<string, { url: string; alt: string }> = {
  hero_logo: { url: "/images/Gallery/seal-the-deal-logo-clean.png", alt: "Seal The Deal Asphalt Care & Masonry logo" },
  services_sealcoating: { url: "/images/Gallery/20.jpg", alt: "Sealcoating" },
  services_crack_filling: { url: "/images/Gallery/23.jpg", alt: "Crack Filling" },
  services_masonry: { url: "/images/Gallery/30.jpg", alt: "Masonry Work" },
  services_concrete: { url: "/images/Gallery/25.jpg", alt: "Concrete Work" },
}
