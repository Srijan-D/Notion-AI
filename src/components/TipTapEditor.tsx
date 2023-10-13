"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Menubar from "@/components/MenuBar";
import { Button } from "./ui/button";
import axios from "axios";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import { NoteType } from "@/lib/db/schema";
type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = useState(
    note.editorState || `<h1>${note.name}</h1>`
  );

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  const saveNotes = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/save-notes", {
        noteId: note.id,
        editorState: editorState,
      });
      return response.data;
    },
  });

  const debounceEditorState = useDebounce(editorState, 500);

  useEffect(() => {
    if (editorState === "") return;
    saveNotes.mutate(undefined, {
      onSuccess: (data) => {
        console.log("success", data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debounceEditorState]);

  return (
    <React.Fragment>
      <div className="flex">
        {editor && <Menubar editor={editor} />}
        <Button className="ml-auto" disabled>
          {saveNotes.isLoading ? "Saving..." : "Saved"}
        </Button>
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </React.Fragment>
  );
};

export default TipTapEditor;
