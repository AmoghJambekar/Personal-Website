import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import BlobCursor from "@/components/BlobCursor";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-eb-garamond",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
  variable: "--font-montserrat-var",
});

export const metadata: Metadata = {
  title: "Amogh Jambekar",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${montserrat.variable} h-full`}
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
