const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // en esta carpeta se guardan las imagenes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); //le genero un nombre con la fecha y un numero aleatorio + el nombre original
        const fileExtension = path.extname(file.originalname);
        cb(null, "image_" + uniqueSuffix + fileExtension);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 2, //le limito el tamaño de la imagen que vana a cargar
};

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png"]; // le digo que solo me puedan cargar ese tipo de archivo
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // acepto el archivo
    } else {
        cb(new Error("Sólo se pueden cargar imágenes png y jpg"));
    }
};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
