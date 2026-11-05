export type ProjectArtworkKind =
  | "amplifier"
  | "decoder"
  | "automation"
  | "pcb"
  | "harvesting"
  | "robot"
  | "control";

export type PortfolioProject = {
  slug: string;
  title: string;
  discipline: string;
  summary: string;
  overview: string;
  tags: string[];
  artifacts: string[];
  artwork: ProjectArtworkKind;
  cover?: {
    src: string;
    alt: string;
    label: string;
    fit?: "cover" | "contain";
    treatment?: "layout";
  };
  featured?: boolean;
};

export const profile = {
  name: "Muhammad Luqman",
  initials: "ML",
  role: "Electrical Engineering graduate",
  university: "Universitas Gadjah Mada",
  country: "Indonesia",
  introduction:
    "I’m an Electrical Engineering graduate from Universitas Gadjah Mada, interested in how circuits, silicon, and embedded systems come together in practical engineering.",
  about:
    "My interests span analog IC design, semiconductor technology, FPGA, embedded systems, automation, and electronics research and development. I enjoy moving between circuit-level questions and the systems around them.",
  interests: [
    {
      number: "01",
      title: "Analog IC design",
      description:
        "Circuit design and the physical details that shape an integrated circuit.",
    },
    {
      number: "02",
      title: "Semiconductor technology",
      description:
        "An interest in how devices, processes, and silicon design connect.",
    },
    {
      number: "03",
      title: "FPGA & digital design",
      description:
        "Logic design, hardware description, and digital implementation.",
    },
    {
      number: "04",
      title: "Embedded & automation",
      description:
        "Electronics, control, and software working together in a system.",
    },
  ],
  education: {
    field: "Electrical Engineering",
    institution: "Universitas Gadjah Mada",
    detail: "Graduate",
  },
  experiencePlaceholder:
    "[Add role, organization, dates, and a short description.]",
  contactChannels: [
    {
      label: "Email",
      value: "muhluqman0405@gmail.com",
      href: "mailto:muhluqman0405@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/muhluqmann",
      href: "https://www.linkedin.com/in/muhluqmann/",
    },
    {
      label: "GitHub",
      value: "github.com/muhluqman0405-sketch/Portofolio",
      href: "https://github.com/muhluqman0405-sketch/Portofolio",
    },
  ],
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const projects: PortfolioProject[] = [
  {
    slug: "instrumentation-amplifier",
    title: "Instrumentation amplifier",
    discipline: "Analog IC design",
    summary:
      "A Cadence workspace containing amplifier design, simulation, and physical-layout material.",
    overview:
      "The supplied project files include Cadence design and simulation work alongside a physical layout and DRC/LVS run artifacts.",
    tags: ["Cadence", "Analog IC", "Layout"],
    artifacts: [
      "Cadence design files for the amplifier and its testbenches.",
      "AC and transient simulation runs in the project workspace.",
      "A physical-layout image and DRC/LVS run folders.",
    ],
    artwork: "amplifier",
    cover: {
      src: "/project-art/instrumentation-amplifier-layout.png",
      alt: "Layered physical layout view from the instrumentation-amplifier project.",
      label: "PHYSICAL LAYOUT / CADENCE",
      fit: "contain",
      treatment: "layout",
    },
    featured: true,
  },
  {
    slug: "bcd-seven-segment-decoder",
    title: "BCD-to-seven-segment decoder",
    discipline: "RTL to GDSII",
    summary:
      "A digital-design project documented from Vivado code through GDSII creation.",
    overview:
      "The project report documents a BCD-to-seven-segment decoder, including Vivado code, an FPGA input view, and GDSII design material.",
    tags: ["RTL", "Vivado", "GDSII"],
    artifacts: [
      "Vivado code for the decoder.",
      "An FPGA view showing the 0100 input case.",
      "Report material covering GDSII creation.",
    ],
    artwork: "decoder",
    cover: {
      src: "/project-art/bcd-seven-segment-decoder.jpg",
      alt: "Physical layout view from the BCD-to-seven-segment decoder project.",
      label: "GDSII / PHYSICAL DESIGN",
      fit: "contain",
    },
    featured: true,
  },
  {
    slug: "plc-liquid-mixing-control",
    title: "Liquid mixing & heating control",
    discipline: "Automation",
    summary:
      "A PLC-based control-system project for automatic liquid mixing and heating.",
    overview:
      "The workspace contains a Beremiz PLC project and Arduino extension/configuration files for the liquid mixing and heating control system.",
    tags: ["PLC", "Beremiz", "Arduino"],
    artifacts: [
      "Beremiz project and PLC configuration files.",
      "Arduino extension and settings files.",
      "Generated project build artifacts.",
    ],
    artwork: "automation",
    cover: {
      src: "/project-art/plc-liquid-mixing-control.svg",
      alt: "Illustration of a liquid mixing and heating system controlled by a PLC.",
      label: "PROCESS OVERVIEW / PLC",
      fit: "contain",
    },
    featured: true,
  },
  {
    slug: "function-generator",
    title: "Function generator",
    discipline: "Electronics design",
    summary:
      "A KiCad design package with schematic, PCB, and fabrication-output files.",
    overview:
      "The project folder contains KiCad schematic and board files, with Gerber and PDF fabrication outputs.",
    tags: ["KiCad", "PCB", "Gerber"],
    artifacts: [
      "KiCad schematic and PCB design files.",
      "Gerber layers for board copper, masks, paste, and silkscreen.",
      "PDF plot exports and drill outputs.",
    ],
    artwork: "pcb",
    cover: {
      src: "/project-art/function-generator-pcb.png",
      alt: "KiCad PCB layout for the function-generator project.",
      label: "PCB LAYOUT / KICAD",
      fit: "contain",
    },
  },
  {
    slug: "wazap-footstep-energy-harvesting",
    title: "WaZap — footstep energy harvesting",
    discipline: "Energy harvesting",
    summary:
      "A concept exploring footstep vibrations as an energy source in train stations.",
    overview:
      "The project materials include four CAD part files, an assembly, and rendered views for the footstep-vibration energy-harvesting concept.",
    tags: ["Energy harvesting", "CAD", "Mechanical assembly"],
    artifacts: [
      "Four component CAD part files and one assembly file.",
      "Two rendered views of the assembly concept.",
    ],
    artwork: "harvesting",
    cover: {
      src: "/project-art/wazap-platform.png",
      alt: "CAD render of the spring-supported WaZap footstep energy-harvesting platform.",
      label: "CAD ASSEMBLY / WAZAP",
      fit: "contain",
    },
  },
  {
    slug: "webots-reinforce-navigation",
    title: "Robot navigation with REINFORCE",
    discipline: "Embedded & intelligent systems",
    summary:
      "A Webots robot-navigation project using the REINFORCE policy-gradient method.",
    overview:
      "The report and controller code describe a Webots navigation setup with a differential-drive robot, position and distance sensors, and a REINFORCE policy network.",
    tags: ["Webots", "Python", "REINFORCE"],
    artifacts: [
      "A Python controller using the REINFORCE policy-gradient approach.",
      "Robot state assembled from goal distance and obstacle-sensor readings.",
      "A report describing the environment, actions, and reward design.",
    ],
    artwork: "robot",
    cover: {
      src: "/project-art/webots-navigation.png",
      alt: "Webots simulation view used in the robot-navigation project.",
      label: "SIMULATION / WEBOTS",
      fit: "contain",
    },
  },
  {
    slug: "mountain-car-control-simulation",
    title: "Mountain-car control simulation",
    discipline: "Control systems",
    summary:
      "A Python simulation with state feedback, velocity estimation, and integral error.",
    overview:
      "The source models mountain-car dynamics, a reduced-order velocity observer, integral error, and disturbances, then visualizes the simulated motion.",
    tags: ["Python", "Control systems", "Simulation"],
    artifacts: [
      "State dynamics for position, velocity, estimated velocity, and integral error.",
      "State-feedback control and a reduced-order velocity observer.",
      "A Matplotlib animation of the simulation.",
    ],
    artwork: "control",
    cover: {
      src: "/project-art/mountain-car-robust-tracking.png",
      alt: "Mountain-car position plot from the robust tracking simulation.",
      label: "ROBUST TRACKING / SIMULATION",
      fit: "contain",
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
