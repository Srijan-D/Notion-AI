"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {};

const AddNote = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex border-dashed border-2 border-green-600 hover:shadow-xl flex-row md:flex-col items-center justify-center transition hover:-translate-y-1 p-4">
          <Plus className="w-5 h-5 text-green-600" strokeWidth={3} />
          <h2 className="font-semibold text-green-600 ml-2">Add new note</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> New note</DialogTitle>
          <DialogDescription>
            Add a new note by clicking the following button
          </DialogDescription>
        </DialogHeader>
        <form>
          <Input placeholder="Name..." className="mb-5" />
          {/* <div className="h-4 "></div> */}
          <div className="flex items-center">
            <Button></Button>
            <Button>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNote;