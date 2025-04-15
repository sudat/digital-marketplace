"use client";

import { Button } from "@/components/ui/button";
import {
  useEditor,
  EditorContent,
  type Editor,
  JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        type="button"
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "secondary"
        }
      >
        H1
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        type="button"
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "secondary"
        }
      >
        H2
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        type="button"
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "secondary"
        }
      >
        H3
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        type="button"
        variant={editor.isActive("bold") ? "default" : "secondary"}
      >
        Bold
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type="button"
        variant={editor.isActive("italic") ? "default" : "secondary"}
      >
        Italic
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        type="button"
        variant={editor.isActive("strike") ? "default" : "secondary"}
      >
        Strike
      </Button>
    </div>
  );
};

type TiptapEditorProps = {
  setJson: any;
  json: JSONContent | null;
};
export function TiptapEditor({ setJson, json }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[150px] prose prose-sm sm:prose-base",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setJson(editor.getJSON());
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="rounded-lg border p-2 mt-2" />
    </div>
  );
}
