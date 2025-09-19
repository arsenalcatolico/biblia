
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin-config';

const DEFAULT_PASSWORD = process.env.WEBHOOK_DEFAULT_PASSWORD || 'Mudar@123';
// Chave secreta para autenticar o webhook vindo do n8n.
const N8N_WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || "a3b8d9c1-f2e4-4a5b-8c7d-6e9f0a1b2c3d";

export async function POST(req: NextRequest) {
  // --- Verificação de Segurança ---
  const authorizationHeader = req.headers.get('Authorization');
  const sentToken = authorizationHeader?.split(' ')[1]; // Espera "Bearer <token>"

  if (sentToken !== N8N_WEBHOOK_SECRET) {
    return NextResponse.json({ success: false, message: 'Unauthorized: Invalid or missing secret key.' }, { status: 401 });
  }
  // ------------------------------

  const source = req.nextUrl.searchParams.get('source');
  
  if (!source || !['hotmart', 'cartpanda', 'n8n'].includes(source)) {
    return NextResponse.json({ success: false, message: 'Source parameter is missing or invalid. Use "hotmart", "cartpanda", or "n8n".' }, { status: 400 });
  }

  try {
    const payload = await req.json();
    let email: string | undefined;

    // Adapt the payload based on the source
    if (source === 'hotmart') {
      // Example structure for Hotmart. Verify with actual payload.
      email = payload?.data?.buyer?.email;
    } else if (source === 'cartpanda') {
      // Example structure for Cartpanda. Verify with actual payload.
      email = payload?.customer?.email;
    } else if (source === 'n8n') {
      // Simplified structure for n8n or other direct integrations
      email = payload?.email;
    }

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email not found in webhook payload for the given source.' }, { status: 400 });
    }

    // Create the user in Firebase Authentication
    try {
      await adminAuth.createUser({
        email: email,
        password: DEFAULT_PASSWORD,
        emailVerified: true, // Assuming a paid user's email is legitimate
      });
      
      console.log(`User created successfully via ${source}: ${email}`);
      
      // Respond with success
      return NextResponse.json({ success: true, message: `User ${email} created.` });

    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        console.log(`Email ${email} already exists (from ${source}). No action taken.`);
        // Respond with success to avoid the webhook provider from retrying
        return NextResponse.json({ success: true, message: 'User already exists.' });
      }
      // For other Firebase errors
      console.error('Firebase user creation error:', error);
      return NextResponse.json({ success: false, message: 'Internal server error during user creation.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ success: false, message: 'Invalid payload format.' }, { status: 400 });
  }
}
