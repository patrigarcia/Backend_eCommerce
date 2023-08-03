const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        const filename = "image_" + uniqueSuffix + fileExtension;
        cb(null, filename);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 2,
};

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Sólo se pueden cargar imágenes png, jpg, jpeg o gif"));
    }
};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
