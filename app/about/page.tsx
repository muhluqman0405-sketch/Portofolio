import type { Metadata } from "next";
import { ArrowUpRight, Building2, GraduationCap } from "lucide-react";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { ProfilePortrait } from "@/components/profile-portrait";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About | Electrical Engineering Graduate",
  description:
    "Meet Muhammad Luqman, an Electrical Engineering graduate from Universitas Gadjah Mada with experience across electronics, automation, control systems, and industrial operations.",
};

const expertise = [
  {
    number: "01",
    title: "Electronics & Hardware",
    description: "Circuit design, embedded systems, and hardware development.",
  },
  {
    number: "02",
    title: "Automation & Control",
    description: "PLC, control systems, and industrial automation fundamentals.",
  },
  {
    number: "03",
    title: "Engineering Analysis",
    description: "Simulation, troubleshooting, and engineering problem-solving.",
  },
  {
    number: "04",
    title: "Technology & Innovation",
    description: "FPGA, digital systems, and engineering research and development.",
  },
];

export default function AboutPage() {
  return (
    <div className="page-main page-container about-page">
      <PageHeading
        eyebrow="About me"
        index="02"
        title="Electrical Engineering Graduate"
        description="Engineering, Technology & Innovation"
      />

      <section className="about-story" aria-labelledby="about-story-heading">
        <ProfilePortrait variant="about" priority />
        <div className="about-story__content">
          <div className="about-story__heading">
            <p className="eyebrow">Profile</p>
            <h2 id="about-story-heading">
              Broad engineering fundamentals, applied to real systems.
            </h2>
          </div>
          <div className="about-story__copy">
            <p>
              I am an Electrical Engineering graduate from Universitas Gadjah Mada
              (UGM), Indonesia, with a strong foundation in electronics, control
              systems, automation, and engineering design.
            </p>
            <p>
              Throughout my academic journey, I have developed hands-on experience
              in circuit design, hardware development, system simulation, and
              technical problem-solving. My projects have exposed me to various
              engineering disciplines, including analog electronics, embedded
              systems, FPGA-based computing, and instrumentation.
            </p>
            <p>
              During my internship at PT PLN Indonesia Power, I gained exposure to
              industrial operations, instrumentation, and equipment maintenance
              strategies in a power generation environment. This experience
              strengthened my understanding of how engineering principles are
              applied to real-world industrial systems.
            </p>
            <p>
              I am interested in engineering design, manufacturing processes,
              automation, hardware development, and research and development.
            </p>
            <p>
              I enjoy learning new technologies, understanding complex systems,
              and transforming technical knowledge into practical solutions. My
              goal is to become a versatile engineer who can bridge technical
              knowledge with practical engineering solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block about-expertise" aria-labelledby="expertise-heading">
        <div className="section-heading-row section-heading-row--compact">
          <div>
            <p className="eyebrow">
              <span className="section-index">03</span> Core expertise
            </p>
            <h2 id="expertise-heading">A versatile engineering toolkit.</h2>
          </div>
          <p className="section-heading-aside">
            From circuit-level work to industrial systems.
          </p>
        </div>
        <div className="expertise-grid">
          {expertise.map((item) => (
            <article className="expertise-card" key={item.number}>
              <span className="expertise-card__number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="about-background-grid">
        <section className="about-education" aria-labelledby="education-heading">
          <div className="about-section-title">
            <p className="eyebrow">Education</p>
          </div>
          <article className="education-card">
            <div className="education-card__icon">
              <GraduationCap size={21} aria-hidden="true" />
            </div>
            <div className="education-card__content">
              <p>{profile.education.detail}</p>
              <h2 id="education-heading">{profile.education.field}</h2>
              <span>{profile.education.institution} (UGM)</span>
            </div>
            <span className="education-card__location">{profile.country}</span>
          </article>
        </section>

        <section className="about-experience" aria-labelledby="experience-heading">
          <div className="about-section-title">
            <p className="eyebrow">Industry exposure</p>
          </div>
          <article className="about-experience-card">
            <div className="education-card__icon">
              <Building2 size={19} aria-hidden="true" />
            </div>
            <div className="about-experience-card__content">
              <p>Internship</p>
              <h2 id="experience-heading">PT PLN Indonesia Power</h2>
              <span>
                Exposure to industrial operations, instrumentation, and
                equipment maintenance strategies in a power generation
                environment.
              </span>
            </div>
          </article>
        </section>
      </div>

      <div className="about-contact-link">
        <p>Have a project or role in mind?</p>
        <Link href="/contact" className="text-link text-link--arrow">
          Get in touch <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
