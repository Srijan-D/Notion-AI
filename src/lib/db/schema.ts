import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const $notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: text("user_id").notNull(),
  imageUrl: text("imageUrl"),
  editorState: text("editor_state"),
});

export type NoteType = typeof $notes.$inferInsert;
