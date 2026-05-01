import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "25th&Staffing | Candidate Application",
  description: "Candidate application workspace for 25th&Staffing.",
  applicationName: "25th&Staffing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-950 antialiased">
        {children}
      </body>
    </html>
  );
}
