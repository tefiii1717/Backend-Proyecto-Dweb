const express = require('express');
const router = express.Router();
const admin = require('../config/firebase-config');
const db = admin.firestore();
const { verifyToken, isClient } = require('../middleware/auth');
const firebase = require('firebase-admin');

// Create a new order
router.post('/', verifyToken, isClient, async (req, res) => {
  try {
    const { items } = req.body; // Array of { productId, quantity }
    const order = {
      userId: req.user.id,
      items,
      status: 'Pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Check product availability
    for (const item of items) {
      const productRef = db.collection('inventory').doc(item.productId);
      const productDoc = await productRef.get();

      if (!productDoc.exists || productDoc.data().stock < item.quantity) {
        return res.status(400).json({ error: `Product ${item.productId} is unavailable or out of stock.` });
      }
    }

    // Create order
    const orderRef = await db.collection('orders').add(order);

    // Update stock
    for (const item of items) {
      const productRef = db.collection('inventory').doc(item.productId);
      await productRef.update({
        stock: admin.firestore.FieldValue.increment(-item.quantity),
      });
    }

    res.status(201).json({ id: orderRef.id, ...order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status (e.g., Confirmed, Completed)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.collection('orders').doc(id).update({ status });

    // Push notification to Firebase
    const order = (await db.collection('orders').doc(id).get()).data();
    await firebase.database().ref(`orders/${id}`).set(order);

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router;