// Cookie Consent Utility
// GDPR-compliant cookie consent management

export type ConsentPreferences = {
  necessary: boolean; // Always true, cannot be disabled
  functional: boolean;
  analytics: boolean;
  performance: boolean;
  advertisement: boolean;
};

export type ConsentStatus = 'pending' | 'accepted' | 'rejected';

const CONSENT_COOKIE_NAME = 'cookie_consent';
const CONSENT_COOKIE_EXPIRY_DAYS = 365;

/**
 * Read consent cookie from browser
 */
export function getConsentCookie(): ConsentPreferences | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const consentCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${CONSENT_COOKIE_NAME}=`)
  );

  if (!consentCookie) return null;

  try {
    const value = consentCookie.split('=')[1];
    const decoded = decodeURIComponent(value);
    const parsed = JSON.parse(decoded);
    
    // Migrate old format to new format
    if ('analytics' in parsed && !('necessary' in parsed)) {
      return {
        necessary: true,
        functional: false,
        analytics: parsed.analytics === true,
        performance: false,
        advertisement: false,
      };
    }
    
    // Ensure necessary is always true
    return {
      ...parsed,
      necessary: true,
    } as ConsentPreferences;
  } catch {
    return null;
  }
}

/**
 * Check if user has given consent for analytics
 * (backward compatibility)
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getConsentCookie();
  // For backward compatibility, check if old format exists
  if (consent && 'analytics' in consent) {
    return consent.analytics === true;
  }
  return false;
}

/**
 * Check if user has given consent for a specific category
 */
export function hasConsentFor(category: keyof Omit<ConsentPreferences, 'necessary'>): boolean {
  const consent = getConsentCookie();
  if (!consent) return false;
  // Necessary is always true
  if (category === 'necessary') return true;
  return consent[category] === true;
}

/**
 * Check if user has made a consent decision
 */
export function hasConsentDecision(): boolean {
  return getConsentCookie() !== null;
}

/**
 * Set consent cookie
 */
export function setConsentCookie(preferences: ConsentPreferences): void {
  if (typeof document === 'undefined') return;

  const expiryDate = new Date();
  expiryDate.setTime(
    expiryDate.getTime() + CONSENT_COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  );

  const cookieValue = JSON.stringify(preferences);
  const encoded = encodeURIComponent(cookieValue);
  document.cookie = `${CONSENT_COOKIE_NAME}=${encoded}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Accept all cookies (all optional categories enabled)
 */
export function acceptAllCookies(): void {
  setConsentCookie({
    necessary: true,
    functional: true,
    analytics: true,
    performance: true,
    advertisement: true,
  });
}

/**
 * Reject all optional cookies (only necessary cookies enabled)
 */
export function rejectAllCookies(): void {
  setConsentCookie({
    necessary: true,
    functional: false,
    analytics: false,
    performance: false,
    advertisement: false,
  });
}

/**
 * Get default preferences (only necessary enabled)
 */
export function getDefaultPreferences(): ConsentPreferences {
  return {
    necessary: true,
    functional: false,
    analytics: false,
    performance: false,
    advertisement: false,
  };
}

/**
 * Update consent preferences
 */
export function updateConsentPreferences(preferences: ConsentPreferences): void {
  // Ensure necessary is always true
  setConsentCookie({
    ...preferences,
    necessary: true,
  });
}

/**
 * Clear consent cookie (for testing/resetting)
 */
export function clearConsentCookie(): void {
  if (typeof document === 'undefined') return;
  
  // Set cookie to expire in the past to delete it
  document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}
