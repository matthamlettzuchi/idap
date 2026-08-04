"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const NODE_COUNT = 220;
const RADIUS = 2.6;
const SIGNAL_BLUE = new THREE.Color("#4b64ff");
const SIGNAL_TEAL = new THREE.Color("#2fe0c2");

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x, y, z).multiplyScalar(radius));
  }
  return points;
}

function buildEdges(points: THREE.Vector3[], maxDist: number, stride: number) {
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < points.length; i += 2) {
    const a = points[i];
    const b = points[(i + stride) % points.length];
    if (a.distanceTo(b) < maxDist) edges.push([a, b]);
  }
  return edges;
}

function NodeField({ points }: { points: THREE.Vector3[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  return (
    <instancedMesh
      ref={(el) => {
        meshRef.current = el;
        if (!el) return;
        points.forEach((p, i) => {
          dummy.position.copy(p);
          const s = 0.026 + Math.random() * 0.016;
          dummy.scale.setScalar(s);
          dummy.updateMatrix();
          el.setMatrixAt(i, dummy.matrix);
          const t = (p.y / RADIUS + 1) / 2;
          const color = SIGNAL_BLUE.clone().lerp(SIGNAL_TEAL, t);
          el.setColorAt(i, color);
        });
        el.instanceMatrix.needsUpdate = true;
        if (el.instanceColor) el.instanceColor.needsUpdate = true;
      }}
      args={[undefined, undefined, points.length]}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function EdgeMesh({ edges }: { edges: [THREE.Vector3, THREE.Vector3][] }) {
  return (
    <group>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color={i % 3 === 0 ? "#2fe0c2" : "#3a4370"}
          transparent
          opacity={i % 3 === 0 ? 0.35 : 0.16}
          lineWidth={0.6}
        />
      ))}
    </group>
  );
}

function TransactionPulses({
  edges,
  count = 14,
}: {
  edges: [THREE.Vector3, THREE.Vector3][];
  count?: number;
}) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const assignments = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        edge: edges[Math.floor(Math.random() * edges.length)],
        speed: 0.15 + Math.random() * 0.25,
        offset: Math.random(),
      })),
    [edges, count]
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    assignments.forEach((a, i) => {
      const mesh = refs.current[i];
      if (!mesh || !a.edge) return;
      const progress = (t * a.speed + a.offset) % 1;
      mesh.position.lerpVectors(a.edge[0], a.edge[1], progress);
      const s = Math.sin(progress * Math.PI);
      mesh.scale.setScalar(0.03 + s * 0.035);
    });
  });

  return (
    <group>
      {assignments.map((_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial color="#e8fffa" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Core({ pointer }: { pointer: RefObject<{ x: number; y: number }> }) {
  const tiltGroup = useRef<THREE.Group>(null);
  const spinGroup = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const points = useMemo(() => fibonacciSphere(NODE_COUNT, RADIUS), []);
  const edges = useMemo(() => buildEdges(points, 1.35, 5), [points]);

  useFrame((_, delta) => {
    if (spinGroup.current) {
      spinGroup.current.rotation.y += delta * 0.09;
    }
    if (tiltGroup.current) {
      const targetX = (pointer.current.y ?? 0) * 0.24;
      const targetZ = -(pointer.current.x ?? 0) * 0.18;
      tiltGroup.current.rotation.x = THREE.MathUtils.lerp(
        tiltGroup.current.rotation.x,
        targetX,
        0.035
      );
      tiltGroup.current.rotation.z = THREE.MathUtils.lerp(
        tiltGroup.current.rotation.z,
        targetZ,
        0.035
      );
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.14;
      inner.current.rotation.x += delta * 0.07;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.55}>
      <group ref={tiltGroup}>
        <group ref={spinGroup}>
          <NodeField points={points} />
          <EdgeMesh edges={edges} />
          <TransactionPulses edges={edges} />
          <mesh ref={inner}>
            <icosahedronGeometry args={[1.15, 1]} />
            <meshBasicMaterial
              color="#2fe0c2"
              wireframe
              transparent
              opacity={0.32}
              toneMapped={false}
            />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[3.6, 1]} />
            <meshBasicMaterial
              color="#4b64ff"
              wireframe
              transparent
              opacity={0.05}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function RigLight() {
  const light = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!light.current) return;
    const t = state.clock.getElapsedTime();
    light.current.position.x = Math.sin(t * 0.4) * 4;
    light.current.position.z = Math.cos(t * 0.4) * 4;
  });
  return <pointLight ref={light} position={[3, 2, 3]} intensity={22} color="#4b64ff" />;
}

function PointerListener({
  pointer,
}: {
  pointer: RefObject<{ x: number; y: number }>;
}) {
  useEffect(() => {
    function onMove(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointer]);
  return null;
}

export function LedgerCoreScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  if (reducedMotion) {
    return (
      <div
        aria-hidden
        className="h-full w-full rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(75,100,255,.35), transparent 65%)",
        }}
      />
    );
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <RigLight />
      <PointerListener pointer={pointer} />
      <Core pointer={pointer} />
      <EffectComposer>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
