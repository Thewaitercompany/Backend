import express from 'express';
import { MenuItemIngredientController } from '../controllers/ingredient.controller.js';
import { requireAuth } from '../middleware/auth.js';


const router = express.Router({ mergeParams: true });

router.get('/:restaurant_id/menu/items/:item_id/ingredients', MenuItemIngredientController.getIngredients);
router.post('/:restaurant_id/menu/items/:item_id/ingredients', MenuItemIngredientController.addIngredients);
router.put('/:restaurant_id/menu/items/:item_id/ingredients/:ingredient_id', requireAuth,MenuItemIngredientController.updateIngredient);
router.delete('/:restaurant_id/menu/items/:item_id/ingredients/:ingredient_id', requireAuth,MenuItemIngredientController.removeIngredient);
router.post('/:restaurant_id/ingredients',requireAuth, MenuItemIngredientController.addIngredient);


export default router;
