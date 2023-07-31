const express = require("express");
const ReviewController = require("../controllers/ReviewController");

const router = express.Router();
const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/reviews", authentication, ReviewController.createReview);
router.get("/reviews", authentication, ReviewController.getAllReviews);
router.get("/reviews/:id", authentication, ReviewController.getReviewById);
router.put("/reviews/:id", authentication, ReviewController.updateReview);
router.delete("/reviews/:id", authentication, ReviewController.deleteReview);

module.exports = router;
