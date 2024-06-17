import React, { useState,  useRef } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

type quillEditorProps = {
    onDescriptionChange: (content: string) => void;
}

const QuillEditor = ({onDescriptionChange}: quillEditorProps) => {
    const quillRef = useRef<ReactQuill>(null);

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const files= input.files;
            if (!files || files.length === 0) {
                console.error('No file selected');
                return;
            }
            const formData = new FormData();
            const file = files[0];
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:3000/api/upload-image/upload', formData);
                const editor = quillRef.current?.getEditor(); // Access the Quill editor instance
                const range = editor?.getSelection();
                if (range) {
                    editor?.insertEmbed(range.index, 'image', response.data.location);
                } else {
                    console.error('Editor range is undefined');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                 {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean']
            ],
            handlers: {
                'image': handleImageUpload
            }
        }
    };

    const handleDescriptionChange = (content: string) => {
        onDescriptionChange(content);
        console.log(content);
    };

    return <ReactQuill 
        ref={quillRef}
        onChange={handleDescriptionChange} 
        modules={{...modules}}
    />
    
}

export default QuillEditor;