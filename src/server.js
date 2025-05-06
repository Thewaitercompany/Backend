import express from 'express';
import restaurantRoutes from './routes/restaurant.routes.js';
import menuRoutes from './routes/menu.routes.js';
import { supabase } from './config/supabase.js';
import tableRoutes from './routes/table.routes.js';
import orderRoutes from './routes/order.routes.js';
import ingredientRoutes from './routes/ingredient.routes.js';
import orderItemRoutes from './routes/orderItem.routes.js';
import staffRoutes from './routes/staff.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import taxRoutes from './routes/tax.routes.js';
import wastageRoutes from './routes/wastage.routes.js'; 
import purchaseRoutes from './routes/purchase.routes.js'; // Import purchase routes
import reviewroutes from './routes/review.routes.js'; // Import review routes



const app = express();
app.use(express.json());

// Routes
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/table', tableRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/ingredient', ingredientRoutes);
app.use('/api/orderItem', orderItemRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/wastage', wastageRoutes);
app.use('/api/purchase', purchaseRoutes); // Use purchase routes
app.use('/api/review', reviewroutes); // Use review routes




// Supabase Realtime
const channel = supabase.channel('schema-db-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public' },
    (payload) => console.log('Realtime update:', payload)
  )
  .subscribe();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
