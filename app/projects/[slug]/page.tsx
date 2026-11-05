import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { ProjectArtwork } from "@/components/project-artwork";
import { projects, getProjectBySlug } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="page-main page-container project-detail">
      <Link href="/projects" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" /> All projects
      </Link>
      <div className="project-detail__topline">
        <p className="eyebrow"><span className="section-index">PROJECT NOTE</span> {project.discipline}</p>
        <span className="project-detail__slug">/{project.slug}</span>
      </div>
      <PageHeading
        eyebrow="Engineering project"
        title={project.title}
        description={project.summary}
      />

      <div className="project-detail__visual">
        <ProjectArtwork project={project} />
      </div>

      <div className="project-detail__content">
        <section className="project-detail__overview">
          <p className="eyebrow">Overview</p>
          <h2>What the project covers.</h2>
          <p>{project.overview}</p>
          <div className="tag-list project-detail__tags" aria-label="Project topics">
            {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
          </div>
        </section>
        <section className="project-detail__artifacts" aria-labelledby="artifacts-heading">
          <p className="eyebrow">Available material</p>
          <h2 id="artifacts-heading">Project artifacts</h2>
          <ul>
            {project.artifacts.map((artifact) => (
              <li key={artifact}>
                <span className="artifact-marker" aria-hidden="true" />
                {artifact}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="project-detail__footer-link">
        <span>Further projects and notes</span>
        <Link href="/projects" className="text-link text-link--arrow">
          Browse the archive <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
