import * as admin from 'firebase-admin';

// Garante que a chave privada seja formatada corretamente, independentemente de como é passada.
const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

if (!admin.apps.length) {
  try {
    // Verifica se as credenciais essenciais estão presentes
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
      throw new Error('Firebase admin credentials are not set in environment variables.');
    }
    
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    // Em um ambiente de produção, você pode querer lidar com isso de forma mais robusta.
  }
}

let adminAuth: admin.auth.Auth;
let adminDb: admin.firestore.Firestore;

try {
  adminAuth = admin.auth();
  adminDb = admin.firestore();
} catch (error) {
    console.error('Failed to get Firebase admin instances. App might not have been initialized correctly.', error);
    // @ts-ignore
    adminAuth = {}; // Provide dummy objects to prevent crashes on import
    // @ts-ignore
    adminDb = {};
}


export { adminAuth, adminDb };
