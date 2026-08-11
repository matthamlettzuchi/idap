"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/ui/reveal";

const ACCENT_LIME = "#227ed1";

const officeLocations = [
  {
    region: "West Jakarta",
    address: "Taman Palem Complex, H Block No. 61, Indonesia",
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  business: string;
  message: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  business: "",
  message: "",
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

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Hook this up to your backend / email service of choice.
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <div className="min-h-screen bg-void text-ink-0 font-sans">
      <Nav overlayHero />

      <main>
        <div className="relative -mt-28 left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen lg:h-screen lg:min-h-[900px] overflow-hidden">
          <img
            src="/skaiskrepers.jpg"
            alt=""
            aria-hidden
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://placehold.co/1920x1200/4a90e2/eaf4ff?text=City+Skyline+Background";
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* light overlay for text legibility — remove if the photo already reads fine */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />

          <div className="relative z-10 flex min-h-full flex-col justify-between gap-10 px-6 pb-10 pt-36 sm:px-10 lg:px-14 lg:pb-8 lg:pt-60">
            {/* copy + form */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8">
              {/* LEFT — copy */}
              <div className="max-w-xl">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-[13px] font-semibold tracking-[0.12em]"
                  style={{ color: "darkblue" }}
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
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full rounded-[24px] bg-white p-6 shadow-[0_30px_70px_-24px_rgba(10,30,80,0.45)] sm:p-8 lg:max-h-[calc(100vh-240px)]"
              >
                {submitted ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full text-[24px] font-bold text-[#12141c]"
                      style={{ background: ACCENT_LIME }}
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
                      className="mt-6 text-[13.5px] font-semibold text-[#2f6fe0] underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <FieldLabel>First Name</FieldLabel>
                        <input
                          type="text"
                          placeholder="Your first name"
                          value={form.firstName}
                          onChange={(e) => update("firstName", e.target.value)}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <FieldLabel>Last Name</FieldLabel>
                        <input
                          type="text"
                          placeholder="Your last name"
                          value={form.lastName}
                          onChange={(e) => update("lastName", e.target.value)}
                          className={inputClass}
                          required
                        />
                      </div>
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
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Business Name</FieldLabel>
                      <input
                        type="text"
                        placeholder="Your business name"
                        value={form.business}
                        onChange={(e) => update("business", e.target.value)}
                        className={inputClass}
                      />
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
                      />
                    </div>

                    <button
                      type="submit"
                      className=" w-full rounded-full py-4 text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5"
                      style={{ background: ACCENT_LIME }}
                    >
                      Submit
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md lg:flex lg:w-fit"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ background: ACCENT_LIME, color: "#12141c" }}
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
