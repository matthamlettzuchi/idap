"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LimitedInput } from "@/components/admin/ui/limited-input";
import { FIELD_LIMITS } from "@/lib/admin/field-limits";
import { saveContactFormSettings } from "@/app/admin/(protected)/contact-settings/actions";
import type { AdminContactFormSettings } from "@/lib/admin/contact-settings";
import { SuccessToast } from "@/components/admin/ui/success-toast";

function computeOverLimit(s: AdminContactFormSettings): boolean {
  return (
    s.destination_email.length > FIELD_LIMITS.email ||
    s.sender_name.length > FIELD_LIMITS.name
  );
}

function snapshot(s: AdminContactFormSettings) {
  return JSON.stringify(s);
}

export function ContactSettingsEditor({
  initial,
}: {
  initial: AdminContactFormSettings;
}) {
  const [settings, setSettings] = useState<AdminContactFormSettings>(initial);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const router = useRouter();

  const baselineRef = useRef(snapshot(initial));
  const isDirty = snapshot(settings) !== baselineRef.current;
  const overLimit = computeOverLimit(settings);

  function set<K extends keyof AdminContactFormSettings>(
    key: K,
    value: AdminContactFormSettings[K]
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (overLimit || !isDirty) return;
    setError(null);
    startTransition(async () => {
      try {
        await saveContactFormSettings(settings);
        baselineRef.current = snapshot(settings);
        setSavedAt(new Date());
        setToastMsg("Contact form settings saved successfully.");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan.");
      }
    });
  }

  return (
    <div className="max-w-2xl space-y-6 pb-16">
      <div className="flex items-center justify-end gap-3">
        {savedAt && (
          <span className="text-[12px] text-ink-2">
            Saved {savedAt.toLocaleTimeString()}
          </span>
        )}
        {overLimit && (
          <span className="text-[12px] font-medium text-red-500">
            Fix fields over their character limit before saving.
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={pending || overLimit || !isDirty}
          className="rounded-full bg-signal-blue px-5 py-2.5 text-[13px] font-medium text-white disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div>
          <div className="mono-label">Recipient</div>
          <p className="mt-1 text-[12px] text-ink-2">
            Semua pesan dari form /contact akan dikirim ke alamat ini.
          </p>
        </div>
        <LimitedInput
          label="Destination Email"
          type="email"
          maxLength={FIELD_LIMITS.email}
          value={settings.destination_email}
          onChange={(e) => set("destination_email", e.target.value)}
          placeholder="you@company.com"
        />
      </section>

      <section className="space-y-4 rounded-xl border border-(--panel-border) bg-panel p-6">
        <div>
          <div className="mono-label">Sender Display Name</div>
          <p className="mt-1 text-[12px] text-ink-2">
            Nama yang tampil di kolom &quot;From&quot; (mis. &quot;Intidata
            Website&quot;). Domain pengirim tetap mengikuti domain yang sudah
            terverifikasi di Resend — cuma nama tampilan ini yang bisa
            diganti dari sini.
          </p>
        </div>
        <LimitedInput
          label="Sender Name"
          maxLength={FIELD_LIMITS.name}
          value={settings.sender_name}
          onChange={(e) => set("sender_name", e.target.value)}
          placeholder="Intidata Website"
        />
      </section>

      <div className="rounded-xl border border-dashed border-(--panel-border-strong) bg-panel-2 p-4 text-[12px] leading-relaxed text-ink-2">
        API key Resend dan reCAPTCHA secret disimpan sebagai environment
        variable di server/Vercel — tidak ada di database, jadi tidak
        muncul dan tidak bisa diedit di halaman admin manapun.
      </div>

      <SuccessToast
        message={toastMsg ?? ""}
        show={toastMsg !== null}
        onClose={() => setToastMsg(null)}
      />
    </div>
  );
}