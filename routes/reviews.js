const express = require("express");
const ReviewController = require("../controllers/ReviewController");

const router = express.Router();
const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/", authentication, ReviewController.createReview);
router.get("/", authentication, ReviewController.getAllReviews);
router.get("/:id", authentication, ReviewController.getReviewById);
router.put("/:id", authentication, ReviewController.updateReview);
router.delete("/:id", authentication, ReviewController.deleteReview);

module.exports = router;
