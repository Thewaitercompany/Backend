import { MenuItemIngredientModel } from '../models/ingredient.model.js';

export const MenuItemIngredientController = {
  getIngredients: async (req, res) => {
    const { item_id } = req.params;
    const { data, error } = await MenuItemIngredientModel.getAllForMenuItem(item_id);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  },

  addIngredients: async (req, res) => {
    const { item_id } = req.params;
    console.log('Request body:', req.body); // Debug
    const { data, error } = await MenuItemIngredientModel.addMany(item_id, req.body);
    if (error) {
      console.log('Supabase error:', error); // Debug
      return res.status(400).json({ error: error.message });
    }
    res.status(201).json(data);
  },
  
  updateIngredient: async (req, res) => {
    const { item_id, ingredient_id } = req.params;
    const { data, error } = await MenuItemIngredientModel.update(item_id, ingredient_id, req.body);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  },

  removeIngredient: async (req, res) => {
    const { item_id, ingredient_id } = req.params;
    const { error } = await MenuItemIngredientModel.remove(item_id, ingredient_id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Ingredient removed from menu item.' });
  },

  addIngredient: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      const ingredient = req.body;

      // Basic validation (optional)
      if (!ingredient.name || !ingredient.unit) {
        return res.status(400).json({ error: "Ingredient 'name' and 'unit' are required." });
      }

      const { data, error } = await MenuItemIngredientModel.create(restaurant_id, ingredient);
      if (error) return res.status(400).json({ error: error.message });

      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
