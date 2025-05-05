import { supabase } from '../config/supabase.js';

export const OrderModel = {
  // Get all orders for a restaurant (optionally filter by status/table/date)
  getAll: async (restaurant_id, filters = {}) => {
    let query = supabase
      .from('orders')
      .select('*')
      .eq('restaurant_id', restaurant_id);

    if (filters.status) query = query.eq('status', filters.status);
    if (filters.table_id) query = query.eq('table_id', filters.table_id);
    if (filters.from && filters.to) {
      query = query.gte('created_at', filters.from).lte('created_at', filters.to);
    }

    return await query.order('created_at', { ascending: false });
  },

  // Get a single order by id
  getById: async (id) => {
    return await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
  },

  // Create a new order
  create: async (restaurant_id, order) => {
    return await supabase
      .from('orders')
      .insert([{ ...order, restaurant_id }])
      .select()
      .single();
  },

  // Update an order (status, payment, etc.)
  update: async (id, updates) => {
    return await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  // Delete an order
  remove: async (id) => {
    return await supabase
      .from('orders')
      .delete()
      .eq('id', id);
  }
};
