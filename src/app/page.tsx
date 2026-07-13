import fs from "fs";
import path from "path";
import Image from "next/image";
import ContentWithTrail from "@/components/ContentWithTrail";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

function getTrailImages(): string[] {
  const dir = path.join(process.cwd(), "public", "trail-images");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/trail-images/${f}`);
}

/* ── Types ─────────────────────────────────────────────── */

type IconConfig = {
  src: string;
  alt: string;
  size?: number;
  radius?: number;
  dy?: number;
  bg?: string;
  fit?: "contain" | "fill" | "cover";
  grayscale?: boolean;
  invert?: boolean;
  brightness?: number;
  zoom?: number;
};

type LinkSegment = {
  link: { text: string; url: string; icon?: IconConfig };
};
type TextSegment = { text: string };
type Segment = LinkSegment | TextSegment;



const CURRENT_LINE: Segment[] = [
  { text: "Currently building " },
  {
    link: {
      text: "Tandem",
      url: "https://tandem.com",
      icon: { src: "/tandem_transparent.png", alt: "Tandem", size: 22 },
    },
  },
  { text: ", Student at " },
  {
    link: {
      text: "Northeastern",
      url: "https://catalog.northeastern.edu/undergraduate/engineering/electrical-computer/computer-engineering-bscompe/",
      icon: { src: "/northeastern.png", alt: "Northeastern", size: 24 },
    },
  },
];

const EXPERIENCE: Segment[][] = [
  [
    { text: "Created " },
    {
      link: {
        text: "JerseyStats",
        url: "https://jerseystats.up.railway.app/",
        icon: { src: "/jerseystats_favicon.png", alt: "JerseyStats", radius: 50 },
      },
    },
    { text: ": NBA analytics by jersey colorway" },
  ],
  [
    { text: "Built " },
    {
      link: {
        text: "BackedX",
        url: "https://github.com/1N4B0M9/BackedX",
        icon: { src: "/backedx.png", alt: "BackedX" },
      },
    },
    { text: " @ TartanHacks 2026 (Winner: Ripple Prize)" },
  ],
  [
    { text: "Computer Architecture @ " },
    {
      link: {
        text: "Northeastern COE",
        url: "https://ece.northeastern.edu/fac-ece/kaeli.html",
        icon: { src: "/northeasterncoe.jpg", alt: "Northeastern COE", radius: 50 },
      },
    },
    { text: " (Prof. Kaeli)" },
  ],
  [
    { text: "Growth @ " },
    {
      link: {
        text: "EmberPay",
        url: "https://embercard.com",
        icon: { src: "/emberpay.jpeg", alt: "EmberPay" },
      },
    },
    { text: " (1,500+ waitlist signups)" },
  ],
  [
    { text: "SWE @ " },
    {
      link: {
        text: "BestParents.com",
        url: "https://www.bestparents.com/copilot",
        icon: { src: "/bestparents.jpeg", alt: "BestParents" },
      },
    },
    { text: " (College essay wizard for 1.5k+ low income students)" },
  ],
  [
    { text: "SWE @ " },
    {
      link: {
        text: "Holonym Foundation",
        url: "https://human.tech/",
        icon: { src: "/holonym.jpeg", alt: "Holonym" },
      },
    },
    { text: " (10k+ downloads, 5.5M$ seed, solo dev on project)" },
  ],
];

const FREE_TIME =
  "In my free time, I like to play basketball, eat food and explore nature and new places.";

const EMAIL = "jambekar.a@northeastern.edu";

const COLORS = {
  background: "#ffffff",
  primary: "#1a1a1a",
  secondary: "#3a3a3a",
};

const FONT_BODY = {
  fontFamily: "var(--font-montserrat), sans-serif",
  fontWeight: 400 as const,
};

const FONT_HEADING = {
  fontFamily: "var(--font-heading), serif",
  fontWeight: 400 as const,
};

/* ── Helpers ───────────────────────────────────────────── */

function SegmentRenderer({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        "link" in seg ? (
          <a
            key={i}
            href={seg.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            {seg.link.icon && <IconBadge icon={seg.link.icon} />}
            {seg.link.text}
          </a>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

function IconBadge({ icon }: { icon: IconConfig }) {
  const size = icon.size ?? 18;
  const radius = icon.radius ?? 5;

  const filterParts = [
    icon.grayscale && "grayscale(1)",
    icon.invert && "invert(1)",
    icon.brightness != null && `brightness(${icon.brightness})`,
  ].filter(Boolean);

  const fitClass =
    icon.fit === "contain"
      ? "object-contain"
      : icon.fit === "fill"
        ? "object-fill"
        : "object-cover";

  return (
    <span
      className="inline-block align-middle mr-1 overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${radius}px`,
        marginTop: `${-4 + (icon.dy ?? 0)}px`,
        backgroundColor: icon.bg,
      }}
    >
      <Image
        src={icon.src}
        alt={icon.alt}
        width={size * 3}
        height={size * 3}
        className={`h-full w-full ${fitClass}`}
        style={{
          ...(icon.zoom ? { transform: `scale(${icon.zoom})` } : {}),
          filter: filterParts.length ? filterParts.join(" ") : undefined,
        }}
      />
    </span>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export default function Home() {
  const trailImages = getTrailImages();

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        ...FONT_BODY,
        backgroundColor: COLORS.background,
        color: COLORS.primary,
      }}
    >
      <ContentWithTrail images={trailImages}>
        <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
          <div
            className="w-full max-w-4xl mt-6 mb-6 relative"
            style={{
              zIndex: 20,
              backgroundColor: "#ffffff",
              boxShadow: "0 0 60px 40px #ffffff",
            }}
          >
            {/* Heading */}
            <h1
              className="text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight transition-colors duration-300"
              style={{ ...FONT_HEADING, color: "#000000", fontWeight: 600 }}
            >
              Amogh Jambekar
            </h1>

            {/* Current */}
            <div
              className="text-lg md:text-xl transition-colors duration-300"
              style={{ color: COLORS.secondary, lineHeight: 1.7 }}
            >
              <p>
                <SegmentRenderer segments={CURRENT_LINE} />
              </p>

              {/* Previously */}
              <p className="mt-6">A little about me and what I've done...</p>
              <ul className="mt-2 pl-5 space-y-1" style={{ listStyleType: "'•  '" }}>
                {EXPERIENCE.map((segments, i) => (
                  <li key={i}>
                    <SegmentRenderer segments={segments} />
                  </li>
                ))}
              </ul>

              {/* Free time */}
              <p className="mt-6">{FREE_TIME}</p>
            </div>

            {/* Email */}
            <h2>
              <a
                href={`mailto:${EMAIL}`}
                className="contact-link text-3xl md:text-4xl mt-8 leading-tight inline-block transition-colors duration-300"
                style={{
                  ...FONT_HEADING,
                  color: COLORS.primary,
                  textDecoration: "none",
                  transformOrigin: "left center",
                }}
              >
                {EMAIL}
              </a>
            </h2>
          </div>
        </section>
      </ContentWithTrail>
    </div>
  );
}
