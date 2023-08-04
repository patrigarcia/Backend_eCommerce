const express = require("express");

const router = express.Router();

const UserController = require("../controllers/UserController");

const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/", UserController.create);
router.post("/login", UserController.login);
router.put("/:name", authentication, UserController.update);
router.get("/all", authentication, isAdmin, UserController.getAll);
router.get("/orders", authentication, isAdmin, UserController.getUserOrders);
router.delete("/logout", authentication, UserController.logout);
router.delete("/:mail", authentication, UserController.delete);

module.exports = router;
