import { supabase } from '../config/supabase.js';

export const WastageModel = {
  create: async (wastage) => {
    return await supabase
      .from('wastage')
      .insert([wastage])
      .select()
      .single();
  },

  getByRestaurant: async (restaurant_id) => {
    return await supabase
      .from('wastage')
      .select('*')
      .eq('restaurant_id', restaurant_id)
      .order('date', { ascending: false });
  },

  getById: async (id) => {
    return await supabase
      .from('wastage')
      .select('*')
      .eq('id', id)
      .single();
  },

  update: async (id, updates) => {
    return await supabase
      .from('wastage')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  delete: async (id) => {
    return await supabase
      .from('wastage')
      .delete()
      .eq('id', id);
  }
};
