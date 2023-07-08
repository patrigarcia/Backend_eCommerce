const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/products/", CategoryController.getAllAndProducts);
router.get("/id/:id", CategoryController.getCategoryById);
router.get("/categoryName/:categoryName", CategoryController.getCategoryByName);
router.delete("/:name", CategoryController.delete);
router.put("/:name", CategoryController.update);

module.exports = router;
