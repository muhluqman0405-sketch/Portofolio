import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircuitBoard,
  Cpu,
  Factory,
  GraduationCap,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { featuredProjects, profile, projects } from "@/data/portfolio";

const expertiseItems: {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  layout: "feature" | "standard";
  tags: string[];
}[] = [
  {
    number: "01",
    title: "Electronics & Hardware",
    description:
      "Circuit design, instrumentation, embedded systems, and hardware development.",
    icon: CircuitBoard,
    layout: "feature",
    tags: ["Circuit design", "Embedded", "Hardware"],
  },
  {
    number: "02",
    title: "Automation & Control",
    description: "PLC, control systems, and industrial automation fundamentals.",
    icon: Workflow,
    layout: "standard",
    tags: ["PLC", "Control", "Automation"],
  },
  {
    number: "03",
    title: "Engineering Analysis",
    description: "Simulation, troubleshooting, and technical problem-solving.",
    icon: Activity,
    layout: "standard",
    tags: ["Simulation", "Analysis"],
  },
  {
    number: "04",
    title: "FPGA & Digital Systems",
    description: "FPGA-based computing, digital logic, and hardware implementation.",
    icon: Cpu,
    layout: "standard",
    tags: ["FPGA", "Digital systems"],
  },
  {
    number: "05",
    title: "Design, Manufacturing & R&D",
    description:
      "Engineering design, manufacturing processes, and research and development.",
    icon: Factory,
    layout: "standard",
    tags: ["Design", "Manufacturing", "R&D"],
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="home-section home-projects" id="selected-work" aria-labelledby="home-projects-heading">
        <div className="page-container">
          <ScrollReveal className="home-section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-index">01</span> Selected engineering work
              </p>
              <h2 id="home-projects-heading">Ideas, made tangible.</h2>
              <p className="home-section-heading__description">
                A selection of projects spanning circuit design, digital systems,
                and industrial automation.
              </p>
            </div>
            <Link href="/projects" className="text-link text-link--arrow">
              Explore all projects <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <div className="home-project-grid">
            {featuredProjects.map((project, index) => (
              <ScrollReveal
                key={project.slug}
                className={`home-project-reveal home-project-reveal--${index + 1}`}
                delay={index * 0.09}
              >
                <ProjectCard
                  project={project}
                  index={projects.indexOf(project)}
                  variant="home"
                />
              </ScrollReveal>
            ))}
          </div>

          <p className="evidence-note">
            Project summaries reflect the available files and report material;
            results are not stated where none are documented.
          </p>
        </div>
      </section>

      <section className="home-section home-expertise" aria-labelledby="home-expertise-heading">
        <div className="page-container">
          <ScrollReveal className="home-section-heading home-section-heading--expertise">
            <div>
              <p className="eyebrow">
                <span className="section-index">02</span> Engineering expertise
              </p>
              <h2 id="home-expertise-heading">Curious across the whole system.</h2>
            </div>
            <p className="home-section-heading__aside">
              From circuit-level questions to the systems around them.
            </p>
          </ScrollReveal>

          <div className="home-expertise-grid">
            {expertiseItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <ScrollReveal
                  key={item.number}
                  className={`home-expertise-reveal home-expertise-reveal--${index + 1}`}
                  delay={index * 0.07}
                >
                  <article
                    className={`home-expertise-card home-expertise-card--${item.layout}`}
                  >
                    <div className="home-expertise-card__topline">
                      <span>{item.number} / 05</span>
                      <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <ul className="home-expertise-card__tags" aria-label={`${item.title} topics`}>
                      {item.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <span className="home-expertise-card__trace" aria-hidden="true" />
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

          <Link href="/about" className="text-link text-link--arrow home-expertise__link">
            More about my background <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-section home-background" aria-labelledby="home-background-heading">
        <div className="page-container">
          <ScrollReveal className="home-section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-index">03</span> Experience & education
              </p>
              <h2 id="home-background-heading">Grounded in study. Exposed to industry.</h2>
            </div>
            <Link href="/about" className="text-link text-link--arrow">
              About me <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <div className="home-background-grid">
            <ScrollReveal delay={0.04}>
              <article className="home-background-card">
                <div className="home-background-card__icon">
                  <Factory size={20} aria-hidden="true" />
                </div>
                <div className="home-background-card__content">
                  <p className="home-background-card__eyebrow">Industry exposure / Internship</p>
                  <h3>PT PLN Indonesia Power</h3>
                  <p>
                    Exposure to industrial operations, instrumentation, and
                    equipment maintenance strategies in a power generation
                    environment.
                  </p>
                </div>
                <span className="home-background-card__index" aria-hidden="true">01</span>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={0.13}>
              <article className="home-background-card home-background-card--education">
                <div className="home-background-card__icon">
                  <GraduationCap size={21} aria-hidden="true" />
                </div>
                <div className="home-background-card__content">
                  <p className="home-background-card__eyebrow">Education / {profile.country}</p>
                  <h3>{profile.education.field}</h3>
                  <p>{profile.education.institution} (UGM)</p>
                  <span>{profile.education.detail}</span>
                </div>
                <span className="home-background-card__index" aria-hidden="true">02</span>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="home-contact" aria-labelledby="home-contact-heading">
        <div className="page-container">
          <ScrollReveal className="home-contact__surface">
            <div className="home-contact__art" aria-hidden="true">
              <svg viewBox="0 0 600 240" fill="none">
                <path d="M0 120H115V72H202V166H286V92H400V137H486V50H600" />
                <circle cx="115" cy="72" r="4" />
                <circle cx="202" cy="166" r="4" />
                <circle cx="400" cy="92" r="4" />
                <circle cx="486" cy="50" r="4" />
              </svg>
            </div>
            <div className="home-contact__copy">
              <p className="eyebrow">
                <span className="section-index">04</span> Start a conversation
              </p>
              <h2 id="home-contact-heading">Have an engineering challenge in mind?</h2>
              <p>
                Let&apos;s talk about engineering design, electronics, automation,
                hardware development, and research and development.
              </p>
              <Link href="/contact" className="button button--primary">
                Contact Me <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <span className="home-contact__mark" aria-hidden="true">ML / EE</span>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
