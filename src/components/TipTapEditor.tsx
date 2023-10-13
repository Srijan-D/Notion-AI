"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Menubar from "@/components/MenuBar";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
type Props = {};

const TipTapEditor = (props: Props) => {
  const [editorState, setEditorState] = useState("");

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const debounceEditorState = useDebounce(editorState, 500);

  useEffect(() => {
    console.log(editorState);
  }, [debounceEditorState]);

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
