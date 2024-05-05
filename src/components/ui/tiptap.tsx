import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ToolbarTiptop } from '@/components/ui/toolbarTiptop';
import Heading from '@tiptap/extension-heading';

interface TiptapProps {
	description: string,
	onChange: (richText: string) => void;
}

export const Tiptap = ({ description, onChange }: TiptapProps) => {
	const editor = useEditor({
		extensions: [StarterKit.configure({
			
		}), Heading.configure({
			HTMLAttributes: {
				class: 'text-xl font-bold',
				levels: [2]
			}
		})],
		content: description,
		editorProps: {
			attributes: {
				class:
					'rounded-md border min-h-[150px] border-input disabled:cursor-not-allowed'
			}
		},

		onUpdate({ editor }) {
			onChange(editor.getHTML())
			console.log(editor.getHTML());

		}
	})

	return (
		<div>
			<ToolbarTiptop editor={editor} />
			<EditorContent editor={editor} />
		</div>
	)
}