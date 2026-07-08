import "dotenv/config";
import { prisma } from "./src/lib/prisma";

async function main() {
  const experiences = await prisma.experience.findMany({
    include: {
      roles: true,
      achievements: true,
    },
  });
  console.log("Experiences:", JSON.stringify(experiences, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
