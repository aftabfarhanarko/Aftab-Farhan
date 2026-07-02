import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type ProjectWithTech = Record<string, unknown> & {
  tech: Array<{
    tech: {
      name: string;
    };
  }>;
};

export async function GET() {
  try {
    const projects = (await prisma.project.findMany({
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
    })) as unknown as ProjectWithTech[];

    // Flatten the tech relation for easier frontend usage
    const formattedProjects = projects.map((project: ProjectWithTech) => ({
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
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    const project = (await prisma.project.create({
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
    })) as unknown as ProjectWithTech;

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
