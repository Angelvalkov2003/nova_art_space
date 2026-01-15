"use client";

import Script from "next/script";

// CookieYes integration with Google Analytics Consent Mode
// Works only if NEXT_PUBLIC_COOKIEYES_ID is set in .env.local
// CookieYes will automatically update gtag consent when user accepts/rejects cookies
export default function CookieYes() {
  const cookieYesId = process.env.NEXT_PUBLIC_COOKIEYES_ID;

  // Don't render if CookieYes ID is not set
  if (!cookieYesId) {
    return null;
  }

  return (
    <Script
      id="cookieyes"
      strategy="beforeInteractive"
      src={`https://cdn-cookieyes.com/client_data/${cookieYesId}/script.js`}
    />
  );
}

