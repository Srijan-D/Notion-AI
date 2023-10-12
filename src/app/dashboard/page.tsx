import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import AddNote from "@/components/AddNote";
type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mt-16 flex justify-between items-center flex-col md:flex-row ">
          <div className="flex items-center ">
            <Link href="/">
              <Button className="bg-green-600 mr-3" size="sm">
                <ArrowLeft className="mr-2 w-4 h-4 " />
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
        <div className="text-center">
          <h2 className="text-xl text-gray-500">No notes yet!༼ つ ◕_◕ ༽つ</h2>
        </div>
        {/* all notes */}
        <div className="grid grid-cols-1 md:grid-cols-5  gap-4 sm:grid-cols-3">
          <AddNote />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
