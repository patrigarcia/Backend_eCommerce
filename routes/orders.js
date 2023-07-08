const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

// Ruta para crear una nueva orden
router.post("/productId", OrderController.insert);
router.get("/", OrderController.getAll);

router.put("/:name", OrderController.update);

module.exports = router;
