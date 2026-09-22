import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const DEFAULT_EXPERIENCES = [
  {
    id: "exp-1",
    company: "Jevxo Enterprise Software",
    url: "https://jevxo.com",
    location: "Remote / On-site",
    period: "2023 - Present",
    type: "current",
    techStack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Tailwind CSS",
    ],
    roles: [
      {
        id: "role-1",
        title: "Full Stack Software Engineer",
        subtitle: "Enterprise Software & Scalable Web Applications",
        iconName: "Code2",
        responsibilities: [
          "Architected and delivered responsive full-stack web applications using Next.js 16, React, TypeScript, and Node.js.",
          "Designed secure RESTful & GraphQL API architectures with JWT, RBAC authorization, and third-party payment integrations.",
          "Optimized application performance, SEO, accessibility, and automated CI/CD pipelines via Vercel, Docker, and GitHub Actions.",
        ],
      },
    ],
    achievements: [
      { id: "ach-1", metric: "99.9%", label: "Uptime & Reliability" },
      { id: "ach-2", metric: "3.5x", label: "Delivery Velocity" },
      { id: "ach-3", metric: "100%", label: "Type Safety & Security" },
    ],
  },
];

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      include: {
        roles: true,
        achievements: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (experiences && experiences.length > 0) {
      const sanitized = experiences.map((exp) => ({
        ...exp,
        techStack: (exp.techStack || []).slice(0, 8),
        roles: (exp.roles || []).map((r: any) => ({
          ...r,
          responsibilities: (r.responsibilities || []).slice(0, 3),
        })),
      }));
      return NextResponse.json(sanitized);
    }

    return NextResponse.json(DEFAULT_EXPERIENCES);
  } catch (error) {
    console.error("Experience GET Error:", error);
    return NextResponse.json(DEFAULT_EXPERIENCES);
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      company,
      url,
      location,
      period,
      type,
      techStack,
      roles,
      achievements,
    } = body;

    if (!company || !type || !period) {
      return NextResponse.json(
        { error: "company, type, and period are required" },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.create({
      data: {
        company,
        url: url || "",
        location: location || "",
        period,
        type,
        techStack: techStack || [],
        roles: {
          create: (roles || []).map((role: any) => ({
            title: role.title,
            subtitle: role.subtitle,
            iconName: role.iconName,
            responsibilities: role.responsibilities || [],
          })),
        },
        achievements: {
          create: (achievements || []).map((ach: any) => ({
            metric: ach.metric,
            label: ach.label,
          })),
        },
      },
      include: {
        roles: true,
        achievements: true,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error: any) {
    console.error("Experience POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create experience", details: error.message },
      { status: 500 }
    );
  }
}
