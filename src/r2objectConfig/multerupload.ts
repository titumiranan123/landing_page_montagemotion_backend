import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 500 * 1024 * 1024 } }); // Limit file size to 500MB

export default upload;
