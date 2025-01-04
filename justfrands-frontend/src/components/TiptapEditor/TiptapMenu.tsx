import { Editor } from '@tiptap/react'
import { useRef } from 'react';

export const TiptapMenu = ({ editor }: { editor: Editor | null }) => {

	const inputFile = useRef<HTMLInputElement | null>(null);

	const uploadFile = () => {
		inputFile.current?.click();
	}

	const handleFile = (event: any) => {
		const file = event.target.files[0];
		const fileReader = new FileReader();

		fileReader.readAsDataURL(file)
		fileReader.onload = () => {
			editor?.chain().insertContentAt(editor.state.selection.anchor, {
				type: 'image',
				attrs: {
					src: fileReader.result,
				},
			}).focus().run()
		}
	}

	const sendDocument = () => { };
	const saveHtml = async () => {
		const rawHtml = editor?.getHTML();
		var file = new Blob([rawHtml ?? ""], { type: "text/html" });
		const handle = await showSaveFilePicker({ suggestedName: "just-frands.html" });
		const writer = await handle.createWritable();
		await writer.write(file);
		await writer.close();
	}
	const redirectToAccount = () => { };

	return (
		<div className='bg-white z-10 py-2 px-2 rounded-lg 
				 sticky top-10 border-2 shadow-xl flex'>
			{editor != null &&
				<div className='flex flex-row items-center justify-between w-full'>
					<div className='flex space-x-2 flex-wrap gap-y-1'>
						<button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
							className={editor.isActive('heading', { level: 1 }) ?
								'font-bold bg-purple-100 border-2 border-purple-700 text-sm' :
								'border-2 border-stone-300 text-sm'}
						>
							&lt;h1&gt;
						</button>
						<button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
							className={editor.isActive('heading', { level: 2 }) ?
								'font-bold bg-purple-100 border-2 border-purple-700 text-sm' :
								'border-2 border-stone-300 text-sm'}
						>
							&lt;h2&gt;
						</button>
						<button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
							className={editor.isActive('heading', { level: 3 }) ?
								'font-bold bg-purple-100 border-2 border-purple-700 text-sm' :
								'border-2 border-stone-300 text-sm'}
						>
							&lt;h3&gt;
						</button>
						<button onClick={() => editor.chain().focus().toggleBulletList().run()}
							className={editor.isActive('bulletList') ?
								'font-bold bg-purple-100 border-2 border-purple-700 text-sm' :
								'border-2 border-stone-300 text-sm'}
						>
							&lt;ul&gt;
						</button>
						<button onClick={editor.isActive('codeBlock') ? () => editor.chain().focus().toggleCodeBlock().run() :
							() => editor.chain().focus().setCodeBlock().run()}
							className={editor.isActive('codeBlock') ?
								'font-bold bg-purple-100 border-2 border-purple-700 text-sm' :
								'border-2 border-stone-300 text-sm'}
						>
							&lt;code&gt;
						</button>
						<input type="file" id="file" style={{ display: 'none' }} ref={inputFile} accept="image/*" onChange={handleFile} />
						<button onClick={uploadFile}
							className='border-2 border-stone-300 text-sm'> &lt;img&gt;
						</button>
					</div>
					<div className='flex flex-col w-24 space-y-0 border-l-2 px-2 ml-2 border-stone-100'>
						<button onClick={sendDocument}
							className='py-1 px-0 rounded-none border-b-1 border-b-stone-200 bg-inherit hover:-translate-y-0.5 text-xs font-bold'>
							Send Page
						</button>
						<button onClick={saveHtml}
							className='py-1 px-0 rounded-none border-b-1 border-b-stone-200 bg-inherit hover:-translate-y-0.5 text-xs font-bold'>
							Save Page
						</button>

						<button onClick={redirectToAccount}
							className='py-1 px-0 rounded-none border-b-1 border-b-stone-200 bg-inherit hover:-translate-y-0.5 text-xs font-bold'>
							Account
						</button>
					</div>
				</div>}
		</div>
	);
};
