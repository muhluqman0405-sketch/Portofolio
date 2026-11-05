import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MotionProvider } from "@/components/motion-provider";
import { profile } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Electrical Engineering`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Electrical engineering projects across electronics, embedded systems, industrial automation, control systems, FPGA, circuit design, and engineering analysis.",
  applicationName: `${profile.name} Engineering Portfolio`,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${profile.name} — Engineering Portfolio`,
    title: `${profile.name} — Electrical Engineering`,
    description:
      "Projects and interests across electronics, embedded systems, automation, control systems, and engineering design.",
  },
};

export const viewport: Viewport = {
  themeColor: "#08131f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
