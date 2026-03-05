import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Danish Iskandar | Web Developer Portfolio",
  description:
    "Explore selected projects by Danish Iskandar — including corporate websites, learning management systems, payment gateway integrations, and full-stack web applications built for real Malaysian businesses.",
  keywords: [
    "web developer portfolio",
    "Malaysian web developer",
    "corporate website development",
    "Laravel developer",
    "full-stack developer",
    "LMS development",
    "INPACK Sdn Bhd",
    "MYMS Sdn Bhd",
    "payment gateway integration",
    "Next.js developer",
  ],
  openGraph: {
    title: "Projects - Danish Iskandar | Web Developer",
    description:
      "Corporate websites, LMS platforms, and full-stack applications built for real businesses. View live projects and case studies.",
    type: "website",
    url: "https://iskandar.danish.my/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Danish Iskandar | Web Developer",
    description:
      "Corporate websites, LMS platforms, and full-stack applications built for real businesses.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
