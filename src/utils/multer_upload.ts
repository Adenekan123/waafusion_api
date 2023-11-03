import path from "path";
import fs from "fs";
import { Request } from "express";
import multer from "multer";
// const upload = multer({ dest: 'uploads/' })

// Configure Multer to save files to a specific directory
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, process.env.FILE_UPLOAD_PATH || ""); // Store the uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

export const deleteImage = async (image_path: string) => {
  const uploadPath = path.join(__dirname, "../", image_path);

  try {
    //check if file exist
    await fs.promises.access(uploadPath, fs.constants.F_OK);

    //remove file
    fs.promises.unlink(uploadPath);
    return true;
  } catch (err) {
    console.log(err)
    return false;
  }
};

export const upload = multer({ storage: storage });
