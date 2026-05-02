import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tech: {
          include: {
            tech: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Flatten the tech relation for easier frontend usage
    const formattedProjects = projects.map((project) => ({
      ...project,
      tech: project.tech.map((pt) => pt.tech.name),
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Projects GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
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

    const project = await prisma.project.create({
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
    console.error("Projects POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
