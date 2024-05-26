import express from 'express';
import * as uploadImgController from '../../controllers/uploadImageController/uploadImage.controller.js';
import {upload} from '../../services/uploadImageService/uploadImage.service.js';

const uploadRoutes = express.Router();

uploadRoutes.post('/upload', upload.single('file'), uploadImgController.uploadImageController);

export { uploadRoutes };



