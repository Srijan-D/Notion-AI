import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { generatePrompt } from "@/lib/openai";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  const body = await req.json();
  const { name } = body;
  const image_description = await generatePrompt(name);
  console.log(image_description);
  return new NextResponse("WORKING!");
}
