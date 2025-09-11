import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; 


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "my_project",                 
    allowed_formats: ["jpg", "png", "jpeg", "webp"], 
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`, 
  }),
});


const upload = multer({
  storage,
  limits: { fileSize: 7 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

export default upload;
