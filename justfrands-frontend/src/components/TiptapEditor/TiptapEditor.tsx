import { useEditor, EditorContent } from '@tiptap/react'
import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import { TiptapMenu } from './TiptapMenu';
import { TiptapBubbleMenu } from './TiptapBubbleMenu';
import FileHandler from '@tiptap-pro/extension-file-handler';

// define your extension array
const extensions = [StarterKit, Document, Paragraph, Heading.configure({ levels: [1, 2, 3] }),
	Text, Image, Youtube, BulletList, ListItem, CodeBlock,
	FileHandler.configure({
		allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
		onDrop: (currentEditor, files, pos) => {
			files.forEach(file => {
				const fileReader = new FileReader()

				fileReader.readAsDataURL(file)
				fileReader.onload = () => {
					currentEditor.chain().insertContentAt(pos, {
						type: 'image',
						attrs: {
							src: fileReader.result,
						},
					}).focus().run()
				}
			})
		},
		onPaste: (currentEditor, files, htmlContent) => {
			files.forEach(file => {
				if (htmlContent) {
					// if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
					// you could extract the pasted file from this url string and upload it to a server for example
					console.log(htmlContent) // eslint-disable-line no-console
					return false
				}

				const fileReader = new FileReader()

				fileReader.readAsDataURL(file)
				fileReader.onload = () => {
					currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
						type: 'image',
						attrs: {
							src: fileReader.result,
						},
					}).focus().run()
				}
			})
		},
	})
];

const content = `<h2>Start Typing to Begin</h2>`


const TiptapEditor = () => {
	const editor = useEditor({
		extensions,
		content,
		editorProps: {
			attributes: {
				class: 'focus:outline-none',
			},
		}
	});

	return (
		<div className={"w-full h-full text-left text-black "}>
			<TiptapMenu editor={editor}></TiptapMenu>
			<EditorContent className='bg-stone-100 p-4 rounded-lg mt-8 h-96' editor={editor} />
			<TiptapBubbleMenu editor={editor} />
		</div>
	);
}

export default TiptapEditor;
