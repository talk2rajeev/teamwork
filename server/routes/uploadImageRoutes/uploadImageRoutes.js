import express from 'express';
import * as uploadImgController from '../../controllers/uploadImageController/uploadImage.controller.js';
import {upload} from '../../services/uploadImageService/uploadImage.service.js';

const uploadRoutes = express.Router();

uploadRoutes.post('/upload', upload.single('file'), uploadImgController.uploadImageController);

export { uploadRoutes };

/**
 * 
 *  const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:3000/api/upload-image/upload', formData);
                const editor = quillRef.current.getEditor(); // Access the Quill editor instance
                const range = editor.getSelection();
                if (range) {
                    editor.insertEmbed(range.index, 'image', response.data.location);
                } else {
                    console.error('Editor range is undefined');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    };
*/



