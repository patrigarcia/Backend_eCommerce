const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/products/", CategoryController.getAllAndProducts);
router.get("/id/:id", CategoryController.getCategoryById);
router.get("/name/:categoryName", CategoryController.getCategoryByName);
router.delete("/delete/:name", CategoryController.delete);
router.put("/update/:name", CategoryController.update);

module.exports = router;
