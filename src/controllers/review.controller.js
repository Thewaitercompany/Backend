import { ReviewModel } from '../models/review.model.js';
import { RestaurantModel } from '../models/restaurant.model.js';

export const ReviewController = {
  // Create review
  createReview: async (req, res) => {
    try {
      const { restaurant_id, staff_id, customer_name, rating, comment } = req.body;
      // Ownership check (optional: only allow reviews for your restaurant)
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(restaurant_id);
      if (restError) throw restError;
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      // Anyone can post a review, so no owner check here unless you want to restrict
      const { data, error } = await ReviewModel.create({ restaurant_id, staff_id, customer_name, rating, comment });
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all reviews for a restaurant
  getReviewsByRestaurant: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      const { data, error } = await ReviewModel.getByRestaurant(restaurant_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all reviews for a staff member
  getReviewsByStaff: async (req, res) => {
    try {
      const { staff_id } = req.params;
      const { data, error } = await ReviewModel.getByStaff(staff_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete review (optionally restrict to owner)
  deleteReview: async (req, res) => {
    try {
      const { id } = req.params;
      // Optionally check if the user is the restaurant owner before deleting
      const { data: review, error: reviewError } = await ReviewModel.getById(id);
      if (reviewError) throw reviewError;
      if (!review) return res.status(404).json({ error: 'Review not found' });
      // Ownership check (optional)
      // const { data: restaurant, error: restError } = await RestaurantModel.getProfile(review.restaurant_id);
      // if (restError) throw restError;
      // if (!restaurant || restaurant.owner_id !== req.user.id) {
      //   return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      // }
      const { error } = await ReviewModel.delete(id);
      if (error) throw error;
      res.json({ message: 'Review deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
