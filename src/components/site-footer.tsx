import Link from "next/link";
import { profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner page-container">
        <div>
          <p className="site-footer__name">{profile.name}</p>
          <p className="site-footer__meta">
            {profile.role} <span aria-hidden="true">·</span> {profile.university}
          </p>
        </div>
        <div className="site-footer__right">
          <p>Designed for engineering conversations.</p>
          <Link href="/contact" className="text-link">
            Contact <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
