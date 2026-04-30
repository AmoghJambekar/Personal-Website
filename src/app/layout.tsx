import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-eb-garamond",
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
    <html lang="en" className={`${ebGaramond.variable} h-full`}>
      <body
        className={`${ebGaramond.className} m-0 min-h-full overflow-x-hidden bg-black antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
