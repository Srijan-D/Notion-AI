"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Menubar from "@/components/MenuBar";
import { Button } from "./ui/button";
import axios from "axios";
import { useCompletion } from "ai/react";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import { NoteType } from "@/lib/db/schema";
import Text from "@tiptap/extension-text";
type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = useState(
    note.editorState || `<h1>${note.name}</h1>`
  );
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const prompt = this.editor.getText().split(" ").slice(-28).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

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
        <Button className="ml-auto" disabled variant={"default"}>
          {saveNotes.isLoading ? "Saving..." : "Saved"}
        </Button>
      </div>
      <div className="prose prose-sm w-full mt-4">
        <EditorContent editor={editor} />
      </div>
      <span className="text-sm mt-4">
        Tip: Press{" "}
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
          Shift + A
        </kbd>{" "}
        for AI autocomplete
      </span>
    </React.Fragment>
  );
};

export default TipTapEditor;
