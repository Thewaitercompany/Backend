import express from 'express';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Create Restaurant
router.post('/', RestaurantController.createRestaurant)

// Restaurant Profile Routes
router.get('/:id', RestaurantController.getRestaurantProfile);
router.put('/:id',  RestaurantController.updateRestaurantProfile);
router.delete('/:id',  RestaurantController.deleteRestaurant);


export default router;
