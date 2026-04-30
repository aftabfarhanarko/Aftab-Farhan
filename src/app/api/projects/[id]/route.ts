import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const body = await request.json();
    const { 
      title, tagline, description, image, category, year, 
      featured, client, demoLink, githubLink, techStack 
    } = body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        tagline,
        description,
        image,
        category,
        year,
        featured,
        client,
        demoLink,
        githubLink,
        techStack: {
          deleteMany: {}, // remove old techStack
          create: techStack?.map((tech: string) => ({ name: tech })) || [],
        },
      },
      include: {
        techStack: true,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
