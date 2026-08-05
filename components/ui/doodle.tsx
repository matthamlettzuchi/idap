"use client";

import { motion } from "framer-motion";

function TrailDots({ delay = 0.5 }: { delay?: number }) {
  return (
    <>
      {/* garis penghubung utama, mulai persis dari ujung bawah ikon (40,88) menuju arah globe */}
      <motion.path
        d="M40 88c26 10 46 24 60 40s30 28 54 34"
        stroke="var(--panel-border-strong)"
        strokeWidth="1.5"
        strokeDasharray="1 9"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, delay, ease: [0.65, 0, 0.35, 1] }}
      />

      <motion.circle cx="78" cy="108" r="6.5" stroke="var(--signal-teal)" strokeWidth="2.5"
        initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, delay: delay + 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "78px 108px" }} />

      <motion.circle cx="108" cy="132" r="5" stroke="var(--signal-teal)" strokeWidth="2"
        initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, delay: delay + 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "108px 132px" }} />

      <motion.circle cx="132" cy="148" r="3.5" stroke="var(--signal-teal)" strokeWidth="1.75"
        initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, delay: delay + 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "132px 148px" }} />

      <motion.circle cx="154" cy="160" r="2" fill="var(--signal-teal)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.9 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.4, delay: delay + 0.7 }}>
        <animate attributeName="opacity" values="0.4;0.95;0.4" dur="2.4s"
          begin={`${delay + 1.1}s`} repeatCount="indefinite" />
      </motion.circle>

      {/* elemen tambahan biar lebih rame: dua spark kecil menyimpang dari jalur utama */}
      <motion.path
        d="M96 78v7M92.5 81.5h7"
        stroke="var(--signal-teal)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, delay: delay + 0.85 }}
        style={{ transformOrigin: "96px 81.5px" }}
      />
      <motion.circle cx="188" cy="142" r="2.5" stroke="var(--signal-teal)" strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 0.55, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, delay: delay + 0.95, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "188px 142px" }} />
    </>
  );
}

function OrbitRing({ delay = 0.3 }: { delay?: number }) {
  return (
    <motion.circle
      cx="40"
      cy="45"
      r="34"
      stroke="var(--signal-teal)"
      strokeOpacity="0.35"
      strokeWidth="1"
      strokeDasharray="2 6"
      fill="none"
      initial={{ opacity: 0, rotate: -20 }}
      whileInView={{ opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "40px 45px" }}
    />
  );
}

export function ClusterPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 170" className={className} fill="none" aria-hidden>
      <OrbitRing delay={0.15} />
      <motion.g
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <path
          d="M40 14c15 0 27 11 27 26 0 19-23 44-26 47-1 1-1 1-2 0-3-3-26-28-26-47 0-15 12-26 27-26z"
          stroke="var(--signal-teal)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="40" cy="40" r="9" stroke="var(--signal-teal)" strokeWidth="2.5" />
      </motion.g>
      <TrailDots delay={0.55} />
    </svg>
  );
}

export function ClusterPerson({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 170" className={className} fill="none" aria-hidden>
      <OrbitRing delay={0.15} />
      <motion.g
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <circle cx="40" cy="28" r="17" stroke="var(--signal-teal)" strokeWidth="2.5" />
        <path
          d="M9 88c2-19 14-31 31-31s29 12 31 31"
          stroke="var(--signal-teal)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </motion.g>
      <TrailDots delay={0.55} />
    </svg>
  );
}