const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authentication, isAdmin } = require("../middleware/authentication");
const upload = require("../middleware/upload");

router.post("/", authentication, isAdmin, upload.single("image"), ProductController.create);
router.put("/:id", authentication, isAdmin, upload.single("image"), ProductController.update);
router.delete("/:id", authentication, isAdmin, ProductController.delete);
router.get("/sortedPrices", ProductController.getProductsByPriceSorted);
router.get("/price/:price", ProductController.getProductsByPrice);
router.get("/name/:productName", ProductController.getProductsByName);
router.get("/id/:id", ProductController.getProductById);
router.get("/categoryName/:categoryName", ProductController.getProductsByCategory);
router.get("/categories", ProductController.getAllProductsWithCategories);

module.exports = router;
