import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_JSON);

// Initialize Firebase Admin SDK if not already initialized
const app = !getApps().length ? initializeApp({ credential: cert(serviceAccount) }) : getApp();
const db = getFirestore(app);

export default async function handler(req, res) {
  try {
    const reviewsCollection = db.collection('reviews');

    switch (req.method) {
      case 'POST': {
        // Create a new review
        const { userId, itemId, rating, comment } = req.body;
        if (!userId || !itemId || rating === undefined) {
          return res.status(400).json({ error: 'userId, itemId, and rating are required.' });
        }

        const newReview = {
          userId,
          itemId,
          rating,
          comment: comment || '',
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        };

        const docRef = await reviewsCollection.add(newReview);
        const createdReview = await docRef.get();

        return res.status(201).json({ id: docRef.id, ...createdReview.data() });
      }

      case 'GET': {
        // Query parameters can be for itemId or review id
        const { id, itemId } = req.query;

        if (id) {
          // Get review by ID
          const doc = await reviewsCollection.doc(id).get();
          if (!doc.exists) {
            return res.status(404).json({ error: 'Review not found' });
          }
          return res.json({ id: doc.id, ...doc.data() });
        } else if (itemId) {
          // Get all reviews for an item
          const snapshot = await reviewsCollection.where('itemId', '==', itemId).get();
          const reviews = [];
          snapshot.forEach(doc => {
            reviews.push({ id: doc.id, ...doc.data() });
          });
          return res.json(reviews);
        } else {
          return res.status(400).json({ error: 'Please provide "id" or "itemId" query param.' });
        }
      }

      case 'PUT': {
        // Update a review by ID
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: 'Review "id" query param is required.' });

        const reviewRef = reviewsCollection.doc(id);
        const reviewDoc = await reviewRef.get();
        if (!reviewDoc.exists) {
          return res.status(404).json({ error: 'Review not found' });
        }

        const { rating, comment } = req.body;
        const updateData = {};
        if (rating !== undefined) updateData.rating = rating;
        if (comment !== undefined) updateData.comment = comment;

        if (Object.keys(updateData).length === 0) {
          return res.status(400).json({ error: 'No fields to update provided.' });
        }

        updateData.updatedAt = FieldValue.serverTimestamp();

        await reviewRef.update(updateData);
        const updatedDoc = await reviewRef.get();

        return res.json({ id: updatedDoc.id, ...updatedDoc.data() });
      }

      case 'DELETE': {
        // Delete a review by ID
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: 'Review "id" query param is required.' });

        const reviewRef = reviewsCollection.doc(id);
        const reviewDoc = await reviewRef.get();
        if (!reviewDoc.exists) {
          return res.status(404).json({ error: 'Review not found' });
        }

        await reviewRef.delete();
        return res.json({ message: 'Review deleted successfully' });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
