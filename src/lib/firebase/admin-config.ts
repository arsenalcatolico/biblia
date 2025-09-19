import admin from 'firebase-admin';

// Esta função inicializa o Firebase Admin SDK.
// Ela garante que a inicialização ocorra apenas uma vez.

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

if (!serviceAccountBase64) {
  throw new Error('A variável de ambiente FIREBASE_SERVICE_ACCOUNT_BASE64 não está definida.');
}

try {
  // Decodifica a string Base64 para o formato JSON original.
  const serviceAccountJson = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');
  const serviceAccount = JSON.parse(serviceAccountJson);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (error: any) {
  console.error('Erro ao inicializar o Firebase Admin SDK:', error.message);
  // Lança um erro para interromper a execução se a configuração falhar.
  throw new Error('Falha ao configurar o Firebase Admin. Verifique a chave da conta de serviço.');
}

export const firebaseAdmin = admin;
