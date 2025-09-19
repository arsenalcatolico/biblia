
import * as admin from 'firebase-admin';

// Decodifica a chave privada de Base64 para garantir a formatação correta em qualquer ambiente.
const serviceAccountKeyBase64 = process.env.FIREBASE_PRIVATE_KEY_BASE64;
let serviceAccount: admin.ServiceAccount | undefined;

if (serviceAccountKeyBase64) {
  try {
    const serviceAccountJson = Buffer.from(serviceAccountKeyBase64, 'base64').toString('utf-8');
    serviceAccount = JSON.parse(serviceAccountJson);
  } catch (error) {
    console.error('Failed to parse FIREBASE_PRIVATE_KEY_BASE64:', error);
  }
} else {
    // Tenta usar as variáveis individuais se a de base64 não estiver definida
    const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && privateKey) {
        serviceAccount = {
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        };
    }
}


if (!admin.apps.length) {
  try {
    if (!serviceAccount) {
        console.error('Firebase admin credentials are not fully set in environment variables.');
        throw new Error('Firebase admin credentials are not set in environment variables.');
    }
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error.message);
  }
}

let adminAuth: admin.auth.Auth;
let adminDb: admin.firestore.Firestore;

try {
  adminAuth = admin.auth();
  adminDb = admin.firestore();
} catch (error: any) {
    console.error('Failed to get Firebase admin instances. App might not have been initialized correctly.', error.message);
    // @ts-ignore
    adminAuth = {}; // Provide dummy objects to prevent crashes on import
    // @ts-ignore
    adminDb = {};
}


export { adminAuth, adminDb };
