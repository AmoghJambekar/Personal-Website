import Image from "next/image";

/* ── Types ─────────────────────────────────────────────── */

type InlineLink = {
  text: string;
  href: string;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconInvert?: boolean;
};

type HeroSegment =
  | { type: "text"; value: string }
  | { type: "link"; link: InlineLink }
  | { type: "blink" };

/* ── Content — swap these with your own later ──────────── */

const HERO_CONTENT: HeroSegment[][] = [
  [
    { type: "text", value: "Building " },
    {
      type: "link",
      link: {
        text: "Emocentric",
        href: "https://emo.studio",
        icon: "/emocentric.svg",
        iconWidth: 20,
        iconHeight: 20,
      },
    },
    { type: "blink" },
  ],
  [
    { type: "text", value: "Co-founding " },
    {
      type: "link",
      link: {
        text: "Resonance",
        href: "https://rsnc.ai",
        icon: "/pally.svg",
        iconWidth: 18,
        iconHeight: 18,
      },
    },
    { type: "blink" },
  ],
];

type ExperienceItem = {
  prefix: string;
  role: string;
  company: string;
  detail: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  iconInvert?: boolean;
};

const EXPERIENCE: ExperienceItem[] = [
  {
    prefix: "#2",
    role: "Founding Engineer",
    company: "Icon",
    detail: "$12M ARR",
    icon: "/icon.png",
    iconWidth: 20,
    iconHeight: 20,
    iconInvert: true,
  },
  {
    prefix: "",
    role: "Scout",
    company: "Soma Capital",
    detail: "$1B AUM",
    icon: "/soma.png",
    iconWidth: 20,
    iconHeight: 20,
  },
  {
    prefix: "",
    role: "Founder in Residence",
    company: "Photon",
    detail: "0.375%",
    icon: "/photon.png",
    iconWidth: 20,
    iconHeight: 20,
  },
  {
    prefix: "",
    role: "ML & PL",
    company: "Penn Medicine",
    detail: "Prof. Rajapakse",
    icon: "/penn.png",
    iconWidth: 20,
    iconHeight: 20,
  },
  {
    prefix: "",
    role: "Content Strategist",
    company: "Blackbox",
    detail: "2M+ views",
    icon: "/blackbox.png",
    iconWidth: 20,
    iconHeight: 20,
    iconInvert: true,
  },
  {
    prefix: "",
    role: "SWE & PM",
    company: "United Nations",
    detail: "acquired @ 16",
    icon: "/un.png",
    iconWidth: 20,
    iconHeight: 20,
  },
];

const EMAIL = "him@jasonxu.me";

const FOOTER_LINKS = [
  { label: "Portfolio", href: "#" },
  { label: "Lore", href: "#" },
];

const STORY_LINKS = [
  { label: "Portfolio", href: "#" },
  { label: "Lore", href: "#" },
];

/* ── Components ────────────────────────────────────────── */

function InlineLinkEl({ link }: { link: InlineLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-link"
    >
      {link.icon && (
        <Image
          src={link.icon}
          alt=""
          width={link.iconWidth ?? 18}
          height={link.iconHeight ?? 18}
          className={`mr-1 inline-block align-middle ${
            link.iconInvert ? "invert" : ""
          }`}
        />
      )}
      {link.text}
    </a>
  );
}

function HeroLine({ segments }: { segments: HeroSegment[] }) {
  return (
    <p className="text-base md:text-lg">
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.value}</span>;
        if (seg.type === "link")
          return <InlineLinkEl key={i} link={seg.link} />;
        if (seg.type === "blink")
          return (
            <span key={i} className="animate-blink">
              |
            </span>
          );
        return null;
      })}
    </p>
  );
}

function ExperienceRow({ item }: { item: ExperienceItem }) {
  return (
    <p className="text-sm md:text-base">
      <Image
        src={item.icon}
        alt=""
        width={item.iconWidth}
        height={item.iconHeight}
        className={`mr-1 inline-block align-middle ${
          item.iconInvert ? "brightness-75 grayscale invert" : "grayscale"
        }`}
      />
      {item.prefix && <span className="font-semibold">{item.prefix} </span>}
      {item.role} @{" "}
      <span className="font-semibold">{item.company}</span>{" "}
      <span className="text-sm opacity-60">({item.detail})</span>
    </p>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 md:px-12">
      <div className="w-full max-w-3xl">
        {/* Heading */}
        <h1
          className="text-5xl leading-tight md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          Amogh Jambekar
        </h1>

        {/* Hero lines */}
        <div className="mt-6">
          {HERO_CONTENT.map((line, i) => (
            <HeroLine key={i} segments={line} />
          ))}
        </div>

        {/* Previously */}
        <h2 className="mt-8 mb-4 text-2xl md:text-3xl" style={{ fontFamily: "var(--font-garamond)" }}>
          Previously
        </h2>
        <div className="space-y-1">
          {EXPERIENCE.map((item, i) => (
            <ExperienceRow key={i} item={item} />
          ))}
        </div>

        {/* Contact */}
        <div className="mt-8">
          <p className="text-base md:text-lg">
            Reach me at{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="contact-link underline"
            >
              {EMAIL}
            </a>
          </p>
        </div>

        {/* Footer nav */}
        <nav className="mt-6 mb-6 flex flex-wrap gap-x-6 gap-y-3 md:gap-x-8">
          {FOOTER_LINKS.map((link, i) => (
            <a key={i} href={link.href} className="nav-link text-sm">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </main>
  );
}
