"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { PortfolioProject } from "@/data/portfolio";
import { ProjectArtwork } from "@/components/project-artwork";

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
  variant?: "default" | "home";
};

export function ProjectCard({ project, index, variant = "default" }: ProjectCardProps) {
  return (
    <motion.article
      className={`project-card${variant === "home" ? " project-card--home" : ""}`}
      data-artwork={project.artwork}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-card__link"
        aria-label={`View project: ${project.title}`}
      >
        <div className="project-card__visual">
          <ProjectArtwork project={project} />
          <span className="project-card__number">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="project-card__body">
          <p className="project-card__discipline">{project.discipline}</p>
          <h3>{project.title}</h3>
          <p className="project-card__summary">{project.summary}</p>
          <div className="project-card__bottom">
            <div className="tag-list" aria-label="Project topics">
              {project.tags.slice(0, 3).map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <span className="project-card__arrow" aria-hidden="true">
              <ArrowUpRight size={17} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
