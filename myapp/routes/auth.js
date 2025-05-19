const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = require('../config/firebase-config');
const db = admin.firestore();

// Add this to the top of your auth.js route to test the connection
router.get('/test-firebase', async (req, res) => {
  try {
    const testDoc = await db.collection('test').add({
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ success: true, docId: testDoc.id });
  } catch (error) {
    console.error('Firebase error:', error);
    res.status(500).json({ error: 'Firebase connection failed' });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    // Validate role is either 'POS' or 'CLIENT'
    if (role !== 'POS' && role !== 'CLIENT') {
      return res.status(400).json({ error: 'Role must be either POS or CLIENT' });
    }
    
    // Check if user already exists
    const userRef = db.collection('users').where('email', '==', email);
    const snapshot = await userRef.get();
    
    if (!snapshot.empty) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user in Firestore
    const newUser = {
      email,
      password: hashedPassword,
      name,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const userDoc = await db.collection('users').add(newUser);
    
    // Generate JWT token
    const token = jwt.sign(
      { id: userDoc.id, email, role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: userDoc.id,
        email,
        name,
        role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const usersRef = db.collection('users').where('email', '==', email);
    const snapshot = await usersRef.get();
    
    if (snapshot.empty) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Get user data
    const userData = snapshot.docs[0].data();
    const userId = snapshot.docs[0].id;
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: userId, email, role: userData.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: userId,
        email,
        name: userData.name,
        role: userData.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;