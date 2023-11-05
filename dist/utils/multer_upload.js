"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.deleteImage = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
// const upload = multer({ dest: 'uploads/' })
// Configure Multer to save files to a specific directory
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.FILE_UPLOAD_PATH || ""); // Store the uploaded files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const deleteImage = (image_path) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadPaths = image_path
        .split("+")
        .map((filename) => path_1.default.join(__dirname, "../", filename));
    try {
        for (let i = 0; i < uploadPaths.length; i++) {
            //check if file exist
            yield fs_1.default.promises.access(uploadPaths[i], fs_1.default.constants.F_OK);
            //remove file
            fs_1.default.promises.unlink(uploadPaths[i]);
        }
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.deleteImage = deleteImage;
exports.upload = (0, multer_1.default)({ storage: storage });
