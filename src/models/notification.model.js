import { supabase } from '../config/supabase.js';

export const NotificationModel = {
  create: async (notification) => {
    return await supabase
      .from('notifications')
      .insert([notification])
      .select()
      .single();
  },

  getByRestaurant: async (restaurant_id) => {
    return await supabase
      .from('notifications')
      .select('*')
      .eq('restaurant_id', restaurant_id)
      .order('created_at', { ascending: false });
  },

  markAsRead: async (id) => {
    return await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single();
  },

  delete: async (id) => {
    return await supabase
      .from('notifications')
      .delete()
      .eq('id', id);
  },
  getById: async (id) => {
    return await supabase
      .from('notifications')
      .select('*')
      .eq('id', id)
      .single();
  },
  
};
