"use client";

import { useState, useEffect } from "react";
import { Check, Crown, Zap, Star, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PlansPageProps {
  onSelectPlan: (plan: string) => void;
  onBack: () => void;
}

export default function PlansPage({ onSelectPlan, onBack }: PlansPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stripeConfigured, setStripeConfigured] = useState(true);

  // Verificar se Stripe está configurado
  useEffect(() => {
    const checkStripe = async () => {
      try {
        const response = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId: "premium", userId: "test", userEmail: "test@test.com" }),
        });
        const data = await response.json();
        if (response.status === 503) {
          setStripeConfigured(false);
        }
      } catch (error) {
        console.error("Erro ao verificar Stripe:", error);
      }
    };
    checkStripe();
  }, []);

  const plans = [
    {
      id: "free",
      name: "Básico",
      price: "Grátis",
      icon: Star,
      color: "from-gray-600 to-gray-700",
      features: [
        "Acesso a treinos básicos",
        "3 treinos por semana",
        "Dicas nutricionais básicas",
        "Acompanhamento de progresso",
      ],
      limitations: [
        "Sem treinos avançados",
        "Sem planos nutricionais personalizados",
        "Sem suporte prioritário",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 29,90/mês",
      icon: Crown,
      color: "from-orange-500 to-red-500",
      popular: true,
      features: [
        "Todos os treinos disponíveis",
        "Treinos ilimitados",
        "Planos nutricionais personalizados",
        "Receitas exclusivas",
        "Acompanhamento detalhado",
        "Vídeos em alta qualidade",
        "Suporte prioritário",
        "Sem anúncios",
      ],
      limitations: [],
    },
    {
      id: "elite",
      name: "Elite",
      price: "R$ 49,90/mês",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      features: [
        "Tudo do Premium +",
        "Personal trainer virtual",
        "Consultoria nutricional",
        "Planos 100% personalizados",
        "Análise de progresso avançada",
        "Acesso antecipado a novidades",
        "Comunidade exclusiva",
        "Desafios e competições",
      ],
      limitations: [],
    },
  ];

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId);

    // Se for plano gratuito, apenas seleciona
    if (planId === "free") {
      setTimeout(() => {
        onSelectPlan(planId);
      }, 300);
      return;
    }

    // Verificar se Stripe está configurado
    if (!stripeConfigured) {
      alert(
        "⚠️ Pagamentos não configurados\n\n" +
        "Para habilitar planos pagos, configure as variáveis de ambiente do Stripe:\n" +
        "- STRIPE_SECRET_KEY\n" +
        "- STRIPE_PREMIUM_PRICE_ID\n" +
        "- STRIPE_ELITE_PRICE_ID\n" +
        "- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\n\n" +
        "Por enquanto, você pode usar o plano Básico gratuitamente!"
      );
      setSelectedPlan(null);
      return;
    }

    // Para planos pagos, redirecionar para Stripe
    setLoading(true);

    try {
      // Obter dados do usuário do localStorage
      const profile = localStorage.getItem("fitnessProfile");
      const userEmail = profile ? JSON.parse(profile).email || "user@example.com" : "user@example.com";
      const userId = profile ? JSON.parse(profile).id || "demo-user" : "demo-user";

      // Criar sessão de checkout no Stripe
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          userId,
          userEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 503) {
          setStripeConfigured(false);
          throw new Error("Stripe não configurado. Configure as variáveis de ambiente.");
        }
        throw new Error(data.error || "Erro ao processar pagamento");
      }

      // Redirecionar para página de checkout do Stripe
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Erro ao processar pagamento:", error);
      alert(error.message || "Erro ao processar pagamento. Tente novamente.");
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 shadow-2xl border-b border-orange-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Escolha seu Plano</h1>
              <p className="text-orange-100 mt-1">
                Desbloqueie todo o potencial do FitPro Academy
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/20"
              disabled={loading}
            >
              Voltar
            </Button>
          </div>
        </div>
      </header>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-2xl p-8 text-center border border-gray-700 shadow-2xl">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Redirecionando para pagamento...
            </h3>
            <p className="text-gray-400">
              Você será levado para a página segura do Stripe
            </p>
          </div>
        </div>
      )}

      {/* Stripe Not Configured Alert */}
      {!stripeConfigured && (
        <div className="container mx-auto px-4 pt-6">
          <Alert className="bg-orange-500/10 border-orange-500/50 text-orange-200">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <AlertDescription className="ml-2">
              <strong>Pagamentos em modo demo:</strong> Configure as variáveis de ambiente do Stripe para habilitar planos pagos. 
              Por enquanto, você pode usar o plano Básico gratuitamente!
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Plans Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            const isPaidPlan = plan.id !== "free";
            const isDisabled = isPaidPlan && !stripeConfigured;

            return (
              <Card
                key={plan.id}
                className={`relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isSelected
                    ? "border-orange-500 shadow-2xl shadow-orange-500/50"
                    : "border-gray-700 hover:border-orange-500/50"
                } ${plan.popular ? "md:scale-110 z-10" : ""} ${
                  isDisabled ? "opacity-60" : ""
                }`}
                onClick={() => !loading && !isDisabled && handleSelectPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    MAIS POPULAR
                  </div>
                )}

                {isDisabled && (
                  <div className="absolute -top-4 right-4 bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/50">
                    Configure Stripe
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-green-500/20 rounded-full p-1 mt-0.5">
                          <Check className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-700">
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-red-500/20 rounded-full p-1 mt-0.5">
                            <span className="text-red-400 text-xs">✕</span>
                          </div>
                          <span className="text-gray-500 text-sm line-through">
                            {limitation}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    disabled={loading || isDisabled}
                    className={`w-full mt-6 bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-bold py-6 text-lg shadow-lg transition-all ${
                      isSelected ? "scale-105" : ""
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isDisabled) {
                        handleSelectPlan(plan.id);
                      }
                    }}
                  >
                    {loading && isSelected ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        {plan.id === "free" ? "Começar Grátis" : isDisabled ? "Configure Stripe" : "Assinar Agora"}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-400">
            💳 Pagamento seguro via Stripe • 🔒 Cancele quando quiser • ✨ Sem taxas ocultas
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 Amex</span>
            <span>🔒 Pagamento Seguro</span>
          </div>
        </div>
      </div>
    </div>
  );
}
