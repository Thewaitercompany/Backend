import { OrderModel } from '../models/order.model.js';

export const OrderController = {
  // Get all orders for a restaurant
  getOrders: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      const { status, table_id, from, to } = req.query;
      const filters = {};
      if (status) filters.status = status;
      if (table_id) filters.table_id = table_id;
      if (from && to) {
        filters.from = from;
        filters.to = to;
      }
      const { data, error } = await OrderModel.getAll(restaurant_id, filters);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch orders: ${err.message}` });
    }
  },

  // Get a single order
  getOrder: async (req, res) => {
    try {
      const { order_id } = req.params;
      const { data, error } = await OrderModel.getById(order_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(404).json({ error: `Order with ID ${req.params.order_id} not found: ${err.message}` });
    }
  },

  // Create a new order
  addOrder: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      const { data, error } = await OrderModel.create(restaurant_id, req.body);
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to create order for restaurant ID ${restaurant_id}: ${err.message}` });
    }
  },

  // Update an order
  updateOrder: async (req, res) => {
    try {
      const { order_id } = req.params;
      const { data, error } = await OrderModel.update(order_id, req.body);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to update order with ID ${order_id}: ${err.message}` });
    }
  },

  // Delete an order
  deleteOrder: async (req, res) => {
    try {
      const { order_id } = req.params;
      const { error } = await OrderModel.remove(order_id);
      if (error) throw error;
      res.json({ message: 'Order deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: `Failed to delete order with ID ${order_id}: ${err.message}` });
    }
  }
};
