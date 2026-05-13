import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      usersTotal,
      heroTotal,
      heroStatsTotal,
      heroSocialsTotal,
      aboutTotal,
      educationTotal,
      experienceTotal,
      rolesTotal,
      achievementsTotal,
      skillCategoriesTotal,
      skillsTotal,
      contactTotal,
      contactUnread,
      projectsTotal,
      projectsFeatured,
      techTotal,
      projectTechTotal,
      projectByCategory,
      projectByType,
      messagesByStatus,
      skillsByCategory,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.hero.count(),
      prisma.heroStat.count(),
      prisma.heroSocial.count(),
      prisma.about.count(),
      prisma.education.count(),
      prisma.experience.count(),
      prisma.role.count(),
      prisma.achievement.count(),
      prisma.skillCategory.count(),
      prisma.skill.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.tech.count(),
      prisma.projectTech.count(),
      prisma.project.groupBy({
        by: ["category"],
        _count: { _all: true },
      }),
      prisma.project.groupBy({
        by: ["projectType"],
        _count: { _all: true },
      }),
      prisma.contactMessage.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
      prisma.skill.groupBy({
        by: ["categoryId"],
        _count: { _all: true },
      }),
    ]);

    const categoryIds = skillsByCategory.map((row) => row.categoryId);
    const categories = categoryIds.length
      ? await prisma.skillCategory.findMany({
          where: { id: { in: categoryIds } },
          select: { id: true, title: true },
        })
      : [];

    const categoryTitleById = new Map(categories.map((c) => [c.id, c.title]));

    const response = {
      totals: {
        users: usersTotal,
        hero: heroTotal,
        about: aboutTotal,
        projects: projectsTotal,
        skills: skillsTotal,
        skillCategories: skillCategoriesTotal,
        education: educationTotal,
        experience: experienceTotal,
        contactMessages: contactTotal,
        tech: techTotal,
      },
      hero: {
        total: heroTotal,
        stats: heroStatsTotal,
        socials: heroSocialsTotal,
      },
      experience: {
        total: experienceTotal,
        roles: rolesTotal,
        achievements: achievementsTotal,
      },
      messages: {
        total: contactTotal,
        unread: contactUnread,
        byStatus: Object.fromEntries(
          messagesByStatus.map((row) => [row.status, row._count._all]),
        ),
      },
      projects: {
        total: projectsTotal,
        featured: projectsFeatured,
        tech: techTotal,
        projectTech: projectTechTotal,
        byCategory: Object.fromEntries(
          projectByCategory.map((row) => [row.category, row._count._all]),
        ),
        byType: Object.fromEntries(
          projectByType.map((row) => [row.projectType, row._count._all]),
        ),
      },
      skills: {
        total: skillsTotal,
        categories: skillCategoriesTotal,
        byCategory: skillsByCategory.map((row) => ({
          categoryId: row.categoryId,
          title: categoryTitleById.get(row.categoryId) ?? "Unknown",
          count: row._count._all,
        })),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard overview" },
      { status: 500 },
    );
  }
}
