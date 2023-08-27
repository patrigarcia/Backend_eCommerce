const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");
const { authentication } = require("../middleware/authentication");
const upload = require("../middleware/upload");

router.post("/", authentication, upload.single("image"), ReviewController.createReview);
router.put("/:id", authentication, upload.single("image"), ReviewController.updateReview);
router.delete("/:id", authentication, ReviewController.deleteReview);
router.get("/", authentication, ReviewController.getAllReviews);
router.get("/:id", authentication, ReviewController.getReviewById);

module.exports = router;
