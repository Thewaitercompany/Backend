import { supabase } from '../config/supabase.js';

export const TableModel = {
  // Get all tables for a restaurant
  getAll: async (restaurant_id) => {
    return await supabase
      .from('tables')
      .select('*')
      .eq('restaurant_id', restaurant_id);
  },

  // Get a single table by id
  getById: async (id) => {
    return await supabase
      .from('tables')
      .select('*')
      .eq('id', id)
      .single();
  },

  // Add a new table
  create: async (restaurant_id, table) => {
    return await supabase
      .from('tables')
      .insert([{ ...table, restaurant_id }])
      .select()
      .single();
  },

  // Update a table (e.g., status, capacity)
  update: async (id, updates) => {
    return await supabase
      .from('tables')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  // Delete a table
  remove: async (id) => {
    const { data, error } = await supabase
      .from('tables')
      .delete()
      .eq('id', id)
      .select(); // <-- Add this to get the deleted row(s)
  
    return { data, error };
  },
  

 getByTableNumber: async (restaurant_id, table_number) => {
  const { data, error } = await supabase
    .from('tables')
    .select('*')
    .eq('restaurant_id', restaurant_id)
    .eq('table_number', table_number)
    .maybeSingle();
  return { data, error };
},

  
};
