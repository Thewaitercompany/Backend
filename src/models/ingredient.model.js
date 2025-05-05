import { supabase } from '../config/supabase.js';

export const MenuItemIngredientModel = {
  getAllForMenuItem: async (menu_item_id) => {
    return await supabase
      .from('menu_item_ingredients')
      .select('*, ingredient:ingredient_id(*)')
      .eq('menu_item_id', menu_item_id);
  },

  addMany: async (menu_item_id, ingredients) => {
    // ingredients: [{ ingredient_id, quantity, unit }]
    const records = ingredients.map(ing => ({
      ...ing,
      menu_item_id
    }));
    return await supabase
      .from('menu_item_ingredients')
      .insert(records)
      .select();
  },

  update: async (menu_item_id, ingredient_id, updates) => {
    return await supabase
      .from('menu_item_ingredients')
      .update(updates)
      .eq('menu_item_id', menu_item_id)
      .eq('ingredient_id', ingredient_id)
      .select()
      .single();
  },

  remove: async (menu_item_id, ingredient_id) => {
    return await supabase
      .from('menu_item_ingredients')
      .delete()
      .eq('menu_item_id', menu_item_id)
      .eq('ingredient_id', ingredient_id);
  },

  create: async (restaurant_id, ingredient) => {
    // Attach restaurant_id to the ingredient object
    const toInsert = { ...ingredient, restaurant_id };
    return await supabase
      .from('ingredients')
      .insert([toInsert])
      .select()
      .single();
  }
};
