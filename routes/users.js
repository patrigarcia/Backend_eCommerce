const express = require("express");

const router = express.Router();

const UserController = require("../controllers/UserController"); //Acá se importa el user controller

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.delete("/:mail", UserController.delete);
router.put("/:name", UserController.update);

module.exports = router;
