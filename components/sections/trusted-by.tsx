"use client";

import { useEffect, useState } from "react";
import { clientLogos as staticClientLogos } from "@/lib/data";
import { Marquee } from "@/components/marquee";
import { supabase } from "@/lib/supabase";

export function TrustedBy() {
  const [clientLogos, setClientLogos] = useState<typeof staticClientLogos | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadClientLogos() {
      const { data, error } = await supabase
        .from("client_logos")
        .select("name, logo")
        .order("sort_order", { ascending: true });
      if (cancelled) return;
      setClientLogos(!error && data && data.length > 0 ? data : staticClientLogos);
    }
    loadClientLogos();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative overflow-hidden border-y border-[var(--panel-border)] bg-void py-9">
      <div className="diagonal-lines-texture pointer-events-none absolute inset-0 opacity-50" />
      {clientLogos === null ? (
        <div className="flex items-center gap-6 overflow-hidden px-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-16 w-32 shrink-0 animate-pulse rounded-md bg-panel-2"
            />
          ))}
        </div>
      ) : (
        <Marquee items={clientLogos}></Marquee>
      )}
    </div>
  );
}