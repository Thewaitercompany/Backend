import express from 'express';
import restaurantRoutes from './routes/restaurant.routes.js';
import menuRoutes from './routes/menu.routes.js';
import { supabase } from './config/supabase.js';
import tableRoutes from './routes/table.routes.js';
import orderRoutes from './routes/order.routes.js';



const app = express();
app.use(express.json());

// Routes
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/table', tableRoutes);
app.use('/api/order', orderRoutes);



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
