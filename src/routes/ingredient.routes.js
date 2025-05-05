import express from 'express';
import { MenuItemIngredientController } from '../controllers/ingredient.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/:restaurant_id/menu/items/:item_id/ingredients', MenuItemIngredientController.getIngredients);
router.post('/:restaurant_id/menu/items/:item_id/ingredients', MenuItemIngredientController.addIngredients);
router.put('/:restaurant_id/menu/items/:item_id/ingredients/:ingredient_id', MenuItemIngredientController.updateIngredient);
router.delete('/:restaurant_id/menu/items/:item_id/ingredients/:ingredient_id', MenuItemIngredientController.removeIngredient);
router.post('/:restaurant_id/ingredients', MenuItemIngredientController.addIngredient);


export default router;
