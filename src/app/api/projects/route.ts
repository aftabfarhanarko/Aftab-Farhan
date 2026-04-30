import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        techStack: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, tagline, description, image, category, year, 
      featured, client, demoLink, githubLink, techStack 
    } = body;

    if (!title || !tagline || !description || !image || !category || !year || !demoLink) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        tagline,
        description,
        image,
        category,
        year,
        featured: featured || false,
        client,
        demoLink,
        githubLink,
        techStack: {
          create: techStack?.map((tech: string) => ({ name: tech })) || [],
        },
      },
      include: {
        techStack: true,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
