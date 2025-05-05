import { supabase } from '../config/supabase.js';

export const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || user?.user_metadata?.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
