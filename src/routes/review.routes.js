import express from 'express';
import { ReviewController } from '../controllers/review.controller.js';
// import { requireAuth } from '../middleware/auth.js'; // Use if you want to restrict deletion

const router = express.Router();

// Create review (public)
router.post('/', ReviewController.createReview);

// Get all reviews for a restaurant
router.get('/restaurant/:restaurant_id', ReviewController.getReviewsByRestaurant);

// Get all reviews for a staff member
router.get('/staff/:staff_id', ReviewController.getReviewsByStaff);

// Delete review (optionally requireAuth)
router.delete('/:id', /* requireAuth, */ ReviewController.deleteReview);

export default router;
