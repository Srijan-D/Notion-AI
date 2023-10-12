import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { type } from "os";

export const $notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(), //timestamp
  imageUrl: text("imageUrl"), //dalle
  userId: text("user_id").notNull(), //clerk id
  editorState: text("editor_state"), //data of each notes
});

export type NoteType = typeof $notes.$inferInsert;
