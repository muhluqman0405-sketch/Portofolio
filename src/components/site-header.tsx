"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, profile } from "@/data/portfolio";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isCurrentPage = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="site-header__inner page-container flex w-full items-center justify-between">
        <Link
          href="/"
          className="brand"
          aria-label={`${profile.name}, home`}
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand__mark font-mono text-signal-300" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="brand__name">
            <strong>{profile.name}</strong>
            <small>Electrical Engineering</small>
          </span>
        </Link>

        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => {
            const current = isCurrentPage(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`primary-nav__link${current ? " is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact" className="nav-cta">
            Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </nav>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mobile-nav__inner page-container">
              {navigation.map((item) => {
                const current = isCurrentPage(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`mobile-nav__link${current ? " is-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
