const admin = require('firebase-admin');
const fs = require('fs');

// IMPORTANT: Replace with your actual service account file name if different
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function importSuppliers() {
  const suppliersData = JSON.parse(fs.readFileSync('./suppliers.json', 'utf8'));

  for (const supplier of suppliersData) {
    await db.collection('suppliers').doc(supplier.supplierId.toString()).set({
      name: supplier.name,
      category: supplier.category,
      qualityRating: supplier.qualityRating,
      location: supplier.location,
      contactEmail: supplier.contactEmail,
      // add additional fields here as needed
    });
  }

  console.log('Finished importing suppliers!');
}

importSuppliers().catch(console.error);
