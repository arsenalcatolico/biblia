import { NextResponse, type NextRequest } from 'next/server';
import { firebaseAdmin } from '@/lib/firebase/admin-config';

// Este é o endpoint que o n8n chamará.
// Ex: POST https://seu-app.com/api/webhooks/new-user

export async function POST(request: NextRequest) {
  // 1. Validação de Segurança
  const authToken = request.headers.get('Authorization')?.split('Bearer ')[1];
  const n8nAuthToken = process.env.N8N_AUTH_TOKEN;

  if (!n8nAuthToken) {
    return NextResponse.json(
      { success: false, error: 'A variável de ambiente N8N_AUTH_TOKEN não está configurada no servidor.' },
      { status: 500 }
    );
  }

  if (authToken !== n8nAuthToken) {
    return NextResponse.json({ success: false, error: 'Token de autorização inválido.' }, { status: 401 });
  }

  // 2. Extração dos Dados
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Corpo da requisição inválido (não é um JSON válido).' }, { status: 400 });
  }

  const { email } = body;

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ success: false, error: 'O campo "email" é obrigatório e deve ser uma string.' }, { status: 400 });
  }

  // 3. Criação do Usuário no Firebase
  try {
    const userRecord = await firebaseAdmin.auth().createUser({
      email: email,
      password: 'biblia@catolica365', // Senha padrão para novos usuários
      emailVerified: true,
    });
    
    console.log(`Usuário criado com sucesso: ${userRecord.uid} - ${userRecord.email}`);
    
    return NextResponse.json({ success: true, userId: userRecord.uid, email: userRecord.email });

  } catch (error: any) {
    console.error('Erro ao criar usuário no Firebase:', error.message);

    // Trata o erro caso o usuário já exista
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({ success: false, error: 'Este e-mail já está cadastrado.' }, { status: 409 });
    }
    
    return NextResponse.json({ success: false, error: 'Erro interno do servidor ao criar usuário.' }, { status: 500 });
  }
}
