import { supabase } from '../config/supabase.js';

export const StaffModel = {
  // Create new staff
  create: async (staff) => {
    return await supabase
      .from('staff')
      .insert([staff])
      .select()
      .single();
  },

  // Get all staff for a restaurant
  getAllByRestaurant: async (restaurant_id) => {
    return await supabase
      .from('staff')
      .select('*')
      .eq('restaurant_id', restaurant_id);
  },

  // Get single staff member by id
  getById: async (id) => {
    return await supabase
      .from('staff')
      .select('*')
      .eq('id', id)
      .single();
  },

  // Update staff member
  update: async (id, updates) => {
    return await supabase
      .from('staff')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  // Delete staff member
  delete: async (id) => {
    return await supabase
      .from('staff')
      .delete()
      .eq('id', id);
  }
};
