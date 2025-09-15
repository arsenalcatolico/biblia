import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin-config';

const DEFAULT_PASSWORD = process.env.WEBHOOK_DEFAULT_PASSWORD || 'Mudar@123';

export async function POST(req: NextRequest) {
  const source = req.nextUrl.searchParams.get('source');
  
  if (!source || !['hotmart', 'cartpanda'].includes(source)) {
    return NextResponse.json({ success: false, message: 'Source parameter is missing or invalid. Use "hotmart" or "cartpanda".' }, { status: 400 });
  }

  try {
    const payload = await req.json();
    let email: string | undefined;

    // Adapt the payload based on the source
    if (source === 'hotmart') {
      // This is an example structure for Hotmart.
      // You MUST verify the actual payload structure from Hotmart's documentation.
      email = payload?.data?.buyer?.email;
    } else if (source === 'cartpanda') {
      // This is an example structure for Cartpanda.
      // You MUST verify the actual payload structure from Cartpanda's documentation.
      email = payload?.customer?.email;
    }

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email not found in webhook payload.' }, { status: 400 });
    }

    // Create the user in Firebase Authentication
    try {
      await adminAuth.createUser({
        email: email,
        password: DEFAULT_PASSWORD,
        emailVerified: true, // Assuming a paid user's email is legitimate
      });
      
      console.log(`User created successfully: ${email}`);
      
      // Respond with success
      return NextResponse.json({ success: true, message: `User ${email} created.` });

    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        console.log(`Email ${email} already exists. No action taken.`);
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
