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
  if(!image_path) return false;
  const uploadPaths = image_path
    .split("+")
    .map((filename) => path.join(__dirname, "../", filename));

  try {
    for (let i = 0; i < uploadPaths.length; i++) {
      //check if file exist
      await fs.promises.access(uploadPaths[i], fs.constants.F_OK);

      //remove file
      fs.promises.unlink(uploadPaths[i]);
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const upload = multer({ storage: storage });
