import { auth } from "@clerk/nextjs";
import React from "react";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { clerk } from "@/lib/clerk-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: {
    notesId: string;
  };
};

const NotebookPage = async ({ params: { notesId } }: Props) => {
  //async to make it a server componenet and so it can give pre-rendered html
  const { userId } = await auth();
  if (!userId) return redirect("/dashboard");
  const user = await clerk.users.getUser(userId);

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(notesId)), eq($notes.userId, userId)));

  if (notes.length !== 1) return redirect("/dashboard");
  const note = notes[0];
  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-green-600" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{note.name}</span>
          <div className="ml-auto">Delete</div>
        </div>

        <div className="h-4"></div>
        <div className="border-stone-200 shadow-xl border px-16 py-7 w-full rounded-lg"></div>
      </div>
    </div>
  );
};

export default NotebookPage;
