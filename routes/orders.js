const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

const { authentication, isAdmin } = require("../middleware/authentication");

// Ruta para crear un pedido
router.post("/productId", authentication, OrderController.insert);
router.get("/users", authentication, OrderController.getUserOrders);
router.get("/", OrderController.getAll);
router.put("/:Id", OrderController.update);

module.exports = router;
