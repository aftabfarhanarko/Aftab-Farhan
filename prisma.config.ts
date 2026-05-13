import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres:arpo5432@localhost:5432/my-proftlioe-data",
  },
});
