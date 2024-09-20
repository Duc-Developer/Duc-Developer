import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { cn } from "@/lib/utils";

import "./globals.css";
import { metadataVn } from "@/config";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
export const metadata = metadataVn;

export const viewport: Viewport = {
  themeColor: "#030014",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta name="author" content={metadata.authors.name} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://david.id.vn" />
        <meta property="og:image" content="https://david.id.vn/meta-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://david.id.vn/meta-image.png" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <StarsCanvas />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
