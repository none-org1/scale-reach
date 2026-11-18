import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScaleReach AI Clone",
  description: "AI Video Repurposing Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
