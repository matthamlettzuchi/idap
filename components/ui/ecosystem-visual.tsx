"use client";

import { motion } from "framer-motion";

const nodes = [
  { label: "MF", x: 22, y: 18 },
  { label: "FC", x: 84, y: 24 },
  { label: "AC", x: 10, y: 76 },
  { label: "PLN", x: 90, y: 78 },
  { label: "OJK", x: 50, y: 92 },
];
const center = { x: 50, y: 50 };

export function EcosystemVisual() {
  return (
    <div className="relative mt-2 h-[180px] w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
        {/* connecting lines, muncul satu-satu */}
        {nodes.map((n, i) => (
          <motion.line
            key={`line-${i}`}
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="var(--panel-border-strong)"
            strokeWidth="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* paket data bolak-balik hub <-> node */}
        {nodes.map((n, i) => (
          <motion.circle
            key={`packet-${i}`}
            r="1.6"
            fill="var(--signal-teal)"
            initial={{ opacity: 0 }}
            animate={{
              cx: [center.x, n.x, center.x],
              cy: [center.y, n.y, center.y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: 1.2 + i * 0.45,
              ease: "easeInOut",
            }}
            style={{ filter: "drop-shadow(0 0 3px var(--signal-teal))" }}
          />
        ))}

        {/* node satelit produk */}
        {nodes.map((n, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="5.5"
              fill="var(--panel)"
              stroke="var(--signal-blue)"
              strokeWidth="0.7"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: 0.15 * i + 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            <text
              x={n.x}
              y={n.y + 1.1}
              textAnchor="middle"
              fontSize="2.6"
              fontWeight={600}
              fill="var(--ink-1)"
              fontFamily="var(--font-mono)"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* hub tengah, berdenyut pelan */}
        <motion.circle
          cx={center.x}
          cy={center.y}
          r="8"
          fill="var(--signal-blue)"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: `${center.x}px ${center.y}px`,
            filter: "drop-shadow(0 0 6px rgba(47,75,208,0.55))",
          }}
        />
        <text
          x={center.x}
          y={center.y + 1.4}
          textAnchor="middle"
          fontSize="3.4"
          fontWeight={700}
          fill="#ffffff"
          fontFamily="var(--font-mono)"
        >
          FIS
        </text>
      </svg>
    </div>
  );
}