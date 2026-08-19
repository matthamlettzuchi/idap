import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

import { supabase } from "@/lib/supabase";

const FALLBACK_DESTINATION_EMAIL = "matthamlettzuchi@gmail.com";
const FALLBACK_SENDER_NAME = "Intidata Website";
// Resend's shared testing domain — works immediately with no DNS setup.
// The domain half stays hardcoded (tied to whatever's verified in the
// Resend dashboard); only the display name is editable from
// /admin/contact-settings.
const SENDER_DOMAIN = "onboarding@resend.dev";

async function getContactFormSettings() {
  const { data, error } = await supabase
    .from("contact_form_settings")
    .select("destination_email, sender_name")
    .eq("id", true)
    .maybeSingle();

  if (error || !data) {
    return {
      destinationEmail: FALLBACK_DESTINATION_EMAIL,
      senderName: FALLBACK_SENDER_NAME,
    };
  }
  return {
    destinationEmail: data.destination_email || FALLBACK_DESTINATION_EMAIL,
    senderName: data.sender_name || FALLBACK_SENDER_NAME,
  };
}

type ContactPayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
  captchaToken?: string;
  // honeypot field — real users never fill this in
  company?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("Contact form: missing RECAPTCHA_SECRET_KEY");
    return false;
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = await res.json();
  return data.success === true;
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const captchaToken = (body as any).captchaToken as string | undefined;
  if (!captchaToken) {
    return NextResponse.json(
      { ok: false, error: "Verification token missing." },
      { status: 400 },
    );
  }

  const isHuman = await verifyRecaptcha(captchaToken);
  if (!isHuman) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please try again." },
      { status: 400 },
    );
  }

  const fullName = (body.fullName ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const honeypot = (body.company ?? "").trim();

  // Silently succeed on honeypot hits so bots don't learn anything.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Full name, email, and message are required." },
      { status: 400 },
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Contact form: missing RESEND_API_KEY environment variable.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "The mail service isn't configured yet. Please try again later or contact us directly.",
      },
      { status: 500 },
    );
  }

  const { destinationEmail, senderName } = await getContactFormSettings();
  const SENDER = `${senderName} <${SENDER_DOMAIN}>`;

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(fullName);
  const safePhone = escapeHtml(phone || "-");
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    const { error } = await resend.emails.send({
      from: SENDER,
      to: destinationEmail,
      replyTo: email,
      subject: `New contact form submission from ${fullName}`,
      text: [
        `Name: ${fullName}`,
        `Phone: ${phone || "-"}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#12141c;line-height:1.6;">
          <h2 style="margin:0 0 16px;">New contact form submission</h2>
          <p style="margin:0 0 6px;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin:0 0 6px;"><strong>Phone:</strong> ${safePhone}</p>
          <p style="margin:0 0 16px;"><strong>Email:</strong> ${safeEmail}</p>
          <p style="margin:0 0 6px;"><strong>Message:</strong></p>
          <p style="margin:0;padding:12px 16px;background:#f1f3f8;border-radius:8px;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Contact form: Resend returned an error", error);
      return NextResponse.json(
        {
          ok: false,
          error: "Something went wrong sending your message. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: failed to send email", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong sending your message. Please try again.",
      },
      { status: 502 },
    );
  }
}
