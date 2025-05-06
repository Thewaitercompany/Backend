import { supabase } from '../config/supabase.js';

export const TaxModel = {
  create: async (tax) => {
    return await supabase
      .from('taxes')
      .insert([tax])
      .select()
      .single();
  },

  getByRestaurant: async (restaurant_id) => {
    return await supabase
      .from('taxes')
      .select('*')
      .eq('restaurant_id', restaurant_id)
      .order('created_at', { ascending: false });
  },

  getById: async (id) => {
    return await supabase
      .from('taxes')
      .select('*')
      .eq('id', id)
      .single();
  },

  update: async (id, updates) => {
    return await supabase
      .from('taxes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  delete: async (id) => {
    return await supabase
      .from('taxes')
      .delete()
      .eq('id', id);
  }
};
