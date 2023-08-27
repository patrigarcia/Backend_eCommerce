const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/", authentication, isAdmin, CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/products/", CategoryController.getAllAndProducts);

router.get("/:id", CategoryController.getCategoryById);
router.delete("/delete/:name", authentication, isAdmin, CategoryController.delete);
router.put("/update/:name", authentication, isAdmin, CategoryController.update);

module.exports = router;
