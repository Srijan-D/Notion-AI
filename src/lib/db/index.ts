import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;
//so that the connection is cached and reused for subsequent requests even if we reload the page

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);
