import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact information for engineering and electronics R&D conversations with Muhammad Luqman.",
};

export default function ContactPage() {
  return (
    <div className="page-main page-container contact-page">
      <PageHeading
        eyebrow="Contact"
        index="03"
        title="Let’s build something thoughtful."
        description="I’m interested in conversations around electronics R&D, integrated circuits, embedded systems, and automation. Add the contact details below to make this page ready to share."
      />

      <section className="contact-details" aria-labelledby="contact-details-heading">
        <div className="contact-details__intro">
          <div className="contact-details__icon"><Mail size={21} aria-hidden="true" /></div>
          <div>
            <p className="eyebrow">Preferred channels</p>
            <h2 id="contact-details-heading">Stay in touch.</h2>
            <p>For engineering opportunities, project conversations, or technical questions.</p>
          </div>
        </div>
        <div className="contact-channel-list">
          {profile.contactChannels.map((channel) => (
            <a
              className="contact-channel"
              href={channel.href}
              key={channel.label}
              rel={channel.href.startsWith("https://") ? "noopener noreferrer" : undefined}
              target={channel.href.startsWith("https://") ? "_blank" : undefined}
            >
              <span className="contact-channel__label">{channel.label}</span>
              <span className="contact-channel__value">{channel.value}</span>
              <ArrowUpRight size={16} aria-hidden="true" className="contact-channel__icon" />
            </a>
          ))}
        </div>
      </section>

      <div className="contact-location-note">
        <span className="signal-dot" aria-hidden="true" />
        <span>{profile.country}</span>
        <span className="contact-location-note__rule" aria-hidden="true" />
        <span>{profile.university}</span>
      </div>
    </div>
  );
}
