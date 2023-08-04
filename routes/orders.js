const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/productId", authentication, OrderController.insert);
router.get("/", authentication, isAdmin, OrderController.getAll);
router.put("/:Id", authentication, OrderController.update);
router.delete("/:Id", authentication, OrderController.deleteOrder);

module.exports = router;
