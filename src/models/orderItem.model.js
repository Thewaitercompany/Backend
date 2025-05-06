import { supabase } from '../config/supabase.js';

export const OrderItemModel = {
  // Create a new order item
  create: async (orderItem) => {
    return await supabase
      .from('order_items')
      .insert([orderItem])
      .select()
      .single();
  },

  // Get all order items for a specific order
  getByOrderId: async (orderId) => {
    return await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);
  },

  // Get a single order item by its id
  getById: async (id) => {
    return await supabase
      .from('order_items')
      .select('*')
      .eq('id', id)
      .single();
  },

  // Update an order item
  update: async (id, updates) => {
    return await supabase
      .from('order_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  // Delete an order item
  delete: async (id) => {
    return await supabase
      .from('order_items')
      .delete()
      .eq('id', id);
  }
};
