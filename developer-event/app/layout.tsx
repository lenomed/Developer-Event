import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from '@/components/LightRays';


const schibsted_Grotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub For Every Tech Event You Mustn't Miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${schibsted_Grotesk.variable} ${martianMono.variable} antialiased`}
    >
      <body className={`${schibsted_Grotesk.variable} ${martianMono.variable} min-h-screen antialiased`}>

        <div className = "absolute inset-0 top-0 z-1 min-h-screen" style={{ width: '100%', height: '600px', position: 'relative' }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={.5}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0}
            distortion={0.01}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
        />
        </div>
        <main>
              {children}
        </main>
      </body>
    </html>
  );
}
