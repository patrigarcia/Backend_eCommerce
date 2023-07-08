const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// Ruta para crear un nuevo producto
router.post("/", ProductController.create);

router.get("/sortedPrices", ProductController.getProductsByPriceSorted);
router.get("/price/:price", ProductController.getProductsByPrice);
router.get("/productName/:productName", ProductController.getProductsByName);
router.get("/id/:id", ProductController.getProductById);
router.get("/categoryName/:categoryName", ProductController.getProductsByCategory);
router.get("/products/categories", ProductController.getAllProductsWithCategories);

router.delete("/:name", ProductController.delete);
router.put("/:name", ProductController.update);

module.exports = router;
