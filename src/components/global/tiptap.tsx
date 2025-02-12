import React, { useEffect, useRef } from 'react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import Color from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Underline from '@tiptap/extension-underline';
import CommandExtension from '../utils/commands.js';
import suggestion from '../utils/suggestions.jsx';

export default function CharacterPage() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = new Editor({
      element: editorRef.current,
      extensions: [
        StarterKit,
        BulletList,
        Color,
        Heading,
        Highlight,
        Link,
        OrderedList,
        Paragraph,
        Table,
        TableRow,
        TableCell,
        TableHeader,
        TaskList,
        TaskItem,
        Underline,
        CommandExtension.configure({
          suggestion,
        }),
      ],
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none ',
        },
      },
    });

    // Cleanup
    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div>
      <h1 className="text-white/30 font-semibold tracking-widest text-5xl">Character Page</h1>
      <div ref={editorRef}></div>
    </div>
  );
}
