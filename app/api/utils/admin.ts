import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK only once
let firestore: FirebaseFirestore.Firestore;

if (!getApps().length) {
  try {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );

    initializeApp({
      credential: cert(serviceAccount),
    });
    firestore = getFirestore();
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  firestore = getFirestore();
}

export { firestore };
