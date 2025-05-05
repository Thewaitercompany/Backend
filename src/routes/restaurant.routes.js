import express from 'express';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create Restaurant
router.post('/',requireAuth, RestaurantController.createRestaurant)

// Restaurant Profile Routes
router.get('/:id',requireAuth, RestaurantController.getRestaurantProfile);
router.put('/:id',  requireAuth,RestaurantController.updateRestaurantProfile);
router.delete('/:id',  requireAuth,RestaurantController.deleteRestaurant);


export default router;
