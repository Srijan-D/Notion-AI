import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { noteId } = await req.json();
    const notes = await db.select().from($notes).where(eq($notes.id, noteId));
    if (!notes[0].imageUrl) {
      return new Response("No image found", { status: 404 });
    }
    const firebase_url = await uploadFirebase(notes[0].imageUrl, notes[0].name);
    await db
      .update($notes)
      .set({ imageUrl: firebase_url })
      .where(eq($notes.id, parseInt(noteId)));
    return new NextResponse("Success ", { status: 200 });
  } catch (error) {}
}
