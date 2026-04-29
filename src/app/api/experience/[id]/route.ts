import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
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

    // Delete existing roles and achievements to recreate them
    await prisma.role.deleteMany({ where: { experienceId: id } });
    await prisma.achievement.deleteMany({ where: { experienceId: id } });

    const updatedExperience = await prisma.experience.update({
      where: { id },
      data: {
        company,
        url: url || "",
        location: location || "",
        period,
        type,
        techStack: techStack || [],
        roles: {
          create: (roles || []).map((role: any) => ({
            title: role.title || "Untitled Role",
            subtitle: role.subtitle || "",
            iconName: role.iconName || "Briefcase",
            responsibilities: role.responsibilities || [],
          })),
        },
        achievements: {
          create: (achievements || []).map((ach: any) => ({
            metric: ach.metric || "",
            label: ach.label || "",
          })),
        },
      },
      include: {
        roles: true,
        achievements: true,
      },
    });

    return NextResponse.json(updatedExperience);
  } catch (error: any) {
    console.error("Experience PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update experience", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.experience.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error: any) {
    console.error("Experience DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete experience", details: error.message },
      { status: 500 }
    );
  }
}
