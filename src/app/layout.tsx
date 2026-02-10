import type { Metadata } from "next";
import { Josefin_Sans, Montserrat, Cormorant } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import SiteHeader from "@/components/SiteHeader";
import BackgroundCoordinates from "@/components/BackgroundCoordinates";
import Altimeter from "@/components/Altimeter";
import Gatekeeper from "@/components/Gatekeeper";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-josefin",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-montserrat",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "List the Mountain",
  description: "The Unspoiled Grandeur of the Mountain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${josefinSans.variable} ${montserrat.variable} ${cormorant.variable}`}>
      <body className={`${montserrat.className} antialiased`}>
        <CustomCursor />
        <Altimeter />
        <Gatekeeper>
          <BackgroundCoordinates />
          <SiteHeader />
          <SmoothScroll>{children}</SmoothScroll>
        </Gatekeeper>
      </body>
    </html>
  );
}
