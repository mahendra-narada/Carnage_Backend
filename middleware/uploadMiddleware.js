import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js'; // Your configured Cloudinary instance

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`
  }
});

const upload = multer({ storage });

export default upload;
