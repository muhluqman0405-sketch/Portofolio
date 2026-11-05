"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { Variants } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { EngineeringSystemsVisual } from "@/components/engineering-systems-visual";
import { profile } from "@/data/portfolio";

type MagneticLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

function MagneticLink({ href, className, children }: MagneticLinkProps) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useSpring(useMotionValue(0), { stiffness: 240, damping: 20 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 240, damping: 20 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
    pointerY.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      className="magnetic-link"
      style={{ x: pointerX, y: pointerY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

const titleContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.16,
      staggerChildren: 0.12,
    },
  },
};

const titleLine: Variants = {
  hidden: { y: 38 },
  visible: {
    y: 0,
    transition: { duration: 0.74, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HomeHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__ambient" aria-hidden="true" />
      <div className="home-hero__grid-texture" aria-hidden="true" />

      <div className="home-hero__inner page-container">
        <div className="home-hero__copy">
          <motion.p
            className="eyebrow home-hero__eyebrow"
            initial={prefersReducedMotion ? false : { y: 10 }}
            animate={prefersReducedMotion ? undefined : { y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <span className="signal-dot" aria-hidden="true" />
            Electrical Engineering <span className="eyebrow-divider">/</span>
            {profile.university} <span className="eyebrow-divider">/</span> Indonesia
          </motion.p>

          <motion.h1
            id="home-hero-title"
            className="home-hero__title"
            aria-label="Engineering Ideas Into Reality."
            variants={titleContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? undefined : "visible"}
          >
            <motion.span className="home-hero__title-line" variants={titleLine}>
              Engineering
            </motion.span>
            <motion.span className="home-hero__title-line" variants={titleLine}>
              Ideas Into
            </motion.span>
            <motion.span
              className="home-hero__title-line home-hero__title-line--accent"
              variants={titleLine}
            >
              Reality<span className="home-hero__period">.</span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="home-hero__description"
            initial={prefersReducedMotion ? false : { y: 16 }}
            animate={prefersReducedMotion ? undefined : { y: 0 }}
            transition={{ duration: 0.62, delay: 0.54 }}
          >
            Electrical Engineering graduate with experience across electronics,
            automation, embedded systems, and hardware development. Exploring
            how technology and engineering come together to solve real-world
            challenges.
          </motion.p>

          <motion.div
            className="home-hero__actions"
            initial={prefersReducedMotion ? false : { y: 14 }}
            animate={prefersReducedMotion ? undefined : { y: 0 }}
            transition={{ duration: 0.55, delay: 0.68 }}
          >
            <MagneticLink href="/projects" className="button button--primary">
              Explore Projects <ArrowUpRight size={16} aria-hidden="true" />
            </MagneticLink>
            <MagneticLink href="/about" className="button button--quiet home-hero__secondary-cta">
              About Me <ArrowRight size={16} aria-hidden="true" />
            </MagneticLink>
          </motion.div>

          <div className="home-hero__focus">
            <span>Areas of focus</span>
            <p>Electronics <i /> Embedded <i /> Automation <i /> Engineering analysis</p>
          </div>
        </div>

        <motion.div
          className="home-hero__visual"
          initial={prefersReducedMotion ? false : { scale: 0.96, y: 16 }}
          animate={prefersReducedMotion ? undefined : { scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <EngineeringSystemsVisual />
        </motion.div>
      </div>

      <a className="home-hero__scroll-cue" href="#selected-work">
        <span>Discover selected work</span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>

    </section>
  );
}
