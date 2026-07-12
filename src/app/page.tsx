import Image from "next/image";

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
      url: "",
      icon: { src: "", alt: "" },
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
    { text: "#2 Founding Engineer @ " },
    {
      link: {
        text: "Icon",
        url: "https://icon.com",
        icon: { src: "/icon.png", alt: "Icon", dy: 1 },
      },
    },
    { text: " ($12M ARR)" },
  ],
  [
    { text: "Scout @ " },
    {
      link: {
        text: "Soma Capital",
        url: "https://somacap.com/",
        icon: { src: "/soma.png", alt: "Soma Capital", fit: "contain" },
      },
    },
    { text: " ($1B AUM)" },
  ],
  [
    { text: "Founder in Residence @ " },
    {
      link: {
        text: "Photon",
        url: "https://photon.codes",
        icon: { src: "/photon.png", alt: "Photon" },
      },
    },
    { text: " (0.375%)" },
  ],
  [
    { text: "ML & PL @ " },
    {
      link: {
        text: "Penn Medicine",
        url: "https://www.pennmedicine.org/",
        icon: {
          src: "/penn.png",
          alt: "Penn Medicine",
          size: 20,
          dy: 1,
          grayscale: true,
        },
      },
    },
    { text: " (Prof. Rajapakse)" },
  ],
  [
    { text: "Content Strategist @ " },
    {
      link: {
        text: "Blackbox",
        url: "https://blackbox.ai",
        icon: { src: "/blackbox.png", alt: "Blackbox" },
      },
    },
    { text: " (2M+ views)" },
  ],
  [
    { text: "SWE & PM @ " },
    {
      link: {
        text: "United Nations",
        url: "https://un.org",
        icon: {
          src: "/un.png",
          alt: "United Nations",
          size: 22,
          grayscale: true,
          brightness: 0.1,
          zoom: 1,
          fit: "contain",
        },
      },
    },
    { text: " (acq. @ 16)" },
  ],
];

const FREE_TIME =
  "In my free time, I like to play pickup basketball, eat a lot of food and explore the world.";

const EMAIL = "him@jasonxu.me";

const COLORS = {
  background: "#ffffff",
  primary: "#333333",
  secondary: "#666666",
};

const FONT_BODY = {
  fontFamily: "var(--font-montserrat), sans-serif",
  fontWeight: 300 as const,
};

const FONT_HEADING = {
  fontFamily: "var(--font-garamond), serif",
  fontWeight: 300 as const,
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
        width={size}
        height={size}
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
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        ...FONT_BODY,
        backgroundColor: COLORS.background,
        color: COLORS.primary,
      }}
    >
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-3xl mt-6 mb-6">
          {/* Heading */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight transition-colors duration-300"
            style={{ ...FONT_HEADING, color: "#2e2e2e", fontWeight: 700 }}
          >
            Amogh Jambekar
          </h1>

          {/* Current */}
          <div
            className="text-base md:text-lg transition-colors duration-300"
            style={{ color: COLORS.secondary, lineHeight: 1.7 }}
          >
            <p>
              <SegmentRenderer segments={CURRENT_LINE} />
            </p>

            {/* Previously */}
            <p className="mt-6">Previously I was...</p>
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
              className="contact-link text-2xl md:text-3xl mt-6 leading-tight inline-block transition-colors duration-300"
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
    </div>
  );
}
