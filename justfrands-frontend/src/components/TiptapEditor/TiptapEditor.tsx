import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';

// define your extension array
const extensions = [Document, Paragraph, Text]

const content = '<p>Hello World!</p>'

const TiptapEditor = () => {
	const editor = useEditor({
		extensions,
		content,
	})

	return (
		<div>
			<EditorContent editor={editor} />
			<FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
			<BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
		</div>
	);
}

export default TiptapEditor;