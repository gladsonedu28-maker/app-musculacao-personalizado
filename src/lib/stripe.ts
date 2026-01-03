import Stripe from 'stripe';

// Verificar se Stripe está configurado
const isStripeConfigured = !!(
  process.env.STRIPE_SECRET_KEY &&
  process.env.STRIPE_PREMIUM_PRICE_ID &&
  process.env.STRIPE_ELITE_PRICE_ID
);

// Inicializar Stripe apenas se configurado
export const stripe = isStripeConfigured
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-12-18.acacia',
      typescript: true,
    })
  : null;

export const STRIPE_PLANS = {
  premium: {
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || '',
    name: 'Premium',
    price: 2990, // em centavos (R$ 29,90)
  },
  elite: {
    priceId: process.env.STRIPE_ELITE_PRICE_ID || '',
    name: 'Elite',
    price: 4990, // em centavos (R$ 49,90)
  },
};

export const isStripeEnabled = isStripeConfigured;
