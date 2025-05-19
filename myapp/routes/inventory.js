const express = require('express');
const router = express.Router();
const admin = require('../config/firebase-config');
const db = admin.firestore();
const { verifyToken, isPOS } = require('../middleware/auth');

// Get all inventory items
router.get('/', verifyToken, isPOS, async (req, res) => {
  try {
    const snapshot = await db.collection('inventory').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Get inventory items for client
router.get('/client', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, availability } = req.query;
    let query = db.collection('inventory');

    if (category) {
      query = query.where('category', '==', category);
    }
    if (minPrice) {
      query = query.where('price', '>=', parseFloat(minPrice));
    }
    if (maxPrice) {
      query = query.where('price', '<=', parseFloat(maxPrice));
    }
    if (availability) {
      query = query.where('stock', '>', 0);
    }

    const snapshot = await query.get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    console.error('Error fetching inventory for client:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Add a new inventory item
router.post('/', verifyToken, isPOS, async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const newItem = { name, price, stock, createdAt: admin.firestore.FieldValue.serverTimestamp() };
    const docRef = await db.collection('inventory').add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error) {
    console.error('Error adding inventory item:', error);
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
});

// Update an inventory item
router.put('/:id', verifyToken, isPOS, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    await db.collection('inventory').doc(id).update({ name, price, stock });
    res.json({ message: 'Inventory item updated successfully' });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
});

// Delete an inventory item
router.delete('/:id', verifyToken, isPOS, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('inventory').doc(id).delete();
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
});

module.exports = router;