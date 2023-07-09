const express = require("express");

const router = express.Router();

const UserController = require("../controllers/UserController"); 

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.put("/:name", UserController.update);
router.post("/login", UserController.login);
router.delete("/:mail", UserController.delete);

module.exports = router;
