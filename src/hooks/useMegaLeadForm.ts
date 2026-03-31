"use client";

import { useEffect, useCallback, useRef } from "react";

// Replace with real values from MEGA Admin after site registration
const CONFIG = {
  CUSTOMER_ID: "11cf1e78-1aa5-4b92-9caf-adacc5bf2723",
  SITE_ID: "PLACEHOLDER",
  SOURCE_PROVIDER: "customer-landing-revup",
  ENDPOINT: "https://analytics.gomega.ai/submission/submit",
};

const STORAGE_KEYS = {
  VISITOR_ID: "_mega_vid",
  SESSION_ID: "_mega_sid",
  ATTRIBUTION: "_mega_attr",
};

interface Attribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  fbp: string | null;
  fbc: string | null;
}

interface SubmissionPayload {
  customer_id: string;
  site_id: string;
  source_provider: string;
  form_data: Record<string, unknown>;
  url: string;
  referrer_url: string | null;
  session_id: string;
  visitor_id: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  fbp: string | null;
  fbc: string | null;
}

const generateId = (prefix: string): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  )}`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const getVisitorId = (): string => {
  if (typeof localStorage === "undefined") return generateId("vis");
  let vid = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
  if (!vid) { vid = generateId("vis"); localStorage.setItem(STORAGE_KEYS.VISITOR_ID, vid); }
  return vid;
};

const getSessionId = (): string => {
  if (typeof sessionStorage === "undefined") return generateId("sess");
  let sid = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!sid) { sid = generateId("sess"); sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sid); }
  return sid;
};

const captureAttribution = (): Attribution => {
  if (typeof window === "undefined") {
    return { utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, utm_content: null, gclid: null, gbraid: null, wbraid: null, fbclid: null, fbp: null, fbc: null };
  }
  const params = new URL(window.location.href).searchParams;
  const a: Attribution = {
    utm_source: params.get("utm_source"), utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"), utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"), gclid: params.get("gclid"),
    gbraid: params.get("gbraid"), wbraid: params.get("wbraid"),
    fbclid: params.get("fbclid"), fbp: getCookie("_fbp"), fbc: getCookie("_fbc"),
  };
  if (a.fbclid && !a.fbc) a.fbc = `fb.1.${Date.now()}.${a.fbclid}`;
  return a;
};

const initAttribution = (): Attribution => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return captureAttribution();
  const trackingParams = ["utm_source", "gclid", "fbclid", "gbraid", "wbraid"];
  const url = new URL(window.location.href);
  if (trackingParams.some((p) => url.searchParams.has(p))) {
    const a = captureAttribution();
    localStorage.setItem(STORAGE_KEYS.ATTRIBUTION, JSON.stringify(a));
    return a;
  }
  const stored = localStorage.getItem(STORAGE_KEYS.ATTRIBUTION);
  if (stored) { try { return JSON.parse(stored) as Attribution; } catch { /* ignore */ } }
  const a = captureAttribution();
  localStorage.setItem(STORAGE_KEYS.ATTRIBUTION, JSON.stringify(a));
  return a;
};

export function useMegaLeadForm() {
  const isInit = useRef(false);
  useEffect(() => { if (!isInit.current) { initAttribution(); isInit.current = true; } }, []);

  const submit = useCallback(async (formData: Record<string, unknown>) => {
    if (formData.phone) {
      const digits = String(formData.phone).replace(/\D/g, "");
      if (digits.length !== 10) throw new Error("Phone must be exactly 10 digits");
      formData.phone = digits;
    }
    if (!formData.firstName || !formData.email) throw new Error("firstName and email are required");

    const attribution = initAttribution();
    const payload: SubmissionPayload = {
      customer_id: CONFIG.CUSTOMER_ID, site_id: CONFIG.SITE_ID,
      source_provider: CONFIG.SOURCE_PROVIDER, form_data: formData,
      url: window.location.href, referrer_url: document.referrer || null,
      session_id: getSessionId(), visitor_id: getVisitorId(),
      ...attribution,
    };

    const response = await fetch(CONFIG.ENDPOINT, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result = await response.json();

    // MANDATORY: Explicit MegaTag trackEvent for React form submissions
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      if (typeof window !== "undefined" && w.MegaTag) {
        w.MegaTag.trackEvent("form_submit", {
          ...formData,
          form_id: "revup-lead-form",
          submission_id: result?.id || "",
        });
      }
    } catch (e) {
      console.warn("MegaTag trackEvent failed:", e);
    }

    return result;
  }, []);

  return { submit, isReady: typeof window !== "undefined" };
}

export default useMegaLeadForm;
