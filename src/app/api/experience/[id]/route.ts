// app/api/experiences/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid experience ID" },
        { status: 400 }
      );
    }

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

    // ট্রানজেকশনের মাধ্যমে আগের roles ও achievements ডিলিট করে নতুনগুলো বসানো
    const updatedExperience = await prisma.$transaction(async (tx) => {
      // ১. আগের সব roles ও achievements মুছে ফেলা
      await tx.role.deleteMany({ where: { experienceId: id } });
      await tx.achievement.deleteMany({ where: { experienceId: id } });

      // ২. এক্সপেরিয়েন্স আপডেট + নতুন সম্পর্কিত ডাটা তৈরি
      return tx.experience.update({
        where: { id },
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
    });

    return NextResponse.json(updatedExperience);
  } catch (error) {
    console.error("Experience PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}