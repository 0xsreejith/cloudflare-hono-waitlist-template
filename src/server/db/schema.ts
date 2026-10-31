import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const subscribers = sqliteTable(
  "subscribers",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    email: text("email").notNull().unique(),

    createdAt: integer("created_at", {
      mode: "timestamp",
    })
      .notNull()
      .default(sql`(unixepoch())`),

    updatedAt: integer("updated_at", {
      mode: "timestamp",
    })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date()),

    trafficSource: text("traffic_source"),

    device: text("device"),

    emailVerified: integer("email_verified", {
      mode: "timestamp",
    }),

    unsubscribed: integer("unsubscribed", {
      mode: "timestamp",
    }),

    confirmationToken: text("confirmation_token"),
  },
  (table) => [check("subscribers_email_check", sql`${table.email} LIKE '%@%'`)],
);

export type NewSubscriber = typeof subscribers.$inferInsert;
export type Subscriber = typeof subscribers.$inferSelect;
