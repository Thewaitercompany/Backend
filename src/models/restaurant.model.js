import { supabase } from '../config/supabase.js';

export const RestaurantModel = {

    create: async (restaurant) => {
        return await supabase
          .from('restaurants')
          .insert([restaurant])
          .select()
          .single();
      },

  getProfile: async (restaurantId) => {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', restaurantId)
      .single();
    
    return { data, error };
  },

  updateProfile: async (restaurantId, updates) => {
    const { data, error } = await supabase
      .from('restaurants')
      .update(updates)
      .eq('id', restaurantId)
      .select();
    
    return { data, error };
  },

  delete: async (id) => {
    return await supabase
      .from('restaurants')
      .delete()
      .eq('id', id);
  }
};
