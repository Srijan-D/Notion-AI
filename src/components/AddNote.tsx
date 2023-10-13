"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type Props = {};

const AddNote = (props: Props) => {
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const uploadToFirebase = useMutation({
    mutationFn: async (noteId: string) => {
      const response = await axios.post("/api/firebase", {
        noteId,
      });
      return response.data;
    },
  });
  const createNotes = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/create-note", {
        name: input,
      });
      return response.data;
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      window.alert("Please enter a name");
      return;
    }
    createNotes.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        console.log("success", note_id);
        uploadToFirebase.mutate(note_id);
        router.push(`/notes/${note_id}`);
      },
      onError: () => {
        console.log("error");
        window.alert("An error occured while creating the notebook");
      },
    });
  };

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
        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Name..."
            className="mb-5"
          />
          {/* <div className="h-4 "></div> */}
          <div className="flex gap-3 items-center">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600"
              disabled={createNotes.isLoading}
            >
              {createNotes.isLoading && (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              )}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNote;
