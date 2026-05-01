import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Create the driver adapter with your connection string
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,   // pass the adapter (not an object with a url)
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}