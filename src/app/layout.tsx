import type { Metadata, Viewport } from "next";
import { Cursor } from "@/components/layout/cursor";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Intro } from "@/components/layout/intro";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { site } from "@/content";
import { fontDisplay, fontSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} | ${site.title}`,
  description: `${site.name}. ${site.title}. ${site.range}.`,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} antialiased`}
    >
      <body>
        <noscript>
          <style>{`[data-intro]{display:none!important}`}</style>
        </noscript>
        <SmoothScroll>
          <Intro />
          <Header />
          <main className="overflow-x-clip">{children}</main>
          <Footer />
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
