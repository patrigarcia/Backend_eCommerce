const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authentication, isAdmin } = require("../middleware/authentication");

// Ruta para crear un nuevo producto
router.post("/", authentication, isAdmin, ProductController.create);
router.get("/sortedPrices", ProductController.getProductsByPriceSorted);
router.get("/price/:price", ProductController.getProductsByPrice);
router.get("/name/:productName", ProductController.getProductsByName);
router.get("/id/:id", ProductController.getProductById);
router.get("/categoryName/:categoryName", ProductController.getProductsByCategory);
router.get("/categories", ProductController.getAllProductsWithCategories);
router.delete("/:name", authentication, isAdmin, ProductController.delete);
router.put("/:name", authentication, isAdmin, ProductController.update);

module.exports = router;
