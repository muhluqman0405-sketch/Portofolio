import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="page-main page-container not-found-page">
      <p className="eyebrow"><span className="section-index">404</span> Page not found</p>
      <h1>This signal went somewhere else.</h1>
      <p>The page you’re looking for isn’t available. Return to the project archive or homepage.</p>
      <Link href="/" className="button button--primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to home
      </Link>
    </div>
  );
}
