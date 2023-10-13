"use client";
import React from "react";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import { Button } from "./ui/button";
type Props = {};

const TipTapEditor = (props: Props) => {
  const [input, setInput] = useState("");
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: input,
    onUpdate: ({ editor }) => {
      setInput(editor.getHTML());
    },
  });
  return (
    <React.Fragment>
      <div className="flex">
        <Menubar />
        <Button className="ml-auto">Save</Button>
      </div>
      <EditorContent editor={editor} />
    </React.Fragment>
  );
};

export default TipTapEditor;
