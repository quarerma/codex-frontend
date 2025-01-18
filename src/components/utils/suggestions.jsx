import { createRoot } from 'react-dom/client'; // Use createRoot from React 18
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // For styling
import CommandList from '../global/command-list'; // Ensure this component is correctly imported

export const suggestion = {
  items: ({ query }) => {
    const items = [
      { title: 'Heading 1', command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run() },
      { title: 'Heading 2', command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run() },
      { title: 'Bold', command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setMark('bold').run() },
      { title: 'Italic', command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setMark('italic').run() },
    ];

    return items.filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10);
  },

  render: () => {
    let root;
    let popup;

    return {
      onStart: (props) => {
        const el = document.createElement('div');
        root = createRoot(el); // Create root for rendering

        root.render(<CommandList {...props} />);

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: el,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props) {
        root.render(<CommandList {...props} />); // Re-render with updated props
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onExit() {
        popup[0].destroy();
        root.unmount(); // Correct way to unmount in React 18
      },
    };
  },
};

export default suggestion;
