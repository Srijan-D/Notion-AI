"use client";
import React from "react";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Menubar from "@/components/MenuBar";
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
        {editor && <Menubar editor={editor} />}
        <Button className="ml-auto">Save</Button>
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </React.Fragment>
  );
};

export default TipTapEditor;
