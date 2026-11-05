"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CircuitBoard, Cpu, Workflow } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent } from "react";
import { ProfilePortrait } from "@/components/profile-portrait";

export function EngineeringSystemsVisual() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useSpring(useMotionValue(0), { stiffness: 90, damping: 24, mass: 0.6 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 90, damping: 24, mass: 0.6 });
  const backgroundX = useTransform(pointerX, [-0.5, 0.5], [-8, 8]);
  const backgroundY = useTransform(pointerY, [-0.5, 0.5], [-8, 8]);
  const foregroundX = useTransform(pointerX, [-0.5, 0.5], [-18, 18]);
  const foregroundY = useTransform(pointerY, [-0.5, 0.5], [-14, 14]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      className="home-systems-visual"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <span className="sr-only">
        A technical illustration connecting electronics, automation, embedded
        systems, and engineering analysis.
      </span>

      <div className="home-systems-visual__art" aria-hidden="true">
        <motion.div
          className="home-systems-visual__back-layer"
          style={{ x: backgroundX, y: backgroundY }}
        >
          <div className="home-systems-visual__orbit home-systems-visual__orbit--outer" />
          <div className="home-systems-visual__orbit home-systems-visual__orbit--inner" />
          <svg
            className="home-systems-visual__connections"
            viewBox="0 0 720 620"
            fill="none"
          >
            <path className="systems-trace" d="M360 310V104H221V69M360 310H590V221H666" />
            <path className="systems-trace" d="M360 310V499H517V554M360 310H139V402H57" />
            <path className="systems-trace systems-trace--soft" d="M360 310H256V194H155M360 310H478V425H621" />
            <path className="systems-signal" d="M360 310V104H221V69" />
            <path className="systems-signal systems-signal--delay" d="M360 310H590V221H666" />
            <circle className="systems-junction" cx="221" cy="104" r="5" />
            <circle className="systems-junction" cx="590" cy="221" r="5" />
            <circle className="systems-junction" cx="517" cy="499" r="5" />
            <circle className="systems-junction" cx="139" cy="402" r="5" />
            <circle className="systems-junction systems-junction--core" cx="360" cy="310" r="10" />
          </svg>
        </motion.div>

        <motion.div
          className="home-systems-visual__front-layer"
          style={{ x: foregroundX, y: foregroundY }}
        >
          <ProfilePortrait variant="hero" priority />

          <div className="home-systems-card home-systems-card--hardware">
            <CircuitBoard size={17} aria-hidden="true" />
            <span>01 / HARDWARE</span>
            <strong>Electronics</strong>
          </div>
          <div className="home-systems-card home-systems-card--control">
            <Workflow size={17} aria-hidden="true" />
            <span>02 / AUTOMATION</span>
            <strong>Control systems</strong>
          </div>
          <div className="home-systems-card home-systems-card--digital">
            <Cpu size={17} aria-hidden="true" />
            <span>03 / COMPUTING</span>
            <strong>Embedded + FPGA</strong>
          </div>
        </motion.div>
      </div>

      <Link
        href="/projects/instrumentation-amplifier"
        className="home-systems-project"
        aria-label="View featured project: Instrumentation amplifier"
      >
        <Image
          src="/project-art/instrumentation-amplifier-layout.png"
          alt=""
          width={1248}
          height={1024}
          sizes="92px"
          className="home-systems-project__image"
        />
        <span className="home-systems-project__copy">
          <span>FEATURED STUDY</span>
          <strong>Instrumentation amplifier</strong>
        </span>
        <ArrowUpRight size={15} aria-hidden="true" />
      </Link>

      <span className="home-systems-visual__index" aria-hidden="true">
        SYSTEM MAP <i>•</i> 01—04
      </span>
    </div>
  );
}
