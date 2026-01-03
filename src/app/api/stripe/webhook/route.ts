import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Assinatura do webhook ausente' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error: any) {
    console.error('Erro ao verificar webhook:', error);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  // Processar eventos do Stripe
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Aqui você pode salvar no banco de dados que o usuário assinou
      console.log('Pagamento concluído:', {
        userId: session.metadata?.userId,
        planId: session.metadata?.planId,
        customerId: session.customer,
        subscriptionId: session.subscription,
      });

      // TODO: Atualizar banco de dados com informações da assinatura
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      
      console.log('Assinatura atualizada:', {
        subscriptionId: subscription.id,
        status: subscription.status,
        customerId: subscription.customer,
      });

      // TODO: Atualizar status da assinatura no banco
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      
      console.log('Assinatura cancelada:', {
        subscriptionId: subscription.id,
        customerId: subscription.customer,
      });

      // TODO: Remover acesso premium do usuário
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      
      console.log('Pagamento falhou:', {
        customerId: invoice.customer,
        subscriptionId: invoice.subscription,
      });

      // TODO: Notificar usuário sobre falha no pagamento
      break;
    }

    default:
      console.log(`Evento não tratado: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
