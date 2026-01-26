import type { Metadata } from "next";
import { Iceland } from "next/font/google";
import "./globals.css";

const iceland = Iceland({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-iceland",
});

export const metadata: Metadata = {
  title: "Danish Iskandar - Portfolio",
  description: "Clean architecture. Scalable systems. Built for real businesses.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${iceland.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
