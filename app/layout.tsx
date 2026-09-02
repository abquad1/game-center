import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// import Navbar from "@/components/navbar";

const TomatoGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/SECONDARY-TYPEFACE/TomatoGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SECONDARY-TYPEFACE/TomatoGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SECONDARY-TYPEFACE/TomatoGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },

  ],
  variable: "--font-body",
});

const conthrax = localFont({
  src: '../public/fonts/PRIMARY-TYPEFACE/conthrax-sb.ttf',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: "Babs Sport",
  description: " A game center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", TomatoGrotesk.variable, conthrax.variable, "font-sans")}
    >
      <body className="overflow-x-hidden text-foreground bg-background flex flex-row w-full h-full">
        <Sidebar/>
        <main className="flex-1 h-screen overflow-y-auto px-4 py-4 bg-[#0f0f12]">
          {children}
        </main>
      </body>
    </html>
  );
}
