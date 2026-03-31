"use client";

import { useEffect } from "react";

export default function QueryParamPersistence() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const trackingKeys = [
      "utm_source", "utm_medium", "utm_campaign", "utm_term",
      "utm_content", "fbclid", "gclid", "msclkid", "ttclid",
    ];
    const stored: Record<string, string> = {};
    try {
      const existing = sessionStorage.getItem("query_params");
      if (existing) Object.assign(stored, JSON.parse(existing));
    } catch { /* ignore */ }
    let updated = false;
    trackingKeys.forEach((key) => {
      const value = params.get(key);
      if (value) { stored[key] = value; updated = true; }
    });
    if (updated) sessionStorage.setItem("query_params", JSON.stringify(stored));
  }, []);
  return null;
}
