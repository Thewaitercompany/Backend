import { supabase } from '../config/supabase.js';

export const ReviewModel = {
  create: async (review) => {
    return await supabase
      .from('reviews')
      .insert([review])
      .select()
      .single();
  },

  getByRestaurant: async (restaurant_id) => {
    return await supabase
      .from('reviews')
      .select('*')
      .eq('restaurant_id', restaurant_id)
      .order('created_at', { ascending: false });
  },

  getByStaff: async (staff_id) => {
    return await supabase
      .from('reviews')
      .select('*')
      .eq('staff_id', staff_id)
      .order('created_at', { ascending: false });
  },

  getById: async (id) => {
    return await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();
  },

  delete: async (id) => {
    return await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
  }
};
