import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title,
      tagline,
      description,
      image,
      demoLink,
      githubLink,
      category,
      year,
      featured,
      projectType,
      client,
      tech, // array of strings
    } = body;

    // 1. Delete existing tech relations for this project
    await prisma.projectTech.deleteMany({
      where: { projectId: id },
    });

    // 2. Update project and create new tech relations
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        tagline,
        description,
        image,
        demoLink,
        githubLink,
        category,
        year,
        featured,
        projectType,
        client,
        tech: {
          create: await Promise.all(
            (tech || []).map(async (techName: string) => {
              const techRecord = await prisma.tech.upsert({
                where: { name: techName },
                update: {},
                create: { name: techName },
              });
              return {
                tech: {
                  connect: { id: techRecord.id },
                },
              };
            }),
          ),
        },
      },
      include: {
        tech: {
          include: {
            tech: true,
          },
        },
      },
    });

    const formattedProject = {
      ...project,
      tech: project.tech.map((pt) => pt.tech.name),
    };

    return NextResponse.json(formattedProject);
  } catch (error) {
    console.error("Projects PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    // Delete project (cascading will handle ProjectTech if configured,
    // but we have onDelete: Cascade in schema for ProjectTech)
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Projects DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
