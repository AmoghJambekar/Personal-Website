import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import BlobCursor from "@/components/BlobCursor";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
  variable: "--font-montserrat-var",
});

export const metadata: Metadata = {
  title: "Amogh Jambekar",
  description: "Software engineer and sophomore at Northeastern. Building Tandem.",
  openGraph: {
    title: "Amogh Jambekar",
    description: "Software engineer and sophomore at Northeastern. Building Tandem.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Amogh Jambekar",
    description: "Software engineer and sophomore at Northeastern. Building Tandem.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full`}
    >
      <body
        className={`${montserrat.className} m-0 min-h-full overflow-x-hidden antialiased`}
      >
        <BlobCursor />
        {children}
      </body>
    </html>
  );
}
