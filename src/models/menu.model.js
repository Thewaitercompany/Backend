import { supabase } from '../config/supabase.js';

export const MenuModel = {
  // Get all menu items for a restaurant (with optional filters)
  getAll: async (restaurant_id, filters = {}) => {
    let query = supabase.from('menu_items').select('*').eq('restaurant_id', restaurant_id);

    if (filters.category) query = query.eq('category', filters.category);
    if (filters.is_veg !== undefined) query = query.eq('is_veg', filters.is_veg);

    return await query;
  },

  // Get a single menu item
  getById: async (id) => {
    return await supabase.from('menu_items').select('*').eq('id', id).single();
  },

  // Add a new menu item
  create: async (restaurant_id, item) => {
    return await supabase.from('menu_items').insert([{ ...item, restaurant_id }]).select().single();
  },

  // Update a menu item
  update: async (id, updates) => {
    return await supabase.from('menu_items').update(updates).eq('id', id).select().single();
  },

  // Delete a menu item
  remove: async (id) => {
    return await supabase.from('menu_items').delete().eq('id', id);
  }
};
