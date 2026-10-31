import { drizzle } from "drizzle-orm/d1";
import type { D1Database } from "@cloudflare/workers-types";
import * as schema from "./schema";

export const getDb = (d1: D1Database) => {
  return drizzle(d1, { schema });
};
export type DrizzleDb = ReturnType<typeof getDb>;
