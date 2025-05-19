const admin = require('firebase-admin');
const serviceAccount = require('../dsaw-2025-firebase-adminsdk-fbsvc-024702154e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;