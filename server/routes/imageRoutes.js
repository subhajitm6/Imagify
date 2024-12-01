import express from 'express';
import { generateImage } from '../controllers/imageController.js';
import auth from '../middlewares/auth.js';

const imageRouter = express.Router();

// Route to generate image
imageRouter.post('/generate-image', auth, generateImage);

export default imageRouter;
