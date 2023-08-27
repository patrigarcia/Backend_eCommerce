const fs = require("fs");
const path = require("path");

const deleteImage = (imageName) => {
    if (imageName.trim()) {
        const imagePath = path.join(__dirname, "..", "uploads", imageName);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
};

module.exports = deleteImage;
