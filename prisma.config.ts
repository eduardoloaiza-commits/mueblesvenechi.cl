// Config del CLI de Prisma (db push / migrate). En runtime la conexión va
// por @prisma/adapter-pg en src/lib/db.ts; aquí solo se resuelve la URL para
// los comandos de consola. Lee .env y .env.local (patrón vercel env pull).
import "dotenv/config";
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
