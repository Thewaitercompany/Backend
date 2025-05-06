import { supabase } from '../config/supabase.js';

export const PurchaseModel = {
  create: async (purchase) => {
    return await supabase
      .from('purchases')
      .insert([purchase])
      .select()
      .single();
  },

  getByRestaurant: async (restaurant_id) => {
    return await supabase
      .from('purchases')
      .select('*')
      .eq('restaurant_id', restaurant_id)
      .order('purchase_date', { ascending: false });
  },

  getById: async (id) => {
    return await supabase
      .from('purchases')
      .select('*')
      .eq('id', id)
      .single();
  },

  update: async (id, updates) => {
    return await supabase
      .from('purchases')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  delete: async (id) => {
    return await supabase
      .from('purchases')
      .delete()
      .eq('id', id);
  }
};
