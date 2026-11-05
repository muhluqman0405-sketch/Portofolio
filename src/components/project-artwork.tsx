import Image from "next/image";
import type { PortfolioProject } from "@/data/portfolio";

type ProjectArtworkProps = {
  project: PortfolioProject;
};

export function ProjectArtwork({ project }: ProjectArtworkProps) {
  if (project.cover) {
    const isLayout = project.cover.treatment === "layout";

    return (
      <div className={`project-visual ${isLayout ? "project-visual--layout" : "project-visual--cover"}`}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
          data-fit={project.cover.fit ?? "contain"}
          className={isLayout ? "project-visual__layout-image" : "project-visual__cover-image"}
        />
        <span className="project-visual__corner-label" aria-hidden="true">
          {project.cover.label}
        </span>
      </div>
    );
  }

  if (project.artwork === "decoder") {
    return (
      <div className="project-visual project-visual--decoder" aria-hidden="true">
        <div className="decoder-readout">
          <span className="decoder-readout__label">BCD INPUT</span>
          <span className="decoder-readout__value">0100</span>
        </div>
        <svg className="decoder-display" viewBox="0 0 84 104" fill="none">
          <path d="M20 8H64L59 15H25L20 8Z" />
          <path d="M67 13L73 18V47L66 52V22L67 13Z" />
          <path d="M66 56L73 61V89L67 94L66 84V56Z" />
          <path d="M20 96L25 89H59L64 96H20Z" />
          <path d="M17 94L11 89V61L18 56V84L17 94Z" />
          <path d="M18 52L11 47V18L17 13L18 22V52Z" />
          <path d="M20 52H64L59 59H25L20 52Z" />
        </svg>
        <div className="decoder-readout decoder-readout--output">
          <span className="decoder-readout__label">SEGMENT OUTPUT</span>
          <span className="decoder-readout__value">A—G</span>
        </div>
        <span className="artwork-coordinate">RTL / 7-SEG</span>
      </div>
    );
  }

  if (project.artwork === "automation") {
    return (
      <div className="project-visual project-visual--automation" aria-hidden="true">
        <div className="ladder-rail ladder-rail--left" />
        <div className="ladder-rail ladder-rail--right" />
        <div className="ladder-rung rung-one">
          <span className="ladder-contact">LEVEL</span>
          <span className="ladder-coil">PUMP</span>
        </div>
        <div className="ladder-rung rung-two">
          <span className="ladder-contact">TEMP</span>
          <span className="ladder-coil">HEAT</span>
        </div>
        <div className="automation-label">PLC / CONTROL LOGIC</div>
        <span className="artwork-coordinate">MIX → HEAT → CONTROL</span>
      </div>
    );
  }

  if (project.artwork === "pcb") {
    return (
      <div className="project-visual project-visual--pcb" aria-hidden="true">
        <svg viewBox="0 0 520 250" fill="none">
          <path d="M32 52H145V101H190M488 47H398V93H344M30 198H134V155H183M490 202H402V157H351" />
          <path d="M77 20V64M448 19V62M72 231V186M451 231V188M257 15V72M257 236V179" />
          <rect x="184" y="73" width="160" height="106" rx="5" />
          <rect x="207" y="94" width="114" height="64" rx="2" />
          <circle cx="32" cy="52" r="4" />
          <circle cx="488" cy="47" r="4" />
          <circle cx="30" cy="198" r="4" />
          <circle cx="490" cy="202" r="4" />
          <circle cx="77" cy="20" r="4" />
          <circle cx="448" cy="19" r="4" />
          <circle cx="72" cy="231" r="4" />
          <circle cx="451" cy="231" r="4" />
          <circle cx="257" cy="15" r="4" />
          <circle cx="257" cy="236" r="4" />
        </svg>
        <span className="pcb-chip-label">FUNCTION GENERATOR</span>
        <span className="artwork-coordinate">PCB / FABRICATION</span>
      </div>
    );
  }

  if (project.artwork === "harvesting") {
    return (
      <div className="project-visual project-visual--harvesting" aria-hidden="true">
        <div className="harvest-platform harvest-platform--top" />
        <div className="harvest-platform harvest-platform--middle" />
        <div className="harvest-platform harvest-platform--base" />
        <div className="harvest-spring spring-left" />
        <div className="harvest-spring spring-right" />
        <svg viewBox="0 0 280 90" fill="none">
          <path d="M0 47H45L62 45L73 31L88 67L105 22L122 59L137 43H166L181 47H280" />
        </svg>
        <span className="artwork-coordinate">WAZAP / MECHANICAL ASSEMBLY</span>
      </div>
    );
  }

  if (project.artwork === "robot") {
    return (
      <div className="project-visual project-visual--robot" aria-hidden="true">
        <svg viewBox="0 0 520 260" fill="none">
          <path className="robot-path" d="M72 218C138 218 122 126 198 145C276 164 247 64 339 81C393 90 391 46 449 46" />
          <path className="robot-grid" d="M40 35V225M120 35V225M200 35V225M280 35V225M360 35V225M440 35V225M40 45H480M40 105H480M40 165H480M40 225H480" />
          <circle cx="450" cy="46" r="9" />
          <rect x="63" y="203" width="34" height="28" rx="7" />
          <circle cx="70" cy="233" r="5" />
          <circle cx="90" cy="233" r="5" />
          <path d="M80 202L68 184M80 202L95 185" />
        </svg>
        <span className="artwork-coordinate">WEBOTS / POLICY GRADIENT</span>
      </div>
    );
  }

  return (
    <div className="project-visual project-visual--control" aria-hidden="true">
      <svg viewBox="0 0 520 250" fill="none">
        <path className="control-mountain" d="M20 178C94 159 103 57 184 57C265 57 269 193 348 193C405 193 423 119 500 107" />
        <path className="control-trajectory" d="M34 211C111 208 120 155 183 151C246 147 286 206 347 204C404 202 441 157 496 147" />
        <circle cx="184" cy="57" r="6" />
        <circle cx="348" cy="193" r="6" />
        <path className="control-axis" d="M20 220H500M260 26V222" />
      </svg>
      <span className="artwork-coordinate">STATE FEEDBACK / SIMULATION</span>
    </div>
  );
}
