'use client'
import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'; //editor styles
import { Button } from './ui/button';
import ReactQuill, {ReactQuillProps, Value} from 'react-quill'
import { Delta } from 'quill/core';
import SimpleDialog from './modals/simple-dialog';

const QuillEditor = dynamic(async () => {
    const { default: RQ } = await import("react-quill");

    const Component = ({ forwardedRef,  ...props }: ReactQuillProps & {forwardedRef: React.MutableRefObject<ReactQuill | null>}) => <RQ ref={forwardedRef} {...props} />

    return Component;
  },
  {
    ssr: false,
  })

export default function TextEditor({
    handleSubmit,
    value,
    className='h-96 p-0'
}: {
    submitText?: string,
    handleSubmit: (params: {delta: unknown, html: HTMLElement | string})=>void,
    value?: Delta,
    className?: string
}) {
    const ref = React.useRef<ReactQuill | null>(null)

    const [htmlContent, setHtmlContent] = useState<string | TrustedHTML>('')

    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
            if (input.files?.length) {
                const file = input?.files[0];

                // file type is only image.
                if (/^image\//.test(file.type)) {
                    saveToServer(file);
                } else {
                    console.warn("You could only upload images.");
                }
            }
        };
    };

    const handleSave = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        handleSubmit({
            delta: ref.current?.getEditor().getContents(),
            html: ref.current?.getEditor().root.innerHTML!
        })
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: [
               [{ header: [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],
               [{ size: [] }],
               ["bold", "italic", "underline", "strike", "blockquote"],
               [{ align: ["right", "center", "justify"] }],
               [{ list: "ordered" }, { list: "bullet" }],
               ["link", "image"],
               ['clean'],
               ['submitButton']
            ],

            handlers: {
                image: imageHandler,
                submitButton: handleSave
            },
        },
    }), []);

    function saveToServer(file: File) {
        const fd = new FormData();
        fd.append("upload", file);

        console.log(file, 'File to be uploaded to server')
        const savedImageUrl = 'data:image/jpeg;base64,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'

        insertToEditor(savedImageUrl);

        // const xhr = new XMLHttpRequest();
        // xhr.open("POST", "/api/media", true);
        // xhr.onload = () => {
        //     if (xhr.status === 201) {
        //         // this is callback data: url
        //         const url = JSON.parse(xhr.responseText).url;
        //         insertToEditor(url);
        //     }
        // };
        // xhr.send(fd);
    }

    function insertToEditor(url:string) {
        const editor =ref.current?.getEditor()
        const range = editor!.getSelection()?.index || 0
        editor!.insertEmbed(range, "image", url);
    }

    const handlePreviewHtml = ()=>{
        const html = ref.current!.getEditor().root.innerHTML
        setHtmlContent(html)
    }

  return (
    <>
    <div id="toolbar">
        {/* Custom Options (Floating Right) */}
        <div className='ql-submitButton ml-auto float-right mr-2 mt-1.5 flex gap-2 items-center'>
            <SimpleDialog
                triggerComponent={'Preview'}
                
                onOpenChange={(state)=>{
                    if (!state) {
                        setHtmlContent('')
                    }else{
                        handlePreviewHtml()
                    }
                }}
            >
                {<div dangerouslySetInnerHTML={{__html: htmlContent}}/>}
            </SimpleDialog>
            <Button
              className=" bg-green-400"
              onClick={handleSave}
            >
              Save
            </Button>
        </div>
      </div>
        <QuillEditor
            forwardedRef={ref}
            value={value}
            modules={modules}
            className={className}
            
        />
    </>
  )
}
