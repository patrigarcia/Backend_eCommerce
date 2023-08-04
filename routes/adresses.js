const express = require("express");
const AdressController = require("../controllers/AdressController");

const router = express.Router();

const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/", authentication, AdressController.createAdress);
router.get("/", authentication, isAdmin, AdressController.getAllAdresses);
router.get("/adress/:id", authentication, isAdmin, AdressController.getAdressById);
router.put("/:id", authentication, AdressController.updateAdress);
router.delete("/:id", authentication, AdressController.deleteAdress);

module.exports = router;
