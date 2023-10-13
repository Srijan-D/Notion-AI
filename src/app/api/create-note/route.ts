import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { generatePrompt, generateImage } from "@/lib/openai";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  const body = await req.json();
  const { name } = body;
  const image_description = await generatePrompt(name);
  if (!image_description) {
    return new NextResponse("error generating image description", {
      status: 500,
    });
  }
  const image_url = await generateImage(image_description);
  if (!image_url) {
    return new NextResponse("error generating image", {
      status: 500,
    });
  }

  const note_ids = await db
    .insert($notes)
    .values({
      name: name,
      userId: userId,
      imageUrl: image_url,
    })
    .returning({
      insertedId: $notes.id, //returning the id of the inserted row
    });

  return NextResponse.json({
    note_id: note_ids[0].insertedId,
  });
}
