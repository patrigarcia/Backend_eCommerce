const express = require("express");
const AdressController = require("../controllers/AdressController");

const router = express.Router();

const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/adress", authentication, AdressController.createAdress);

router.get("/adresses", authentication, AdressController.getAllAdresses);

router.get("/adress/:id", authentication, AdressController.getAdressById);

router.put("/adress/:id", authentication, AdressController.updateAdress);

router.delete("/adress/:id", authentication, AdressController.deleteAdress);

module.exports = router;
