const express = require("express");
const router = express.Router();
const OrderItemController = require("../controllers/OrderItemController");

router.post("/", OrderItemController.create);
router.get("/", OrderItemController.getAll);
router.delete("/:name", OrderItemController.delete);
router.put("/:name", OrderItemController.update);

module.exports = router;
