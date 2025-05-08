import { OrderItemModel } from '../models/orderItem.model.js';

export const OrderItemController = {
  // Create a new order item
  createOrderItem: async (req, res) => {
    try {
      const { data, error } = await OrderItemModel.create(req.body);
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to create order item: ${err.message}` });
    }
  },

  // Get all order items for a specific order
  getOrderItemsByOrder: async (req, res) => {
    try {
      const { data, error } = await OrderItemModel.getByOrderId(req.params.orderId);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to fetch order items for order ID ${req.params.orderId}: ${err.message}` });
    }
  },

  // Get a single order item by id
  getOrderItemById: async (req, res) => {
    try {
      const { data, error } = await OrderItemModel.getById(req.params.id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(404).json({ error: `Order item with ID ${req.params.id} not found: ${err.message}` });
    }
  },

  // Update an order item
  updateOrderItem: async (req, res) => {
    try {
      const { data, error } = await OrderItemModel.update(req.params.id, req.body);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to update order item with ID ${req.params.id}: ${err.message}` });
    }
  },

  // Delete an order item
  deleteOrderItem: async (req, res) => {
    try {
      const { error } = await OrderItemModel.delete(req.params.id);
      if (error) throw error;
      res.json({ message: 'Order item deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: `Failed to delete order item with ID ${req.params.id}: ${err.message}` });
    }
  }
};
