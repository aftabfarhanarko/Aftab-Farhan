// app/api/experiences/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
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

    // বেসিক ভ্যালিডেশন (নিজের মতো করে আরও যোগ করতে পারো)
    if (!company || !type || !period) {
      return NextResponse.json(
        { error: "company, type, and period are required" },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.create({
      data: {
        company,
        url,
        location,
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
  } catch (error) {
    console.error("Experience POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}