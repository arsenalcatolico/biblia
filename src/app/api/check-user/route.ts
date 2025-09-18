import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin-config';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ exists: false, message: 'Email is required.' }, { status: 400 });
    }

    await adminAuth.getUserByEmail(email);
    return NextResponse.json({ exists: true });

  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      // User does not exist, which is a valid check, not an error.
      return NextResponse.json({ exists: false });
    }
    // For other errors, log them and return a server error.
    console.error('Error checking user:', error);
    return NextResponse.json({ exists: false, message: 'Internal server error.' }, { status: 500 });
  }
}
