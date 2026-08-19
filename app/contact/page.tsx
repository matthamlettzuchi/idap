"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Loader2, AlertCircle } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { FloatingActions } from "@/components/floating-actions";
import { storageUrl } from "@/lib/storage";
import Script from "next/script";

const ACCENT_BLUE = "#2f6fe0";

const officeLocations = [
  {
    region: "West Jakarta",
    address: "Taman Palem Complex, H Block No. 61, Indonesia",
  },
];

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  message: string;
  company: string; // honeypot — must always stay empty
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  message: "",
  company: "",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-[13.5px] font-semibold text-[#12141c]">
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[14px] text-[#12141c] placeholder:text-[#9aa0ae] outline-none transition-colors focus:border-[#2f6fe0]";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Register global callbacks for reCAPTCHA
    (window as any).onRecaptchaVerify = (token: string) => {
      setCaptchaToken(token);
    };
    (window as any).onRecaptchaExpire = () => {
      setCaptchaToken(null);
    };

    const renderRecaptcha = () => {
      if (
        typeof window !== "undefined" &&
        (window as any).grecaptcha &&
        (window as any).grecaptcha.render &&
        recaptchaRef.current &&
        recaptchaRef.current.innerHTML === ""
      ) {
        try {
          widgetIdRef.current = (window as any).grecaptcha.render(
            recaptchaRef.current,
            {
              sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
              callback: "onRecaptchaVerify",
              "expired-callback": "onRecaptchaExpire",
            },
          );
        } catch (error) {
          console.error("Failed to render reCAPTCHA:", error);
        }
      }
    };

    // If script was already loaded (SPA navigation back to contact page)
    if ((window as any).grecaptcha?.render) {
      renderRecaptcha();
    } else {
      // First load or hard refresh
      (window as any).onRecaptchaLoad = () => {
        renderRecaptcha();
      };
    }
  }, []);

  const resetCaptcha = () => {
    setCaptchaToken(null);
    if (
      typeof window !== "undefined" &&
      (window as any).grecaptcha &&
      widgetIdRef.current !== null
    ) {
      try {
        (window as any).grecaptcha.reset(widgetIdRef.current);
      } catch (err) {
        console.error("Error resetting captcha:", err);
      }
    }
  };

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!captchaToken) {
      setErrorMessage("Please complete the verification before submitting.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(
          data?.error ?? "Something went wrong. Please try again.",
        );
      }

      setSubmitted(true);
      setForm(initialForm);
      resetCaptcha();
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      resetCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans">
      <Nav overlayHero />

      <main>
        <div className="relative -mt-28 left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen min-h-screen pt-28 overflow-hidden">
          <Image
            src={storageUrl("images", "skaiskrepers.jpg")}
            alt=""
            height={420}
            width={800}
            aria-hidden
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://placehold.co/1920x1200/4a90e2/eaf4ff?text=City+Skyline+Background";
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/45 via-black/10 to-transparent" />
          <div className="relative z-10 flex min-h-screen flex-col justify-center gap-10 px-6 pb-16 pt-36 sm:px-10 lg:px-14 lg:pb-14 lg:pt-32">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8">
              <div className="max-w-xl">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="sm:hidden md:hidden lg:block font-mono text-[13px] font-semibold tracking-[0.12em]"
                  style={{ color: "#9fc4ff" }}
                >
                  (CONTACT)
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-4 font-display text-[clamp(36px,5.6vw,64px)] font-extrabold leading-[0.98] text-white"
                >
                  Get in Touch
                  <br />
                  With Us
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.16,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-6 max-w-md text-[15.5px] leading-relaxed text-white/85"
                >
                  We would love to hear from you. Whether you have a question,
                  feedback, or want to explore working together, our team is
                  here to listen.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-8 flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md w-fit"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: ACCENT_BLUE, color: "#ffffff" }}
                  >
                    <MapPin size={16} strokeWidth={2} />
                  </span>

                  {officeLocations.map((office) => (
                    <div key={office.region}>
                      <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/60">
                        {office.region}
                      </div>

                      <div className="text-[13.5px] font-medium text-white">
                        {office.address}
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.38,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-5 w-full max-w-md overflow-hidden rounded-2xl border border-white/20"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.950810276371!2d106.72611791065869!3d-6.137311360143064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d55c3cea385%3A0x84c60065b48649f!2sPT%20Intidata%20Anugrah%20Pratama!5e0!3m2!1sen!2sid!4v1786522775801!5m2!1sen!2sid"
                    width="100%"
                    height="220"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Intidata office location"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full rounded-3xl bg-white p-7 shadow-[0_30px_70px_-24px_rgba(10,30,80,0.45)] sm:p-9"
              >
                {submitted ? (
                  <div className="flex min-h-105 flex-col items-center justify-center text-center">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full text-[24px] font-bold text-white"
                      style={{ background: ACCENT_BLUE }}
                    >
                      ✓
                    </span>
                    <h3 className="mt-5 font-display text-[20px] font-semibold text-[#12141c]">
                      Message sent
                    </h3>
                    <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-[#545b6e]">
                      Thanks for reaching out — our team will get back to you
                      shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-[13.5px] font-semibold underline underline-offset-4"
                      style={{ color: ACCENT_BLUE }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Script
                      src="https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad"
                      strategy="lazyOnload"
                    />
                    {/* Honeypot field — hidden from real users, catches simple bots */}
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    <div>
                      <FieldLabel>Full Name</FieldLabel>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        className={inputClass}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <FieldLabel>Phone Number</FieldLabel>
                        <input
                          type="tel"
                          placeholder="Your phone number"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className={inputClass}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <FieldLabel>Email Address</FieldLabel>
                        <input
                          type="email"
                          placeholder="Your email address"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={inputClass}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Message</FieldLabel>
                      <textarea
                        placeholder="Write a message"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={4}
                        className={`${inputClass} resize-none`}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex justify-center">
                      <div ref={recaptchaRef} />
                    </div>

                    {errorMessage && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] leading-relaxed text-red-700">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !captchaToken}
                      className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                      style={{ background: ACCENT_BLUE }}
                    >
                      {isSubmitting && (
                        <Loader2 size={17} className="animate-spin" />
                      )}
                      {isSubmitting ? "Sending..." : "Submit"}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
