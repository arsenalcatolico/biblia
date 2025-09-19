
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin-config';

// Chave secreta para autenticar o webhook vindo do n8n. Deve ser configurada nas variáveis de ambiente.
const N8N_AUTH_TOKEN = process.env.N8N_AUTH_TOKEN || "change-this-secret-if-not-set";
const DEFAULT_PASSWORD = process.env.WEBHOOK_DEFAULT_PASSWORD || 'Mudar@123';

export async function POST(req: NextRequest) {
  // --- Verificação de Segurança ---
  const authorizationHeader = req.headers.get('Authorization');
  // O token deve ser enviado como "Bearer <seu_token>"
  const sentToken = authorizationHeader?.split(' ')[1];

  if (sentToken !== N8N_AUTH_TOKEN) {
    console.warn('Webhook received with invalid or missing auth token.');
    return NextResponse.json({ success: false, message: 'Unauthorized: Invalid or missing secret token.' }, { status: 401 });
  }
  // ------------------------------

  try {
    const payload = await req.json();
    const email: string | undefined = payload?.email;
    const source: string = payload?.source || 'n8n'; // 'hotmart', 'cartpanda', etc.

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'A valid email is required in the request body.' }, { status: 400 });
    }

    // Tenta criar o usuário no Firebase Authentication
    try {
      await adminAuth.createUser({
        email: email,
        password: DEFAULT_PASSWORD,
        emailVerified: true, // Assume que um email de compra é válido
      });
      
      console.log(`User created successfully via ${source}: ${email}`);
      
      return NextResponse.json({ success: true, message: `User ${email} created.` });

    } catch (error: any) {
      // Se o usuário já existe, o webhook não deve falhar. Consideramos sucesso.
      if (error.code === 'auth/email-already-exists') {
        console.log(`Email ${email} already exists (from ${source}). No action taken.`);
        return NextResponse.json({ success: true, message: 'User already exists.' });
      }
      
      // Para outros erros do Firebase, registramos e retornamos um erro de servidor.
      console.error('Firebase user creation error:', error);
      return NextResponse.json({ success: false, message: 'Internal server error during user creation.' }, { status: 500 });
    }

  } catch (error) {
    // Se o corpo da requisição não for um JSON válido.
    console.error('Webhook processing error (invalid payload):', error);
    return NextResponse.json({ success: false, message: 'Invalid JSON payload format.' }, { status: 400 });
  }
}
