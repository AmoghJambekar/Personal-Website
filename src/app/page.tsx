import Image from "next/image";
import { PageLoader } from "@/components/PageLoader";

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
  { text: ",  Sophomore at " },
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
    { text: "Incoming Software Developer @ " },
    {
      link: {
        text: "Sandbox",
        url: "https://www.sandboxnu.com/",
        icon: { src: "/sandbox.png", alt: "Sandbox" },
      },
    },
    { text: " (Fall 2026)" },
  ],
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
  background: "var(--background)",
  primary: "var(--foreground)",
  secondary: "var(--foreground-secondary)",
};

const FONT_BODY = {
  fontFamily: "var(--font-montserrat), sans-serif",
  fontWeight: 400 as const,
};

const FONT_HEADING = {
  fontFamily: "var(--font-heading), serif",
  fontWeight: 500 as const,
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
  return (
    <PageLoader>
    <div
      className="min-h-screen"
      style={{
        ...FONT_BODY,
        backgroundColor: COLORS.background,
        color: COLORS.primary,
      }}
    >
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-4xl mt-6 mb-6">
            {/* Heading */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight"
              style={{ ...FONT_HEADING, color: COLORS.primary }}
            >
              Amogh Jambekar
            </h1>

            {/* Current */}
            <div
              className="text-base md:text-lg"
              style={{ color: COLORS.secondary, lineHeight: 1.7 }}
            >
              <p>
                <SegmentRenderer segments={CURRENT_LINE} />
              </p>

              <ul className="mt-6 pl-5 space-y-1" style={{ listStyleType: "'•  '" }}>
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
            <h2 className="mt-4">
              <a
                href={`mailto:${EMAIL}`}
                className="contact-link text-xl md:text-2xl leading-tight inline-block"
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

            {/* Social links */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://linkedin.com/in/amoghjambekar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-link p-2"
                aria-label="LinkedIn"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/AmoghJambekar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-link p-2"
                aria-label="GitHub"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#181717">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
        </div>
      </section>
    </div>
    </PageLoader>
  );
}
