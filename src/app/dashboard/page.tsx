import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import AddNote from "@/components/AddNote";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import Image from "next/image";

import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type Props = {};

const Dashboard = async (props: Props) => {
  const { userId } = auth();
  const notes = await db
    .select()
    .from($notes)
    .where(eq($notes.userId, userId!));
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl  p-8 mx-auto">
        <div className="mt-16 flex justify-between items-center flex-col md:flex-row ">
          <div className="flex items-center ">
            <Link href="/">
              <Button className="bg-green-600 mr-3" size="sm">
                <ArrowLeft className=" h-4  w-4 mr-2" />
                Home
              </Button>
            </Link>
            <h1 className="mt-2 text-3xl mb-2 font-bold text-gray-900 mr-3">
              My Notes
            </h1>
            <UserButton />
          </div>
        </div>
        <div className="h-8"></div>
        <Separator />
        <div className="h-8"></div>
        {notes.length === 0 && (
          <div className="text-center">
            <h2 className="text-xl text-gray-500">No notes yet!༼ つ ◕_◕ ༽つ</h2>
          </div>
        )}

        {/* all notes */}
        <div className="grid grid-cols-1 md:grid-cols-5  gap-4 sm:grid-cols-3">
          <AddNote />
          {notes.map((note) => (
            <a href={`/notes/${note.id}`} key={note.id}>
              <div className="overflow-hidden flex border border-stone-200 rounded-lg flex-col hover:shadow-xl transition hover:-translate-y-1">
                <img
                  width={400}
                  height={200}
                  alt={note.name}
                  src={note.imageUrl || ""}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {note.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
