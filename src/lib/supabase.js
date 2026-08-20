import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith("http"),
);

let client = null;

if (isSupabaseConfigured) {
  client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export function supabase() {
  return client;
}

export function siteUrl() {
  const url = (import.meta.env.VITE_SITE_URL || "").trim();
  return url.replace(/\/+$/, "");
}

export function isSiteUrlConfigured() {
  return Boolean(siteUrl());
}

export function siteUrlOrFallback() {
  return siteUrl() || "https://DOMINIO-DE-LA-BODA.com";
}