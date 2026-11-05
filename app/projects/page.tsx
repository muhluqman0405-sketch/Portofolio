import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { PageHeading } from "@/components/page-heading";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering project files and notes across analog IC design, digital design, electronics, automation, robotics, and control systems.",
};

export default function ProjectsPage() {
  return (
    <div className="page-main page-container">
      <PageHeading
        eyebrow="Project archive"
        index="01"
        title="A record of engineering in practice."
        description="A selection of academic and personal project material across circuits, silicon, embedded systems, automation, and control."
      />
      <div className="project-archive-meta">
        <span>{String(projects.length).padStart(2, "0")} PROJECTS</span>
        <span>PROJECT NOTES / FILE-BASED SUMMARIES</span>
      </div>
      <div className="project-grid project-grid--archive">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      <p className="evidence-note evidence-note--archive">
        Dates, measured results, and tools are shown only when present in the available project material.
      </p>
    </div>
  );
}
