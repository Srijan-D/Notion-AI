"use client";
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  noteId: number;
};

const DeleteButton = ({ noteId }: Props) => {
  const router = useRouter();
  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/delete-note", {
        noteId,
      });
      return response.data;
    },
  });

  return (
    <Button
      disabled={deleteNote.isLoading}
      variant={"destructive"}
      size="sm"
      onClick={() => {
        const confirm = window.confirm(
          "Are you sure you want to delete these notes?"
        );
        if (!confirm) return;
        deleteNote.mutate(undefined, {
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: (error) => {
            console.log(error);
          },
        });
      }}
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
};

export default DeleteButton;
