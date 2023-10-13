import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { noteId, editorState } = body;
    if (!editorState || !noteId) {
      return new NextResponse("NoteId or editorState not found");
    }
    noteId = parseInt(noteId);
    const notes = await db.select().from($notes).where(eq($notes.id, noteId));
    if (notes.length != 1) {
      return new NextResponse("Could not update", { status: 500 });
    }

    const note = notes[0];
    if (note.editorState !== editorState) {
      await db
        .update($notes)
        .set({
          editorState,
        })
        .where(eq($notes.id, noteId));
    }
    return new NextResponse("Successfully updated", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
