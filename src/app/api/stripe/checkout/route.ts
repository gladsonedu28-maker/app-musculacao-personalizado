import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_PLANS, isStripeEnabled } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Verificar se Stripe está configurado
    if (!isStripeEnabled || !stripe) {
      return NextResponse.json(
        { 
          error: 'Stripe não configurado',
          message: 'Configure as variáveis de ambiente do Stripe para habilitar pagamentos.'
        },
        { status: 503 }
      );
    }

    const { planId, userId, userEmail } = await request.json();

    // Validar plano
    if (planId === 'free') {
      return NextResponse.json(
        { error: 'Plano gratuito não requer pagamento' },
        { status: 400 }
      );
    }

    if (!STRIPE_PLANS[planId as keyof typeof STRIPE_PLANS]) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    const plan = STRIPE_PLANS[planId as keyof typeof STRIPE_PLANS];

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/cancel`,
      customer_email: userEmail,
      metadata: {
        userId,
        planId,
      },
      subscription_data: {
        metadata: {
          userId,
          planId,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
